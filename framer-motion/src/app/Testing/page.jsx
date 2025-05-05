"use client";
import React from "react";
import Navbar from "@/Components/Navbar";

const Page = () => {
  return (
    <>
      <Navbar />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] mb-[100vh]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <h1 className="text-[8rem] font-bold">Hello, World</h1>
        </main>
      </div>
    </>
  );
};

export default Page;
