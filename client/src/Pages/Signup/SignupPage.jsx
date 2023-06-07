import React from "react";
import SignupForm  from "../../Components/Signup/SignupForm";
import Slider from "../../Components/Slider";

export default function SignupPage() {
  return (
    <section className="h-screen custom-blue">
      <div className="container h-full px-6 py-24">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <SignupForm />
          <Slider img="signup.jpg"/>
        </div>
      </div>
    </section>
  );
}
