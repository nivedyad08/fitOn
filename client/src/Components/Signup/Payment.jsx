import React, { useState } from "react";
import PayPal from "./PayPal";
import { Link } from "react-router-dom";

export default function Payment() {
  const [checkout, setCheckOut] = useState(false)
  return (
    <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
      <div className="text-center">
        <img className="mx-auto w-48" src="/logo.png" alt="logo" />
        <h4 className="mb-12 mt-1 pb-1 text-xl text-white font-semibold">
          FitOn
        </h4>
      </div>
      <p class="text-custom-whitish">
        Don't miss out on the enhanced functionality and exclusive features of
        our application. Make a payment today and unlock it all!
      </p>
      { checkout ? (
        <PayPal />
      ) : (
        <button className="rounded-lg h-40 w-full mt-10 bg-custom-yellow rounded-lg text-sm px-5 py-2.5 text-center font-medium focus:outline-none text-white" onClick={ () => {
          setCheckOut(true)
        } }>
          PROCEED TO PAYMENT
        </button>
      )
      }
      <p className="mt-10 text-center text-sm text-custom-slate">
        Don’t have an account ?{ " " }
        <Link
          to="/register"
          className="font-medium leading-6 text-custom-yellow font-normal hover:text-indigo-500"
        >
          Signup
        </Link>
      </p>
    </div>
  );
}
