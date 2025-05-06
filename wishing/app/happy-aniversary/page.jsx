"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Cake from "@/public/Cake.png";
import pic1 from "@/public/pic1.jpg";
import pic2 from "@/public/pic2.jpg";
import pic3 from "@/public/pic3.jpg";

const images = [pic1, pic2, pic3];

const colors = [
  "bg-red-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-yellow-400",
  "bg-pink-400",
  "bg-purple-500",
];

function ConfettiPiece({ x, delay }) {
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <motion.div
      initial={{ y: -100, opacity: 1, rotate: 0 }}
      animate={{ y: "100vh", opacity: 0, rotate: 720 }}
      transition={{
        duration: 4,
        delay: delay,
        ease: "easeInOut",
      }}
      className={`absolute w-2 h-4 ${color} rounded-md z-0`}
      style={{ left: `${x}%` }}
    />
  );
}

export default function CakePage() {
  const [begin, setBegin] = useState(true);
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [confetti, setConfetti] = useState([]);
  const message = "Happy 25th Aniversary!";
  const letters = message.split("");

  useEffect(() => {
    const pieces = Array.from({ length: 200 }).map(() => ({
      x: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setConfetti(pieces);
  }, []);

  useEffect(() => {
    if (begin) {
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * images.length);
        setCurrentImage(images[randomIndex]);
      }, 1000);

      const timeOut = setTimeout(() => clearInterval(interval), 4000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeOut);
      };
    }
  }, [begin]);

  return (
    <div className="overflow-hidden">
      <div className="absolute w-full h-screen overflow-hidden pointer-events-none">
        {confetti.map((piece, i) => (
          <ConfettiPiece key={i} x={piece.x} delay={piece.delay} />
        ))}
      </div>
      {begin && (
        <>
          {letters.map((char, i) => {
            const angle = (180 / letters.length) * i - 85; // centered arc
            const radius = "20vw"; // responsive radius
            const fontSize = "clamp(1.5rem, 6vw, 3.5rem)"; // responsive font size

            return (
              <span
                key={i}
                className="absolute left-1/2 top-[24vw] -translate-x-1/2 origin-bottom font-bold"
                style={{
                  transform: `rotate(${angle}deg) translateY(-${radius})`,
                  fontSize: fontSize,
                }}
              >
                {char}
              </span>
            );
          })}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{
              opacity: [1, 1, 1, 0],
              rotateZ: [0, 10, 0, -10],
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              times: [0.25, 0.5, 0.75, 1],
            }}
            onAnimationComplete={() => setBegin(false)}
            className="flex justify-center items-center p-10 rounded-2xl h-screen"
          >
            <motion.div className="p-4 bg-[#ffffff0f] rounded-2xl">
              <Image
                src={currentImage}
                width={220}
                height={120}
                alt="pic1"
                className="rounded-lg"
              />
            </motion.div>
          </motion.div>
        </>
      )}
      {!begin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.1, 0.3, 1] }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            times: [0, 0.5, 0.7, 1],
          }}
          className="min-h-screen bg-gradient-to-b from-[#90866b] to-[#d0c6ad] flex items-center justify-center relative"
        >
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
        </motion.div>
      )}
    </div>
  );
}
