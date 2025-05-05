import React from "react";
import { Rocket } from "lucide-react";
import Link from "next/link";
import { motion, MotionConfig } from "motion/react";
import HoverUnderline from "@/Components/HoverUnderline";

const Navbar = (props) => {
  console.log(props);
  return (
    <header className="sticky top-0 bg-[#212121f4] h-16 px-8 flex items-center justify-between">
      <div className="text-xl flex gap-2.5 items-center text-[#f7b0e3]">
        <Rocket color="#ff1c51" /> {props.title}
      </div>
      <ul className="flex gap-10 text-shadow-lg text-base">
        <MotionConfig
          transition={{
            duration: 0.125,
            ease: "easeIn",
          }}
        >
          <Link href={"./Testing"}>
            <HoverUnderline children={"Home"} />
          </Link>
          <Link href={"./Testing"}>
            <HoverUnderline children={"Works"} />
          </Link>
          <Link href={"./Testing"}>
            <HoverUnderline children={"About"} />
          </Link>
          <Link href={"./Testing"}>
            <HoverUnderline children={"Contacts"} />
          </Link>
        </MotionConfig>
      </ul>
      <motion.button
        whileHover={{ scale: 1.1 }}
        transition={{
          duration: 0.125,
          ease: "easeIn",
        }}
        className="bg-[#8839d7] px-4 py-2 text-center cursor-pointer rounded-lg"
      >
        Sign In
      </motion.button>
    </header>
  );
};

export default Navbar;
