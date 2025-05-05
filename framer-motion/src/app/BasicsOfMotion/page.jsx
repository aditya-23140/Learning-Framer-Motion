"use client";
import React from "react";
import { motion, AnimatePresence } from "motion/react";

const Page = () => {
  const [isVisible, setIsVisible] = React.useState(true);

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
        <motion.button
          className="example-btn"
          onClick={() => setIsVisible(!isVisible)}
          whileTap={{ y: 1 }}
          layout //it is used when any motion componenet moves from one place to another
        >
          {isVisible ? "Hide" : "Show"}
        </motion.button>
        {/* popLayout removes the dom of div first then do animation check more at https://motion.dev/docs/react-animate-presence*/}
        <AnimatePresence mode="popLayout">
          {isVisible ? (
            <motion.div
              initial={{
                rotate: "0deg",
                scale: 0,
                y: 0, //same as translateY
              }}
              //https://motion.dev/docs/animate it applies when mounted
              animate={{
                rotate: "180deg",
                scale: 1,
                y: [0, 150, -150, -150, 0], //when we want our component to move like down to 150 then up to -150 and stay there then back to 0
              }}
              //exit applies when unmounting and we need to import AnimatePresence
              exit={{
                rotate: "0deg",
                scale: 0,
              }}
              transition={{
                duration: 1,
                // type: "spring", //to add physics like feature
                // damping: 8, //0 - 10 value defines how springy it is http://motion.dev/docs/spring check docs
                ease: "easeIn",
                times: [0, 0.25, 0.5, 0.85, 1], //times property set how long each value in y stays like keyframes its between 0 and 1 and it is multiplied with duration
              }}
              className="w-[150px] h-[150px] bg-white"
            ></motion.div>
          ) : (
            ""
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Page;
