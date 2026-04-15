import React from "react";
import Image1 from "../../assets/logo.png";

const Hero = () => {
  return (
    <div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-950 flex justify-center items-center text-white">    
      <div className="h-[700px] w-[700px] bg-black absolute -top-1/2 left-1/2 -translate-x-1/2 rounded-3xl rotate-45"></div>
      <div className="absolute top-[60px] left-1/2 -translate-x-1/2 z-10">
        <img
          src={Image1}
          alt="Logo"
          className="w-[180px] h-[180px] object-contain"
        />
      </div>
      {/* Hero section */}
      <div className="container pb-8 sm:pb-0 relative z-10 mt-[220px]">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Text section */}
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-amber-400">
              Imperial Hanger
            </h1>
            <p className="text-sm text-gray-300">
              The galaxy's finest ships, weapons and crew for hire.
            </p>
            <div>
              <button className="hover:scale-105 duration-200 text-white py-2 px-4 rounded-full border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-gray-950">
                Order now
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Hero;