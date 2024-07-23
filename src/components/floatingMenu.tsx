import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

export default function FloatingMenu() {
  const t = useTranslations("Header");

  return (
    <nav className="fixed min-w-max	 bottom-2 left-1/2 transform -translate-x-1/2 p-2 px-3 text-sm rounded-md shadow-lg ring-1 hover:transition-all duration-500 ring-transparent bg-white/50 dark:bg-black/50 hover:ring-gray-300 hover:shadow dark:hover:ring-black/50 shadow-md dark:shadow-none dark:hover:shadow-gray-300/10 shadow-gray-300/10 dark:border-black/50 backdrop-blur-sm bg-white/30 font-medium">
      <ul className="flex justify-between items-center w-full space-x-8">
        <li>
          <Link
            className="dark:text-gray-300 dark:hover:text-white text-gray-500 hover:text-black transition-all duration-200"
            href="/#projects"
          >
            {t("work")}
          </Link>
        </li>
        <li>
          <Link
            className="dark:text-gray-300 dark:hover:text-white text-gray-500 hover:text-black transition-all duration-200"
            href="/about"
          >
            {t("about")}
          </Link>
        </li>
        <li>
          <a
            className="dark:text-gray-300 dark:hover:text-white text-gray-500 hover:text-black transition-all duration-200"
            href="#"
          >
            Blog
          </a>
        </li>
        <li>
          <Link
            className="dark:text-gray-300 dark:hover:text-white text-gray-500 hover:text-black transition-all duration-200"
            href="/#contact"
          >
            {t("contact")}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
