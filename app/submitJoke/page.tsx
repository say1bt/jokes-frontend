"use client";
import { useState, useEffect } from "react";
import { Form, Input, Button, Typography, Layout, Card, Select } from "antd";
import { submitJoke, getAllJokeTypes } from "../api";
import Navbar from "../components/NavBar";
import { alert_message_constants } from "../constants/generalConstants";

const { Title } = Typography;
const { TextArea } = Input;
const { Content } = Layout;
const { Option } = Select;

export default function SubmitJoke() {
  const [joke, setJoke] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [jokeTypes, setJokeTypes] = useState<string[]>([]);

  useEffect(() => {
    fetchJokeTypes();
  }, []);

  const fetchJokeTypes = async (): Promise<void> => {
    try {
      const jokeTypeResponse = await getAllJokeTypes();
      setJokeTypes(jokeTypeResponse?.data);
    } catch (error) {
      console.error("Error fetching joke types:", error);
    }
  };

  const handleSubmitClick = async (): Promise<void> => {
    try {
      await submitJoke({ content: joke, typeId: type, approved: false });
      setJoke("");
      setType("");
      alert(alert_message_constants.JOKE_SUBMIT_SUCCESSFUL);
    } catch (error) {
      console.error("Error submitting joke:", error);
    }
  };

  return (
    <Layout>
      <Navbar />
      <Content style={{ padding: "50px", maxWidth: "600px", margin: "auto" }}>
        <Card>
          <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
            Submit a New Joke
          </Title>
          <Form layout="vertical" onFinish={handleSubmitClick}>
            <Form.Item label="Joke" required>
              <TextArea value={joke} onChange={(e) => setJoke(e.target.value)} placeholder="Enter your joke here" rows={4} required />
            </Form.Item>
            <Form.Item label="Type" required>
              <Select value={type} onChange={(value) => setType(value)} placeholder="Select joke type">
                {jokeTypes.map((jokeType: any) => (
                  <Option key={jokeType._id} value={jokeType._id}>
                    {jokeType?.type}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
}
