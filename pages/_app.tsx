import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { store } from "../redux/Store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../redux/Store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);
  useEffect(() => setLoading(false), []);

  return (
    <>
      {loading && <Spinner />}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToastContainer limit={1} />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
    </>
  );
}
