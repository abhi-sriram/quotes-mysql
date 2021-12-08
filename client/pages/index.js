import Head from "next/head";
import pickRandomColor from "../components/widgets/Colors";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/widgets/Navbar";
import Link from "next/link";

export default function Home({ quotes, code, error }) {
  const color = pickRandomColor();
  const [index, setIndex] = useState(0);

  const changeIndex = () => {
    if (index == quotes.length - 1) {
      setIndex(0);
    } else {
      setIndex(++index);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Quotes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex flex-col mt-1 mx-2 items-center justify-center w-full flex-1 px-20 text-center">
        {quotes.length > 0 ? (
          <div className={`py-20 px-28 border rounded-3xl  ${color.color}`}>
            <div>
              <h1 className={`text-3xl ${color.textColor} font-extrabold`}>
                <blockquote>"{quotes[index].quote}"</blockquote>
              </h1>
              <p className={`pt-2 ${color.textColor}`}>
                -{quotes[index].author}
              </p>
            </div>
          </div>
        ) : (
          <div className="py-4 px-28 border bg-red-600 rounded-3xl shadow-xl">
            <p className="text-white">Error:</p>
            <p className="text-white">{error}</p>
          </div>
        )}
        {code == 400 ? (
          <div className="py-4 px-28 border bg-red-600 rounded-3xl shadow-xl">
            <p className="text-white">Error:</p>
            <p className="text-white">{error}</p>
          </div>
        ) : (
          <div
            className={`cursor-pointer mb-1 mt-5  rounded-md ${color.color} hover:bg-gray-900`}
            onClick={() => changeIndex()}
          >
            <p
              className={` px-8 py-3  ${color.textColor} hover:text-white font-semibold `}
            >
              NEXT
            </p>
          </div>
        )}
      </main>
      <footer className="flex flex-col items-center justify-center w-full h-14 border-t">
        <Link href="/quotes/category">
          <a>Quotes by category</a>
        </Link>
        <p>All copyrights reserved.&#169;</p>
      </footer>
    </div>
  );
}

export async function getStaticProps(context) {
  var config = {
    method: "get",
    url: "http://localhost:5000/api/quotes",
    headers: {},
  };

  let resp = {};

  // const response = await axios(config);
  // const data = response.data;
  // console.log(data["data"]);

  await axios(config)
    .then(function (response) {
      resp = {
        props: {
          quotes: response.data.data,
          code: response.status,
          error: "",
        },
      };
    })
    .catch(function (error) {
      console.log(error);
      resp = {
        props: {
          quotes: [],
          code: 400,
          error: error.message,
        },
      };
    });
  return resp;
}
