import Carousel from "./Carousel";
import ShopItem from "./ShopItem";

const Favs = ({ favItems }: any) => {
  return (
    <div className="container mx-auto">
      <h2 className="mt-12 text-center text-2xl font-semibold text-green-900 md:mt-20 md:mb-8 md:text-3xl">
        Popular Products
      </h2>
      <div className="0 flex flex-col lg:flex-row lg:space-x-8">
        <div className="mx-auto mt-12 w-4/5 border-t border-t-green-900 p-5 sm:w-3/4 sm:flex-1 lg:w-full ">
          <h2 className="mb-8 text-center text-xl text-gray-600 md:text-left md:text-2xl">
            Best selling products selection. The easiest way to buy and save
            time.
          </h2>
          <p className="text-justify sm:w-3/4 sm:pl-5 md:text-left md:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,
            placeat aut amet quo nulla suscipit dolorem esse! Commodi
            consectetur, veniam numquam suscipit minus provident distinctio
            vitae iusto illum repudiandae nam quidem delectus dolorum corrupti
            consequatur alias explicabo sunt nihil.
          </p>
        </div>
        <div className="relative mx-auto w-4/5 md:w-[40rem] lg:mx-0">
          <Carousel fav numberOfSlides={favItems.length}>
            {favItems.map((item: any) => (
              <ShopItem
                key={item.id}
                id={item.id}
                category={item.category}
                name={item.name}
                description={item.description}
                price={item.price}
                imgUrl={item.imgUrl}
                isFav={item.isFav}
              />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Favs;
