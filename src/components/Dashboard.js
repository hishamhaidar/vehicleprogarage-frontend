import React from "react";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Dashboard = () => {
  // const [slots, setSlots] = useState([]);
  // const authApi = useAxiosPrivate();
  // const getSlots = async () => {
  //   try {
  //     const response = await authApi.get("/slots/search/all");
  //     setSlots(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getSlots();
  // }, []);
  // useEffect(() => {
  //   console.log(slots); // Log the updated slots whenever it changes
  // }, [slots]);
  return <div>Dashboard</div>;
};

export default Dashboard;
