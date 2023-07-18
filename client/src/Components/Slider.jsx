import React from "react";

function Slider({ img }) {
  return (
    <div className="mb-12 md:mb-0 md:w-8/12 h-full lg:w-6/12 hidden lg:block">
      <img src={`/images/${img}`} className="w-full h-full" alt="Slider Image" />
    </div>
  );
}

export default Slider;
