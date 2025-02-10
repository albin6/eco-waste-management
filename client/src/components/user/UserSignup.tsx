import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupSchema } from "@/utils/signupValidation";
import { toast } from "sonner";

import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "@/api/axiosInstance";
import axios from "axios";

export default function UserSignup() {
  const navigate = useNavigate();
  const submitRegister = async (values: any) => {
    try {
      const response = await axiosInstance.post("/register", {
        name: values.name,
        email: values.email,
        password: values.password,
        role: "master",
      });
      toast.success(response.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values, actions) => {
      submitRegister(values);
      actions.resetForm({
        values: {
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
      });
      navigate("/");
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mt-6 mb-6">Sign up</h2>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="flex space-x-2">
            <div className="space-y-2 flex-1">
              <Label htmlFor="name">First Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your first name"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-sm text-red-500">{formik.errors.name}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-500">{formik.errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-500">{formik.errors.password}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              {...formik.getFieldProps("confirmPassword")}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>
          {/* <div className="space-y-2">
            <Label htmlFor="role">Account Type</Label>
            <select
              id="role"
              className="border rounded p-2 w-full"
              {...formik.getFieldProps("role")}
            >
              <option value="" disabled>
                Select account type
              </option>
              <option value="master">Master</option>
              <option value="sub">Sub</option>
            </select>
            {formik.touched.role && formik.errors.role && (
              <p className="text-sm text-red-500">{formik.errors.role}</p>
            )}
          </div> */}
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
      </div>
      <div className="text-sm mt-6 text-center">
        Already Have An Account?{" "}
        <Link to="/" className="font-medium text-primary hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
}
