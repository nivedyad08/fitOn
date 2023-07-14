import React, { useRef, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../../config/axios";
import Slider from "../../Components/Slider";
import Payment from "../../Components/Signup/Payment";

function SignupPayment() {
  const paypal = useRef();
  const navigate = useNavigate();
  const user = useSelector((state) => state.signupUserDetails.signupInfo);
  console.log(user);
  const [checkout, setCheckOut] = useState(false);

  useEffect(() => {
    if (checkout) {
      window.paypal
        .Buttons({
          createOrder: (data, actions, err) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description: "New Registration",
                  amount: {
                    currency_code: "USD",
                    value: 1000.0,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            try {
              const order = await actions.order.capture();
              const transactionId = order.id
              console.log(order);
              if (order.status === "COMPLETED") {
                const updateUserPayment = await axios.post(`/api/auth/user/payment-update/${ user._id }`, { transactionId: transactionId });
                if (updateUserPayment.status === 200) {
                  toast.success("Payment completed successfully");
                  navigate("/login");
                }
              }
            } catch (error) {
              if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message);
              } else {
                toast.error("An error occurred. Please try again later");
              }
            }
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(paypal.current);
    }
  }, [checkout]);

  return (
    <section className="custom-blue">
      <div className="container h-full px-6 py-24">
        <div className="g-6 flex h-full flex-wrap justify-center lg:justify-between">
          <Payment ref={ paypal } checkout={ checkout } setCheckOut={ setCheckOut } />
          <Slider img="Full-Body-Workout.png" />
        </div>
      </div>
    </section>
  );
}

export default SignupPayment;
