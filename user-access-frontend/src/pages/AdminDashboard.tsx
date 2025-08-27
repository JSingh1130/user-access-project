import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import {
  Typography,
  Form,
  Input,
  Button,
  Card,
  Table,
  Space,
  message,
  Row,
  Col,
} from "antd";

const { Title } = Typography;

const AdminDashboard = () => {
  const [softwareList, setSoftwareList] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const fetchSoftware = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/software", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSoftwareList(res.data || []);
    } catch {
      message.error("Failed to load software list");
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values: any) => {
    try {
      const payload = {
        ...values,
        accessLevels: values.accessLevels
          .split(",")
          .map((level: string) => level.trim()),
      };

      await axios.post("/api/software", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success("Software created");
      form.resetFields();
      fetchSoftware();
    } catch {
      message.error("Creation failed");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logged out");
    navigate("/login");
  };

  useEffect(() => {
    fetchSoftware();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Access Levels",
      dataIndex: "accessLevels",
      render: (levels: string[]) => levels.join(", "),
    },
  ];

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
          maxWidth: 1000,
          borderRadius: 12,
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          background: "#fff",
        }}
      >
        <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
          <Col>
            <Title level={3} style={{ marginBottom: 0 }}>
              Admin Dashboard
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
            name="name"
            label="Software Name"
            rules={[{ required: true, message: "Please enter software name" }]}
          >
            <Input placeholder="Enter software name" size="large" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea placeholder="Description" rows={3} />
          </Form.Item>

          <Form.Item
            name="accessLevels"
            label="Access Levels (comma separated)"
            rules={[{ required: true, message: "Please enter access levels" }]}
          >
            <Input placeholder="e.g. Read,Write,Admin" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Add Software
            </Button>
          </Form.Item>
        </Form>

        <Title level={4} style={{ marginTop: 30 }}>
          Registered Software
        </Title>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={softwareList}
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default AdminDashboard;
