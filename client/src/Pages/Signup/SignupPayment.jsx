import React from "react";
import Payment from "../../Components/Signup/Payment";
import Slider from "../../Components/Slider";

function SignupPayment() {
  return (
    <section className="h-screen custom-blue">
      <div className="container h-full px-6 py-24">
        <div className="g-6 flex h-full flex-wrap justify-center lg:justify-between">
          <Payment />
          <Slider img="Full-Body-Workout.png" />
        </div>
      </div>
    </section>
  );
}

export default SignupPayment;
