import React from 'react';
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "../../config/axios";
import { toast } from "react-toastify";

const ChangePassword = () => {
    const user = useSelector((state) => state.loggedUser.userInfo)

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
            currentPassword: ""
        },
    });
    const { newPassword, confirmPassword, currentPassword } = watch(["newPassword", "confirmPassword", "currentPassword"])

    const onSubmit = async (data,e) => {
        try {
            if (data) {
                const response = await axios.post(`api/trainer/change/password?userId=${ user._id }`, data)
                if (response.status === 200) {
                    e.target.reset(); // Reset the form fields
                    toast.success("Password updated successfully");
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
    return (
        <form className='custom-blue px-10 py-6 rounded-md max-w-md mx-auto' onSubmit={ handleSubmit(onSubmit) }>
            <div className="space-y-2">
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full mt-10">
                            <label htmlFor="currentPassword" className="block text-sm font-lg leading-6 text-custom-whitish">
                                Current Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="currentPassword"
                                    type='password'
                                    name="currentPassword"
                                    placeholder='Enter your Current Password'
                                    { ...register("currentPassword", {
                                        required: "Current password is required",
                                    }) }
                                    className={ `block h-40 w-full rounded-md border-0 py-1.5 text-gray-200  ring-inset placeholder-gray-500 pl-4 placeholder-opacity-100  custom-blue-shade1 sm:text-sm sm:leading-6 ${ errors.currentPassword ? "border-red-500" : ""
                                        }` }
                                />
                                { errors.currentPassword && (
                                    <small className="mt-2 text-red-500 text-sm">
                                        { errors.currentPassword.message }
                                    </small>
                                ) }
                            </div>
                        </div>

                        <div className="col-span-full mt-10">
                            <label htmlFor="newPassword" className="block text-sm font-lg leading-6 text-custom-whitish">
                                New Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="newPassword"
                                    type='password'
                                    name="newPassword"
                                    placeholder='Enter your New Password'
                                    { ...register("newPassword", {
                                        required: "New password is required",
                                        pattern: {
                                            value: /((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/i,
                                            message: "Password must be strong",
                                        },
                                    }) }
                                    className={ `block h-40 w-full rounded-md border-0 py-1.5 text-gray-200  ring-inset placeholder-gray-500 pl-4 placeholder-opacity-100  custom-blue-shade1 sm:text-sm sm:leading-6 ${ errors.newPassword ? "border-red-500" : ""
                                        }` }
                                />
                                { errors.newPassword && (
                                    <small className="mt-2 text-red-500 text-sm">
                                        { errors.newPassword.message }
                                    </small>
                                ) }
                            </div>
                        </div>

                        <div className="col-span-full mt-10">
                            <label htmlFor="confirmPassword" className="block text-sm font-lg leading-6 text-custom-whitish">
                                Confirm Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="confirmPassword"
                                    type='password'
                                    name="confirmPassword"
                                    placeholder='Enter your Confirm Password'
                                    { ...register("confirmPassword", {
                                        required: "Confirm password is required",
                                        pattern: {
                                            value: /((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/i,
                                            message: "Password must be strong",
                                        },
                                    }) }
                                    className={ `block h-40 w-full rounded-md border-0 py-1.5 text-gray-200  ring-inset placeholder-gray-500 pl-4 placeholder-opacity-100  custom-blue-shade1 sm:text-sm sm:leading-6 ${ errors.confirmPassword ? "border-red-500" : ""
                                        }` }
                                />
                                { errors.confirmPassword && (
                                    <small className="mt-2 text-red-500 text-sm">
                                        { errors.confirmPassword.message }
                                    </small>
                                ) }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm custom-light-blue focus-visible:outline-2 focus-visible:outline-offset-2 rounded-md px-20 py-8 text-white font-semibold leading-6">
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded-md custom-yellow px-20 py-8 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Update
                </button>
            </div>
        </form>
    );
}

export default ChangePassword;
