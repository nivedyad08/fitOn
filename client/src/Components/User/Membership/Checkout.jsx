import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { pro, ultimate } from "../../../constants/pricingPlans"
import usePaymentEffect from '../../CustomHooks/usePaymentEffect';
import { useSelector } from 'react-redux';
import axios from "../../../config/axios"
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux"
import { loggedUserDetails } from "../../redux-toolkit/slices/userSlice";

const Checkout = () => {
    const { mode } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isDetails, setDetails] = useState("")
    const user = useSelector((state) => state.loggedUser.userInfo)
    const trainer = useSelector((state) => state.trainerDetails.trainerInfo)

    const paypal = useRef();
    const submitRef = useRef();
    const [checkout, setCheckOut] = useState(false);
    const [formdata, setFormdata] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            address: "",
            phone: "",
            package: mode,
        },
    });

    useEffect(() => {
        if (mode === "pro") {
            setDetails(pro)
        } else if (mode === "ultimate") {
            setDetails(ultimate)
        }
    }, [mode])

    const gstRate = 8; // Assuming GST rate of 10%
    const subtotal = isDetails.price
    const gstAmount = ((subtotal * gstRate) / 100).toFixed(2);
    const total = (parseFloat(gstAmount) + parseFloat(isDetails.price)).toFixed(2);

    const onSubmit = async (data) => {
        try {
            if (data) {
                submitRef.current.style.display = "none"
                setCheckOut(true)
                setFormdata(data)
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred. Please try again later");
            }
        }
    }

    const handlePaymentSuccess = async (order) => {
        try {
            const transactionId = order.id;
            const updateUserPayment = await axios.post(`/api/user/payment-update/${mode}?userId=${user._id}&trainerId=${trainer._id}`, { formdata, transactionId})

            if (updateUserPayment.status === 200) {
                if(updateUserPayment.data.user)
                    dispatch(loggedUserDetails(updateUserPayment.data.user));
                navigate("/user/trainers")
                toast.success("Payment completed successfully");
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred. Please try again later");
            }
        }
    }

    usePaymentEffect(checkout, paypal, handlePaymentSuccess, total);
    return (
        <div className="custom-blue py-36 p-80">
            <div className="px-5 pb-12">
                <div className="mb-2">
                    <h1 className="text-3xl md:text-5xl font-bold text-white">Checkout</h1>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="px-3">
                    {/* Product Details */ }
                    <div className="w-full mx-auto text-white font-light mb-6 pb-6">
                        {/* Product Image */ }
                        <div className="w-full flex items-center">
                            <div className="flex-grow pl-3">
                                <h6 className="font-semibold capitalize tracking-wide text-white">Fiton membership { mode }</h6>
                            </div>
                            <div>
                                <span className="font-semibold text-base text-white">{ isDetails.duration } Months</span>
                            </div>
                        </div>
                    </div>
                    {/* Order Summary */ }
                    <div className="mb-6 pb-6 border-b border-gray-200 text-white">
                    <div className="w-full flex mb-3 items-center">
                            <div className="flex-grow mb-10">
                                <span className="text-white">Trainer</span>
                            </div>
                            <div className="pl-3">
                                <span className="font-semibold">{ trainer.firstName } { trainer.lastName }</span>
                            </div>
                        </div>
                        <div className="w-full flex mb-3 items-center">
                            <div className="flex-grow mb-10">
                                <span className="text-white">Subtotal</span>
                            </div>
                            <div className="pl-3">
                                <span className="font-semibold">${ isDetails.price }</span>
                            </div>
                        </div>
                        <div className="w-full flex items-center">
                            <div className="flex-grow mb-20">
                                <span className="text-gray-400">Taxes (GST)</span>
                            </div>
                            <div className="pl-3">
                                <span className="font-semibold text-gray-400">${ gstAmount }</span>
                            </div>
                        </div>
                        {/* Total */ }
                        <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-white text-xl">
                            <div className="w-full flex items-center">
                                <div className="flex-grow">
                                    <span className="text-white">Total</span>
                                </div>
                                <div className="pl-3">
                                    <span className="font-semibold">${ total }</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-3">
                    {/* Shipping/Billing Details */ }
                    <div className="w-full mx-auto rounded-lg custom-blue-shade1 border border-gray-600  text-gray-800 font-light mb-6 py-6">
                        <div className="w-full flex mb-3 items-center">
                            <div className="w-96">
                                <span className="block text-xl w-full py-2 px-4 rounded-md border-0 text-gray-300 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6">Email</span>
                            </div>
                            <div className="flex-grow pl-3 block w-full py-2 px-4 rounded-md border-0 text-gray-300 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                <span>{ user.email }</span>
                            </div>
                        </div>
                    </div>
                    {/* Payment Method */ }
                    <form onSubmit={ handleSubmit(onSubmit) }>
                        <div className="w-full mx-auto rounded-lg border border-gray-400 text-gray-800 font-light mb-6">
                            <div className="w-full p-3">
                                <div>
                                    <div className="mb-6">
                                        <label className="text-white font-semibold text-sm mb-6 ml-1">Billing Address</label>
                                        <div>
                                            <textarea
                                                type="text"
                                                name="address"
                                                { ...register("address", {
                                                    required: "Address is required",
                                                }) }
                                                className={ `w-full text-white custom-blue-shade1 px-3 py-2 mt-10 mb-1 border rounded-md focus:outline-none transition-colors ${ errors.address ? "border-red-500" : ""
                                                    }` }
                                                row={ 4 }
                                            ></textarea>
                                            { errors.address && (
                                                <small className="mt-2 text-red-500 text-sm">
                                                    { errors.address.message }
                                                </small>
                                            ) }
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="text-white font-semibold text-sm mb-2 ml-1">Phone number</label>
                                        <div>
                                            <input
                                                placeholder="00 000 00000"
                                                type="text"
                                                name='phone'
                                                { ...register("phone", {
                                                    required: "Phone Number is required",
                                                }) }
                                                className={ `w-full text-white px-3 py-6 mb-1 border custom-blue-shade1  rounded-md focus:outline-none transition-colors ${ errors.phone ? "border-red-500" : ""
                                                    }` }
                                            />
                                            { errors.phone && (
                                                <small className="mt-2 text-red-500 text-sm">
                                                    { errors.phone.message }
                                                </small>
                                            ) }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* PayPal Payment */ }
                            <div className="w-full p-3">
                                <label className="flex items-center cursor-pointer">
                                    <h2>Pay with paypal</h2>
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                                        width="80"
                                        className="ml-3"
                                        alt=""
                                    />
                                </label>
                            </div>
                        </div>
                        {/* Payment Submit */ }
                        <div>
                            <button
                                className="block w-full max-w-xs mx-auto bg-yellow-500 hover:bg-yellow-600 focus:bg-indigo-700 text-white rounded-lg px-3 py-2 font-semibold" ref={ submitRef }
                            >
                                <i className="mdi mdi-lock-outline mr-1"></i> PAY NOW
                            </button>
                        </div>
                    </form>
                    { checkout ?
                        <div ref={ paypal }></div>
                        : ""
                    }
                </div>
            </div>
        </div>

    );
}

export default Checkout;
