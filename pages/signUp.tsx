import React, { useState } from "react";
import Button from "../components/Button";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const signUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = (e: any) => {
    e.preventDefault();

    if (password.length < 6 || email === "admin@admin.com") {
      toast.error("Something went wrong!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("New user has been registered!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
        router.push("/login");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
      });
  };

  return (
    <>
      <div className="container relative -top-32 mx-auto h-[26rem] w-3/4 md:w-full">
        <div className="mx-auto flex max-w-lg flex-col rounded-lg bg-white py-5 px-5 shadow-md sm:px-10">
          <h3 className="mb-5 text-center text-lg font-semibold text-green-900">
            Register New User
          </h3>
          <form className="flex flex-1 flex-col" onSubmit={handleSignUp}>
            <label className="my-3 flex flex-col">
              <span className="ml-5 mb-2 font-semibold text-green-900">
                Email
              </span>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                type="email"
                placeholder="email@email.com"
                className=" rounded-lg border border-green-900 bg-slate-50 p-3 shadow-inner outline-none"
              />
            </label>
            <label className="mt-3 mb-12 flex flex-col">
              <span className="ml-5 mb-2 font-semibold text-green-900">
                Password
              </span>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                minLength={6}
                type="text"
                placeholder="Password"
                className=" rounded-lg border border-green-900 bg-slate-50 p-3 shadow-inner outline-none"
              />
            </label>
            <Button dark center type="submit">
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default signUp;
