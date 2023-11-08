/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { User } from "../Profile";
import MyAppBar from "../../components/MyAppBar";
import { logOut } from "../../stores/slices/authSlice";
import { useAppDispatch } from "../../hooks/useStore";

const Admin = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatcher = useAppDispatch();
  const [user, setUser] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      const res = await axiosPrivate(`/users`);
      setUser(res.data);
      console.log(res.data);
    })();
  }, []);

  const signOut = async () => {
    dispatcher(logOut());
    await axiosPrivate.post("/auth/logout");
  };

  return (
    <>
      <MyAppBar signOut={signOut} />
      <div className="bg-gray-50 min-h-screen">
        <div>
          <div className="p-4">
            <div className="bg-white p-4 rounded-md">
              <div>
                <h2 className="mb-4 text-xl font-bold text-gray-700">
                  Admin & User
                </h2>
                <div>
                  <div>
                    <div className="flex justify-between bg-gradient-to-tr from-green-800 to-green-600 rounded-md py-2 px-4 text-white font-bold text-md">
                      <div>
                        <span>Name</span>
                      </div>
                      <div>
                        <span>Email</span>
                      </div>
                      <div>
                        <span>Role</span>
                      </div>
                      <div>
                        <span>Time</span>
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
                          <div className="px-2 flex">
                            <span>{item.name}</span>
                          </div>
                          <div>
                            <span>{item.email}</span>
                          </div>
                          <div className="">
                            <span>
                              {item.role.Admin} {item.role.User}
                            </span>
                          </div>
                          <div className="px-2">
                            <span>28/12/2021</span>
                          </div>
                          <div className="px-2">
                            <select>
                              <option>Admin</option>
                              <option>User</option>
                            </select>
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
      a
    </>
  );
};

export default Admin;
