import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { db } from "../utils/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { purchaseInt } from "./admin";

const dashboard = () => {
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const email = useSelector((state: RootState) => state.auth.email);
  const [shoppingHistory, setShoppingHistory] = useState<purchaseInt[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => setLoading(false), []);

  const fetchData = async () => {
    try {
      const cartRef = collection(db, "cart");
      const shoppingHistoryQuery = query(cartRef, where("email", "==", email));
      const unsubscribe = onSnapshot(shoppingHistoryQuery, (snapshot) => {
        setShoppingHistory(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as any
        );
      });
      return unsubscribe;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (!isLoggedIn) {
    router.push("/login");
  }

  return (
    <>
      {loading && <Spinner />}
      <div className="container mx-auto p-5">
        {shoppingHistory.length ? (
          <>
            <h3 className="my-12 text-center text-2xl font-semibold text-green-900">
              Shopping history
            </h3>
            <div className="h-[40rem] overflow-y-scroll rounded-lg bg-slate-200 p-3 text-center shadow-inner">
              <div className="flex justify-start overflow-x-auto rounded-lg bg-white p-5 shadow-md lg:justify-center">
                <table>
                  <thead>
                    <tr className="text-green-900">
                      <th className="p-3 font-semibold">Cart</th>
                      <th className="p-3 font-semibold">Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shoppingHistory.map((cart) => (
                      <tr key={cart.id} className="divide-x-2 border-t-2">
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
                              {cart.cartItems.map((item) => (
                                <tr
                                  key={item.id}
                                  className="divide-x-2 text-left"
                                >
                                  <td className=" p-2 text-sm">{item.date}</td>
                                  <td className=" p-2 text-sm">
                                    {item.category}
                                  </td>
                                  <td className=" p-2 text-sm">{item.name}</td>
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
                          &pound;
                          {cart.total}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="h-[30rem]">
            <h3 className="my-40 text-center text-2xl font-semibold leading-loose text-gray-500">
              You have no purchased items yet.
              <br /> Start shopping now!
            </h3>
          </div>
        )}
      </div>
    </>
  );
};

export default dashboard;
