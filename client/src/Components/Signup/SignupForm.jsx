import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { USER_ROLE, PENDING_TRAINER, TRAINER_ROLE } from "../../constants/roles";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      role: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userLocation: "",
    },
  });
  const { firstName, lastName, email, password, userLocation } = watch(["firstName", "lastName", "email", "password", "userLocation"])

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    if (data) {
      try {
        const response = await axios.post("api/auth/user/register", data);
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
        <form className="space-y-6" onSubmit={ handleSubmit(onSubmit) }>
          <ul class="items-center py-10 w-full text-sm font-medium text-gray-900 rounded-lg sm:flex dark:bg-gray-700 dark:text-white">
            <li class="w-full">
              <div class="flex items-center pl-3">
                <input
                  id="horizontal-list-radio-id"
                  type="radio"
                  name="role"
                  value={ USER_ROLE }
                  { ...register("role", { required: "Role is required" }) }
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
                  name="role"
                  value={ PENDING_TRAINER }
                  { ...register("role", { required: "Role is required" }) }

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
                { ...register("firstName", {
                  required: "First Name is required",
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "Name should only contain letters",
                  },
                }) }
                className={ `block h-40 w-full py-2 px-4 rounded-md border-0 py-1.5 text-white shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 ${ errors.firstName ? "border-red-500" : ""
                  }` }
                style={ { backgroundColor: "#414160" } }
              />
              { errors.firstName && (
                <small className="mt-2 text-red-500 text-sm">
                  { errors.firstName.message }
                </small>
              ) }
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
                { ...register("lastName", {
                  required: "Last Name is required",
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "Name should only contain letters",
                  },
                }) }
                className={ `block h-40 w-full py-2 px-4 rounded-md border-0 py-1.5 text-white shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 ${ errors.lastName ? "border-red-500" : ""
                  }` }
                style={ { backgroundColor: "#414160" } }
              />
              { errors.lastName && (
                <small className="mt-2 text-red-500 text-sm">
                  { errors.lastName.message }
                </small>
              ) }
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
                { ...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
                    message: "Email does'nt match",
                  },
                }) }
                className={ `block h-40 w-full py-2 px-4 rounded-md border-0 py-1.5 text-white shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 ${ errors.email ? "border-red-500" : ""
                  }` }
                style={ { backgroundColor: "#414160" } }
              />
              { errors.email && (
                <small className="mt-2 text-red-500 text-sm">
                  { errors.email.message }
                </small>
              ) }
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
                { ...register("password", {
                  required: "Password must be strong",
                  pattern: {
                    value: /((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/i,
                    message: "Password must be strong",
                  },
                }) }
                className={ `block h-40 w-full py-2 px-4 rounded-md border-0 py-1.5 text-white shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 ${ errors.password ? "border-red-500" : ""
                  }` }
                style={ { backgroundColor: "#414160" } }
              />
              { errors.password && (
                <small className="mt-2 text-red-500 text-sm">
                  { errors.password.message }
                </small>
              ) }
            </div>
            <div class="relative mb-6" data-te-input-wrapper-init>
              <label
                htmlFor="userLocation"
                className="block text-sm font-medium leading-6 text-white font-normal"
              >
                Location
              </label>
              <input
                id="userLocation"
                name="userLocation"
                type="text"
                { ...register("userLocation", {
                  required: "Location is required",
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "Location should only contain letters",
                  },
                }) }
                className={ `block h-40 w-full py-2 px-4 rounded-md border-0 py-1.5 text-white shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 ${ errors.userLocation ? "border-red-500" : ""
                  }` }
                style={ { backgroundColor: "#414160" } }
              />
              { errors.userLocation && (
                <small className="mt-2 text-red-500 text-sm">
                  { errors.userLocation.message }
                </small>
              ) }
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