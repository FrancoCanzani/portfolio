import { useTranslations } from "next-intl";
import { LinkBadge } from "./linkBadge";
import { Code, Code2 } from "lucide-react";

export default function Projects() {
  const t = useTranslations("Projects");

  return (
    <section className="mb-12" id="projects">
      <div className="inline-flex justify-between mb-6 w-full">
        <h1 className="text-2xl font-bold dark:text-gray-100">{t("title")}</h1>
        <div className="inline-flex items-center justify-center space-x-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
          </span>
          <p className="text-gray-600 font-medium dark:text-gray-200 text-sm">
            {t("availability")}{" "}
          </p>
        </div>
      </div>
      <div className="flex gap-3 flex-wrap">
        <ProjectCard
          name={"Paywall Skip"}
          description={t("paywallSkip.description")}
          href="https://github.com/FrancoCanzani/paywall"
          technologies={["NextJS", "TypeScript", "TailwindCSS", "Postgres"]}
        />
        <ProjectCard
          name={"Portfolio"}
          description={t("portfolio.description")}
          href="https://github.com/FrancoCanzani/portfolio"
          technologies={[
            "NextJS",
            "TypeScript",
            "Node",
            "Express",
            "TailwindCSS",
          ]}
        />
        <ProjectCard
          name={"blog"}
          description={t("blog.description")}
          href="https://github.com/FrancoCanzani/blog"
          technologies={[
            "NextJS",
            "TypeScript",
            "Node",
            "Express",
            "TailwindCSS",
          ]}
        />
      </div>
    </section>
  );
}

function ProjectCard({
  name,
  description,
  href,
  technologies,
}: {
  name: string;
  description: string;
  href: string;
  technologies: string[];
}) {
  return (
    <div className="p-4 w-full space-y-2 sm:w-[49%] ring-1 hover:transition-all duration-500 ring-transparent rounded-md bg-white/50 dark:bg-black border hover:ring-gray-300 hover:shadow dark:hover:ring-gray-400 border-gray-100 shadow-md dark:shadow-none dark:hover:shadow-gray-300/10 shadow-gray-300/10 dark:border-gray-800/50">
      <div className="flex mb-2 items-center justify-between">
        <div className="flex items-center justify-start gap-x-2">
          <Code2 size={16} className="text-gray-600" />
          <a
            href={href}
            target="_blank"
            className="flex items-center justify-start gap-x-2"
          >
            <h3 className="text-blue-500 hover:underline text-md lowercase font-semibold">
              {name}
            </h3>
          </a>
        </div>
        <LinkBadge
          href="https://github.com/"
          target="_blank"
          className="p-1 ring-0 border-none bg-transparent shadow-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
            />
          </svg>
        </LinkBadge>
      </div>
      <p className="text-xs mb-1 text-gray-700 dark:text-gray-200">
        {description}
      </p>
      <ul className="flex items-center justify-start space-x-0.5">
        {technologies &&
          technologies.map((tech: string, index: number) => (
            <li
              key={index}
              className="text-xs text-gray-700 dark:text-gray-200"
            >
              {tech}
              {index != technologies.length - 1 && ","}
            </li>
          ))}
      </ul>
    </div>
  );
}
