import Image from "next/image";
import HeroImage from "../public/coffee4.webp";
import Button from "./Button";
import { BsInstagram, BsFacebook, BsTwitter } from "react-icons/bs";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="overflow-hidden">
      <div className="relative bg-black">
        <div className="-z-10 h-[100vh] overflow-hidden opacity-60 sm:h-[38rem]">
          <Image
            src={HeroImage}
            alt="Hero Image"
            priority
            placeholder="blur"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center  text-white sm:items-start">
          <div className="container relative mx-auto flex h-2/3 max-w-7xl flex-col items-center justify-evenly lg:items-start lg:justify-center lg:px-20">
            <div className="mb-8 flex flex-col overflow-hidden sm:mb-16">
              <h1 className="flex flex-col items-center whitespace-pre text-center text-3xl leading-loose tracking-wider text-slate-200 sm:flex-row sm:items-start md:text-4xl">
                FOR{"  "}THOSE{"  "}WHO
                <span className="mx-3 flex font-bold text-white">
                  L
                  <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 511.664 511.664"
                    className="self-center fill-green-700"
                    width="1em"
                    height="1em"
                  >
                    <g>
                      <g>
                        <path
                          d="M309.426,419.204c0-81.04-31.684-120.468-65.224-162.212c-32.436-40.368-65.968-82.092-65.968-164.304
			c0-29.456,4.164-54.984,12.828-78.848c-78.608,34.504-135.28,129.908-135.28,241.992c0,141.072,89.744,255.832,200.048,255.832
			c13.532,0,26.744-1.748,39.524-5.032c-0.5-2.22-0.388-4.608,0.484-6.896C304.982,475.656,309.426,449.316,309.426,419.204z"
                        />
                      </g>
                    </g>
                    <g>
                      <g>
                        <path
                          d="M255.83,0c-11.832,0-23.408,1.4-34.68,3.928c-0.124,0.328-0.208,0.664-0.364,0.988
			c-12.656,26.08-18.552,53.968-18.552,87.768c0,73.764,28.112,108.752,60.664,149.256c33.064,41.148,70.528,87.772,70.528,177.256
			c0,28.572-3.724,54.196-11.304,77.964c77.816-35.064,133.76-129.976,133.76-241.336C455.886,114.764,366.142,0,255.83,0z"
                        />
                      </g>
                    </g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                  </svg>
                  VE
                </span>
                COFFEE
              </h1>
            </div>
            <div className="mb-8 flex flex-col items-center space-y-8 space-x-0 sm:mb-16 sm:flex-row sm:space-x-8 sm:space-y-0">
              <Link href="/shop">
                <Button wide>Shop Now</Button>
              </Link>
            </div>
            <div className="flex space-x-5 text-2xl sm:space-x-10">
              <Link
                href="#"
                className="text-white transition-all duration-200 ease-in-out hover:text-green-600"
              >
                <BsInstagram />
              </Link>
              <Link
                href="#"
                className="text-white transition-all duration-200 ease-in-out hover:text-green-600"
              >
                <BsFacebook />
              </Link>
              <Link
                href="#"
                className="text-white transition-all duration-200 ease-in-out hover:text-green-600"
              >
                <BsTwitter />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
