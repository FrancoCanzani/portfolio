export default async function Miscellaneous() {
  try {
    const res = await fetch(
      "https://www.codewars.com/api/v1/users/FrancoCanzani",
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    return (
      <section className="mb-12">
        <h1 className="text-2xl font-bold dark:text-gray-100 mb-3">
          Miscellaneous
        </h1>
        <h2 className="text-sm mb-6">
          In my free time I like to do hobby projects and{" "}
          <a
            href="www.codewars.com"
            target="_blank"
            className="hover:underline"
          >
            <strong>Codewars</strong>
          </a>{" "}
          Katas.
        </h2>
        <a
          href="https://www.codewars.com/users/FrancoCanzani"
          target="_blank"
          className="hover:underline font-medium"
        >
          Profile: {data.username}
        </a>
        <p>Honor: {data.honor}</p>
        <p>Rank: {data.ranks.overall.name}</p>
        <p>Total Completed Kata: {data.codeChallenges.totalCompleted}</p>
      </section>
    );
  } catch (error) {
    console.error("Error fetching Codewars data:", error);
    return (
      <section className="mb-12">
        <h1>Miscellaneous</h1>
        <p>Failed to load Codewars data. Please try again later.</p>
      </section>
    );
  }
}
