"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingMenu() {
  const t = useTranslations("Header");
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const menuItems = [
    { href: "/#projects", label: t("work") },
    { href: "/about", label: t("about") },
    { href: "https://franconotes.vercel.app/", label: "Blog", external: true },
    { href: "/#contact", label: t("contact") },
  ];

  const handleExternalClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      window.open(href, "_blank", "noopener,noreferrer");
    },
    []
  );

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-x-0 bottom-4 flex justify-center items-center z-50"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <nav className="inline-block p-2 rounded-md text-xs ring-1 transition-all duration-300 ease-in-out ring-gray-200 bg-white/70 dark:bg-black/70 hover:ring-gray-300 hover:shadow-lg dark:ring-gray-700 dark:hover:ring-gray-600 shadow-sm backdrop-blur-md">
          <ul className="flex items-center space-x-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.external ? (
                  <a
                    href={item.href}
                    onClick={(e) => handleExternalClick(e, item.href)}
                    className="relative px-3 py-1.5 rounded-md font-medium transition-all duration-200 ease-in-out text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    onMouseEnter={() => setActiveItem(item.label)}
                    onMouseLeave={() => setActiveItem(null)}
                  >
                    {item.label}
                    <span
                      className={`absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-md transition-opacity duration-200 ease-in-out ${
                        activeItem === item.label ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ zIndex: -1 }}
                    />
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="relative px-3 py-1.5 rounded-md font-medium transition-all duration-200 ease-in-out text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    onMouseEnter={() => setActiveItem(item.label)}
                    onMouseLeave={() => setActiveItem(null)}
                  >
                    {item.label}
                    <span
                      className={`absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-md transition-opacity duration-200 ease-in-out ${
                        activeItem === item.label ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ zIndex: -1 }}
                    />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </AnimatePresence>
  );
}
