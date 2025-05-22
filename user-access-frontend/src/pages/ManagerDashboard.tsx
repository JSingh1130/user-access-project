import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Table,
  Button,
  Tag,
  message,
  Typography,
  Space,
  Card,
  Row,
  Col,
} from "antd";

const { Title } = Typography;

const ManagerDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRequests(res.data.requests || []);
    } catch (err) {
      message.error("Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: "Approved" | "Rejected") => {
    try {
      await axios.patch(
        `http://localhost:5000/api/requests/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success(`Request ${status.toLowerCase()}`);
      fetchRequests();
    } catch (err) {
      message.error("Update failed");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logged out");
    navigate("/login");
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const columns = [
    {
      title: "Employee",
      dataIndex: ["user", "username"],
    },
    {
      title: "Software",
      dataIndex: ["software", "name"],
    },
    {
      title: "Access Type",
      dataIndex: "accessType",
    },
    {
      title: "Reason",
      dataIndex: "reason",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => (
        <Tag
          color={
            status === "Pending"
              ? "orange"
              : status === "Approved"
              ? "green"
              : "red"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Actions",
      render: (_: any, record: any) =>
        record.status === "Pending" ? (
          <Space>
            <Button
              type="primary"
              onClick={() => updateStatus(record.id, "Approved")}
            >
              Approve
            </Button>
            <Button danger onClick={() => updateStatus(record.id, "Rejected")}>
              Reject
            </Button>
          </Space>
        ) : (
          "-"
        ),
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
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={3} style={{ marginBottom: 0 }}>
              Manager Dashboard
            </Title>
          </Col>
          <Col>
            <Button type="primary" danger onClick={handleLogout}>
              Logout
            </Button>

          </Col>
        </Row>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={requests}
          loading={loading}
          pagination={{ pageSize: 5 }}
          style={{ marginTop: 20 }}
        />
      </Card>
    </div>
  );
};

export default ManagerDashboard;
