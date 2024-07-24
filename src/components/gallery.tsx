"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageData {
  src: string;
  alt: string;
}

export default function Gallery() {
  const [hoveredIndex, setHoveredIndex] = useState(0);

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
      src: "/landing/laBombonera.jpg",
      alt: "La Bombonera, one of my passions",
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
    <div className="relative w-full h-[300px] overflow-hidden flex items-center justify-center">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute transition-all duration-500 ease-in-out`}
          style={{
            width: "250px",
            height: "200px",
            transform: `translateX(${getImagePosition(index) * 160}px) 
                        rotate(${index % 2 === 0 ? 1 : -1}deg) 
                        scale(${hoveredIndex === index ? 1.1 : 1})`,
            zIndex: hoveredIndex === index ? 10 : 1,
          }}
          onMouseEnter={() => setHoveredIndex(index)}
        >
          <Image
            alt={image.alt}
            src={image.src}
            fill
            sizes="250px"
            priority
            quality={100}
            className="rounded-[4px] shadow-md object-cover"
          />
        </div>
      ))}
    </div>
  );
}
