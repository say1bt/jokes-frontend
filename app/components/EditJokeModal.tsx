import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { EditJokeModalProps, Joke } from "../types";

const EditJokeModal: React.FC<EditJokeModalProps> = ({ joke, visible, onClose, onSave }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    console.log("joke121212");

    if (joke) {
      form.setFieldsValue({ content: joke.content });
    }
  }, [joke, form]);

  const handleSave = () => {
    form.validateFields().then((values) => {
      console.log("joke in handleSave", values);
      if (joke) {
        onSave({ ...joke, content: values.content });
      }
    });
  };

  return (
    <Modal title="Edit Joke" open={visible} onCancel={onClose} onOk={handleSave} okText="Save" cancelText="Cancel" centered>
      <Form form={form} layout="vertical">
        <Form.Item name="content" label="Joke Content" rules={[{ required: true, message: "Please enter the joke content!" }]}>
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditJokeModal;
