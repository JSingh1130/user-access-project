import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";
import {
  Button,
  Form,
  Input,
  Select,
  Typography,
  message,
  Card
} from "antd";

const { Title, Text } = Typography;

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
  setLoading(true);
  try {
    const res = await axios.post("/auth/signup", values);
    message.success("Signup successful");
    navigate("/login");
  } catch (err: any) {
    console.error("Signup error:", err);  // 👈 Add this line
    message.error(err?.response?.data?.message || "Signup failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(to right, #e0f7fa, #e0f2f1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Card
        title={
          <Title level={3} style={{ marginBottom: 0, textAlign: "center" }}>
            Sign Up
          </Title>
        }
        style={{
          width: "100%",
          maxWidth: 500,
          padding: "20px 30px",
          borderRadius: 12,
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          style={{ width: "100%" }}
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input placeholder="Enter username" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Enter password" size="large" />
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select placeholder="Select role" size="large">
              <Select.Option value="Admin">Admin</Select.Option>
              <Select.Option value="Manager">Manager</Select.Option>
              <Select.Option value="Employee">Employee</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item style={{ marginTop: 10 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center", marginTop: 10 }}>
          <Text>Already have an account? </Text>
          <Link to="/login">Log In</Link>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
