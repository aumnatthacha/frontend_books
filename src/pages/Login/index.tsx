import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../../apis/axios";
import { useAppDispatch } from "../../hooks/useStore";
import { setCredentials } from "../../stores/slices/authSlice";
import LinearProgress from "@mui/material/LinearProgress";
import "sweetalert2/dist/sweetalert2.css";
import Swal from "sweetalert2";

interface Form {
  username: string;
  password: string;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [formInput, setFormInput] = useState<Form>({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  

  const onSubmitted = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        "/auth/login",
        { ...formInput },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        dispatch(
          setCredentials({
            access_token: res.data.access_token,
            user: formInput.username,
          })
        );
        setFormInput({
          username: "",
          password: "",
        });
        navigation(from, { replace: true });
      }
    } catch (error) {
      Swal.fire("Error", "An error something.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LinearProgress />} {/* Show LinearProgress while loading */}
      <main className="flex flex-1 flex-col drop-shadow-lg bg-white rounded-md p-3 mt-20 md:max-w-md md:mx-auto mx-5">
        <h6 className="text-2xl font-bold text-center">Sign in</h6>
        <label
          htmlFor="username"
          className="font-bold text-lg text-neutral-500"
        >
          User name
        </label>
        <input
          className="border-neutral-200 border-b-2 my-2  focus:outline-none focus:border-orange-500"
          type="text"
          name="username"
          id="username"
          placeholder="User Example"
          required={true}

          onChange={(e) => {
            setFormInput((value) => ({ ...value, username: e.target.value }));
          }}
        />
        <label
          htmlFor="password"
          className="font-bold text-lg text-neutral-500"
        >
          Password
        </label>
        <input
          className="border-neutral-200 border-b-2 focus:outline-none focus:border-orange-500 my-2"
          type="password"
          name="password"
          id="password"
          placeholder="***************"
          required={true}
          onChange={(e) => {
            setFormInput((value) => ({ ...value, password: e.target.value }));
          }}
        />
        <button
          type="button"
          onClick={() => {
            onSubmitted();
          }}
          className="mt-8 mb-5   bg-green-800 p-2 rounded-xl text-white hover:bg-green-600"
          disabled={loading} // Disable the button while loading
        >
          {loading ? "loading in..." : "Login"}
        </button>
        <Link
          to={"/register"}
          className="text-end text-black hover:text-green-600"
        >
          Sign up
        </Link>
      </main>
    </>
  );
};

export default Login;
