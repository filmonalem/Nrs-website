"use client";

import React, { useEffect, useState } from "react";
import UserList from "./UserList";
import { Empty } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  filterAllUserReducer,
  getAllUserReducer,
  users,
} from "../../store/redux/user";
import AccountForm from "./AccountForm";
import HeaderSection from "@/app/common/HeaderSection";
import LoopButton from "@/app/common/LoopButton";

const Account = () => {
  const dispatch = useDispatch();
  const getUsers = useSelector(users);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const data = {
    searchTerm: searchTerm,
  };
  useEffect(() => {
    if (data.searchTerm.length > 1) {
      dispatch(filterAllUserReducer(data));
    } else {
      dispatch(getAllUserReducer());
    }
  }, [searchTerm]);

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const showView = () => {
    setShowForm(!showForm);
  };
  const importData = () => {};

  const printData = () => {};

  const props = {
    title: "User Account",
    description: "Add a new user to your inventory",
    dataCount: getUsers?.length || 0,
    name: "Users",
    isTitle: false,
    isOpenButton: showForm,
    listName: "Users",
    available: "Available",
    unavailable: "Unavailable",
    view: "View Users",
    isButtonOpen: showForm,
    searchTerm,
    setSearchValue: setSearchTerm,
    placeholder: "Search Name or Brand",
    type: "text",
    value: searchTerm,
  };

  return (
    <>
      <HeaderSection
        props={props}
        onImport={importData}
        onPrint={printData}
        filterItem={handleSearchChange}
      />

      {showForm ? (
        <AccountForm setIsOpen={toggleForm} />
      ) : getUsers?.length > 0 ? (
        <UserList getUser={getUsers} />
      ) : (
        <Empty
          description={
            <div className="text-gray-400 text-md">
              No user register request found
            </div>
          }
        />
      )}

      <LoopButton addItem={toggleForm} viewItem={showView} props={props} />
    </>
  );
};

export default Account;
