"use client";
import { useState, useEffect } from "react";
import { Button, Typography, Card, Layout, Space } from "antd";
import { getJoke } from "./api";
import Navbar from "./components/NavBar";

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const Home = () => {
  const [joke, setJoke] = useState<string>("");

  const fetchJoke = async () => {
    try {
      const response = await getJoke();
      setJoke(response?.data?.content);
    } catch (error) {
      console.error("Error fetching joke:", error);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <Layout>
      <Navbar />
      <Content style={{ padding: "50px", maxWidth: "800px", margin: "auto" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: "40px" }}>
          Random Joke
        </Title>
        <Card style={{ marginBottom: "20px", padding: "30px", fontSize: "18px" }}>
          <Paragraph style={{ fontSize: "18px", margin: 0 }}>{joke}</Paragraph>
        </Card>
        <Space direction="vertical" style={{ width: "100%", textAlign: "center" }}>
          <Button type="primary" onClick={fetchJoke} style={{ marginTop: "10px" }}>
            Get Another Joke
          </Button>
        </Space>
      </Content>
    </Layout>
  );
};

export default Home;
