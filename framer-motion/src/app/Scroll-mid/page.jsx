"use client";
import { useState } from "react";
import CoolNavbar from "@/Components/CoolNavbar";
import useMousePosition from "@/utils/useMousePosition";
import { motion } from "motion/react";

const App = () => {
  const [showHeader, setShowHeader] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 400 : 40; //mask size to make it center the cursor
  return (
    <>
      <CoolNavbar
        navItems={["Home", "Works", "About", "Contacts"]}
        showHeader={showHeader}
        setShowHeader={setShowHeader}
      />
      {showHeader && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "circIn" }}
          className="h-[100vh] cursor-none"
        >
          <motion.div
            animate={{
              WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
              WebkitMaskSize: `${size}px`
            }}
            transition={{
              type: "tween",
              ease: "backOut",
            }}
            className="w-[100%] h-[100%] flex items-center justify-center text-[64px] leading-[66px] absolute [mask-image:url(/mask.svg)] mask-no-repeat [mask-size:40px] bg-[#ec4e39] text-black"
          >
            <p
              className="w-[1000px] p-[40px]"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              A visual designer - with skills that haven't been replaced by A.I
              (yet) - making good shit only if the paycheck is equally good.
            </p>
          </motion.div>
          <div className="w-[100%] h-[100%] flex items-center justify-center text-[#afa18f] text-[64px] leading-[66px] cursor-default">
            <p className="w-[1000px] p-[40px]">
              I'm a <span className="text-[#ec4e39]">selectively skilled</span>{" "}
              product designer with strong focus on producing high quality &
              impactful digital experience.
            </p>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default App;
