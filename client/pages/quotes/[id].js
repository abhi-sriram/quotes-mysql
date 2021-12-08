import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "../../components/widgets/Navbar";
import Link from "next/link";

export default function Id({ quotes, code, error }) {
  const router = useRouter();

  if (quotes == undefined) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Head>
          <title>allQuotes</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />

        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <div className={`text-2xl font-extralight`}> Loading...</div>
        </main>
        <footer className="flex items-center justify-center w-full h-14 border-t">
          <p>page:{router.query.id}</p>
        </footer>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>allQuotes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex flex-col items-center w-full flex-1 px-20 text-center">
        {quotes.length > 0 ? (
          <>
            {quotes.map((quote) => (
              <div key={quote.id} className="py-6 px-10 border-b">
                <h1 className={`text-3xl text-gray-800 font-extrabold`}>
                  "{quote.quote}"
                  <span
                    className="text-xs p-1 text-center border-blue-600 font-mono cursor-pointer ml-5 font-normal border rounded-md text-gray-500"
                    onClick={() => {
                      navigator.clipboard.writeText(quote.quote);
                    }}
                  >
                    copy
                  </span>
                </h1>
                <p className={`pt-2 text-gray-700`}>-{quote.author}</p>
              </div>
            ))}
          </>
        ) : (
          <div className={`text-4xl font-extrabold`}> NO DATA FOUND </div>
        )}
      </main>
      <footer className="flex items-center justify-center w-full h-14 border-t-2">
        {parseInt(router.query.id) > 1 ? (
          <p className="p-2 mr-1 cursor-pointer bg-gray-700 text-white hover:border hover:border-gray-700 hover:text-gray-600 font-bold hover:bg-white rounded-md">
            <Link href={`/quotes/${parseInt(router.query.id) - 1}`}>
              <a>&lt;</a>
            </Link>
          </p>
        ) : (
          <></>
        )}
        <p className="px-2 font-bold text-lg">{router.query.id}</p>
        {quotes.length > 0 ? (
          <p className="p-2 ml-1 cursor-pointer bg-gray-700 text-white hover:border hover:border-gray-700 hover:text-gray-600 font-bold hover:bg-white rounded-md">
            <Link href={`/quotes/${parseInt(router.query.id) + 1}`}>
              <a>&gt;</a>
            </Link>
          </p>
        ) : (
          <></>
        )}
      </footer>
    </div>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  return {
    // Only `/posts/1` and `/posts/2` are generated at build time
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
    // Enable statically generating additional pages
    // For example: `/posts/3`
    fallback: true,
  };
}

export async function getStaticProps(context) {
  // console.log(context.params);

  var config = {
    method: "get",
    url: `http://localhost:5000/api/quotes/${context.params.id}`,
    headers: {},
  };

  let resp = {};

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
