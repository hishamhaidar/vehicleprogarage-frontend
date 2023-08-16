import React, { useContext, useState } from "react";
import { Form, Input, Button, message } from "antd";
import "../App.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../api/AxiosConfig";
import AuthContext from "../context/AuthProvider";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Login = ({
  setIsLoggedIn,
  userEmail,
  setUserEmail,
  setUserName,
  setCurrentUserID,
  setCurrentUserRole,
}) => {
  const { setAuth } = useContext(AuthContext);
  const authApi = useAxiosPrivate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const response = await api.post("/user/authenticate", data, {
        headers: { "Content-Type": "application/json" },
      });
      const jwtToken = response?.data?.jwtToken;
      setAuth({ userEmail, jwtToken });
      navigate(from, { replace: true });
      message.success("You are logged in now!");
      try {
        setTimeout(async () => {
          const loggedUserInfo = await authApi.get(
            `/user/getinfo/${userEmail}`
          );
          setCurrentUserID(loggedUserInfo?.data?.userID);
          setCurrentUserRole(loggedUserInfo?.data?.role);
          setUserName(loggedUserInfo?.data?.username);
        }, 2000);
      } catch (error) {
        message.error("Couldnt get user data,please login again");
      }
      setIsLoggedIn(true);
      setUserEmail("");
    } catch (err) {
      setErrorMessage("Incorrect email and/or password");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <h2>please enter your details</h2>
      <Form
        autoComplete="off"
        className="Login-Form"
        onFinish={handleSubmit}
        labelCol={{ span: 7 }}
      >
        {errorMessage && (
          <Form.Item validateStatus="error" help={errorMessage} />
        )}
        <Form.Item
          label="Email:"
          name={"email"}
          rules={[
            {
              type: "email",
              message: "Please enter a valid email address",
            },
            { required: true, message: "email cannot be empty" },
          ]}
          hasFeedback
        >
          <Input
            name="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="example@example.com"
            required
          />
        </Form.Item>
        <Form.Item
          label="Password:"
          name={"password"}
          rules={[{ required: true, message: "password cannot be empty" }]}
          hasFeedback
        >
          <Input.Password name="password" placeholder="password" required />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </Form.Item>
      </Form>
      <p>
        Don't have account yet? <Link to={"/register"}>register here</Link>
      </p>
    </div>
  );
};

export default Login;
