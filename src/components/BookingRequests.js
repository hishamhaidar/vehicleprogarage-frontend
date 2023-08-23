import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Bookings from "./Bookings";
import { FloatButton, message } from "antd";

const BookingRequests = () => {
  const [bookings, setBookings] = useState([]);
  const authApi = useAxiosPrivate();
  const getBookings = async () => {
    try {
      const response = await authApi.get("/booking/viewall");
      setBookings(response.data);
    } catch (err) {
      message.error(err?.response?.data);
    }
  };
  useEffect(() => {
    getBookings();
  }, []);
  return (
    <div>
      <h2>Booking Requests</h2>
      <Bookings bookings={bookings} getBookings={getBookings} />
      <FloatButton.BackTop />
    </div>
  );
};

export default BookingRequests;
