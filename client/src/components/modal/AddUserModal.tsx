import { addUserSchema } from "@/utils/signupValidation";
import { useFormik } from "formik";
import type React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: { name: string; email: string; password: string }) => void;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: addUserSchema,

    onSubmit: (values, actions) => {
      onSubmit(values);
      onClose();
      actions.resetForm({
        values: {
          name: "",
          email: "",
          password: "",
        },
      });
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Add User</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-10">
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

            <Button type="submit" className="w-full">
              Add User
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
