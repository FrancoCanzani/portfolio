"use client";

import { technologies } from "@/utils/constants";
import React, { ReactNode, useState } from "react";
import Image from "next/image";

export default function Skills() {
  return (
    <section className="mb-12">
      <h1 className="text-2xl font-bold dark:text-gray-100 mb-3">Tech Stack</h1>
      <h2 className="text-sm mb-6">
        Here is a collection of the stack I use and the resources I keep looking
        up. Nevertheless, this stack is continually evolving because{" "}
        <strong>
          the essence of exceptional software lies not solely within the
          technology itself
        </strong>
      </h2>
      <div className="flex items-center justify-start flex-wrap gap-3 w-full">
        {technologies.map((tech, index) => (
          <details
            key={index}
            open={index == 0}
            className="font-normal ring-1 hover:transition-all duration-500 ring-transparent rounded-md bg-white/50 dark:bg-black border hover:ring-gray-300 hover:shadow dark:hover:ring-gray-400 border-gray-100 shadow-md dark:shadow-none dark:hover:shadow-gray-300/10 shadow-gray-300/10 dark:border-gray-800/50"
          >
            <summary className="p-1.5 font-medium">{tech.name}</summary>
            <p className="p-1.5 bg-gray-50">{tech.description}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
