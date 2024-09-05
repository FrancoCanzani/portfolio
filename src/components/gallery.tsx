"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

interface ImageData {
  src: string;
  alt: string;
}

export default function Gallery() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const images: ImageData[] = [
    { src: "/landing/denia.jpg", alt: "Denia, Alicante, my adoptive home" },
    {
      src: "/landing/laplata.jpg",
      alt: "La Plata, BsAs, where I was born and raised",
    },
    { src: "/landing/f1.jpg", alt: "F1, one of my passions" },
    {
      src: "/landing/reactAlicante.jpg",
      alt: "React Alicante, my first tech conference",
    },
    {
      src: "/landing/sanfrancisco.jpg",
      alt: "San Francisco, my favorite city at the time",
    },
  ];

  const getImagePosition = (index: number): number => {
    if (hoveredIndex === null) return index - (images.length - 1) / 2;
    if (index < hoveredIndex) return index - hoveredIndex - 0.5;
    if (index > hoveredIndex) return index - hoveredIndex + 0.5;
    return 0;
  };

  return (
    <div className="relative w-full h-[400px] overflow-hidden flex items-center justify-center">
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            width: "280px",
            height: "280px",
          }}
          initial={{
            x: getImagePosition(index) * 180,
            rotate: index % 2 === 0 ? 1 : -1,
            scale: 1,
          }}
          animate={{
            x: getImagePosition(index) * 180,
            rotate: index % 2 === 0 ? 1 : -1,
            scale: hoveredIndex === index ? 1.1 : 1,
            zIndex: hoveredIndex === index ? 10 : 1,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
          whileHover={{ y: -20 }}
        >
          <div className="w-full h-full bg-white rounded-md border shadow-lg p-2 flex flex-col">
            <div className="relative flex-grow">
              <Image
                alt={image.alt}
                src={image.src}
                fill
                sizes="250px"
                priority
                quality={100}
                className="rounded-md object-cover"
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
