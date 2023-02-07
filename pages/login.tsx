import React, { useState } from "react";
import Button from "../components/Button";
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logIn, adminLogIn } from "../redux/AuthSlice";
import { RootState } from "../redux/Store";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);

  if (isAdmin) router.push("/admin");
  if (isLoggedIn) router.push("/dashboard");

  const handleLogin = (e: any) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        if (
          email === process.env.NEXT_PUBLIC_ADMIN_EMAIL &&
          password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
        ) {
          dispatch(adminLogIn());
        } else {
          dispatch(logIn(email));
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Email or password is not correct", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
      });
  };

  const showHint = () => {
    toast.info(
      "Try email: 'admin@admin.com' password: 'adminpass' to access admin page.",
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 12000,
      }
    );
  };

  return (
    <>
      <div className="container relative -top-32 mx-auto h-[26rem] w-3/4 md:w-full">
        <div className="mx-auto flex max-w-lg flex-col rounded-lg bg-white py-5 px-5 shadow-md sm:px-10">
          <h3 className="mb-5 text-center text-lg font-semibold text-green-900">
            Log In
          </h3>
          <form className="flex flex-1 flex-col" onSubmit={handleLogin}>
            <label className="my-3 flex flex-col">
              <span className="ml-5 mb-2 font-semibold text-green-900">
                Email
              </span>
              <input
                onChange={(e) => setEmail(e.target.value)}
                onClick={showHint}
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
              Log In
            </Button>
          </form>
          <Link
            href="/signUp"
            className="mt-8 text-center text-sm text-green-900"
          >
            Have no account yet? Click here to{" "}
            <span className="font-semibold">Sign Up</span>!
          </Link>
        </div>
      </div>
    </>
  );
};

export default login;
