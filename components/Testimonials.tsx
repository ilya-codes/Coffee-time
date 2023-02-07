import Image from "next/image";
import { useEffect, useState } from "react";
import { BsFillStarFill } from "react-icons/bs";

const Stars = () => {
  const [stars, setStars] = useState<React.ReactNode>([]);

  useEffect(() => {
    function getRandomInt(min: number, max: number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    }

    setStars(
      Array(getRandomInt(3, 5))
        .fill(0)
        .map((_, i) => <BsFillStarFill key={i} />)
    );
  }, []);
  return <>{stars}</>;
};

const Testimonials = ({ customersData }: any) => {
  return (
    <div className="container mx-auto">
      <h2 className="my-12 text-center text-2xl font-semibold text-green-900 md:my-20 md:text-3xl">
        What Our Clients Say
      </h2>
      <div className="mx-auto flex w-4/5 flex-col flex-wrap justify-center space-y-5 lg:w-full lg:flex-row lg:space-x-5 lg:space-y-0">
        {customersData.results.map((customer: any, i: number) => (
          <div
            key={customer.id?.value || i}
            className="flex flex-1 flex-col justify-between overflow-hidden rounded-lg bg-white p-5 shadow-md"
          >
            <div className="mb-3 flex">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-green-900">
                <Image
                  src={customer.picture.medium}
                  alt="User image"
                  width={60}
                  height={60}
                  className="object-cover"
                />
              </div>
              <div className="ml-3">
                <h3 className="font-semibold">{`${customer.name.first} ${customer.name.last}`}</h3>
                <p className="text-sm text-gray-500">{`From ${customer.location.country} ${customer.location.city}`}</p>
              </div>
            </div>
            <p className="overflow-auto text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt
              voluptate voluptas libero sit, cum rerum!
            </p>
            <div className="mt-5 flex space-x-1 text-yellow-400">
              <Stars />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
