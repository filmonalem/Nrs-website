"use cleint";
import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  message,
  Card,
  Row,
  Col,
  Divider,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addUserReducer, hasMessage } from "../../store/redux/user";

const { Option } = Select;

const AccountForm = () => {
  const dispatch = useDispatch();
  const setMessage = useSelector(hasMessage);
  const [messageApi, contextHolder] = message.useMessage();
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("+251");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [editShow, setEditShow] = useState(true);

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    if (!value.startsWith("+251")) {
      value = "+251" + value.replace(/^(\+251)?/, "");
    }
    if (value.length > 13) {
      value = value.slice(0, 13);
    }
    setPhone(value);
  };

  const enableButton =
    fullName.length <= 4 ||
    !gender ||
    phone.length <= 9 ||
    !email ||
    !role ||
    password.length <= 7;

  const createUser = () => {
    const initialValues = {
      fullName,
      phoneNumber: phone,
      gender,
      email,
      password,
      role,
    };

    dispatch(addUserReducer(initialValues)).then(() => {
      messageApi.info(setMessage);
    });

    setFullName("");
    setEmail("");
    setPhone("+251");
    setPassword("");
    setRole("");
    setGender(null);
  };

  const updateUser = () => {
    setEditShow(false);
  };

  return (
    <>
      <div className="flex justify-center items-center pt-3">
        {contextHolder}
        <Card
          style={{ width: "100%", maxWidth: 500 }}
          bordered
          className="shadow-sm rounded-sm b"
        >
          <h1 className="text-center text-1xl font-bold mb-1">
            Create New User Account
          </h1>
          <Divider className="mt-2 opacity-75" />
          <Form layout="vertical" className="w-full">
            <Form.Item
              label="Full Name"
              required
              rules={[{ required: true, message: "Please enter full name" }]}
            >
              <Input
                className="h-10 w-full"
                type="text"
                placeholder="Enter Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Phone"
              required
              rules={[{ required: true, message: "Please enter phone number" }]}
            >
              <Input
                className="h-10 w-full"
                type="text"
                placeholder="Enter Phone"
                value={phone}
                onChange={handlePhoneChange}
              />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Gender"
                  required
                  rules={[{ required: true, message: "Please select gender" }]}
                >
                  <Select
                    className="h-10 w-full"
                    placeholder="Select User Gender"
                    value={gender}
                    onChange={setGender}
                  >
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Role"
                  required
                  rules={[{ required: true, message: "Please select role" }]}
                >
                  <Select
                    className="h-10 w-full"
                    placeholder="Select User Role"
                    value={role}
                    onChange={setRole}
                  >
                    <Option value="agent">Agent</Option>
                    <Option value="super_admin">Super Admin</Option>
                    <Option value="buyer">Buyer</Option>
                    <Option value="admin">Admin</Option>
                    <Option value="renter">Renter</Option>
                    <Option value="seller">Seller</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Email"
              required
              rules={[{ required: true, message: "Please enter email" }]}
            >
              <Input
                className="h-10 w-full"
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              required
              rules={[{ required: true, message: "Please enter password" }]}
            >
              <Input.Password
                className="h-10 w-full"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              {editShow ? (
                <Button
                  type="primary"
                  onClick={createUser}
                  disabled={enableButton}
                  className="w-full h-10 mt-2 bg-lime-400"
                >
                  Create User
                </Button>
              ) : (
                <Button
                  type="primary"
                  onClick={updateUser}
                  disabled={enableButton}
                  className="w-full h-10 mt-2"
                >
                  Update User
                </Button>
              )}
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default AccountForm;
