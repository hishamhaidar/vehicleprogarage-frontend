import React from "react";
import { Card, Avatar, Typography } from "antd";
import useAuth from "../hooks/useAuth";
import { UserOutlined } from "@ant-design/icons";
import "../App.css";
const { Title, Text } = Typography;

const Profile = ({ username, role, userID }) => {
  const { auth } = useAuth();
  const email = auth.userEmail;

  return (
    <div className="Profile">
      <Card className="ProfileCard">
        <Avatar
          size={64}
          icon={<UserOutlined />}
          style={{ marginBottom: 20 }}
        />
        <Title level={1}>User Profile</Title>
        <div className="ProfileContent">
          <div>
            <Text strong>Username:</Text> <Text italic>{username}</Text>
            <br />
            <Text strong>Email:</Text> <Text italic>{email}</Text>
          </div>
          <div>
            <Text strong>ID:</Text> <Text italic>{userID}</Text>
            <br />
            <Text strong>Role:</Text> <Text italic>{role}</Text>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
