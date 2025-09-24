"use client";
import { useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { notification } from "antd";
import { changeUserPasswordReducer } from "../../../store/redux/user";

const ChangePassword = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);
  const message = useSelector((state) => state.user.hasMessage);

  const [userId, setUserId] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const userId = localStorage.getItem("userId");
    if (!userId) {
      notification.error({
        message: "Error",
        description: "User ID not found. Please log in again.",
      });
      router.push("/loop/login");
      return;
    }

    try {
      const requestData = {
        userId,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      };

      await dispatch(changeUserPasswordReducer(requestData)).unwrap();

      notification.success({
        message: "Success",
        description: "Password changed successfully!",
      });

      // Clear form data
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Clear localStorage and redirect to login
      localStorage.clear();
      router.push("/loop/login");
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.message || "Failed to change password",
      });
      setErrors({ submit: error.message || "Failed to change password" });
    }
  };

  return (
    <div title="Change Password">
      <section className="container px-4 mx-auto">
        <div className="flex items-center justify-center min-h-screen bg-gray-50 ">
          <div className="w-full max-w-xl">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <FaLock className="text-white" />
                  Change Password
                </h2>
                <p className="text-teal-50 mt-1 text-sm">
                  Please enter your current password and choose a new one
                </p>
              </div>

              {/* Card Body */}
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Current Password Field */}
                  <div>
                    <label
                      htmlFor="currentPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Current Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        id="currentPassword"
                        name="currentPassword"
                        type={showPasswords.current ? "text" : "password"}
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent sm:text-sm"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                        onClick={() => togglePasswordVisibility("current")}
                      >
                        {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.currentPassword && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.currentPassword}
                      </p>
                    )}
                  </div>

                  {/* New Password Field */}
                  <div>
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      New Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        id="newPassword"
                        name="newPassword"
                        type={showPasswords.new ? "text" : "password"}
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent sm:text-sm"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                        onClick={() => togglePasswordVisibility("new")}
                      >
                        {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.newPassword && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.newPassword}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm New Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPasswords.confirm ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent sm:text-sm"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                        onClick={() => togglePasswordVisibility("confirm")}
                      >
                        {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  {errors.submit && (
                    <div className="text-sm text-red-600 text-center bg-red-50 p-3 rounded-lg">
                      {errors.submit}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white
                    ${
                      isLoading
                        ? "bg-teal-400 cursor-not-allowed"
                        : "bg-teal-600 hover:bg-teal-700 active:bg-teal-800"
                    } 
                    transition-all duration-200 ease-in-out
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Changing Password...
                        </div>
                      ) : (
                        <span className="flex items-center">
                          <FaLock className="mr-2" />
                          Change Password
                        </span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChangePassword;
