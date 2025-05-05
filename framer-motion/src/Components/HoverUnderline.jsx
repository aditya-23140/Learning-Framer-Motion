"use client";

import React, { useState } from "react";
import { motion } from "motion/react";

const HoverUnderline = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.li
      whileHover={{
        scale: 1.125,
        // rotate: "-2deg",
        color: "#9999ff",
        // textShadow: "0px 0px 4px #9999ff90", //Adds glow effect
      }}
      whileTap={{ scale: 0.85, rotate: "-2.5deg" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative"
    >
      <span>{children}</span>
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-[#ff6262] w-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{
          originX: 0, // start from Left
        }}
      />
    </motion.li>
  );
};

export default HoverUnderline;
