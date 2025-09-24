"use client";

import { useState, useEffect, useMemo } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaUserTag,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { notification } from "antd";
import { getAllUserReducer, users } from "../../../store/redux/user";

const UserInfo = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector(users) || [];
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    role: "",
    status: "",
  });
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    dispatch(getAllUserReducer());
  }, []);

  useEffect(() => {
    // Ensure this code runs only on the client side
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
      } else {
        notification.error({
          message: "Error",
          description: "User ID not found in local storage",
        });
      }
    }
  }, []);

  const currentUser = useMemo(
    () => allUsers.find((user) => user.userId === userId),
    [allUsers, userId]
  );

  useEffect(() => {
    if (currentUser) {
      setUserInfo({
        fullName: currentUser.fullName || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        department: currentUser.department || "",
        role: currentUser.role || "",
        status: currentUser.isActive ? "Active" : "Deactivated",
      });
    } else if (userId && !currentUser) {
      notification.error({
        message: "Error",
        description: "User information is not found",
      });
    }
  }, [currentUser, userId]);

  return (
    <>
      <div className="flex justify-center mt-2">
        <div className="w-full max-w-3xl bg-white shadow-md rounded-lg">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-semibold">User Information</h2>
            <p className="text-gray-500 text-sm mt-1">
              Details about your account and personal information.
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UserInfoField
                icon={<FaUser />}
                label="Full Name"
                value={userInfo.fullName}
              />
              <UserInfoField
                icon={<FaEnvelope />}
                label="Email Address"
                value={userInfo.email}
              />
              <UserInfoField
                icon={<FaPhone />}
                label="Phone Number"
                value={userInfo.phone}
              />
              <UserInfoField
                icon={<FaBuilding />}
                label="Department"
                value={userInfo.department}
              />
              <UserInfoField
                icon={<FaUserTag />}
                label="Role"
                value={userInfo.role}
              />
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  Status
                </label>
                <p
                  className={`inline-block px-4 py-1 rounded-full text-sm font-medium mt-2 
                  ${userInfo.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                >
                  {userInfo.status}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const UserInfoField = ({ icon, label, value }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
      {icon && icon}
      {label}
    </label>
    <p className="text-gray-800 font-medium">{value || "Not Available"}</p>
  </div>
);

export default UserInfo;
