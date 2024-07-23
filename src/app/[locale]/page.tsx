import Balancer from "react-wrap-balancer";
import { useTranslations } from "next-intl";
import Projects from "@/components/projects";
import Resume from "@/components/resume";
import Contact from "@/components/contact";
import Skills from "@/components/skills";
import Miscellaneous from "@/components/miscellaneous";
import Gallery from "@/components/gallery";

export default function Component() {
  const t = useTranslations("Landing");

  return (
    <main className="mx-auto px-4">
      <section className="mb-10">
        <h2 className="text-5xl mb-4 font-bold capitalize">
          <Balancer>{t("title")}.</Balancer>
        </h2>
        <p className="text-gray-600 dark:text-gray-200">
          {t("welcomeMessage")}
        </p>
        <Gallery />
      </section>
      <Projects />
      <Skills />
      <Miscellaneous />
      <Resume />
      <Contact />
    </main>
  );
}
