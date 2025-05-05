"use client";
import React from "react";
import { MotionConfig, motion } from "motion/react";

const Gestures = () => {
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
        <MotionConfig
          transition={{
            duration: 0.125,
            ease: "easeIn",
          }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95, rotate: "2.5deg" }}
            className="example-btn cursor-pointer "
          >
            Click Me!
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85, rotate: "-2.5deg" }}
            className="example-btn cursor-pointer "
            style={{ backgroundColor: "black", color: "white" }}
          >
            Click Me!
          </motion.button>
        </MotionConfig>
      </div>
    </div>
  );
};

export default Gestures;
