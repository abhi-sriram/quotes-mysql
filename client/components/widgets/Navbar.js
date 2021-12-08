import React from "react";
import Link from "next/link";
import Cookies from "js-cookie";

function Navbar() {
  return Cookies.get("uid") ? (
    <>
      
      <div>
        <nav className="border-b w-screen h-14 ">
          <div className="flex justify-between items-center h-full">
            <ul className="">
              <li className="px-2 font-extrabold text-xl">
                <Link href="/">
                  <a>Quotes</a>
                </Link>
              </li>
            </ul>
            <ul className="flex flex-row h-full items-center">
              <li className="px-2">
                {/* <Link href="/user/login"> */}
                  <a>Profile</a>
                {/* </Link> */}
              </li>
              <li className="px-2 cursor-pointer" onClick={()=>{Cookies.set("uid","")}}>
                {/* <Link href="/user/login"> */}
                  Logout
                {/* </Link> */}
              </li>
              
            </ul>
          </div>
        </nav>
      </div>
      
    </>
  ) : (
    <>
      
      <div>
        <nav className="border-b w-screen h-14 ">
          <div className="flex justify-between items-center h-full">
            <ul className="">
              <li className="px-2 font-extrabold text-xl">
                <Link href="/">
                  <a>Quotes</a>
                </Link>
              </li>
            </ul>
            <ul className="flex flex-row h-full items-center">
              <li className="px-2">
                <Link href="/user/login">
                  <a>Signin</a>
                </Link>
              </li>
              <li className="px-2">
                <Link href="/user/signup">
                  <a>Signup</a>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      
    </>
  );
}

export default Navbar;
