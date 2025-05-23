import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Typography, Tag, Card, message } from "antd";

const { Title } = Typography;

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const fetchMyRequests = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/requests/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRequests(res.data.requests || []);
    } catch (err) {
      message.error("Failed to load your requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRequests();
  }, []);

  const columns = [
    { title: "Software", dataIndex: ["software", "name"] },
    { title: "Access Type", dataIndex: "accessType" },
    { title: "Reason", dataIndex: "reason" },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => (
        <Tag
          color={
            status === "Approved"
              ? "green"
              : status === "Rejected"
              ? "red"
              : "orange"
          }
        >
          {status}
        </Tag>
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
        <Title level={3} style={{ textAlign: "center", marginBottom: 30 }}>
          My Access Requests
        </Title>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={requests}
          loading={loading}
          pagination={{ pageSize: 8 }}
        />
      </Card>
    </div>
  );
};

export default MyRequests;
