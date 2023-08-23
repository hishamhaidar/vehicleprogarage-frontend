import { useState } from "react";
import { Button, DatePicker, Form, Input, Modal, Table, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "../App.css";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import moment from "moment";

const Slots = ({ slots, getSlots, isAuthorizedModifier }) => {
  const authApi = useAxiosPrivate();
  const [editedSlot, setEditedSlot] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (slot) => {
    setIsEditing(true);
    setEditedSlot(slot);
  };

  const handleDelete = (slot) => {
    setIsDeleting(true);
    setEditedSlot(slot);
  };
  const confirmDelete = async () => {
    setIsDeleting(false);
    try {
      const response = await authApi.delete(
        `/slots/delete/${editedSlot.slotID}`
      );
      message.success("Slot deleted successfully");
      await getSlots();
    } catch (err) {
      message.error(err.data);
    }
  };

  const columns = [
    {
      title: "Slot ID",
      dataIndex: "slotID",
      key: "slotID",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },

    {
      title: "Current Capacity",
      dataIndex: "currCapacity",
      key: "currCapacity",
    },
    {
      title: "Max Capacity",
      dataIndex: "maxCapacity",
      key: "maxCapacity",
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <span className="SlotsTableActions">
          <Button
            disabled={isAuthorizedModifier()}
            type="primary"
            onClick={() => {
              handleEdit(record);
            }}
          >
            <EditOutlined />
          </Button>
          <Button
            disabled={isAuthorizedModifier()}
            danger
            onClick={() => handleDelete(record)}
          >
            <DeleteOutlined />
          </Button>
        </span>
      ),
    },
  ];
  const handleSavingEditiedSlot = async (data) => {
    try {
      const userID = editedSlot?.userID;

      const formattedStartTime = moment(editedSlot?.startTime).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      const formattedEndTime = moment(editedSlot?.endTime).format(
        "YYYY-MM-DD HH:mm:ss"
      );

      const editRequest = {
        startTime: formattedStartTime,
        endTime: formattedEndTime,
        maxCapacity: editedSlot.maxCapacity,
      };

      setIsEditing(false);
      const response = await authApi.put(
        `/slots/edit/${userID}/${editedSlot?.slotID}`,
        editRequest
      );

      message.success("Successful edit");
      await getSlots();
    } catch (err) {
      message.error(err.data);
    }
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={slots.map((slot) => ({ ...slot, key: slot.slotID }))}
      />
      <Modal
        title="Edit slot"
        open={isEditing}
        onCancel={() => setIsEditing(false)}
        footer={null}
      >
        <Form onFinish={handleSavingEditiedSlot}>
          <Form.Item label="Slot ID">
            <Input name="slotID" disabled value={editedSlot?.slotID} />
          </Form.Item>
          <Form.Item label="Start Time">
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              value={moment(editedSlot?.startTime)}
              onChange={(date) =>
                setEditedSlot((prev) => ({
                  ...prev,
                  startTime: date ? date.format("YYYY-MM-DD HH:mm:ss") : null,
                }))
              }
            />
          </Form.Item>
          <Form.Item label="End Time">
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              value={moment(editedSlot?.endTime)}
              onChange={(date) =>
                setEditedSlot((prev) => ({
                  ...prev,
                  endTime: date ? date.format("YYYY-MM-DD HH:mm:ss") : null,
                }))
              }
            />
          </Form.Item>

          <Form.Item label="Max Capacity">
            <Input
              name="maxCapacity"
              value={editedSlot?.maxCapacity}
              onChange={(e) =>
                setEditedSlot((pre) => {
                  return { ...pre, maxCapacity: e.target.value };
                })
              }
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <Button danger onClick={() => setIsEditing(false)}>
            Discard
          </Button>
        </Form>
      </Modal>
      <Modal
        title="Confirm Deletion"
        okText="YES"
        open={isDeleting}
        onCancel={() => setIsDeleting(false)}
        onOk={confirmDelete}
      >
        <p>Are you sure you want to delete this slot?</p>
      </Modal>
    </div>
  );
};

export default Slots;
