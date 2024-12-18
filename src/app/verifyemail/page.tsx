/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  const verifyEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      console.log(response.data);
      setVerified(true);
    } catch (error: any) {
      setError(error.response.data.error);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="flex items-center h-screen justify-center flex-col">
      <h1>Verify Email</h1>
      <h2>{token?.length > 0 ? "Token: " + token : "No token found"}</h2>
      {verified && (
        <h2 className="text-green-500">User verified successfully</h2>
      )}
      {error && <h2 className="text-red-500">{error}</h2>}
      <Link href="/login">Login</Link>
    </div>
  );
}
