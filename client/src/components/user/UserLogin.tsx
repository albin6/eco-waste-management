import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useFormik } from "formik";
import { loginSchema } from "@/utils/loginValidation";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "@/api/axiosInstance";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "@/redux/slices/userSlice";

export default function UserLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const response = await axiosInstance.post("/login", {
        email: data.email,
        password: data.password,
      });
      dispatch(loginUser({ userInfo: response.data.user }));
      navigate("/user/dashboard");
      toast.success("Login successfully");
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values, actions) => {
      onSubmit({ email: values.email, password: values.password });
      actions.resetForm({
        values: {
          email: "",
          password: "",
        },
      });
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mt-6 mb-6">Log in</h2>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="helloworld@gmail.com"
              {...formik.getFieldProps("email")}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <p className="text-sm text-red-500">{formik.errors.email}</p>
          )}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...formik.getFieldProps("password")}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4 text-gray-400" />
                ) : (
                  <EyeIcon className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-500">{formik.errors.password}</p>
            )}
          </div>
          <div className="flex justify-end">
            <a
              href="/forgotPassword"
              className="text-sm font-medium text-primary hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <Button type="submit" className="w-full">
            Log in
          </Button>
        </form>
        <div className="text-sm text-center">
          New user?{" "}
          <Link
            to="/signup"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
