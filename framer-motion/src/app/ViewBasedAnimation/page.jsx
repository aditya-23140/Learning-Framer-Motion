"use client";
import React, { useRef, useEffect } from "react";
import { motion, useInView } from "motion/react";

const Page = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    console.log("Is in view -> ", isInView);
  }, [isInView]);

  return (
    <>
      <div className="h-[150vh]" />
      <motion.div
        className="h-[100vh] bg-amber-400"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <div
        ref={ref}
        className={`h-[100vh] ${isInView ? "bg-blue-500" : "bg-red-500"}`}
        style={{
          transition: "1s",
        }}
      />
    </>
  );
};

export default Page;
