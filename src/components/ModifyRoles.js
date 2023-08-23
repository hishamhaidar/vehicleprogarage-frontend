import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {
  Button,
  FloatButton,
  Form,
  Input,
  Modal,
  Select,
  Table,
  message,
} from "antd";
import { EditOutlined } from "@ant-design/icons";

const ModifyRoles = () => {
  const authApi = useAxiosPrivate();
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  const handleEdit = (user) => {
    setIsEditing(true);
    setEditedUser(user);
  };

  const getUsers = async () => {
    try {
      const response = await authApi.get("/user/getall");
      setUsers(response.data);
    } catch (error) {}
  };
  useEffect(() => {
    getUsers();
  }, []);
  const columns = [
    { key: "userID", title: "User ID", dataIndex: "userID" },
    { key: "email", title: "User Email", dataIndex: "email" },
    { key: "username", title: "username", dataIndex: "username" },
    { key: "role", title: "Role", dataIndex: "role" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <span>
          <Button danger onClick={() => handleEdit(record)}>
            <EditOutlined />
          </Button>
        </span>
      ),
    },
  ];

  const dataWithKeys = users.map((user) => ({
    ...user,
    key: user.userID,
  }));
  const roleOptions = ["NEW_USER", "SERVICE_MANAGER", "GARAGE_OWNER"];
  const handleSaving = async () => {
    try {
      const body = {
        username: editedUser?.username,
        email: editedUser?.email,
        role: editedUser?.role,
      };
      setIsEditing(false);
      await authApi.put(`/user/role/${editedUser?.userID}`, body);
      message.success("Role modified succesfully");
      await getUsers();
    } catch (err) {
      message.error("Please try again ");
    }
  };

  return (
    <div>
      <Table columns={columns} dataSource={dataWithKeys} />
      <Modal
        open={isEditing}
        footer={null}
        onCancel={() => {
          setIsEditing(false);
        }}
      >
        <Form onFinish={handleSaving}>
          <Form.Item label={"User ID"}>
            <Input readOnly value={editedUser?.userID} />
          </Form.Item>
          <Form.Item label={"email"}>
            <Input readOnly value={editedUser?.email} />
          </Form.Item>
          <Form.Item label={"username"}>
            <Input readOnly value={editedUser?.username} />
          </Form.Item>
          <Form.Item label={"Role"}>
            <Select
              value={editedUser?.role}
              onChange={(value) =>
                setEditedUser((prevUser) => ({ ...prevUser, role: value }))
              }
            >
              {roleOptions.map((role) => (
                <Select.Option key={role} value={role}>
                  {role}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <Button onClick={() => setIsEditing(false)} danger>
            Discard
          </Button>
        </Form>
      </Modal>
      <FloatButton.BackTop />
    </div>
  );
};

export default ModifyRoles;
