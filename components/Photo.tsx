import Image from "next/image";
import p1 from "../public/p1.webp";
import p2 from "../public/p2.webp";
import p3 from "../public/p3.webp";
import p5 from "../public/p5.webp";
import p6 from "../public/p6.webp";

const Photo = () => {
  return (
    <div className="container mx-auto">
      <h2 className="my-12 text-center text-2xl font-semibold text-green-900 md:my-20 md:text-3xl">
        Photos
      </h2>
      <div className="mx-auto grid w-4/5 grid-cols-2 grid-rows-3 gap-3 sm:gap-6 lg:grid-cols-5 lg:grid-rows-2">
        <div className="relative col-span-2 overflow-hidden rounded-lg border border-green-900 shadow-md">
          <Image
            src={p2}
            alt="photo 1"
            placeholder="blur"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative overflow-hidden rounded-lg border border-green-900 shadow-md lg:row-span-2">
          <Image
            src={p1}
            alt="photo 2"
            placeholder="blur"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative overflow-hidden rounded-lg border border-green-900 shadow-md lg:col-span-2 lg:row-span-2">
          <Image
            src={p3}
            alt="photo 3"
            placeholder="blur"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative overflow-hidden rounded-lg border border-green-900 shadow-md">
          <Image
            src={p5}
            alt="photo 4"
            placeholder="blur"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative overflow-hidden rounded-lg border border-green-900 shadow-md">
          <Image
            src={p6}
            alt="photo 5"
            placeholder="blur"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Photo;
