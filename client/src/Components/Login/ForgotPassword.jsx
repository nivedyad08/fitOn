import React from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
      <div className="text-center">
        <img className="mx-auto w-48" src="/logo.png" alt="logo" />
        <h4 className="mb-12 mt-1 pb-1 text-xl text-white font-semibold">
          FitOn
        </h4>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <h5 className="mb-12 mt-1 pb-1 text-xl text-white font-semibold text-center">
          Forgot password?
        </h5>
        <p class="text-md text-center font-semibold leading-relaxed text-custom-whitish">Please enter your email to receive a verification code.</p>
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-white font-normal"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="peer block h-40 w-full rounded-md border-0 py-1.5 text-custom-whitish shadow-sm ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                style={{ backgroundColor: "#414160" }}
              />
              <p class="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                Please provide a valid email address.
              </p>
            </div>
          </div>

          <div>
            <button class="rounded-lg h-40 w-full mt-10 bg-custom-yellow rounded-lg text-sm px-5 py-2.5 text-center font-medium focus:outline-none text-white">
              SEND
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-custom-slate">
          Back to{" "}
          <Link
            to="/"
            className="font-medium leading-6 text-custom-yellow font-normal hover:text-indigo-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
