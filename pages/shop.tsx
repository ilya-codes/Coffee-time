import ShopItem from "../components/ShopItem";
import { db } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { InferGetStaticPropsType } from "next";
import { NextPage } from "next";

export interface shopProps {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
  isFav: boolean;
  roast?: number;
}

const shop: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  shopItems,
}) => {
  return (
    <>
      <div className="container mx-auto w-full p-5 ">
        <div>
          <div id="coffee" className="relative -top-28"></div>
          <h3 className="mx-10 mb-10 mt-5 text-2xl font-semibold text-green-900">
            Coffee
          </h3>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5">
            {shopItems
              .filter((item) => item.category === "coffee")
              .map((item) => (
                <ShopItem
                  key={item.id}
                  id={item.id}
                  category={item.category}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  imgUrl={item.imgUrl}
                  isFav={item.isFav}
                  roast={item.roast}
                />
              ))}
          </div>
        </div>
        <div>
          <div id="capsules" className="relative -top-28"></div>
          <h3
            id="capsules"
            className="mx-10 mb-10 mt-20 text-2xl font-semibold text-green-900"
          >
            Coffee Capsules
          </h3>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5">
            {shopItems
              .filter((item) => item.category === "capsules")
              .map((item) => (
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
          </div>
        </div>
        <div>
          <div id="tools" className="relative -top-28"></div>
          <h3 className="mx-10 mb-10 mt-20 text-2xl font-semibold text-green-900">
            Tools
          </h3>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5">
            {shopItems
              .filter((item) => item.category === "tools")
              .map((item) => (
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
          </div>
        </div>
        <div>
          <div id="merchandise" className="relative -top-28"></div>
          <h3 className="mx-10 mb-10 mt-20 text-2xl font-semibold text-green-900">
            Merchandise
          </h3>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5">
            {shopItems
              .filter((item) => item.category === "merchandise")
              .map((item) => (
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
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const querySnapshot = await getDocs(collection(db, "shopItems"));

  const shopItems = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as unknown as shopProps[];

  return {
    props: { shopItems },
    revalidate: 60,
  };
};

export default shop;
