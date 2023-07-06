import React from "react";
import SignupForm  from "../../Components/Signup/SignupForm";
import Slider from "../../Components/Slider";

export default function SignupPage() {
  return (
    <section className="custom-blue">
      <div className="container h-screen px-6 py-24">
        <div className="g-6 flex h-4/5 flex-wrap items-center justify-center lg:justify-between">
          <SignupForm />
          <Slider img="signup-img.jpg"/>
        </div>
      </div>
    </section>
  );
}
