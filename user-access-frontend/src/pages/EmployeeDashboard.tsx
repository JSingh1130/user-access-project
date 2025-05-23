import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Form,
  Select,
  Input,
  Button,
  message,
  Card,
  Row,
  Col,
} from "antd";
import axios from "../api/axios";


const { Title } = Typography;

const EmployeeDashboard = () => {
  const [softwareList, setSoftwareList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const fetchSoftware = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/software", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data || [];
      if (data.length === 0) {
        setSoftwareList([
          { id: 1, name: "Photoshop" },
          { id: 2, name: "Visual Studio Code" },
          { id: 3, name: "Slack" },
        ]);
      } else {
        setSoftwareList(data);
      }
    } catch (err) {
      message.error("Failed to load software list");
    }
  };

  const onFinish = async (values: any) => {
    try {
      await axios.post("http://localhost:5000/api/requests", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Request submitted successfully");
      form.resetFields();
    } catch (err) {
      message.error("Request submission failed");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logged out");
    navigate("/login");
  };

  const handleViewRequests = () => {
    navigate("/my-requests");
  };

  useEffect(() => {
    fetchSoftware();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(to right, #e0f7fa, #e0f2f1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 600,
          borderRadius: 12,
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          background: "#fff",
        }}
      >
        <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
          <Col>
            <Title level={3} style={{ marginBottom: 0 }}>
              Employee Dashboard
            </Title>
          </Col>
          <Col>
            <Button danger onClick={handleLogout}>
              Logout
            </Button>
          </Col>
        </Row>

        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            name="softwareId"
            label="Select Software"
            rules={[{ required: true, message: "Please select a software" }]}
          >
            <Select placeholder="Select software" size="large">
              {softwareList.map((soft: any) => (
                <Select.Option key={soft.id} value={soft.id}>
                  {soft.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="accessType"
            label="Access Type"
            rules={[{ required: true, message: "Please choose access type" }]}
          >
            <Select placeholder="Select access type" size="large">
              <Select.Option value="Read">Read</Select.Option>
              <Select.Option value="Write">Write</Select.Option>
              <Select.Option value="Admin">Admin</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="reason"
            label="Reason"
            rules={[{ required: true, message: "Please provide a reason" }]}
          >
            <Input.TextArea rows={4} placeholder="Why do you need access?" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Submit Request
            </Button>
          </Form.Item>
        </Form>

        <Button
          type="default"
          onClick={handleViewRequests}
          block
          style={{ marginTop: 10 }}
        >
          See My Requests
        </Button>
      </Card>
    </div>
  );
};

export default EmployeeDashboard;
