import React from "react";

function Slider({img}) {
  return (
    <div className="mb-12 md:mb-0 md:w-8/12 h-full lg:w-6/12">
      <img
        src={`/images/${img}`}
        className="w-full h-full"
      />
    </div>
  );
}

export default Slider;
