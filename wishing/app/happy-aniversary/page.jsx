"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Cake from "@/public/Cake.png";

export default function CakePage() {
  const message = "Happy 25th Aniversary!";
  const letters = message.split("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#90866b] to-[#d0c6ad] flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center gap-[-10px] relative"
      >
        {/* === Message === */}

        {letters.map((char, i) => {
          const angle = (180 / letters.length) * i - 85; // centered arc
          const radius = "30vw"; // responsive radius
          const fontSize = "clamp(1.5rem, 6vw, 3.5rem)"; // responsive font size

          return (
            <span
              key={i}
              className="absolute left-1/2 top-[24vw] -translate-x-1/2 origin-bottom font-bold text-[#6c5742]"
              style={{
                transform: `rotate(${angle}deg) translateY(-${radius})`,
                fontSize: fontSize,
              }}
            >
              {char}
            </span>
          );
        })}
        {/* === Cake === */}
        <div className="velas">
          <div className="fuego"></div>
          <div className="fuego"></div>
          <div className="fuego"></div>
          <div className="fuego"></div>
          <div className="fuego"></div>
        </div>
        <Image
          src={Cake}
          width={250}
          height={350}
          alt="cake"
          className="relative -bottom-20"
        />
      </motion.div>
    </div>
  );
}
