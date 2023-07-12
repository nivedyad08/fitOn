import { useForm } from 'react-hook-form';
import axios from "../../config/axios";
import { toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { PENDING_TRAINER } from "../../constants/roles";
import React from 'react';

const SignupEmailVerification = ({ email, user }) => {
    console.log(user);
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            otp: ""
        }
    });
    const validateOtp = async (data) => {
        try {
            const response = await axios.post(`api/auth/user/validate-otp?userId=${user._id}`, data);
            if (response && response.status === 200) {
                toast.success("User Registered Successfully");
                if (user.role === PENDING_TRAINER) {
                    navigate(`/profile-complete/${ user.firstName }/${ user._id }`);
                } else {
                    navigate('/login');
                }
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
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <h5 className="mb-12 mt-1 pb-1 text-xl text-white font-semibold text-center">
                Email Verification
            </h5>
            <p className="text-md text-center font-normal leading-relaxed text-green-300"> We've sent a verification code to your <br />email-{ email }</p>
            <form onSubmit={ handleSubmit(validateOtp) }>
                <div className="mt-2">
                    <input
                        id="otp"
                        name="otp"
                        placeholder='Enter the OTP'
                        { ...register("otp", {
                            required: "OTP is required",
                        }) }
                        className={ `block h-40 w-full py-2 px-4 rounded-md border-0 text-white shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 ${ errors.otp ? "border-red-500" : ""
                            }` }
                        style={ { backgroundColor: "#414160" } }
                    />
                    { errors.otp && (
                        <small className="mt-2 text-red-500 text-sm">
                            { errors.otp.message }
                        </small>
                    ) }
                </div>
                <div>
                    <button className="rounded-lg h-40 w-full mt-10 bg-custom-yellow text-sm px-5 py-2.5 text-center font-medium focus:outline-none text-white">
                        VERIFY
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
    );
}

export default SignupEmailVerification;
