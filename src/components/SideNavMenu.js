import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import { Menu, Modal } from "antd";

import {
  HomeOutlined,
  LoginOutlined,
  UserAddOutlined,
  LogoutOutlined,
  UserOutlined,
  SoundTwoTone,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const SideNavMenu = ({ isLoggedIn, signOut }) => {
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  const hideLogoutModal = () => {
    setIsLogoutModalVisible(false);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const handleMenuClick = ({ key }) => {
    if (key === "/logout") {
      setIsLogoutModalVisible(true);
    } else navigate(key);
  };
  return (
    <Menu
      onClick={handleMenuClick}
      className="App-Nav"
      defaultSelectedKeys={[location.pathname]}
    >
      {!isLoggedIn && (
        <>
          <Menu.Item key="/" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="/login" icon={<LoginOutlined />}>
            Login
          </Menu.Item>
          <Menu.Item key="/register" icon={<UserAddOutlined />}>
            Signup
          </Menu.Item>
        </>
      )}
      {isLoggedIn && (
        <>
          <Menu.Item key="/dashboard" icon={<LoginOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="/bookings" icon={<SoundTwoTone />}>
            Bookings
          </Menu.Item>
          <Menu.Item key="/roles" icon={<ExclamationCircleOutlined />}>
            Modify Roles
          </Menu.Item>
          <Menu.Item key="/profile" icon={<UserOutlined />}>
            Profile
          </Menu.Item>
          <Menu.Item key="/logout" danger icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </>
      )}
      <Modal
        title="Confirm Logout"
        open={isLogoutModalVisible}
        onCancel={hideLogoutModal}
        onOk={() => {
          signOut();
          hideLogoutModal();
        }}
      >
        Are you sure you want to log out?
      </Modal>
    </Menu>
  );
};

export default SideNavMenu;
