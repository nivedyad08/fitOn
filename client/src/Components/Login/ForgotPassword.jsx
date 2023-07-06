import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from "../../config/axios";
import { toast } from "react-toastify";

function ForgotPassword() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, } = useForm({
    defaultValues: {
      email: ""
    }
  });
  const updatePasswordHandle = async (formData) => {
    try {
      const response = await axios.post("api/auth/forgot-password", formData);
      if (response && response.status === 200) {
        toast.success("Email has been sent. Please check the email to update your password");
        navigate("/forgot-password/email-verification");
      }
    } catch (error) {
      console.log(error);
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
        <h5 className="mb-12 mt-1 pb-1 text-xl text-white font-semibold text-center">
          Forgot password?
        </h5>
        <p className="text-md text-center font-semibold leading-relaxed text-custom-whitish">Please enter your email to receive a verification code.</p>
        <form onSubmit={ handleSubmit(updatePasswordHandle) }>
          <div>
            <label
              htmlFor="email"
              className="block text-sm leading-6 text-white font-normal"
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
                  validate: {
                    maxLength: (v) =>
                      v.length <= 50 || "The email should have at most 50 characters",
                    matchPattern: (v) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                      "Email address must be a valid address",
                  },
                }) }
                className="peer block h-40 w-full rounded-md border-0 py-1.5 text-custom-whitish shadow-sm ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                style={ { backgroundColor: "#414160" } }
              />
              { errors.email?.message && (
                <small className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">{ errors.email.message }</small>
              ) }
            </div>
          </div>

          <div>
            <button className="rounded-lg h-40 w-full mt-10 bg-custom-yellow rounded-lg text-sm px-5 py-2.5 text-center font-medium focus:outline-none text-white">
              SEND
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-custom-slate">
          Back to{ " " }
          <Link
            to="/login"
            className="font-medium leading-6 text-custom-yellow hover:text-indigo-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
