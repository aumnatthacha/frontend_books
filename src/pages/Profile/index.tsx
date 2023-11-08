import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useAppSelector } from "../../hooks/useStore";
import { useNavigate } from "react-router-dom";

export interface User {
  _id: string;
  email: string;
  name: string;
  username: string;
  role: {
    Admin: string;
    User: string;
  };
  isAlive: boolean;
  __v: number;
}

const Profile = () => {
  const axiosPrivate = useAxiosPrivate();
  const username = useAppSelector((state) => state.auth.user);
  const [user, setUser] = useState<User>({
    _id: "",
    email: "",
    name: "",
    username: "",
    role: { Admin: "", User: "" },
    isAlive: false,
    __v: 0,
  });
  const [editing, setEditing] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await axiosPrivate(`/users/${username}`);
      setUser(res.data);
    })();
  }, [axiosPrivate, username]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      const updatedUser = await axiosPrivate.patch(`/users`, user);
      setUser(updatedUser.data);
      setEditing(false);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการบันทึกการแก้ไข:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen from-gray-700 via-gray-800 to-gray-900 bg-gradient-to-br p-10">
      <div className="relative w-full group max-w-md min-w-0 mx-auto mt-6 mb-6 break-words bg-white border shadow-2xl dark:bg-gray-800 dark:border-gray-700 md.max-w-sm rounded-xl">
        <div className="pb-6">
          <div className="flex flex-wrap justify-center">
            <div className="flex justify-center w-full">
              <div className="relative">
                <img
                  src="https://source.unsplash.com/jmURdhtm7Ng/120x120"
                  className="dark:shadow-xl border-white dark:border-gray-800 rounded-full align-middle border-8 absolute -m-16 -ml-18 lg:-ml-16 max-w-[150px]"
                />
              </div>
            </div>
          </div>
          <div className="mt-20 text-center">
            {editing ? (
              <div>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
                <input
                  type="text"
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <button onClick={handleSave}>บันทึก</button>
              </div>
            ) : (
              <div>
                <h3 className="mb-1 text-2xl font-bold leading-normal text-gray-700 dark:text-gray-300">
                  {user.name}
                </h3>
                <h3 className="mb-1 text-2xl font-bold leading-normal text-gray-700 dark:text-gray-300">
                  {user.username}
                </h3>
                <h3 className="mb-1 text-2xl font-bold leading-normal text-gray-700 dark:text-gray-300">
                  {user.email}
                </h3>
              </div>
            )}
            <div className="flex flex-row justify-around">
              <button
                className="text-black hover:scale-105"
                onClick={() => {
                  navigation(-1);
                }}
              >
                กลับ
              </button>
              {editing ? null : (
                <button
                  className="text-black hover:scale-105"
                  onClick={handleEdit}
                >
                  แก้ไข
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
