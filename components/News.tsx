import Image from "next/image";
import RoastingImg from "../public/roasting.webp";
import TakeoutImg from "../public/takeout.webp";
import ColdbrewImg from "../public/coldbrew.webp";
import { format } from "date-fns";
import Link from "next/link";

const News = () => {
  const date = new Date();

  return (
    <div className="container mx-auto mb-12 md:mb-28">
      <h2 className="my-12 text-center text-2xl font-semibold text-green-900 md:my-20 md:text-3xl">
        News
      </h2>
      <div className="mx-auto flex w-4/5 flex-col items-center justify-between space-y-5 sm:w-full md:flex-row md:space-y-0 md:space-x-5 ">
        <div className="relative h-72 w-full overflow-hidden rounded-lg bg-black shadow-md transition-all duration-500 ease-in-out hover:scale-105  sm:max-w-md">
          <Link href="#">
            <div className="h-full w-full border border-green-900 opacity-50">
              <Image
                src={RoastingImg}
                alt="News image 1"
                placeholder="blur"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="absolute left-0 top-0 flex h-full flex-col justify-between p-5 text-white">
              <div className="text-sm text-gray-200">
                {format(date.setDate(date.getDate() - 1), "MMMM do yyyy")}
              </div>
              <p className=" font-semibold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit,
                nostrum maiores molestiae id corporis repudiandae beatae animi
                aperiam porro itaque!
              </p>
              <div className="w-max text-sm text-gray-200">
                Read More &rarr;
              </div>
            </div>
          </Link>
        </div>
        <div className="relative h-72 w-full overflow-hidden rounded-lg bg-black shadow-md transition-all duration-500 ease-in-out hover:scale-105  sm:max-w-md">
          <Link href="#">
            <div className="h-full w-full border border-green-900 opacity-50">
              <Image
                src={TakeoutImg}
                alt="News image 2"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="absolute left-0 top-0 flex h-full flex-col justify-between p-5 text-white">
              <div className="text-sm text-gray-200">
                {format(date.setDate(date.getDate() - 3), "MMMM do yyyy")}
              </div>
              <p className=" font-semibold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit,
                nostrum maiores molestiae id corporis repudiandae beatae animi
                aperiam porro itaque!
              </p>
              <div className="w-max text-sm text-gray-200">
                Read More &rarr;
              </div>
            </div>
          </Link>
        </div>
        <div className="relative h-72 w-full overflow-hidden rounded-lg bg-black shadow-md transition-all duration-500 ease-in-out hover:scale-105  sm:max-w-md">
          <Link href="#">
            <div className="h-full w-full border border-green-900 opacity-50">
              <Image
                src={ColdbrewImg}
                alt="News image 3"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="absolute left-0 top-0 flex h-full flex-col justify-between p-5 text-white">
              <div className="text-sm text-gray-200">
                {format(date.setDate(date.getDate() - 5), "MMMM do yyyy")}
              </div>
              <p className=" font-semibold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit,
                nostrum maiores molestiae id corporis repudiandae beatae animi
                aperiam porro itaque!
              </p>
              <div className="w-max text-sm text-gray-200">
                Read More &rarr;
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default News;
