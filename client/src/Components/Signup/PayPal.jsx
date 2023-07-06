import React, { useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Paypal = () =>{
    const paypal = useRef();
    const navigate = useNavigate();
    const user = useSelector((state) => state.loggedUser.userInfo)

    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "New Regsitration",
                                amount: {
                                    currency_code: "USD",
                                    value: 1000.0,
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    if (order.status === "COMPLETED") {
                        // const updateUser = axios.post(`/api/admin/payment-update/${user._id}`)
                        toast.success("Payment completed successfully")
                        navigate("/login")
                    }
                    console.log(order);
                },
                onError: (err) => {
                    console.log(err);
                },
            })
            .render(paypal.current);
    }, []);

    return paypal;
}