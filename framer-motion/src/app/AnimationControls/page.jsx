"use client";
import React from "react";
import { motion, useAnimationControls } from "motion/react";

const AnimationControls = () => {
  const flipControls = useAnimationControls();

  const handleClick = () => {
    flipControls.start("flip");
  };

  return (
    <div
      style={{
        display: "grid",
        placeContent: "center",
        height: "100vh",
        gap: "0.8rem",
      }}
    >
      <div className="h-[180px] items-center flex flex-col gap-3.5">
        <button onClick={handleClick} className="example-btn cursor-pointer">
          Flip it!
        </button>
        <motion.div
          className="w-[150px] h-[150px] bg-white"
          variants={{
            initial: {
              rotate: "0deg",
            },
            flip: {
              rotate: "360deg",
            },
          }} // variants is like a class
          // whileHover="flip"
          initial="initial"
          animate={flipControls}
        ></motion.div>
      </div>
    </div>
  );
};

export default AnimationControls;
