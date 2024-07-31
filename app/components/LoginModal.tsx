import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Credentials, LoginModalProps } from "../types";
import { authenticateUser } from "../api";

const LoginModal: React.FC<LoginModalProps> = ({ visible, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (): Promise<void> => {
    try {
      const credentials: Credentials = { email, password };
      console.log(credentials);
      const authenticateUserResponse = await authenticateUser(credentials);
      console.log("Response from handleLogin", authenticateUserResponse?.data);
      onLoginSuccess(authenticateUserResponse?.data?.token);
      onClose();
      alert("Login successful!");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed. Please try again.");
    }
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <Modal title="Login" open={visible} onOk={handleLogin} onCancel={handleGoHome} okText="Login" cancelText="Go Home">
      <Input placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} style={{ marginBottom: "10px" }} />
      <Input.Password placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ marginBottom: "10px" }} />
    </Modal>
  );
};

export default LoginModal;
