import React from "react";
import ProfileComplete from "../../Components/Signup/ProfileComplete";
import Slider from "../../Components/Slider";

export default function ProfileCompletePage() {
  return (
    <section className="min-h-screen custom-blue">
      <div className="container px-6 py-24">
        <div className="g-6 flex h-full flex-wrap justify-center lg:justify-between">
          <ProfileComplete className="h-screen"/>
          <Slider img="Full-Body-Workout.png" />
        </div>
      </div>
    </section>
  );
}
