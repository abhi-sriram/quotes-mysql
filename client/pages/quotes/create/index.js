import React from "react";
import Head from "next/head";
import Navbar from "../../../components/widgets/Navbar";

export default function index() {
  const initialFormData = Object.freeze({
    quote: "",
    author: "",
  });

  const [formData, updateFormData] = React.useState(initialFormData);
  const [error,setError] = React.useState("");

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    console.log(formData);
    if(!formData.author || !formData.quote){
        setError("All fields are required");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Quotes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex flex-col mt-1 mx-2 items-center justify-center w-full  flex-1 px-20 text-center">
        <h1 className="font-extrabold text-3xl w-full">Create a Quote</h1>
        <form className="flex flex-col">
          <input
            className="w-96 outline-none h-14 mt-5 border-b-4 border-l-2 border-r-2 px-5 rounded-lg"
            name="quote"
            type="text"
            placeholder="Quote..."
            onChange={handleChange}
          />
          <input
            className="w-96 outline-none h-14 mt-3 border-b-4 border-l-2 border-r-2 px-5 rounded-lg"
            name="author"
            type="text"
            placeholder="Author..."
            onChange={handleChange}
          />
          {/* <input
            className="w-96 bg-gray-600 text-white cursor-pointer outline-none h-14 mt-3 border-b-4 border-l-2 border-r-2 px-5 rounded-lg hover:bg-white hover:text-gray-600 hover:border-t-2 hover:border-gray-900"
            type="submit"
            value="Add"
            onClick={handleSubmit}
          /> */}
          <button className="w-96 bg-gray-600 text-white cursor-pointer outline-none h-14 mt-3 border-b-4 border-l-2 border-r-2 px-5 rounded-lg hover:bg-white hover:text-gray-600 hover:border-t-2 hover:border-gray-900" onClick={handleSubmit}>Add</button>
        </form>
        {
            error??<p className="text-red-600 text-lg font-serif mt-10">{error}</p>
        }
      </main>
      <footer className="flex items-center justify-center w-full h-14 border-t">
        <p>All copyrights reserved.&#169;</p>
      </footer>
    </div>
  );
}
