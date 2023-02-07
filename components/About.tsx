import Image from "next/image";
import Link from "next/link";
import AboutImg from "../public/about.webp";
import Button from "./Button";

const About = () => {
  return (
    <div className="relative mx-auto -mt-20 flex w-4/5 flex-col rounded-lg bg-white p-5 shadow-md sm:w-3/4 md:w-1/2 lg:w-[65rem] lg:flex-row lg:divide-x-2">
      <div className="relative overflow-hidden rounded-lg border border-green-900 lg:mr-8 lg:flex-1">
        <Image src={AboutImg} alt="About us" className="object-cover" />
      </div>
      <div className="mt-5 flex flex-col items-center justify-between lg:mt-0 lg:flex-1 lg:pl-8">
        <h1 className="mb-5 self-center text-xl font-semibold text-green-900">
          ABOUT US
        </h1>
        <p className="mb-5 text-justify first-letter:text-xl first-letter:font-semibold first-letter:text-green-900 md:text-lg md:first-letter:text-2xl">
          We roast specialty coffee for cafes and households around the globe.
          Choose from our range of classic blends and a carefully curated range
          of brewing tools and merchandise.
        </p>

        <Link href="/aboutpage">
          <Button dark>Learn More</Button>
        </Link>
      </div>
    </div>
  );
};

export default About;
