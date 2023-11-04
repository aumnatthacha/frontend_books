/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { User } from "../Profile";

const Admin = () => {
  const axiosPrivate = useAxiosPrivate();
  // const navigation = useNavigate();
  const [user, setUser] = useState<User[]>([]);
  useEffect(() => {
    (async () => {
      const res = await axiosPrivate(`/users`);
      setUser(res.data);
      console.log(res.data);
    })();
  }, []);
  return (
    <div className="bg-gray-50 min-h-screen">
      <nav>
        <div className="flex justify-between items-center p-4 bg-white">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 hidden"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <div className="w-10">
              <img
                className="rounded-full"
                src="https://forbesthailand.com/wp-content/uploads/2021/08/https-specials-images.forbesimg.com-imageserve-5f47d4de7637290765bce495-0x0.jpgbackground000000cropX11699cropX23845cropY1559cropY22704.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </nav>
      <div>
        <div className="p-4">
          <div className="bg-white p-4 rounded-md">
            <div>
              <h2 className="mb-4 text-xl font-bold text-gray-700">
                Admin & User
              </h2>
              <div>
                <div>
                  <div className="flex justify-between bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-md py-2 px-4 text-white font-bold text-md">
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
  );
};

export default Admin;
