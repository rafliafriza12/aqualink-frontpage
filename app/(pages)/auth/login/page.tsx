"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuth } from "@/app/hooks/UseAuth";

const Login = () => {
  const { auth, login, logout } = useAuth();
  const navigation = useRouter();
  return (
    <div>
      {auth.isAuthenticated ? (
        <div>
          {/* <p>Welcome, {auth.user?.name}!</p>
          <p> {auth.isAuthenticated ? "is Authenticate" : "not"}!</p> */}
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button
          onClick={() => {
            login({
              user: { id: "1", name: "John Doe", email: "john@example.com" },
              token: "exampleAccessToken",
            });
            navigation.replace("/");
          }}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Login;
