import Image from "next/image";
import { CgCoffee } from "react-icons/cg";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import { shopProps } from "../pages/shop";
import { RootState } from "../redux/Store";
import { BsCheckLg } from "react-icons/bs";

const ShopItem = ({
  id,
  name,
  category,
  description,
  price,
  imgUrl,
  roast,
}: shopProps) => {
  const dispatch = useDispatch();
  const itemInCart = useSelector((state: RootState) =>
    state.cart.cart.find((item: any) => item.id === id)
  );

  let disabledBtn;
  if (itemInCart?.id === id) {
    disabledBtn = true;
  }

  return (
    <div className="relative flex h-full min-h-[26rem] flex-col justify-between overflow-hidden rounded-lg bg-white p-5 transition-all duration-500 ease-in-out lg:hover:scale-105">
      <div className="relative h-44 overflow-hidden">
        <Image
          src={imgUrl}
          alt="Shop item image"
          fill
          sizes="(max-width: 768px) 250px,
            500px"
          className="h-full object-contain"
        />
      </div>
      <div className="mt-3 flex flex-1 flex-col items-center justify-between">
        <h3 className="flex flex-1 items-center text-center text-lg font-semibold text-green-900">
          {name}
        </h3>
        <div className="flex flex-col space-y-3 text-center">
          <p className="text-sm text-gray-500">{description}</p>
          {roast && (
            <div className="flex items-center justify-center">
              <p className="text-sm">Roast</p>
              <div className="ml-3 flex text-sm text-amber-900 lg:text-lg">
                {Array(roast)
                  .fill(0)
                  .map((_, i) => (
                    <CgCoffee key={i} />
                  ))}
              </div>
            </div>
          )}
          <p className="text-sm">
            Price:<span className="ml-1 font-semibold">&pound;{price}</span>
          </p>
          <Button
            dark
            small
            center
            disabled={disabledBtn}
            onClick={() =>
              dispatch(
                addToCart({
                  id,
                  name,
                  category,
                  price,
                  imgUrl,
                })
              )
            }
          >
            <div className="flex h-full w-full justify-center overflow-hidden">
              <div
                className={`${
                  itemInCart?.id === id && "-translate-y-[63%]"
                } flex h-20 flex-col items-center justify-between py-[4.75px] transition-transform duration-700 ease-in-out`}
              >
                <div className={`w-full`}>Add to Cart</div>
                <div className={`flex w-full items-center justify-center`}>
                  <BsCheckLg /> <span className="ml-1">In Cart</span>
                </div>
              </div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShopItem;
