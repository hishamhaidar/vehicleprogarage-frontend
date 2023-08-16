import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import "../App.css";
import { PlusCircleTwoTone } from "@ant-design/icons";
import Slots from "./Slots";
import {
  Alert,
  Button,
  DatePicker,
  FloatButton,
  Form,
  Input,
  Modal,
  message,
} from "antd";

const Dashboard = ({ currentUserID, currentUserRole }) => {
  const [slots, setSlots] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  const authApi = useAxiosPrivate();

  const getSlots = async () => {
    try {
      const response = await authApi.get("/slots/search/all");
      setSlots(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const isAuthorizedModifier = () => {
    if (
      currentUserRole === "SERVICE_MANAGER" ||
      currentUserRole === "GARAGE_OWNER"
    )
      return false;
    return true;
  };
  useEffect(() => {
    getSlots();
  }, []);
  const handleCreatingSlot = async (data) => {
    setIsCreating(false);
    const formattedStartTime = data?.startTime
      ? data.startTime.format("YYYY-MM-DD HH:mm:ss")
      : "";
    const formattedEndTime = data?.endTime
      ? data.endTime.format("YYYY-MM-DD HH:mm:ss")
      : "";
    const maxCapacity = data?.maxCapacity;

    const slotData = {
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      maxCapacity: maxCapacity,
    };
    try {
      const response = await authApi.post(
        `/slots/create/${currentUserID}`,
        slotData
      );
      message.success(response.data);
      await getSlots();
    } catch (error) {
      message.error("Couldnt crEATE SLOT");
    }
  };

  return (
    <div>
      {isAuthorizedModifier() && (
        <Alert
          message="You need role to create ,modify ,delete slots. Contact garage owner to get authorization"
          type="warning"
          showIcon
          style={{
            textAlign: "center",
            wordSpacing: "2px",
            color: "red",
            fontSize: "30px",
          }}
          closable
        />
      )}
      <Button
        disabled={isAuthorizedModifier()}
        onClick={() => {
          setIsCreating(true);
        }}
        type="primary"
        shape="round"
        size="large"
        icon={<PlusCircleTwoTone />}
        style={{
          margin: "15px",
        }}
      >
        Create slot
      </Button>
      <Slots
        slots={slots}
        getSlots={getSlots}
        isAuthorizedModifier={isAuthorizedModifier}
      />
      <Modal
        onCancel={() => {
          setIsCreating(false);
        }}
        open={isCreating}
        footer={null}
        okText={"Create"}
        cancelText={"Discard"}
        title={"Create Slot:"}
      >
        <Form onFinish={handleCreatingSlot}>
          <Form.Item
            name={"startTime"}
            label="Start Time"
            rules={[{ required: true, message: "Date canot be empty" }]}
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              name={"startTime"}
            />
          </Form.Item>
          <Form.Item
            name={"endTime"}
            label="End Time"
            rules={[{ required: true, message: "Date canot be empty" }]}
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              name={"endTime"}
            />
          </Form.Item>

          <Form.Item
            name={"maxCapacity"}
            label="Max Capacity"
            rules={[
              { required: true, message: "max capacity cant  be empty" },
              { pattern: /^[0-9]+$/, message: "please enter a number" },
            ]}
          >
            <Input required name="maxCapacity" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <Button danger onClick={() => setIsCreating(false)}>
            Discard
          </Button>
        </Form>
      </Modal>
      <FloatButton.BackTop />
    </div>
  );
};

export default Dashboard;
