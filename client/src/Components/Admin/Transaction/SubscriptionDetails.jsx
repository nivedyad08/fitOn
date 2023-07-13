import React, { useMemo, useState, useEffect } from "react";
import Table from "../Table";
import { useSelector } from 'react-redux';
import { ArrowBackOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { dateMonthYear } from "../../../helpers/CommonFunctions";

const SubscriptionDetails = () => {
    const navigate = useNavigate("")
    const { transactionInfo } = useSelector((state) => {
        return state.transactionDetails
    })
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-GB');

    return (
        <>
            <div className="back text-blue-950 cursor-pointer" onClick={ () => navigate(-1) }>
                <ArrowBackOutlined />
                Go back
            </div>
            <div className="bg-gray-100 border mx-30 border-gray-300 rounded-lg shadow-xl py-60 p-80">
                <div className="px-5 pb-12">
                    <div className="mb-2">
                        <h1 className="text-3xl md:text-3xl font-bold text-gray-600">Membership Details</h1>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="px-3">
                        {/* Product Details */ }
                        <div className="w-full mx-auto text-gray-600 font-light mb-6 pb-6">
                            {/* Product Image */ }
                            <div className="w-full flex items-center">
                                <div className="flex-grow pl-3">
                                    <h6 className="font-semibold capitalize tracking-wide text-gray-600">Fiton membership { transactionInfo.package.name }</h6>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-600 text-base">{ transactionInfo.package.duration } Months</span>
                                </div>
                            </div>
                        </div>
                        {/* Order Summary */ }
                        <div className="mb-6 pb-6 border-b border-gray-200 text-gray-600">
                            <div className="w-full flex mb-3 items-center">
                                <div className="flex-grow mb-10">
                                    <span className="text-gray-600">Trainer</span>
                                </div>
                                <div className="pl-3">
                                    <span className="font-semibold">sdfsd</span>
                                </div>
                            </div>
                            <div className="w-full flex mb-3 items-center">
                                <div className="flex-grow mb-10">
                                    <span className="text-gray-600">Subtotal</span>
                                </div>
                                <div className="pl-3">
                                    <span className="font-semibold">${ transactionInfo.package.price }</span>
                                </div>
                            </div>
                            <div className="w-full flex items-center">
                                <div className="flex-grow mb-20">
                                    <span className="text-gray-400">Taxes (GST)</span>
                                </div>
                                <div className="pl-3">
                                    <span className="font-semibold text-gray-400">{ transactionInfo.subscription.gst } %</span>
                                </div>
                            </div>
                            {/* Total */ }
                            <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-600 text-xl">
                                <div className="w-full flex items-center">
                                    <div className="flex-grow">
                                        <span className="text-gray-600">Total</span>
                                    </div>
                                    <div className="pl-3">
                                        <span className="font-semibold">${ transactionInfo.subscription.totalAmount }</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-3">
                        {/* Shipping/Billing Details */ }
                        <div className="w-full mx-auto rounded-lg bg-gray-200 border border-gray-400  text-gray-800 font-light mb-6 py-6">
                            <div className="w-full flex-col mb-3 items-center">
                                <div className="flex-grow pl-3 block w-full py-2 px-4 rounded-md border-0 text-gray-700 font-semibold shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6">
                                    <span>{ transactionInfo.user.firstName } { transactionInfo.user.lastName }</span>
                                </div>
                                <div className="w-96">
                                    <span className="block text-xl w-full py-2 px-4 rounded-md border-0 text-gray-700 font-semibold shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6">{ transactionInfo.user.email }</span>
                                </div>
                            </div>
                        </div>
                        {/* Payment Method */ }
                        <form>
                            <div className="w-full mx-auto rounded-lg border border-gray-400 text-gray-800 font-light mb-6">
                                <div className="w-full p-3">
                                    <div>
                                        <div className="mb-6">
                                            <label className="text-gray-600 font-semibold text-sm mb-6 ml-1">Billing Address</label>
                                            <div>
                                                <textarea
                                                    type="text"
                                                    name="address"
                                                    className="w-full text-gray-600 bg-gray-200 px-3 py-2 mt-10 mb-1 border rounded-md font-medium focus:outline-none transition-colors ${ errors.address"
                                                    row={ 4 }
                                                    disabled readonly
                                                    defaultValue={ transactionInfo.subscription.address }
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Phone number</label>
                                            <div>
                                                <input
                                                    placeholder="00 000 00000"
                                                    type="text"
                                                    name='phone'
                                                    className="w-full font-semibold text-gray-600 bg-gray-200 px-3 py-6 mb-1 border rounded-md focus:outline-none transition-colors"
                                                    defaultValue={ transactionInfo.subscription.phone }
                                                    disabled readonly
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}


export default SubscriptionDetails;
