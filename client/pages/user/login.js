import React, { useEffect } from "react";
import Head from "next/head";
import Navbar from "../../components/widgets/Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";

function login() {
  useEffect(() => {
    if (Cookies.get("uid")) {
      Router.push("/");
    }
  }, []);

  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });

  const [formData, updateFormData] = React.useState(initialFormData);
  const [error, setError] = React.useState("");

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const registerUser = async () => {
    var data = JSON.stringify({
      email: formData.email,
      password: formData.password,
    });

    var config = {
      method: "post",
      url: "http://localhost:5000/user/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        if (response.data.code == 200) {
          Cookies.set("uid", response.data.uid, { expires: 7 });
        }
        console.log("Cookie: ", Cookies.get("uid"));
        console.log(JSON.stringify(response.data));
        Router.push("/");
      })
      .catch(function (error) {
        console.log(error);
        setError(error.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    console.log(formData);
    if (!formData.email || !formData.password) {
      setError("All fields are required");
    } else {
      registerUser();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex flex-col mt-1 mx-2 items-center justify-center w-full  flex-1 px-20 text-center">
        <h1 className="font-extrabold text-3xl w-full">Login</h1>
        <form className="flex flex-col">
          <input
            className="w-96 outline-none h-14 mt-5 border-b-4 border-l-2 border-r-2 px-5 rounded-lg"
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            className="w-96 outline-none h-14 mt-3 border-b-4 border-l-2 border-r-2 px-5 rounded-lg"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button
            className="w-96 bg-gray-600 text-white cursor-pointer outline-none h-14 mt-3 border-b-4 border-l-2 border-r-2 px-5 rounded-lg hover:bg-white hover:text-gray-600 hover:border-t-2 hover:border-gray-900"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
        {error ?? (
          <p className="text-red-600 text-lg font-serif mt-10">{error}</p>
        )}
      </main>
      <footer className="flex items-center justify-center w-full h-14 border-t">
        <p>All copyrights reserved.&#169;</p>
      </footer>
    </div>
  );
}

export default login;
