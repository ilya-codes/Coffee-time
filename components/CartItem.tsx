import React from "react";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";
import {
  removeItem,
  incrementQuantity,
  decrementQuantity,
} from "../redux/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Store";

export interface CartItemProps {
  id: number;
  name: string;
  price: number;
  image: any;
  quantity?: number;
}

const CartItem = ({ id, name, price, image }: CartItemProps) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const getItemQuantity = (id: number) => {
    return cart.find((item) => item.id === id)?.quantity || 0;
  };

  return (
    <div
      className={`${
        cart.length > 1 ? "h-full" : "h-min"
      } relative flex flex-col divide-y-2 rounded-lg bg-white shadow-md sm:flex-row sm:divide-x-2 sm:divide-y-0`}
    >
      <div className="flex flex-1 flex-col justify-between p-5">
        <div className="relative h-36 overflow-hidden sm:h-28">
          <Image
            src={image}
            alt="Cart Item"
            fill
            sizes="(max-width: 768px) 250px,
            500px"
            className="h-full object-contain"
          />
        </div>
        <div className="mt-3 flex flex-col space-y-2 text-center">
          <h3 className="text-md font-semibold text-green-900">{name}</h3>
          <div className="text-sm">
            <div className="my-3 flex items-center justify-center text-sm">
              <span className="mr-2">Quantity:</span>
              <div className="flex items-center space-x-2">
                <div
                  onClick={() => dispatch(decrementQuantity(id))}
                  className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg border border-green-900 font-semibold text-green-900 transition-all duration-200 ease-in-out hover:bg-green-900 hover:text-white"
                >
                  <span>-</span>
                </div>
                <div className="w-2 font-semibold">{getItemQuantity(id)}</div>
                <div
                  onClick={() => dispatch(incrementQuantity(id))}
                  className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg border border-green-900 font-semibold text-green-900 transition-all duration-200 ease-in-out hover:bg-green-900 hover:text-white"
                >
                  <span>+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="m-5 flex items-end justify-end pt-5 sm:w-3/4">
        <RxCross1
          className="absolute top-5 right-5 cursor-pointer text-lg text-green-900 "
          onClick={() => dispatch(removeItem(id))}
        />
        Price:
        <span className="ml-2 font-semibold">
          &pound;{price * getItemQuantity(id) || price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
