import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../../config/axios";
import { toast } from "react-toastify";

const UpdatePassword = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
            email:email
        },
    });

    const newPassword = watch("newPassword");

    const onSubmit = async (data) => {
        if (data) {
            try {
                const response = await axios.post("/api/auth/update/password", data);
                if (response.status === 200) {
                    toast.success("Password updated successfully!! Login with the new password");
                    navigate("/");
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
                <h5 className="mb-12 mt-1 pb-1 text-xl text-white font-semibold text-center">
                    Update your password
                </h5>
                <form onSubmit={ handleSubmit(onSubmit) }>
                    <div>
                        <label
                            htmlFor="newPassword"
                            className="block text-sm font-medium leading-6 text-white"
                        >
                            New Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                autoComplete="new-password"
                                { ...register("newPassword", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters long",
                                    },
                                }) }
                                className={ `block h-40 w-full py-2 px-4 rounded-md border-0 py-1.5 text-white shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 ${ errors.newPassword ? "border-red-500" : ""
                                    }` }
                                style={ { backgroundColor: "#414160" } }
                            />
                            { errors.newPassword && (
                                <small className="mt-2 text-red-500 text-sm">
                                    { errors.newPassword.message }
                                </small>
                            ) }
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium leading-6 text-white font-normal"
                        >
                            Confirm Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                { ...register("confirmPassword", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters long",
                                    },
                                    validate: (value) =>
                                        value === newPassword || "Passwords do not match",
                                }) }
                                className={ `block h-40 w-full py-2 px-4 rounded-md border-0 py-1.5 text-white shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 ${ errors.confirmPassword ? "border-red-500" : ""
                                    }` }
                                style={ { backgroundColor: "#414160" } }
                            />
                            { errors.confirmPassword && (
                                <small className="mt-2 text-red-500 text-sm">
                                    { errors.confirmPassword.message }
                                </small>
                            ) }
                        </div>
                    </div>
                    <input type="hidden" name="email" id="email" value={ email } />
                    <div>
                        <button
                            className="rounded-lg h-40 w-full mt-10 bg-custom-yellow rounded-lg text-sm px-5 py-2.5 text-center font-medium focus:outline-none text-white"
                            type="submit"
                        >
                            SEND
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-custom-slate">
                    Back to{ " " }
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
};

export default UpdatePassword;
