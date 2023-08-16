import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Bookings from "./Bookings";

const BookingRequests = () => {
  const [bookings, setBookings] = useState([]);
  const authApi = useAxiosPrivate();
  const getBookings = async () => {
    try {
      const response = await authApi.get("/booking/viewall");
      console.log(response.data);
      setBookings(response.data);
    } catch (err) {}
  };
  useEffect(() => {
    getBookings();
  }, []);
  return (
    <div>
      <h2>Booking Requests</h2>
      <Bookings bookings={bookings} getBookings={getBookings} />
    </div>
  );
};

export default BookingRequests;
