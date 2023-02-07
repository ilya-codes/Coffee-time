import React, { useState } from "react";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../redux/CartSlice";
import { RootState } from "../redux/Store";
import { db } from "../utils/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  getDocs,
  query,
  where,
  arrayUnion,
  doc,
} from "firebase/firestore";
import Image from "next/image";
import PaymentImg from "../public/payment.webp";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const checkout = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmitCart = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (cart.length === 0) return;

      const customer = query(
        collection(db, "cart"),
        where("email", "==", email)
      );

      const querySnapshot = await getDocs(customer);
      const collectionRef = collection(db, "cart");

      if (querySnapshot.docs.length) {
        const docRef = doc(db, "cart", querySnapshot.docs[0].id);
        await updateDoc(docRef, {
          cartItems: arrayUnion(...cart),
          total: getTotal().totalPrice,
        });
      } else {
        await addDoc(collectionRef, {
          name: name,
          email: email,
          address: address,
          cartItems: [...cart],
          total: getTotal().totalPrice,
        });
      }

      setName("");
      setEmail("");
      setAddress("");
      setIsSubmitted(true);
      toast.success("Thank you for your purchase!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      dispatch(emptyCart());
      setTimeout(() => {
        router.push("/");
      }, 200);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    cart.forEach((item) => {
      totalQuantity += item.quantity;
      totalPrice += item.price * item.quantity;
    });
    return { totalPrice, totalQuantity };
  };

  return (
    <>
      <div className="container relative -top-40 mx-auto overflow-hidden">
        <div
          className={`${
            isSubmitted && "translate-y-[100%] opacity-0"
          } mx-auto flex max-w-4xl flex-col justify-between rounded-lg bg-white p-8 shadow-md transition-all duration-500 ease-in-out md:flex-row-reverse`}
        >
          <div className=" flex flex-1 flex-col p-3 text-center leading-relaxed">
            <h3 className="mb-5 text-lg leading-loose">
              You have selected{" "}
              <span className="text-lg font-semibold text-green-900">
                {getTotal().totalQuantity}
              </span>{" "}
              items <br /> on total sum of{" "}
              <span className="text-lg font-semibold text-green-900">
                &pound;{getTotal().totalPrice}
              </span>{" "}
            </h3>
            <p>Please enter your contact information and payment method</p>
            <div className="relative mx-auto mt-5 w-40 overflow-hidden md:w-60">
              <Image
                src={PaymentImg}
                alt=""
                className="h-full object-contain"
              />
            </div>
          </div>
          <form
            onSubmit={handleSubmitCart}
            className="flex flex-1 flex-col md:mr-10"
          >
            <label className="my-3 flex flex-col">
              <span className="ml-5 mb-2 font-semibold text-green-900">
                Full Name
              </span>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                type="text"
                placeholder="Full Name"
                className=" rounded-lg border border-green-900 bg-slate-50 p-3 shadow-inner outline-none"
              />
            </label>
            <label className="my-3 flex flex-col">
              <span className="ml-5 mb-2 font-semibold text-green-900">
                Email Address
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
            <label className="my-3 flex flex-col pb-5">
              <span className="ml-5 mb-2 font-semibold text-green-900">
                Address
              </span>
              <textarea
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                required
                placeholder="Address"
                className="h-20 w-full resize-none overflow-auto rounded-lg border border-green-900 bg-slate-50 p-3 shadow-inner outline-none"
              ></textarea>
            </label>
            <Button dark center type="submit">
              Buy
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default checkout;
