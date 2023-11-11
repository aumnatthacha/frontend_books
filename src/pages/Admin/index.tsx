import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { User } from "../Profile";
import MyAppBar from "../../components/MyAppBar";
import { logOut } from "../../stores/slices/authSlice";
import { useAppDispatch } from "../../hooks/useStore";
import CommentSkeleton from "../../components/CommentSkeleton";

const Admin = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatcher = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User[]>([]);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await axiosPrivate("/users");
        setUser(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [axiosPrivate]);

  const signOut = async () => {
    try {
      dispatcher(logOut());
      await axiosPrivate.post("/auth/logout");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleEdit = (user: User) => {
    setEditedUser(user);
  };

  const handleSaveEdit = async (editedUserData: User) => {
    try {
      console.log("Editing user with data:", editedUserData);

      const updatedUser = await axiosPrivate.patch(
        `/users/${editedUserData._id}`,
        editedUserData
      );

      console.log("Save edited user:", updatedUser);

      setEditedUser(null);
    } catch (error) {
      console.error("Error saving edit:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditedUser(null);
  };

  return (
    <>
      <MyAppBar signOut={signOut} />

      {loading && (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <CommentSkeleton />
        </div>
      )}

      <div className="bg-gray-50 min-h-screen">
        <div>
          <div className="p-4">
            {loading && <CommentSkeleton />}
            {loading && <CommentSkeleton />}
            {loading && <CommentSkeleton />}

            <div className="bg-white p-4 rounded-md">
              <div>
                <h2 className="mb-4 text-xl font-bold text-gray-700">
                  Admin & User
                </h2>
                <div>
                  <div>
                    <div className="flex justify-between bg-gradient-to-tr from-green-800 to-green-600 rounded-md py-2 px-4 text-white font-bold text-md">
                      <div>
                        <span>Profile</span>
                      </div>
                      <div>
                        <span>Email</span>
                      </div>
                      <div>
                        <span>Edit</span>
                      </div>
                    </div>
                    <div>
                      {user.map((item) => (
                        <div
                          key={item._id}
                          className="flex justify-between border-t text-sm font-normal mt-4 space-x-4"
                        >
                          <div className="px-2 flex items-center">
                            <img
                              src={item.profileUrl}
                              alt={`${item.name}'s profile`}
                              className="w-8 h-8 rounded-full mr-2"
                            />
                            <span>{item.name}</span>
                          </div>
                          <div>
                            <span>{item.email}</span>
                          </div>
                          <div className="px-2">
                            <button onClick={() => handleEdit(item)}>
                              Edit
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {editedUser && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="mb-4 text-2xl font-bold text-gray-700">Edit User</h2>
            <div className="flex flex-col space-y-4">
              <label className="flex flex-col">
                <label className="flex flex-col">
                  {editedUser.profileUrl && (
                    <img
                      src={editedUser.profileUrl}
                      alt="Profile"
                      className="w-100 h-20 rounded-full mx-auto object-cover"
                    />
                  )}
                  <span className="text-sm font-bold mb-2">Profile URL:</span>
                  <input
                    className="border rounded w-full py-2 px-3"
                    type="text"
                    value={editedUser.profileUrl || ""}
                    onChange={(e) =>
                      setEditedUser({
                        ...editedUser,
                        profileUrl: e.target.value,
                      })
                    }
                  />
                </label>

                <span className="text-sm font-bold mb-2">Name:</span>
                <input
                  className="border rounded w-full py-2 px-3"
                  type="text"
                  value={editedUser.name || ""}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, name: e.target.value })
                  }
                />
              </label>
              <label className="flex flex-col">
                <span className="text-sm font-bold mb-2">Email:</span>
                <input
                  className="border rounded w-full py-2 px-3"
                  type="text"
                  value={editedUser.email || ""}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, email: e.target.value })
                  }
                />
              </label>
            </div>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={() => handleSaveEdit(editedUser)}
                className="px-4 py-2 text-white bg-green-900 rounded-md hover:bg-green-500"
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 text-white bg-red-800 rounded-md hover:bg-red-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;
