import React, { useState, useEffect } from "react";
import { Modal, Select, Button } from "antd";
import axios from "axios";
import { getAllJokeTypes } from "../api";
import { ChangeCategoryModalProps } from "../types";
import { modal_constants } from "../constants/generalConstants";

const { Option } = Select;

const ChangeCategoryModal: React.FC<ChangeCategoryModalProps> = ({ visible, onClose, onChangeCategory, currentCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(currentCategory);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    setSelectedCategory(currentCategory);
  }, [currentCategory]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const allJokeTypesResponse = await getAllJokeTypes();
      setCategories(allJokeTypesResponse?.data);
    } catch (error) {
      setCategories([]);
    }
  };

  const handleOk = () => {
    onChangeCategory(selectedCategory);
    onClose();
  };

  return (
    <Modal
      title={modal_constants.CHANGE_CATEGORY}
      open={visible}
      onOk={handleOk}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Change Category
        </Button>,
      ]}
    >
      {categories && (
        <Select value={selectedCategory} onChange={(value) => setSelectedCategory(value)} style={{ width: "100%" }}>
          {categories &&
            categories.map((category: any) => (
              <Option key={category?._id} value={category?._id}>
                {category?.type}
              </Option>
            ))}
        </Select>
      )}
    </Modal>
  );
};

export default ChangeCategoryModal;
