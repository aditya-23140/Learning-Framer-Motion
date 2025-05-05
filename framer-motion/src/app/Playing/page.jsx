"use client";
import React, { useState } from "react";
import { motion, MotionConfig, AnimatePresence } from "motion/react";
import { easeIn, easeInOut } from "motion";
import { Rocket } from "lucide-react";
import Link from "next/link";
import HoverUnderline from "@/Components/HoverUnderline";

const navItems = ["Home", "Works", "About", "Contacts"];

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(!isOpen);

  return (
    <>
      <motion.div
        initial={{
          scale: 3,
          top: "42%",
          left: "42%",
          position: "absolute",
          zIndex: 50,
          opacity: 1,
        }}
        animate={{
          scale: 1,
          top: 20,
          left: 16,
          position: "fixed",
          // opacity: 0.3,
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          times: [0, 1],
        }}
        className="text-xl flex gap-2.5 items-center text-[#f7b0e3]"
      >
        <Rocket color="#ff1c51" /> CompanyName
      </motion.div>

      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: easeIn }}
        className={`sticky top-0 bg-[#212121f4] py-3 min-h-16 px-4 flex justify-between ${
          isOpen
            ? "max-md:flex-col max-md:gap-8 max-md:items-start"
            : "flex-row items-center"
        }`}
      >
        <motion.div className="text-xl flex gap-2.5 items-center text-[#f7b0e3] opacity-0">
          <Rocket color="#ff1c51" /> CompanyName
        </motion.div>
        <div className="md:flex md:justify-between md:w-[60vw] items-center hidden">
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
            transition={{
              duration: 0.125,
              ease: "easeIn",
            }}
            className="bg-[#1a1a1a62] border border-white px-4 py-2 text-center cursor-pointer rounded-lg"
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
                  <Link key={item} href={`/${item.toLowerCase()}`} className="w-fit">
                    <HoverUnderline children={item} />
                  </Link>
                ))}
              </MotionConfig>
            </ul>
            <motion.button
              whileHover={{ scale: 1.05 }}
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
    </>
  );
};

export default Page;
