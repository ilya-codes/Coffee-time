import CoffeeBeansImg from "../public/coffeeBeans.webp";
import Image from "next/image";

interface SecondaryHeroProps {
  children: React.ReactNode;
}

const SecondaryHero = ({ children }: SecondaryHeroProps) => {
  return (
    <div className="h-[18rem] overflow-hidden">
      <div className="relative h-full w-full bg-black">
        <div className="h-full w-full opacity-50">
          <Image
            src={CoffeeBeansImg}
            alt="Hero image 2"
            className="h-full w-full object-cover"
            placeholder="blur"
            priority
          />
        </div>
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SecondaryHero;
