import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../../config/axios"
import { useDispatch } from "react-redux"
import { loggedUserDetails } from "../redux-toolkit/slices/userSlice";
import { USER_ROLE, TRAINER_ROLE, PENDING_TRAINER, ADMIN_ROLE } from "../../constants/roles"
import Cookies from "js-cookie";
import { toast } from "react-toastify";

function LoginForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [input, setInput] = useState({
    email: "",
    password: ""
  })

  const onSubmit = async (data) => {
    if (data) {
      try {
        const response = await axios.post("/api/auth/user/login", input);
        if (response.status === 200) {
          const { accessToken, user } = response.data;
          Cookies.set("accessToken", accessToken);
          dispatch(loggedUserDetails(user));
          if(user.role === USER_ROLE)
            navigate("/user/dashboard");
          else if(user.role === TRAINER_ROLE)
            navigate("/trainer/dashboard");
          else if(user.role === ADMIN_ROLE)
            navigate("/admin/dashboard");
          else if(user.role === PENDING_TRAINER)
            navigate(`/profile-complete/${user.firstName}/${user._id}`);
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
        <form className="space-y-6" onSubmit={ handleSubmit(onSubmit) }>
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
                { ...register("email", { required: "Email Address is required" }) }
                className="peer block h-40 py-2 px-4 w-full rounded-md border-0 py-1.5 text-custom-whitish shadow-sm ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                style={ { backgroundColor: "#414160" } }
                onChange={ (e) =>
                  setInput({
                    ...input,
                    email: e.target.value,
                  })
                }
              />
              <p className="mt-2 text-pink-600 text-sm">
                { errors.email && <span role="alert">{ errors.email.message }</span> }
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
                <Link to="/forgot-password" className="text-sm hover:text-indigo-500 font-normal text-custom-whitish">
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
                required
                className="block h-40 w-full py-2 px-4 rounded-md border-0 py-1.5 text-white shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                style={ { backgroundColor: "#414160" } }
                { ...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 8 characters long",
                  },
                }) }
                onChange={ (e) => setInput({
                  ...input, password: e.target.value
                }) }
              />
              <p className="mt-2 text-pink-600 text-sm">
                { errors.password && <span role="alert">{ errors.password.message }</span> }
              </p>

            </div>
          </div>

          <div>
            <button class="rounded-lg h-40 w-full mt-10 bg-custom-yellow rounded-lg text-sm px-5 py-2.5 text-center font-medium focus:outline-none text-white">
              LOGIN
            </button>
          </div>
        </form>

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
    </div>
  );
}

export default LoginForm;
