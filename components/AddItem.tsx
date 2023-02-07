import { useState } from "react";
import Button from "./Button";
import { db } from "../utils/firebase";
import { collection, addDoc } from "firebase/firestore";
import { storage } from "../utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { RxCross1 } from "react-icons/rx";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { BsCheckLg } from "react-icons/bs";

const AddItem = ({ active, handleClose }: any) => {
  const [category, setCategory] = useState("coffee");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isFav, setIsFav] = useState(false);
  const [roast, setRoast] = useState(0);
  const [file, setFile] = useState("") as any;
  const [url, setUrl] = useState("");
  const roastIsDisabled = category === "coffee" ? false : true;
  const imageRef = ref(storage, `${file?.name}`);

  const imgUploadHandler = async () => {
    try {
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);
      setUrl(url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const collectionRef = collection(db, "shopItems");

      if (!url) {
        toast.error("Image is not uploaded!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
        return;
      }

      if (roastIsDisabled) {
        await addDoc(collectionRef, {
          category,
          name,
          description,
          imgUrl: url,
          price,
          isFav,
        });
      } else {
        await addDoc(collectionRef, {
          category,
          name,
          description,
          imgUrl: url,
          price,
          isFav,
          roast,
        });
      }

      toast.success("New item is now in the Shop!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      closeAndDelete();
    } catch (error) {
      console.log(error);
    }
  };

  const closeAndDelete = () => {
    handleClose();
    setCategory("coffee");
    setName("");
    setDescription("");
    setFile("");
    setIsFav(false);
    setPrice("");
    setRoast(0);
    setUrl("");
  };

  return (
    <div
      className={`${
        active ? "visible" : "invisible"
      } fixed top-0 left-0 z-40 flex w-full justify-center transition-all duration-500 ease-in-out`}
    >
      <div
        className={`${
          active ? "visible translate-y-0" : "invisible -translate-y-[100vh]"
        } fixed z-50 flex h-full max-h-screen max-w-full flex-col bg-white p-5 shadow-2xl transition-all duration-500 ease-in-out md:mt-14 md:h-auto md:rounded-lg`}
      >
        <form onSubmit={handleSubmit} className="flex flex-col overflow-y-auto">
          <RxCross1
            className="absolute top-5 right-5 cursor-pointer text-lg text-green-900"
            onClick={closeAndDelete}
          />
          <label className=" my-3 flex flex-col">
            <span className="ml-5 mb-2 font-semibold text-green-900">
              Category
            </span>
            <select
              value={category}
              required
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-lg border border-green-900 bg-slate-50 p-3 shadow-inner outline-none"
            >
              <option value="coffee">Coffee</option>
              <option value="capsules">Capsules</option>
              <option value="tools">Tools</option>
              <option value="merchandise">Merchandise</option>
            </select>
          </label>
          <label className=" my-3 flex flex-col">
            <span className="ml-5 mb-2 font-semibold text-green-900">Name</span>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              placeholder="Name"
              className=" rounded-lg border border-green-900 bg-slate-50 p-3 shadow-inner outline-none"
            />
          </label>
          <label className=" my-3 flex flex-col">
            <span className="ml-5 mb-2 font-semibold text-green-900">
              Description
            </span>
            <input
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
              placeholder="Description"
              className=" rounded-lg border border-green-900 bg-slate-50 p-3 shadow-inner outline-none"
            />
          </label>
          <fieldset className="mb-3">
            <label className=" my-3 flex flex-col">
              <span className=" ml-5 mb-2 font-semibold text-green-900">
                Image
              </span>
              <input
                onChange={(e: any) => setFile(e.target.files[0])}
                type="file"
                required
                className="text-sm text-gray-500 file:mr-3 file:cursor-pointer file:rounded-lg file:border file:border-solid file:border-green-900 file:bg-white file:py-2.5 file:px-5 file:text-sm file:font-semibold file:text-green-900 file:shadow-inner file:outline-none file:transition-all file:duration-200 file:ease-in-out file:hover:bg-green-900 file:hover:text-white"
              />
            </label>
            <fieldset className="flex items-center justify-start">
              <Button type="button" small dark onClick={imgUploadHandler}>
                <span className="flex items-center justify-center">
                  <BsFillArrowDownCircleFill
                    onClick={imgUploadHandler}
                    className="mr-1 cursor-pointer text-2xl"
                  />{" "}
                  Upload
                </span>
              </Button>
              <BsCheckLg
                className={`${
                  url && !url.includes("undefined")
                    ? "opacity-1 translate-y-0"
                    : "-translate-y-5 opacity-0"
                } ml-3 text-2xl text-green-900 transition-all duration-500 ease-in-out`}
              />
            </fieldset>
          </fieldset>
          <fieldset className=" flex justify-between">
            <label className="my-3 flex flex-col items-center">
              <span className="mb-2 font-semibold text-green-900">Price</span>
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
                placeholder="Price"
                className="w-36 rounded-lg border border-green-900 bg-slate-50 p-3 shadow-inner outline-none"
              />
            </label>
            <label className="my-3 flex flex-col items-center">
              <span className="mb-2 font-semibold text-green-900">Roast</span>
              <select
                value={roast}
                disabled={roastIsDisabled}
                onChange={(e) => setRoast(+e.target.value)}
                className={`${
                  roastIsDisabled && "opacity-20"
                } w-36 rounded-lg border border-green-900 bg-slate-50 p-3 shadow-inner outline-none`}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </label>
          </fieldset>
          <label className="mt-3 mb-6 flex items-center justify-start">
            <input
              onChange={() => setIsFav(!isFav)}
              type="checkbox"
              checked={isFav}
              className=""
            />
            <span className="ml-3  font-semibold text-green-900">
              Is Favorite
            </span>
          </label>
          <Button dark center type="submit">
            Submit
          </Button>
        </form>
      </div>
      <div
        className={`fixed top-0 left-0 z-40 h-screen w-screen bg-black opacity-60`}
      ></div>
    </div>
  );
};

export default AddItem;
