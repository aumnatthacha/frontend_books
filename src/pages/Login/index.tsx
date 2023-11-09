import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../../apis/axios";
import { useAppDispatch } from "../../hooks/useStore";
import { setCredentials } from "../../stores/slices/authSlice";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

interface Form {
  username: string;
  password: string;
}
const Login = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [formInput, setFromInput] = useState<Form>({
    username: "",
    password: "",
  });

  const onSubmitted = async () => {
    const res = await axios.post(
      "/auth/login",
      {
        ...formInput,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(res.data);

    if (res.status === 200) {
      dispatch(
        setCredentials({
          access_token: res.data.access_token,
          user: formInput.username,
        })
      );
      setFromInput({
        username: "",
        password: "",
      });
      navigation(from, { replace: true });

      // เพิ่ม SweetAlert2 เมื่อ login สำเร็จ
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back, " + formInput.username + "!",
      });
    }
  };
  return (
    <main className="flex flex-1 flex-col drop-shadow-lg bg-white rounded-md p-3 mt-20 md:max-w-md md:mx-auto mx-5">
      <h6 className="text-2xl font-bold text-center">Sign in</h6>
      <label htmlFor="username" className="font-bold text-lg text-neutral-500">
        User name
      </label>
      <input
        className="border-neutral-200 border-b-2 my-2  focus:outline-none focus:border-orange-500"
        type="text"
        name="username"
        id="username"
        placeholder="User Example"
        onChange={(e) => {
          setFromInput((value) => ({ ...value, username: e.target.value }));
        }}
      />
      <label htmlFor="password" className="font-bold text-lg text-neutral-500">
        Password
      </label>
      <input
        className="border-neutral-200 border-b-2 focus:outline-none focus:border-orange-500 my-2"
        type="password"
        name="password"
        id="password"
        placeholder="***************"
        onChange={(e) => {
          setFromInput((value) => ({ ...value, password: e.target.value }));
        }}
      />
      <button
        type="button"
        onClick={() => {
          onSubmitted();
        }}
        className="mt-8 mb-5   bg-green-800 p-2 rounded-xl text-white hover:bg-green-600"
      >
        Login
      </button>
      <Link
        to={"/register"}
        className="text-end text-black hover:text-green-600"
      >
        Sign up
      </Link>
    </main>
  );
};

export default Login;
