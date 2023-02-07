import { useState, useEffect } from "react";
import Link from "next/link";
import { BsCart2 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../redux/CartSlice";
import { RootState } from "../redux/Store";
import { useRouter } from "next/router";
import { adminLogOut, logOut } from "../redux/AuthSlice";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { CartItemProps } from "./CartItem";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [whiteNav, setWhiteNav] = useState(false);
  const [pos, setPos] = useState(0);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleToggleBurgerMenu = () => {
    setNavOpen(!navOpen);
    if (navOpen) {
      document.body.classList.remove(`overflow-hidden`);
    } else {
      document.body.classList.add(`overflow-hidden`);
    }
  };

  const handleCloseBurgerMenu = () => {
    if (window.innerWidth < window.innerHeight) {
      setNavOpen(false);
      document.body.classList.remove(`overflow-hidden`);
    }
  };

  const handleCartToggle = () => {
    dispatch(toggleCart());
    document.body.classList.toggle(`overflow-hidden`);
  };

  const handleLogOut = () => {
    signOut(auth);
    isAdmin ? dispatch(adminLogOut()) : dispatch(logOut());
  };

  const cart = useSelector((state: RootState) => state.cart.cart);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);

  const getTotalQuantity = () => {
    let total = 0;
    cart.forEach((item: CartItemProps) => {
      total += item.quantity!;
    });
    return total;
  };

  useEffect(() => {
    const scrollHandler = () => {
      if (!router.isReady) return;
      if (window.innerWidth < window.innerHeight) {
        if (router.pathname === "/") {
          window.scrollY > pos + 720 && setWhiteNav(true);
          window.scrollY < pos + 720 && setWhiteNav(false);
        } else {
          window.scrollY > pos + 170 && setWhiteNav(true);
          window.scrollY < pos + 170 && setWhiteNav(false);
        }
      } else {
        if (router.pathname === "/") {
          window.scrollY > pos + 550 && setWhiteNav(true);
          window.scrollY < pos + 550 && setWhiteNav(false);
        } else {
          window.scrollY > pos + 240 && setWhiteNav(true);
          window.scrollY < pos + 240 && setWhiteNav(false);
        }
      }
    };

    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [whiteNav, pos]);

  return (
    <div
      className={`${
        whiteNav
          ? "md:bg-slate-100 md:text-black"
          : "bg-transparent bg-gradient-to-b from-black to-transparent"
      } fixed top-0 left-0 z-40 flex h-24 w-full text-white transition-all duration-500 ease-in-out md:h-auto md:py-3`}
    >
      <div
        onClick={handleToggleBurgerMenu}
        className={`${whiteNav && !navOpen && "border-black"} absolute
        right-8 top-8 z-50 flex h-6 w-6 cursor-pointer flex-col justify-between transition-colors duration-300 ease-in-out hover:border-green-600 md:hidden`}
      >
        <div
          className={`border-b-2 border-inherit transition-transform duration-700 ease-in-out ${
            navOpen
              ? "translate-y-2.5 rotate-45 scale-125 "
              : "translate-y-0 rotate-0 scale-100"
          }`}
        ></div>
        <div
          className={`border-b-2 border-inherit transition-opacity duration-700 ease-in-out ${
            navOpen ? "opacity-0" : "opacity-1"
          }`}
        ></div>
        <div
          className={`border-b-2 border-inherit transition-transform duration-700 ease-in-out ${
            navOpen
              ? "-translate-y-3 -rotate-45 scale-125"
              : "-translate-y-0 -rotate-0 scale-100"
          }`}
        ></div>
      </div>
      {!navOpen && (
        <div
          className={`${whiteNav && "text-black"} ${
            router.pathname === "/checkout" && "hidden"
          } fixed top-8 left-8 flex cursor-pointer transition-colors duration-300 ease-in-out hover:text-green-600 md:hidden`}
          onClick={handleCartToggle}
        >
          <BsCart2 className="mb-1 inline text-2xl" />
          <div className="absolute -top-2 left-5 ml-1 w-4 font-semibold md:ml-0">
            {getTotalQuantity() || ""}
          </div>
        </div>
      )}
      {/* Mobile header */}
      <div
        className={`${
          whiteNav && "bg-slate-100 text-black"
        } fixed -z-10 min-w-full py-7 text-center transition-all duration-500 ease-in-out md:hidden `}
      >
        <h1 className="whitespace-nowrap text-center text-3xl font-semibold">
          <Link href="/">Coffee Time</Link>
        </h1>
      </div>
      <div
        className={`${
          navOpen ? "h-[100vh]" : "h-0"
        } container mx-auto flex max-w-7xl flex-col overflow-y-auto bg-black transition-all duration-700 ease-in-out  md:h-auto md:min-h-0 md:flex-row md:bg-transparent md:px-5`}
      >
        <div className="py-7 md:py-0">
          <h1 className="whitespace-nowrap text-center text-3xl font-semibold">
            <Link href="/" onClick={handleCloseBurgerMenu}>
              Coffee Time
            </Link>
          </h1>
        </div>

        <nav
          className={` mt-5 flex flex-1 flex-col items-center font-medium md:mt-0 md:flex-1 md:flex-row-reverse`}
        >
          <div className="border-b border-white md:border-none md:pl-5">
            <ul className="flex flex-col items-center md:flex-row">
              {isAdmin && (
                <li className="my-5 text-center transition-transform duration-300 ease-in-out first-letter:text-xl hover:translate-y-0.5 hover:text-green-600 md:my-0 md:mx-2 lg:mx-8">
                  <Link href="/admin" onClick={handleCloseBurgerMenu}>
                    Admin
                  </Link>
                </li>
              )}
              {isLoggedIn && (
                <li className="my-5 text-center transition-transform duration-300 ease-in-out first-letter:text-xl hover:translate-y-0.5 hover:text-green-600 md:my-0 md:mx-2 lg:mx-8">
                  <Link href="/dashboard" onClick={handleCloseBurgerMenu}>
                    Dashboard
                  </Link>
                </li>
              )}
              <li className="my-5 w-20 text-center transition-transform duration-300 ease-in-out first-letter:text-xl hover:translate-y-0.5 hover:text-green-600 md:my-0 md:mx-2 lg:mx-8">
                {isLoggedIn || isAdmin ? (
                  <span className="cursor-pointer" onClick={handleLogOut}>
                    Log Out
                  </span>
                ) : (
                  <Link href="/login" onClick={handleCloseBurgerMenu}>
                    Log In
                  </Link>
                )}
              </li>
              <li className="my-5 transition-transform duration-300 ease-in-out hover:translate-y-0.5 hover:text-green-600 md:my-0 md:ml-2 lg:ml-5">
                <div
                  className={`${
                    router.pathname === "/checkout" && "hidden"
                  } relative flex cursor-pointer`}
                  onClick={handleCartToggle}
                >
                  <div className="inline md:hidden">Cart</div>
                  <BsCart2 className="mb-1 hidden text-xl md:inline" />
                  <div className="ml-1 block w-4 md:ml-0 md:hidden">
                    ({getTotalQuantity() || 0})
                  </div>
                  <div className="absolute -top-2 left-5 ml-1 hidden w-4 text-sm font-semibold sm:ml-0 md:block">
                    {getTotalQuantity() || ""}
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex-1 md:px-5">
            <ul className="flex flex-col items-center md:flex-row md:justify-center">
              <li className="my-5 transition-transform duration-300 ease-in-out first-letter:text-xl hover:translate-y-0.5 hover:text-green-600 sm:mx-2 md:my-0 md:mx-5 lg:mx-12">
                <Link href="/shop" onClick={handleCloseBurgerMenu}>
                  Shop
                </Link>
              </li>
              <li className="my-5 transition-transform duration-300 ease-in-out first-letter:text-xl hover:translate-y-0.5 hover:text-green-600 sm:mx-2 md:my-0 md:mx-5 lg:mx-12">
                <Link href="/aboutpage" onClick={handleCloseBurgerMenu}>
                  About
                </Link>
              </li>
              <li className="my-5 transition-transform duration-300 ease-in-out first-letter:text-xl hover:translate-y-0.5 hover:text-green-600 sm:mx-2 md:my-0 md:mx-5 lg:mx-12">
                <Link href="/#contact" onClick={handleCloseBurgerMenu}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
