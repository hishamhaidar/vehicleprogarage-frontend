import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/AxiosConfig";

const Signup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const response = await api.post("/user/register", data, {
        headers: { "Content-Type": "application/json" },
      });

      message.success("Registration successful! You can now log in.");
      navigate("/");
    } catch (error) {
      setErrorMessage(JSON.stringify(error.response.data));
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <h2>please enter your details</h2>
      <Form
        autoComplete="off"
        className="Signup-Form"
        onFinish={handleSubmit}
        labelCol={{ span: 7 }}
      >
        {errorMessage && (
          <Form.Item validateStatus="error" help={errorMessage} />
        )}
        <Form.Item
          label="username:"
          name={"username"}
          rules={[
            {
              type: "string",
              message: "Please enter a valid username",
            },
            { required: true, message: "your username cannot be empty" },
          ]}
          hasFeedback
        >
          <Input name="username" placeholder="Your full name" required />
        </Form.Item>
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
          <Input name="email" placeholder="example@example.com" required />
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
            {isSubmitting ? "registering..." : "register"}
          </Button>
        </Form.Item>
      </Form>
      <p>
        Already a user? <Link to={"/register"}>Login here</Link>
      </p>
    </div>
  );
};

export default Signup;
