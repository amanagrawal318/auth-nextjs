"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", username: "" });
  const onLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log("Logout Success", response.data);
      toast.success("Logout successful");
      router.push("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Logout failed", error.message);
      toast.error(error.message);
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get("/api/users/currentuser");
      console.log("User found", response.data);
      setUser((user) => {
        user.email = response.data.data.email;
        user.username = response.data.data.username;
        return user;
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("User not found", error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="text-2xl h-screen font-bold flex items-center justify-center flex-col border  ">
      <h1>Profile Details </h1>
      <h3>{`Hi ${user.username}`}</h3>
      <h3>{user.email}</h3>
      <button
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
}
