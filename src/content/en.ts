import type { Dictionary } from "./types";

const LINKEDIN = "https://www.linkedin.com/in/franco-canzani";

export const en: Dictionary = {
  meta: {
    title: "Franco Canzani · Transport Manager",
    description: "Road transport management with an analytical eye. Operations, fleet and data.",
  },
  name: "Franco Canzani",
  role: "Transport Manager · RLC Transportes",
  switchLabel: "Español",
  sections: [
    {
      id: "experience",
      title: "Experience",
      items: [
        {
          title: "RLC Transportes",
          description: "Profitability per route: cost per kilometre, rates and loaded return trips.",
          meta: "Present",
          figure: "route-margin",
        },
        {
          title: "Freight transport",
          description: "Two freight companies where I discovered logistics as a profession.",
        },
      ],
    },
    {
      id: "education",
      title: "Education",
      items: [
        { title: "Universidad Católica de La Plata", description: "University studies.", meta: "2014 – 2017" },
        { title: "Automate the Boring Stuff with Python", description: "Udemy course." },
        { title: "NumPy for Data Science and Machine Learning", description: "Udemy course." },
      ],
    },
    {
      id: "certifications",
      title: "Certifications",
      items: [
        { title: "Data Analyst", description: "Coderhouse.", meta: "Aug 2021" },
        { title: "First Certificate in English", description: "University of Cambridge.", meta: "Mar 2015" },
        { title: "International Bootcamp", description: "EF English Courses.", meta: "Feb 2014" },
      ],
    },
    {
      id: "languages",
      title: "Languages",
      items: [
        { title: "Spanish", description: "Native." },
        { title: "English", description: "Full professional proficiency." },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      items: [{ title: "LinkedIn", description: "The fastest way to reach me.", href: LINKEDIN }],
    },
  ],
  figures: {
    routeMargin: {
      fig: "Fig. 1",
      title: "Margin per route",
      hint: "Drag ↔ return pallets",
      readout: "0 / 720 km · margin +€0",
      label: "A model of a round trip between a depot and a customer. A truck leaves with 26 pallets and comes back with the chosen return load. Two coin stacks compare revenue and cost; the gap between them is the trip margin.",
      margin: "margin",
      pallets: "return pallets",
      keys: { revenue: "Revenue (1 coin = €50)", cost: "Cost", margin: "Margin" },
      caption:
        "A 360 km leg each way. Approximate cost of an articulated truck in Spain: €1.25/km (fuel 0.43, driver 0.34, vehicle 0.38, other 0.10). The outbound leg pays €700; the return pays up to €600 with 26 pallets. Running back empty loses €200; coming back full earns €400.",
    },
  },
};
