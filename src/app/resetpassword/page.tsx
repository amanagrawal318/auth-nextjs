/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import { useState } from "react";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendResetMail = async () => {
    try {
      const response = await axios.post("/api/users/sendresetmail", { email });
      console.log(response.data);

      setMessage(
        "Mail sent successfully, please check your email to reset your password"
      );
    } catch (error: any) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className="flex items-center h-screen justify-center flex-col">
      <h1 className="text-3xl font-bold m-4">Reset Password</h1>
      <label htmlFor="email">Please Enter Your Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
          setMessage("");
        }}
        value={email}
        placeholder="email"
      />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={sendResetMail}
      >
        Send
      </button>
      {message && email && <p className="text-green-500">{message}</p>}
    </div>
  );
}
