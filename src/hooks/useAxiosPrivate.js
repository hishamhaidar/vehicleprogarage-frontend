import { axiosPrivate } from "../api/AxiosConfig";
import { useEffect } from "react";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const { auth } = useAuth();
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          const token = auth?.jwtToken;
          config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
    return axiosPrivate.interceptors.request.eject(requestIntercept);
  }, [auth]);
  return axiosPrivate;
};

export default useAxiosPrivate;
