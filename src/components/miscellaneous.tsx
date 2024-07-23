import GithubContributions from "./githubContributions";
import Codewars from "./codewars";

export default async function Miscellaneous() {
  return (
    <section className="mb-12">
      <h1 className="text-2xl font-bold dark:text-gray-100 mb-3">
        Miscellaneous
      </h1>
      <h2 className="text-sm mb-6">
        In my free time I like to do hobby projects and{" "}
        <a href="www.codewars.com" target="_blank" className="hover:underline">
          <strong>Codewars</strong>
        </a>{" "}
        Katas.
      </h2>
      <div className="flex w-full flex-col sm:flex-row items-start justify-center sm:space-x-6">
        <Codewars />
        <GithubContributions username="FrancoCanzani" />
      </div>
    </section>
  );
}
