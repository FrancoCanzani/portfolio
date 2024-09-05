"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

interface ImageData {
  src: string;
  alt: string;
}

export default function Gallery() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const getImagePosition = (index: number): number => {
    if (hoveredIndex === null) return index - (images.length - 1) / 2;
    if (index < hoveredIndex) return index - hoveredIndex - 0.5;
    if (index > hoveredIndex) return index - hoveredIndex + 0.5;
    return 0;
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x > 100) {
      setCurrentIndex(
        currentIndex === 0 ? images.length - 1 : currentIndex - 1
      );
    } else if (info.offset.x < -100) {
      setCurrentIndex(
        currentIndex === images.length - 1 ? 0 : currentIndex + 1
      );
    }
  };

  if (isMobile) {
    return (
      <div className="w-full h-[400px] overflow-hidden relative mt-6 rounded-md">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            className="absolute w-full h-full"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: "spring", stiffness: 150, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
          >
            <Image
              alt={images[currentIndex].alt}
              src={images[currentIndex].src}
              fill
              sizes="100vw"
              priority
              quality={100}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

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
          transition={{ type: "spring", stiffness: 150, damping: 30 }}
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
