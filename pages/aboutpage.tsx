import Image from "next/image";
import CupandbeansImg from "../public/cupandbeans.webp";
import RoastingImg from "../public/roasting.webp";
import WoodImg from "../public/wood.webp";
import CoffeeBerriesImg from "../public/coffeeBerries.webp";
import MapImg from "../public/map2.png";
import Button from "../components/Button";

const aboutpage = () => {
  return (
    <>
      <div id="story" className="relative -top-28"></div>
      <h2 className="my-8 text-center text-3xl font-semibold text-green-900 lg:my-20">
        Our Story
      </h2>
      <div className="container mx-auto w-full px-5">
        <div className="my-12 flex flex-col md:my-24 md:flex-row-reverse">
          <div className="flex-1 md:px-12">
            <h3 className="m-5 text-center text-lg font-semibold text-gray-600 first-letter:text-2xl first-letter:text-green-900 md:mt-0 md:text-left">
              How we started our business.
            </h3>
            <p className="mb-5 rounded-lg bg-gray-200 p-5 md:mb-0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
              obcaecati eius repellendus ducimus quasi voluptates numquam
              corporis placeat suscipit itaque minima, culpa aliquid incidunt,
              aspernatur quo perspiciatis doloremque. Reprehenderit asperiores
              repudiandae ullam perferendis mollitia laborum, repellendus
              necessitatibus pariatur illo fugit obcaecati iste distinctio nemo
              doloremque aliquid officiis eveniet sequi culpa.
            </p>
          </div>
          <div className="flex-1">
            <div className="relative overflow-hidden rounded-lg border border-green-900 shadow-md">
              <Image
                src={RoastingImg}
                alt=""
                className="h-full w-full object-contain"
                placeholder="blur"
              />
            </div>
          </div>
        </div>
        <div className="my-12 flex flex-col md:my-24 md:flex-row">
          <div className="flex-1 md:px-12">
            <h3 className="m-5 text-center text-lg font-semibold text-gray-600 first-letter:text-2xl first-letter:text-green-900 md:mt-0 md:text-right">
              Goals to achieve.
            </h3>
            <p className="mb-5 rounded-lg bg-gray-200 p-5 md:mb-0 md:text-right">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
              obcaecati eius repellendus ducimus quasi voluptates numquam
              corporis placeat suscipit itaque minima, culpa aliquid incidunt,
              aspernatur quo perspiciatis doloremque. Reprehenderit asperiores
              repudiandae ullam perferendis mollitia laborum, repellendus
              necessitatibus pariatur illo fugit obcaecati iste distinctio nemo
              doloremque aliquid officiis eveniet sequi culpa.
            </p>
          </div>
          <div className="flex-1">
            <div className="relative overflow-hidden rounded-lg border border-green-900 shadow-md">
              <Image
                src={WoodImg}
                alt=""
                className="h-full w-full object-contain"
                placeholder="blur"
              />
            </div>
          </div>
        </div>
        <div className="my-12 flex flex-col md:my-24 md:flex-row-reverse">
          <div className="flex-1 md:px-12">
            <h3 className="m-5 text-center text-lg font-semibold text-gray-600 first-letter:text-2xl first-letter:text-green-900 md:mt-0 md:text-left">
              From now on.
            </h3>
            <p className="mb-5 rounded-lg bg-gray-200 p-5 md:mb-0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
              obcaecati eius repellendus ducimus quasi voluptates numquam
              corporis placeat suscipit itaque minima, culpa aliquid incidunt,
              aspernatur quo perspiciatis doloremque. Reprehenderit asperiores
              repudiandae ullam perferendis mollitia laborum, repellendus
              necessitatibus pariatur illo fugit obcaecati iste distinctio nemo
              doloremque aliquid officiis eveniet sequi culpa.
            </p>
          </div>
          <div className="flex-1">
            <div className="relative overflow-hidden rounded-lg border border-green-900 shadow-md">
              <Image
                src={CupandbeansImg}
                alt=""
                className="h-full w-full object-contain"
                placeholder="blur"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container relative mx-auto w-full ">
        <div id="sources" className="relative -top-28"></div>
        <h2 className="mt-20 mb-20 text-center text-3xl font-semibold text-green-900 sm:mt-32 xl:mt-44">
          Coffee Sources
        </h2>
        <div className="relative mx-auto h-[28rem] w-full overflow-hidden bg-black shadow-md sm:h-full md:w-2/3 md:rounded-lg md:border md:border-green-900 lg:w-1/2">
          <div className="h-full w-full opacity-40 ">
            <Image
              src={CoffeeBerriesImg}
              alt=""
              className="h-full w-full object-cover"
              placeholder="blur"
            />
          </div>
          <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-start p-10 text-white">
            <h3 className="mb-5 text-center text-lg font-semibold first-letter:text-2xl first-letter:text-green-600">
              Best from around the world.
            </h3>
            <p className="mb-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
              dolorum quod eveniet maxime facere nisi recusandae, maiores
              architecto culpa tenetur, assumenda voluptates pariatur saepe!
            </p>
            <div className="mx-auto mt-auto">
              <Button wide>Learn More</Button>
            </div>
          </div>
        </div>
        <div className="absolute left-0 bottom-0 -z-10 hidden  w-full items-center justify-center md:flex">
          <div className="w-full opacity-30 lg:w-3/4">
            <Image src={MapImg} alt="" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </>
  );
};

export default aboutpage;
