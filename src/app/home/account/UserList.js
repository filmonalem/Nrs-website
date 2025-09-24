import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllUserReducer, suspendUserReducer } from "../../store/redux/user";
import { Table, Badge } from "antd";
import { changeUpper, formatDate } from "../../../libs/utilitis";

const UserList = ({ getUser }) => {
  const dispatch = useDispatch();
  const columns = [
    {
      key: "No",
      width: 60,
      title: "No",
      render: (text, record, index) => index + 1,
    },
    {
      key: "fullName",
      width: 200,
      title: "Full Name",
      dataIndex: "fullName",
      sorter: true,
      fixed: "left",
    },

    { key: "email", width: 220, title: "Email", dataIndex: "email" },
    {
      key: "phone",
      width: 160,
      title: "Phone",
      dataIndex: "phoneNumber",
      sorter: true,
    },
    {
      key: "Role",
      width: 120,
      title: "Permission",
      dataIndex: "role",
      render: (_, record) => changeUpper(record?.role),
    },
  

    {
      key: "status",
      width: 100,
      title: "Status",
      render: (text, record) =>
        record.isActive === true ? (
          <Badge status="processing" />
        ) : (
          <Badge status="warning" />
        ),
    },
    {
      key: "actions",
      width: 80,
      title: "Actions",
      render: (text, record) => (
        <button
          className={` px-2 rounded-full ${record.isActive === true ? "text-green-600 bg-green-100 dark:bg-green-800 " : "text-red-600 bg-red-100 dark:bg-red-800 "}`}
          onClick={() => handleSuspend(record?.userId)}
        >
          {record.isActive === !false ? "Activate" : "Block"}
        </button>
      ),
    },
  ];

  const handleSuspend = async (userId) => {
    dispatch(suspendUserReducer(userId));
    dispatch(getAllUserReducer());
  };

  return (
    <Table
      className="mx-2 sm:mx-1"
      size="small"
      columns={columns}
      dataSource={getUser}
      rowKey="userId"
      pagination={{
        defaultPageSize: 100,
        showSizeChanger: false,
        pageSizeOptions: ["15", "30", "50", "100"],
      }}
      scroll={{ y: 700 }}
    />
  );
};

export default UserList;
