"use client";
import React from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

const Page = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress); //take in some static value and give springy effect

  const background = useTransform(
    scrollYProgress,
    [0, 1],
    ["#00bba8", "#d5dd97"]
  ); //first argument: what basis change, second: at what %change, third: what chages to make   https://motion.dev/docs/react-use-transform

  return (
    <div className="px-16 py-8">
      <motion.div
        style={{
          // scaleX: scrollYProgress,
          scaleX,
          // backgroundColor: "#00bba8",
          background,
          transformOrigin: "left",
          position: "sticky",
          top: 0,
          width: "100%",
          height: "20px",
        }}
      />
      <div className="max-w-[700px] m-auto">
        <p className="mb-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias debitis
          mollitia obcaecati quisquam. Harum sapiente consequatur reiciendis
          atque quam ducimus itaque sit nihil ab totam, eos vitae sunt est.
          Beatae libero nemo odio nesciunt facilis doloribus itaque recusandae
          necessitatibus perspiciatis quasi. Doloribus consectetur ducimus eos
          modi quo, amet voluptas. Voluptas enim laboriosam quis dolorum in
          sunt, quisquam dolor accusamus atque debitis dolore officia cupiditate
          molestias velit voluptatum odit distinctio ratione ad eos optio hic.
          Doloremque numquam vero necessitatibus provident saepe dolorem,
          reiciendis delectus quasi ex sed? Fugit, qui. Laborum distinctio ab
          quod aut. Incidunt iusto delectus quos dignissimos, deleniti adipisci
          quasi vitae voluptas impedit doloremque at modi sit inventore, sunt,
          nemo praesentium laborum nobis suscipit rerum atque ut itaque.
        </p>
        <p className="mb-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias debitis
          mollitia obcaecati quisquam. Harum sapiente consequatur reiciendis
          atque quam ducimus itaque sit nihil ab totam, eos vitae sunt est.
          Beatae libero nemo odio nesciunt facilis doloribus itaque recusandae
          necessitatibus perspiciatis quasi. Doloribus consectetur ducimus eos
          modi quo, amet voluptas. Voluptas enim laboriosam quis dolorum in
          sunt, quisquam dolor accusamus atque debitis dolore officia cupiditate
          molestias velit voluptatum odit distinctio ratione ad eos optio hic.
          Doloremque numquam vero necessitatibus provident saepe dolorem,
          reiciendis delectus quasi ex sed? Fugit, qui. Laborum distinctio ab
          quod aut. Incidunt iusto delectus quos dignissimos, deleniti adipisci
          quasi vitae voluptas impedit doloremque at modi sit inventore, sunt,
          nemo praesentium laborum nobis suscipit rerum atque ut itaque.
        </p>
        <p className="mb-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias debitis
          mollitia obcaecati quisquam. Harum sapiente consequatur reiciendis
          atque quam ducimus itaque sit nihil ab totam, eos vitae sunt est.
          Beatae libero nemo odio nesciunt facilis doloribus itaque recusandae
          necessitatibus perspiciatis quasi. Doloribus consectetur ducimus eos
          modi quo, amet voluptas. Voluptas enim laboriosam quis dolorum in
          sunt, quisquam dolor accusamus atque debitis dolore officia cupiditate
          molestias velit voluptatum odit distinctio ratione ad eos optio hic.
          Doloremque numquam vero necessitatibus provident saepe dolorem,
          reiciendis delectus quasi ex sed? Fugit, qui. Laborum distinctio ab
          quod aut. Incidunt iusto delectus quos dignissimos, deleniti adipisci
          quasi vitae voluptas impedit doloremque at modi sit inventore, sunt,
          nemo praesentium laborum nobis suscipit rerum atque ut itaque.
        </p>
        <p className="mb-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias debitis
          mollitia obcaecati quisquam. Harum sapiente consequatur reiciendis
          atque quam ducimus itaque sit nihil ab totam, eos vitae sunt est.
          Beatae libero nemo odio nesciunt facilis doloribus itaque recusandae
          necessitatibus perspiciatis quasi. Doloribus consectetur ducimus eos
          modi quo, amet voluptas. Voluptas enim laboriosam quis dolorum in
          sunt, quisquam dolor accusamus atque debitis dolore officia cupiditate
          molestias velit voluptatum odit distinctio ratione ad eos optio hic.
          Doloremque numquam vero necessitatibus provident saepe dolorem,
          reiciendis delectus quasi ex sed? Fugit, qui. Laborum distinctio ab
          quod aut. Incidunt iusto delectus quos dignissimos, deleniti adipisci
          quasi vitae voluptas impedit doloremque at modi sit inventore, sunt,
          nemo praesentium laborum nobis suscipit rerum atque ut itaque.
        </p>
        <p className="mb-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias debitis
          mollitia obcaecati quisquam. Harum sapiente consequatur reiciendis
          atque quam ducimus itaque sit nihil ab totam, eos vitae sunt est.
          Beatae libero nemo odio nesciunt facilis doloribus itaque recusandae
          necessitatibus perspiciatis quasi. Doloribus consectetur ducimus eos
          modi quo, amet voluptas. Voluptas enim laboriosam quis dolorum in
          sunt, quisquam dolor accusamus atque debitis dolore officia cupiditate
          molestias velit voluptatum odit distinctio ratione ad eos optio hic.
          Doloremque numquam vero necessitatibus provident saepe dolorem,
          reiciendis delectus quasi ex sed? Fugit, qui. Laborum distinctio ab
          quod aut. Incidunt iusto delectus quos dignissimos, deleniti adipisci
          quasi vitae voluptas impedit doloremque at modi sit inventore, sunt,
          nemo praesentium laborum nobis suscipit rerum atque ut itaque.
        </p>
        <p className="mb-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias debitis
          mollitia obcaecati quisquam. Harum sapiente consequatur reiciendis
          atque quam ducimus itaque sit nihil ab totam, eos vitae sunt est.
          Beatae libero nemo odio nesciunt facilis doloribus itaque recusandae
          necessitatibus perspiciatis quasi. Doloribus consectetur ducimus eos
          modi quo, amet voluptas. Voluptas enim laboriosam quis dolorum in
          sunt, quisquam dolor accusamus atque debitis dolore officia cupiditate
          molestias velit voluptatum odit distinctio ratione ad eos optio hic.
          Doloremque numquam vero necessitatibus provident saepe dolorem,
          reiciendis delectus quasi ex sed? Fugit, qui. Laborum distinctio ab
          quod aut. Incidunt iusto delectus quos dignissimos, deleniti adipisci
          quasi vitae voluptas impedit doloremque at modi sit inventore, sunt,
          nemo praesentium laborum nobis suscipit rerum atque ut itaque.
        </p>
        <p className="mb-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias debitis
          mollitia obcaecati quisquam. Harum sapiente consequatur reiciendis
          atque quam ducimus itaque sit nihil ab totam, eos vitae sunt est.
          Beatae libero nemo odio nesciunt facilis doloribus itaque recusandae
          necessitatibus perspiciatis quasi. Doloribus consectetur ducimus eos
          modi quo, amet voluptas. Voluptas enim laboriosam quis dolorum in
          sunt, quisquam dolor accusamus atque debitis dolore officia cupiditate
          molestias velit voluptatum odit distinctio ratione ad eos optio hic.
          Doloremque numquam vero necessitatibus provident saepe dolorem,
          reiciendis delectus quasi ex sed? Fugit, qui. Laborum distinctio ab
          quod aut. Incidunt iusto delectus quos dignissimos, deleniti adipisci
          quasi vitae voluptas impedit doloremque at modi sit inventore, sunt,
          nemo praesentium laborum nobis suscipit rerum atque ut itaque.
        </p>
      </div>
    </div>
  );
};

export default Page;
