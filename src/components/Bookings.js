import React, { useState } from "react";
import { Button, Table, message } from "antd";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const Bookings = ({ bookings, getBookings }) => {
  const authApi = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const handleConfirm = async (bookingID) => {
    try {
      setLoading(true);
      await authApi.put(`/booking/confirm/${bookingID}`);
      message.success("Booking succesfully Confirmed");
      await getBookings();
    } catch (error) {
      message.error("failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDeny = async (bookingID) => {
    try {
      setLoading(true);
      await authApi.put(`/booking/deny/${bookingID}`);
      message.success("Booking succesfully denied");
      await getBookings();
    } catch (error) {
      message.error("failed");
    } finally {
      setLoading(false);
    }
  };
  const columns = [
    {
      title: "Booking ID",
      dataIndex: "bookingID",
      key: "bookingID",
    },
    {
      title: "Slot ID",
      dataIndex: "slotID",
      key: "slotID",
    },
    {
      title: "Booking Status",
      dataIndex: "bookingStatus",
      key: "bookingStatus",
      render: (_, record) => (
        <span
          style={{
            color:
              record.bookingStatus === "CONFIRMED"
                ? "green"
                : record.bookingStatus === "DENIED"
                ? "red"
                : "aqua",
          }}
        >
          {record.bookingStatus}
        </span>
      ),
    },
    {
      title: "Vehicle ID",
      dataIndex: "vehicleID",
      key: "vehicleID",
    },
    {
      title: "Case",
      dataIndex: "vehicleProblem",
      key: "vehicleProblem",
    },
    {
      title: "Client Email",
      dataIndex: "clientEmail",
      key: "clientEmail",
    },
    {
      title: "Client Full Name",
      dataIndex: "clientFullName",
      key: "clientFullName",
    },

    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div>
          {record.bookingStatus === "PENDING" && !loading && (
            <Button
              style={{ backgroundColor: "green", marginRight: "5px" }}
              type="primary"
              onClick={() => handleConfirm(record.bookingID)}
            >
              Confirm
            </Button>
          )}
          {record.bookingStatus === "PENDING" && !loading && (
            <Button danger onClick={() => handleDeny(record.bookingID)}>
              Deny
            </Button>
          )}
        </div>
      ),
    },
  ];
  const dataWithKeys = bookings.map((booking) => ({
    ...booking,
    key: booking.bookingID,
  }));
  return <Table columns={columns} dataSource={dataWithKeys} />;
};

export default Bookings;
