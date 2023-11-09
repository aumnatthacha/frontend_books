import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../apis/axios";

export interface Form {
  username: string;
  password: string;
  name: string;
  email: string;
  role?: {
    User: string;
  };
  profileUrl?: string | ArrayBuffer | null;
}

const Register = () => {
  const navigation = useNavigate();
  const [formInput, setFromInput] = useState<Form>({
    username: "",
    password: "",
    name: "",
    email: "",
    role: {
      User: "USER",
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

 

  const onSubmitted = async () => {
    const formData = new FormData();
    // console.log(fileUpload);

    for (const [key, value] of Object.entries(formInput)) {
      // console.log(`${key} ${value}`);
      formData.append(key, value);
    }
  
    const res = await axios.post("/auth/register", {
      formInput
    });
    if (res.status == 200) {
      // console.log("Registered successfully");
      setFromInput({
        username: "",
        password: "",
        name: "",
        email: "",
        role: {
          User: "USER",
        },
        profileUrl: "",
      });
      navigation("/registerSuccess");
    }
  };
  // console.log(formInput.profileUrl);

  return (
    <main className="flex flex-1 flex-col drop-shadow-lg bg-white rounded-md p-3 mt-20 md:max-w-md md:mx-auto mx-5 mb-5">
      <h6 className="text-2xl font-bold text-center">Sign Up</h6>
      <div className="flex flex-col justify-center items-center mt-5">
        <img
          className="h-16 w-16 object-cover rounded-full"
          src={
            formInput.profileUrl
              ? (formInput.profileUrl as string)
              : "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
          }
          alt="Current profile photo"
        />
        <input
          type="file"
          // name="file"
          id="profile"
          className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100 my-5"
        />
      </div>

      <label htmlFor="email" className="font-bold text-lg text-neutral-500">
        Email
      </label>
      <input
        className="border-neutral-200 border-b-2 my-2  focus:outline-none focus:border-orange-500"
        type="text"
        name="email"
        id="email"
        placeholder="email@example.com"
        onChange={(e) => {
          setFromInput((value) => ({ ...value, email: e.target.value }));
        }}
      />
      <label htmlFor="username" className="font-bold text-lg text-neutral-500">
        Username
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
        type="text"
        name="password"
        id="password"
        placeholder="***************"
        onChange={(e) => {
          setFromInput((value) => ({ ...value, password: e.target.value }));
        }}
      />
      <label htmlFor="fullName" className="font-bold text-lg text-neutral-500">
        Full Name
      </label>
      <input
        className="border-neutral-200 border-b-2 focus:outline-none focus:border-orange-500 my-2"
        type="text"
        name="fullName"
        id="fullName"
        placeholder="John Smith"
        onChange={(e) => {
          setFromInput((value) => ({ ...value, name: e.target.value }));
        }}
      />
      <button
        onClick={() => {
          onSubmitted();
        }}
        type="button"
        className="mt-8 mb-5   bg-green-800 p-2 rounded-xl text-white hover:bg-green-600"
      >
        Sign up
      </button>
      <Link
        to={"/login"}
        className="text-end text-black hover:text-green-600"
      >
        Login
      </Link>
      
    </main>
  );
};

export default Register;
