import { useState } from "react";
import Button from "./Button";
import { toast } from "react-toastify";

const Contact = ({ db, collection, addDoc }: any) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = collection(db, "messages");
      await addDoc(docRef, {
        name,
        email,
        message,
      });

      toast.success("Thank you for your feedback!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });

      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div id="contact" className="relative -top-28"></div>
      <div className="container mx-auto w-full">
        <h2 className="my-12 text-center text-2xl font-semibold text-green-900 md:my-20 md:text-3xl">
          Get In Touch
        </h2>
        <div className="flex flex-col divide-y-2 rounded-lg bg-white p-8 shadow-md md:flex-row md:divide-y-0 md:divide-x-2 md:p-5">
          <div className="flex-1 md:flex md:justify-center">
            <form
              onSubmit={handleSubmit}
              className="mb-5 flex flex-col md:mb-0 md:mr-5 md:w-3/4"
            >
              <label className="my-3 flex flex-col">
                <span className="ml-5 mb-2 font-semibold text-green-900">
                  Full Name
                </span>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                  type="text"
                  placeholder="Full Name"
                  className=" rounded-lg border border-green-900 bg-slate-50 p-3 shadow-inner outline-none"
                />
              </label>
              <label className="my-3 flex flex-col">
                <span className="ml-5 mb-2 font-semibold text-green-900">
                  Email Address
                </span>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  type="email"
                  placeholder="email@email.com"
                  className=" rounded-lg border border-green-900 bg-slate-50 p-3 shadow-inner outline-none"
                />
              </label>
              <label className="my-3 flex flex-col pb-5">
                <span className="ml-5 mb-2 font-semibold text-green-900">
                  Message
                </span>
                <textarea
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  required
                  placeholder="Message"
                  className="h-40 w-full resize-none overflow-auto rounded-lg border border-green-900 bg-slate-50 p-3 shadow-inner outline-none"
                ></textarea>
              </label>
              <Button dark center type="submit">
                Submit
              </Button>
            </form>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="m-5 h-80 w-80 max-w-full overflow-hidden rounded-lg border border-green-900 bg-slate-50">
              <iframe
                className="h-full w-full overflow-hidden"
                scrolling="no"
                src="https://maps.google.com/maps?width=320&amp;height=320&amp;hl=en&amp;q=baker%20street%20+()&amp;t=&amp;z=19&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
