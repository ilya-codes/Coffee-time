import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { db } from "../utils/firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { AiFillStar } from "react-icons/ai";
import Image from "next/image";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import AddItem from "../components/AddItem";
import { toast } from "react-toastify";
import Carousel from "../components/Carousel";
import { storage } from "../utils/firebase";
import { ref, deleteObject } from "firebase/storage";
import Spinner from "../components/Spinner";

interface messageInt {
  email: string;
  id: string;
  message: string;
  name: string;
}

interface shopItemInt {
  category: string;
  description: string;
  id: string;
  imgUrl: string;
  isFav: boolean;
  name: string;
  price: string;
  roast?: number;
}

export interface purchaseInt {
  address: string;
  cartItems: any[];
  email: string;
  id: string;
  name: string;
  total: number;
}

const admin = () => {
  const router = useRouter();
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);
  const [active, setActive] = useState(false);
  const [messages, setMessages] = useState<messageInt[]>([]);
  const [shopItems, setShopItems] = useState<shopItemInt[]>([]);
  const [purchases, setPurchases] = useState<purchaseInt[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => setLoading(false), []);

  const fetchMessages = async () => {
    try {
      const collectionRef = collection(db, "messages");
      const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as any
        );
      });
      return unsubscribe;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchItems = async () => {
    try {
      const collectionRef = collection(db, "shopItems");
      const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
        setShopItems(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as any
        );
      });
      return unsubscribe;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCarts = async () => {
    try {
      const collectionRef = collection(db, "cart");
      const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
        setPurchases(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as any
        );
      });
      return unsubscribe;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchItems();
    fetchCarts();
  }, []);

  if (!isAdmin) {
    router.push("/login");
  }

  const addItemHandler = () => {
    setActive(!active);
    document.body.classList.toggle(`overflow-hidden`);
  };

  const messageDeleteHandler = async (id: string) => {
    try {
      const docRef = doc(db, "messages", id);
      await deleteDoc(docRef);
      toast.success("Message Deleted", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const ItemDeleteHandler = async (id: string) => {
    try {
      const docRef = doc(db, "shopItems", id);
      const docSnap = await getDoc(docRef);
      const regex = /[^/\\&\?]+\.\w{3,4}(?=([\?&].*$|$))/gim;
      const fullPath = docSnap.get("imgUrl");
      const fileName = fullPath.match(regex)[0];
      const ImageRef = ref(storage, fileName);
      deleteObject(ImageRef);

      await deleteDoc(docRef);
      toast.success("Item is deleted from the shop", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading && <Spinner />}
      <div className="container mx-auto mt-8 grid grid-cols-1 lg:grid-cols-3">
        <div className="flex h-full flex-col p-5">
          <h3 className="mb-8 text-center text-2xl font-semibold text-green-900">
            Messages
          </h3>
          <div className="h-[550px] rounded-lg bg-slate-200 p-3 shadow-inner md:h-full">
            <div className="relative flex h-full">
              {messages.length ? (
                <Carousel numberOfSlides={messages.length} justOne isVertical>
                  {messages.map((message) => (
                    <div key={message.id}>
                      <div className="relative mt-3 mb-1 h-[400px] overflow-auto rounded-lg bg-white p-5 shadow-md lg:mb-0 ">
                        <RxCross1
                          className="absolute top-5 right-5 cursor-pointer text-lg text-green-900 "
                          onClick={() => messageDeleteHandler(message.id)}
                        />
                        <h4 className="text-md font-semibold text-green-900">
                          From {message.name}
                        </h4>
                        <p className="text-sm text-gray-500">{message.email}</p>
                        <p className="mt-5">{message.message}</p>
                      </div>
                    </div>
                  ))}
                </Carousel>
              ) : (
                <h3 className="my-40 w-full text-center text-xl font-semibold leading-loose text-gray-500">
                  No Messages Yet
                </h3>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-1 h-full p-5 lg:col-span-2">
          <h3 className="mb-8 text-center text-2xl font-semibold text-green-900">
            Shop Items
          </h3>
          <div className="rounded-lg bg-slate-200 px-3 pb-3 shadow-inner">
            <div
              onClick={addItemHandler}
              className="mb-3 flex w-full cursor-pointer items-center justify-center rounded-b-lg bg-white p-2 shadow-md transition-all duration-200 ease-in-out hover:scale-95"
            >
              <span className="text-4xl font-bold text-green-900">+</span>
            </div>
            <div className="relative flex h-full">
              {shopItems.length ? (
                <Carousel numberOfSlides={shopItems.length} isVertical>
                  {shopItems.map((item) => (
                    <div key={item.id}>
                      <div className="relative my-3 flex h-20 flex-row items-center justify-start rounded-lg bg-white py-5 px-12 shadow-md sm:h-32">
                        <div className="relative h-14 w-14 min-w-max sm:h-20 sm:w-20">
                          <Image
                            src={item.imgUrl}
                            alt=""
                            fill
                            sizes="(max-width: 768px) 150px,
                            250px"
                            className="h-full object-contain"
                          />
                        </div>
                        <div className="mx-5 flex flex-col justify-center">
                          <p className="text-sm font-semibold text-green-900 sm:text-base">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500 sm:text-sm ">
                            {item.category}
                          </p>
                        </div>
                        <div className="mx-5 ml-auto flex flex-col justify-center">
                          <p className="font-semibold text-green-900">
                            &pound;{item.price}
                          </p>
                        </div>
                        {item.isFav && (
                          <AiFillStar className="absolute top-5 left-5 text-xl text-green-900" />
                        )}
                        <RxCross1
                          className="absolute top-5 right-5 cursor-pointer text-lg text-green-900 "
                          onClick={() => ItemDeleteHandler(item.id)}
                        />
                      </div>
                    </div>
                  ))}
                </Carousel>
              ) : (
                <h3 className="my-40 w-full text-center text-xl font-semibold leading-loose text-gray-500">
                  No Items Yet
                </h3>
              )}
            </div>
          </div>
          <AddItem active={active} handleClose={addItemHandler} />
        </div>
      </div>
      <div className="container mx-auto p-5">
        <h3 className="my-8 text-center text-2xl font-semibold text-green-900">
          Purchased Items
        </h3>
        <div className="h-[40rem] overflow-y-scroll rounded-lg bg-slate-200 p-3 text-center shadow-inner">
          <div className="flex justify-start overflow-x-auto rounded-lg bg-white p-5 shadow-md lg:justify-center">
            {purchases.length ? (
              <table>
                <thead>
                  <tr className="text-green-900">
                    <th className="p-3 font-semibold">Name</th>
                    <th className="p-3 font-semibold">Address</th>
                    <th className="p-3 font-semibold">Email</th>
                    <th className="p-3 font-semibold">Cart</th>
                    <th className="p-3 font-semibold">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {purchases.map((purchase) => (
                    <tr key={purchase.id} className="divide-x-2 border-t-2">
                      <td className="p-3 font-medium">{purchase.name}</td>
                      <td className="p-3 font-medium">{purchase.address}</td>
                      <td className="p-3 font-medium">{purchase.email}</td>
                      <td>
                        <table>
                          <tbody>
                            <tr className="divide-x-2 text-left">
                              <th className="p-2 pr-12 text-sm font-semibold">
                                Date
                              </th>
                              <th className="p-2 pr-12 text-sm font-semibold">
                                Category
                              </th>
                              <th className="p-2 pr-12 text-sm font-semibold">
                                Item Name
                              </th>
                              <th className="p-2 pr-12 text-sm font-semibold">
                                Price
                              </th>
                              <th className="p-2 pr-12 text-sm font-semibold">
                                Quantity
                              </th>
                            </tr>
                            {purchase.cartItems?.map((item) => (
                              <tr
                                key={item.id}
                                className="divide-x-2 text-left"
                              >
                                <td className=" p-2 text-sm">{item.date}</td>
                                <td className=" p-2 text-sm">
                                  {item.category}
                                </td>
                                <td className="p-2 text-sm">{item.name}</td>
                                <td className=" p-2 text-sm">
                                  &pound;{item.price}
                                </td>
                                <td className=" p-2 text-sm">
                                  {item.quantity}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                      <td className="p-3 font-semibold">
                        &pound;{purchase.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h3 className="my-40 w-full text-center text-xl font-semibold leading-loose text-gray-500">
                No Purchases Yet
              </h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default admin;
