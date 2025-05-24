import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";

import {
  Button,
  Form,
  Input,
  Typography,
  Card,
  message,
} from "antd";

const { Title, Text } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
  setLoading(true);
  try {
    const res = await axios.post("/auth/login", values);
    const { token, role } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    message.success("Login successful");

    if (role === "Admin") {
      navigate("/admin-dashboard");
    } else if (role === "Manager") {
      navigate("/manager");
    } else {
      navigate("/employee");
    }
  } catch (err: any) {
    console.error("Login error:", err); // helpful for debugging
    message.error(err?.response?.data?.message || "Login failed");
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
        title={<Title level={3} style={{ textAlign: "center", marginBottom: 0 }}>Log In</Title>}
        style={{
          width: "100%",
          maxWidth: 500,
          padding: "20px 30px",
          borderRadius: 12,
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Form layout="vertical" onFinish={onFinish}>
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

          <Form.Item>
            <Button
              type="primary"
              danger
              htmlType="submit"
              loading={loading}
              block
              size="large"
            >
              Log In
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center", marginTop: 10 }}>
          <Text>Don't have an account? </Text>
          <Link to="/signup">Sign Up</Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
