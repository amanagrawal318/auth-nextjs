/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [emailType, setEmailType] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);
  const verifyEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", {
        token,
        emailType,
      });
      console.log(response.data);
      setUserId(response.data.userId);
      setVerified(true);
    } catch (error: any) {
      setError(error.response.data.error);
    }
  };

  const updatePassword = async () => {
    try {
      setIsPasswordUpdated(false);
      const response = await axios.post("/api/users/resetpassword", {
        userId,
        password: newPassword,
      });
      console.log(response.data);
      setIsPasswordUpdated(true);
    } catch (error: any) {
      setError(error.response.data.error);
      setIsPasswordUpdated(false);
    }
  };

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    const type = new URLSearchParams(window.location.search).get("emailType");
    console.log("urlToken", urlToken);
    console.log("emailType", type);

    setToken(urlToken || "");
    setEmailType(type || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (isPasswordUpdated) {
    return (
      <div className="flex items-center h-screen justify-center flex-col">
        <h1 className="text-green-500">
          Password have been updated successfully
        </h1>
        <p>
          proceed to{" "}
          <Link href="/login" className="hover:underline text-blue-500">
            Login
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center h-screen justify-center flex-col">
      {emailType === "VERIFY" && (
        <>
          <h1>Verify Email</h1>
          <h2>{token?.length > 0 ? "Token: " + token : "No token found"}</h2>
        </>
      )}
      {verified && (
        <h2 className="text-green-500">User verified successfully</h2>
      )}
      {emailType === "RESET" && verified && (
        <>
          <h1>Create Password</h1>
          <label htmlFor="password">New Password</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="new password"
          />
          <label htmlFor="password">Confirm Password</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="confirm-password"
            type="password"
            onChange={(e) => {
              if (e.target.value === newPassword) {
                setError("");
              } else {
                setError("Passwords do not match");
              }
            }}
            placeholder="confirm password"
          />
          <button
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            onClick={updatePassword}
          >
            Reset
          </button>
        </>
      )}
      {error && <h2 className="text-red-500">{error}</h2>}

      {!isPasswordUpdated && <Link href="/login">Login</Link>}
    </div>
  );
}
