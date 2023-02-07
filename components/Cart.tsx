import { HiOutlineArrowRight } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/Store";
import { toggleCart } from "../redux/CartSlice";
import CartItem from "./CartItem";
import Button from "./Button";
import { useRouter } from "next/router";

const Cart = () => {
  const isOpen = useSelector((state: RootState) => state.cart.open);
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;

    if (cart.length) {
      cart.forEach((item) => {
        totalQuantity += item.quantity;
        totalPrice += item.price * item.quantity;
      });
    }
    return { totalPrice, totalQuantity };
  };

  const handleCartToggle = () => {
    dispatch(toggleCart());
    if (isOpen) {
      document.body.classList.remove(`overflow-hidden`);
    } else {
      document.body.classList.add(`overflow-hidden`);
    }
  };

  const toCheckOut = () => {
    handleCartToggle();
    setTimeout(() => {
      router.push("/checkout");
    }, 200);
  };

  return (
    <>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } fixed top-0 left-0 z-40 h-screen w-screen bg-black opacity-60`}
      />
      <div
        className={`${
          isOpen ? "translate-x-0" : "translate-x-[100%]"
        } fixed right-0 top-0 z-50 h-full w-full bg-slate-50 pb-48 shadow-2xl transition-all duration-500 ease-in-out md:w-[40rem]`}
      >
        <HiOutlineArrowRight
          className="absolute top-5 left-5 z-50 cursor-pointer text-3xl text-green-900 transition-all duration-700 ease-in-out hover:scale-125"
          onClick={handleCartToggle}
        />
        {!cart.length && (
          <div className="my-40 w-full text-center text-2xl font-semibold leading-loose text-gray-500">
            <h3 className="mx-8">No Purchased Items Yet</h3>
          </div>
        )}
        <div
          className={`${
            cart.length < 3 ? "grid-cols-1" : "grid-cols-2 sm:grid-cols-1"
          } grid h-full w-full gap-3 overflow-y-auto p-5 sm:gap-5 sm:p-8 md:pl-16`}
        >
          {cart?.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              image={item.imgUrl}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
        <div className="fixed bottom-0 flex h-48 w-full flex-col justify-between bg-slate-50 px-8 pt-5 pb-12">
          <div className="flex items-center justify-between border-t-2 pt-3">
            <div className="text-lg font-semibold text-green-900">Total:</div>
            <div>
              <span className="mr-5 text-sm text-gray-500">
                {getTotal().totalQuantity} items
              </span>
              <span className="text-lg font-semibold">
                &pound;{getTotal().totalPrice}
              </span>
            </div>
          </div>
          {cart.length > 0 && (
            <Button dark small wide onClick={toCheckOut}>
              Continue
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
