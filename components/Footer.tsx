import Link from "next/link";
import { BsInstagram, BsFacebook, BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="bottom-0 mt-32 h-[28rem] w-full bg-green-900">
      <div className="container mx-auto flex w-full flex-col justify-between sm:flex-row">
        <div className="m-5 flex text-slate-300 md:m-12">
          <div className="mx-5 mb-12 md:mx-12">
            <div className="mb-5 text-lg font-semibold text-white">
              <Link href="/shop">Shop</Link>
            </div>
            <ul className="flex flex-col space-y-3">
              <li className="transition-all duration-200 ease-in-out hover:text-white">
                <Link href="/shop#coffee">Coffee</Link>
              </li>
              <li className="transition-all duration-200 ease-in-out hover:text-white">
                <Link href="/shop#capsules">Coffee Capsules</Link>
              </li>
              <li className="transition-all duration-200 ease-in-out hover:text-white">
                <Link href="/shop#tools">Tools</Link>
              </li>
              <li className="transition-all duration-200 ease-in-out hover:text-white">
                <Link href="/shop#merchandise">Merchandise</Link>
              </li>
            </ul>
          </div>
          <div className="mx-5 md:mx-12">
            <div className="mb-5 text-lg font-semibold text-white">
              <Link href="/aboutpage">About</Link>
            </div>
            <ul className="flex flex-col space-y-3">
              <li className="transition-all duration-200 ease-in-out hover:text-white">
                <Link href="/aboutpage#story">Our Story</Link>
              </li>
              <li className="transition-all duration-200 ease-in-out hover:text-white">
                <Link href="/aboutpage#sources">Coffee Sources</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="m-5 text-white md:m-12">
          <ul className="m-5 flex flex-row space-x-8 text-2xl sm:m-0">
            <li>
              <Link
                href="#"
                className="transition-all duration-200 ease-in-out hover:text-green-600"
              >
                <BsInstagram />
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="transition-all duration-200 ease-in-out hover:text-green-600"
              >
                <BsFacebook />
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="transition-all duration-200 ease-in-out hover:text-green-600"
              >
                <BsTwitter />
              </Link>
            </li>
          </ul>
          <div className="m-5 flex text-slate-300 sm:m-0 sm:mt-5">
            Copyright &copy; {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
