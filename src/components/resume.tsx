import { useTranslations } from "next-intl";
import { Download } from "lucide-react";

export default function Resume() {
  const t = useTranslations("Resume");

  return (
    <section className="mb-12">
      <h1 className="text-2xl font-bold mb-6 dark:text-gray-100">
        {t("title")}
      </h1>
      <p className="text-gray-600 dark:text-gray-200 mb-6">
        {t("description")}
      </p>
      <a
        download
        href="/Franco_Canzani.pdf"
        className="font-normal w-fit group flex items-center justify-center gap-x-2 p-2 ring-1 hover:transition-all duration-500 ring-transparent rounded-md bg-white/50 dark:bg-black border hover:ring-gray-300 hover:shadow dark:hover:ring-gray-400 border-gray-100 shadow-md dark:shadow-none dark:hover:shadow-gray-300/10 shadow-gray-300/10 dark:border-gray-800/50"
      >
        {t("button")}
        <Download size={18} className="group-hover:animate-bounce" />
      </a>
    </section>
  );
}
