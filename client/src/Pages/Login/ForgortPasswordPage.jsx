import React from 'react'
import Slider from '../../Components/Slider'
import ForgotPassword from '../../Components/Login/ForgotPassword'

export default function ForgortPasswordPage() {
  return (
    <section className="h-screen custom-blue">
      <div className="container h-full px-6 py-24">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <ForgotPassword/>
          <Slider img="Full-Body-Workout.png"/>
        </div>
      </div>
    </section>
  )
}
