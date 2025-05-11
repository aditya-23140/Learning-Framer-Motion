"use client";
import React, { useState } from "react";
import { motion, MotionConfig, AnimatePresence } from "motion/react";
import { easeIn, easeInOut } from "motion";
import { Rocket } from "lucide-react";
import Link from "next/link";
import HoverUnderline from "@/Components/HoverUnderline";

const navItems = ["Home", "Works", "About", "Contacts"];
const imgLinks = [
  "https://plus.unsplash.com/premium_photo-1683910767532-3a25b821f7ae?q=80&w=2008&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1709884735626-63e92727d8b6?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1591779051696-1c3fa1469a79?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1544894079-e81a9eb1da8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1505968409348-bd000797c92e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  const boxes = [];
  for (let i = 0; i < 16; i++) {
    const randomImg = imgLinks[Math.floor(Math.random() * imgLinks.length)];
    boxes.push(
      <motion.div
        initial={{ opacity: 0.3, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        key={i}
        className={`md:h-[250px] md:w-[250px] h-[10rem] w-[10rem] bg-[#9b9b9b] rounded-md bg-cover bg-center`} //Tailwind cannot parge dynamically generated bg-url(${var}})
        style={{
          backgroundImage: `url(${randomImg})`,
        }}
      ></motion.div>
    );
  }

  const handleClick = () => setIsOpen(!isOpen);

  return (
    <>
      <motion.div
        initial={{
          scale: 2,
          top: "50%",
          left: "50%",
          position: "absolute",
          zIndex: 50,
          opacity: 1,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: 1,
          top: 20,
          left: 16,
          position: "fixed",
          translateX: "0%",
          translateY: "0%",
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          times: [0, 1],
        }}
        onAnimationComplete={() => setShowHeader(true)}
        className="text-xl flex gap-2.5 items-center text-[#f7b0e3]"
      >
        <Rocket color="#ff1c51" /> CompanyName
      </motion.div>

      {/* backdrop-blur-md bg-opacity-70 border-b border-white/10 for glassmorphism */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: easeIn }}
        className={`sticky top-0 bg-[#0a0a0aa4] py-3 min-h-16 px-4 flex justify-between z-30 backdrop-blur-sm border-b border-white/10 ${
          isOpen
            ? "max-md:flex-col max-md:gap-8 max-md:items-start"
            : "flex-row items-center"
        }`}
      >
        <motion.div className="text-xl flex gap-2.5 items-center text-[#f7b0e3] opacity-0">
          <Rocket color="#ff1c51" /> CompanyName
        </motion.div>
        <div className="md:flex md:justify-between lg:w-[60vw] md:w-[65vw] items-center hidden">
          <ul className="flex gap-10 text-shadow-lg text-base">
            <MotionConfig
              transition={{
                duration: 0.125,
                ease: "easeIn",
              }}
            >
              {navItems.map((item) => (
                <Link key={item} href={`/${item.toLowerCase()}`}>
                  <HoverUnderline children={item} />
                </Link>
              ))}
            </MotionConfig>
          </ul>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              duration: 0.125,
              ease: "easeIn",
            }}
            className="bg-[#1a1a1a62] border border-white px-4 py-2 text-center cursor-pointer rounded-lg text-sm"
          >
            Sign In / Sign Up
          </motion.button>
        </div>
        {/* Hamburger Icon */}
        <button
          onClick={handleClick}
          className="md:hidden flex flex-col justify-center items-center absolute right-4 top-7 cursor-pointer"
        >
          <span
            className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
              isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
            }`}
          />
          <span
            className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
              isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
            }`}
          />
        </button>
        {/*Mobile view*/}
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            layout
            transition={{
              duration: 0.7,
              ease: easeInOut,
            }}
            className="md:hidden flex-col items-start justify-center px-4 flex"
          >
            <ul className="flex flex-col gap-2 text-shadow-lg text-base mb-4">
              <MotionConfig
                transition={{
                  duration: 0.125,
                  ease: "easeIn",
                }}
              >
                {navItems.map((item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="w-fit"
                  >
                    <HoverUnderline children={item} />
                  </Link>
                ))}
              </MotionConfig>
            </ul>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                duration: 0.125,
                ease: "easeIn",
              }}
              className="bg-[#1a1a1a62] border border-white px-4 py-2 text-center cursor-pointer rounded-lg -left-4 relative"
            >
              Sign In / Sign Up
            </motion.button>
          </motion.div>
        )}
      </motion.header>

      {showHeader && (
        <motion.div
          initial={{
            y: 300,
            opacity: 0,
          }}
          animate={{
            y: [300, -20, 0],
            opacity: [0, 1, 1],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
          }}
          className="md:m-10 m-3"
        >
          {/* bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text use this for gradient text */}
          <h1 className="text-center md:text-[6rem] text-[3rem] font-bold font-[family-name:var(--font-geist-sans)] bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text">
            Hello, World!
          </h1>
          <div className="flex flex-wrap gap-4 justify-center">{boxes}</div>
        </motion.div>
      )}
    </>
  );
};

export default Page;
