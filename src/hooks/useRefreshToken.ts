import axios from "../apis/axios";
// import { AxiosError } from "axios";

import { useAppDispatch } from "./useStore";
import { setCredentials } from "../stores/slices/authSlice";

const useRefreshToken = () => {
  const dispatch = useAppDispatch();
  const refresh = async () => {
    try {
      const response = await axios("/auth/refresh", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      // console.log(response.data.access_token);
      dispatch(setCredentials({ accessToken: response.data.access_token }));
      return response.data.access_token;
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(refresh);

  return refresh;
};

export default useRefreshToken;
