/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material"; // เพิ่มนี้

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useAppSelector, useAppDispatch } from "../../hooks/useStore";
import { useNavigate } from "react-router-dom";
import MyAppBar from "../../components/MyAppBar";
import { logOut } from "../../stores/slices/authSlice";
import Swal from "sweetalert2";
import AnimationSkeleton from "../../components/AnimationSkeleton";

export interface User {
  [x: string]: any;
  email: string;
  name: string;
  profileUrl: string;
}

const Profile = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const dispatcher = useAppDispatch();
  const username = useAppSelector((state) => state.auth.user);
  const [user, setUser] = useState<User>({
    email: "",
    name: "",
    profileUrl: "",
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axiosPrivate(`/users/${username}`);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading user:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [axiosPrivate, username]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      const updatedUser = await axiosPrivate.patch(`/users`, user);
      setUser(updatedUser.data);
      setEditing(false);
      Swal.fire({
        icon: "success",
        title: "Updated Successfully",
        text: "User information has been updated successfully.",
      });
    } catch (error) {
      console.error("Error saving changes:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to update user information.",
      });
    }
  };

  const signOut = async () => {
    dispatcher(logOut());
    await axiosPrivate.post("/auth/logout");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <>
      <MyAppBar signOut={signOut} />

      {loading && (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <CircularProgress color="success" size="lg" />
        </div>
      )}

      {loading && user.profileUrl !== "" && <AnimationSkeleton />}

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-lg p-4 rounded-md shadow-md bg-white">
          <div className="text-center mb-4">
            <img
              src={user.profileUrl}
              className="w-20 h-20 rounded-full mx-auto"
            />
            <h1 className="mt-2 text-xl font-semibold">{user.name}</h1>
            {/* <h2 className="text-sm text-gray-600">{user.username}</h2> */}
            <h2 className="text-sm text-gray-600">{user.email}</h2>
          </div>

          {editing ? (
            <div>
              <div className="mb-4">
                <label
                  htmlFor="img"
                  className="block text-gray-700 font-semibold"
                >
                  ProfileImg
                </label>
                <input
                  type="text"
                  id="profileUrl"
                  value={user.profileUrl}
                  onChange={(e) =>
                    setUser({ ...user, profileUrl: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-semibold"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-semibold"
                >
                  Gmail
                </label>
                <input
                  type="email"
                  id="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="text-center">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 font-semibold text-white bg-green-900 rounded-md hover:bg-green-500"
                >
                  Save
                </button>{" "}
                <button
                  className="px-4 py-2 font-semibold text-white bg-red-800 rounded-md hover:bg-red-500"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <button
                onClick={handleEdit}
                className="px-4 py-2 font-semibold text-white bg-green-900 rounded-md hover:bg-green-600"
              >
                Edit
              </button>{" "}
              <button
                onClick={handleCancel}
                className="px-4 py-2 font-semibold text-white bg-red-800 rounded-md hover:bg-red-500"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
