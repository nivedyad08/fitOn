import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import { USER_ROLE, PENDING_TRAINER } from "../../constants/roles";

export default function SignupForm() {
  const [input, setInput] = useState({
    role: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userLocation:""
  });
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("api/auth/user/register", input);
      if (response.status === 200) {
        toast.success("User Registered Successfully");
        const user = response.data.user;
        if (user.role === PENDING_TRAINER) {
          navigate(`/profile-complete/${ user.firstName }/${ user._id }`);
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again later");
      }
    }
  };
  return (
    <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
      <div className="text-center">
        <img className="mx-auto w-48" src="/logo.png" alt="logo" />
        <h4 className="mb-12 mt-1 pb-1 text-xl text-white font-semibold">
          FitOn
        </h4>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <p class="text-lg font-semibold leading-relaxed text-custom-whitish">
          Who are you?
        </p>
        <form className="space-y-6" onSubmit={ handleSignUp }>
          <ul class="items-center py-10 w-full text-sm font-medium text-gray-900 rounded-lg sm:flex dark:bg-gray-700 dark:text-white">
            <li class="w-full">
              <div class="flex items-center pl-3">
                <input
                  id="horizontal-list-radio-id"
                  type="radio"
                  value={ USER_ROLE }
                  onChange={ (e) => setInput({ ...input, role: e.target.value }) }
                  name="list-radio"
                  className="w-32 h-32 mx-4 focus:ring-yellow-500 dark:focus:ring-yellow-600 border-gray-300 dark:border-gray-500"
                  style={ { backgroundColor: "#414160" } }
                />

                <label
                  for="horizontal-list-radio-license"
                  class="w-full py-3 ml-2 text-sm font-medium text-white"
                >
                  USER
                </label>
              </div>
            </li>

            <li class="w-full">
              <div class="flex items-center pl-3">
                <input
                  id="horizontal-list-radio-id"
                  type="radio"
                  value={ PENDING_TRAINER }
                  onChange={ (e) => setInput({ ...input, role: e.target.value }) }
                  name="list-radio"
                  className="w-32 h-32 mx-4 bg-transparent border-gray-300 dark:border-gray-500"
                  style={ { backgroundColor: "#414160" } }
                />

                <label
                  for="horizontal-list-radio-id"
                  class="w-full py-3 ml-2 text-sm font-medium text-white"
                >
                  TRAINER
                </label>
              </div>
            </li>
          </ul>

          <div class="grid grid-cols-2 gap-4">
            <div class="relative mb-6" data-te-input-wrapper-init>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6 text-white font-normal"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="text"
                value={ input.firstName }
                onChange={ (e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                required
                className="block h-40 w-full rounded-md border-0 py-2 px-4 text-custom-whitish shadow-sm ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                style={ { backgroundColor: "#414160" } }
              />
            </div>

            <div class="relative mb-6" data-te-input-wrapper-init>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6 text-white font-normal"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="text"
                value={ input.lastName }
                onChange={ (e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                required
                className="block h-40 w-full rounded-md py-2 px-4 text-custom-whitish shadow-sm  
                ring-gray-300 placeholder:text-gray-400
                sm:text-sm sm:leading-6"
                style={ { backgroundColor: "#414160" } }
              />
            </div>
          </div>
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
                value={ input.email }
                onChange={ (e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                required
                className="peer block h-40 w-full rounded-md border-0 py-2 px-4 text-custom-whitish shadow-sm ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                style={ { backgroundColor: "#414160" } }
              />
              <p class="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                Please provide a valid email address.
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-custom-whitish font-normal"
              >
                Password
              </label>
              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="text-sm hover:text-indigo-500 font-normal text-custom-whitish"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={ input.password }
                onChange={ (e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                required
                className="block h-40 w-full rounded-md py-2 px-4 border-0 py-1.5 text-white shadow-sm ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                style={ { backgroundColor: "#414160" } }
              />
            </div>
            <div class="relative mb-6" data-te-input-wrapper-init>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6 text-white font-normal"
              >
                Location
              </label>
              <input
                id="userLocation"
                name="userLocation"
                type="text"
                autoComplete="text"
                value={ input.userLocation }
                onChange={ (e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                required
                className="block h-40 w-full rounded-md py-2 px-4 text-custom-whitish shadow-sm  
                ring-gray-300 placeholder:text-gray-400
                sm:text-sm sm:leading-6"
                style={ { backgroundColor: "#414160" } }
              />
            </div>
          </div>

          <div>
            <button class="rounded-lg h-40 w-full mt-10 bg-custom-yellow rounded-lg text-sm px-5 py-2.5 text-center font-medium focus:outline-none text-white">
              CREATE ACCOUNT
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-custom-slate">
          Already registered ?{ " " }
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
