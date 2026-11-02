import type { Dictionary } from "./types";

const LINKEDIN = "https://www.linkedin.com/in/franco-canzani";

export const en: Dictionary = {
  meta: {
    title: "Franco Canzani · International Road Freight & Logistics Manager",
    description: "Logistics manager with 8+ years moving freight across Europe and the US: carriers, rates and loads that arrive on time.",
  },
  name: "Franco Canzani",
  role: "International Road Freight & Logistics Manager",
  intro:
    "Logistics manager with 8+ years moving freight across Europe and the US. I connect customers with reliable carriers, from temperature-controlled full truckloads to just-in-time automotive supply. I handle the full cycle: winning clients, negotiating rates and keeping every load on schedule.",
  switchLabel: "Español",
  sections: [
    {
      id: "experience",
      title: "Experience",
      timeline: true,
      items: [
        {
          title: "RLC Transportes",
          period: "2022 → Present",
          description: "Route profitability: cost per kilometre, pricing and loaded return trips.",
          current: true,
          body: "An empty return leg can wipe out the margin of the whole trip. I price every route against its real cost per kilometre, negotiate rates that cover it and line up return loads, so trucks come back full and every round trip pays.",
          figure: "route",
        },
        {
          title: "Sklum",
          period: "2020 → 2022",
          description: "Ocean imports: containers from Asia to the warehouse.",
          body: "From vessel to warehouse door: tracking ships, booking terminal slots, arranging drayage and scheduling unloads, so stock lands when sales need it.",
          figure: "port",
        },
        {
          title: "Freight transport",
          period: "2017 → 2020",
          description: "Where it started: two freight companies that turned logistics into my profession.",
        },
      ],
    },
    {
      id: "education",
      title: "Education",
      items: [
        { title: "Universidad Católica de La Plata", description: "University studies in Argentina.", meta: "2014 – 2017" },
        { title: "Automate the Boring Stuff with Python", description: "Udemy. Scripting away repetitive reporting." },
        { title: "NumPy for Data Science and Machine Learning", description: "Udemy. Working with data at scale." },
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
  ],
  figures: {
    loading: "A warehouse loads boxes one by one onto a truck parked at the dock; once it is full, the truck drives off.",
    route: "A truck leaves one warehouse loaded, unloads at the other, loads again and drives back with a return load.",
    port: "A quay crane lifts a container off a ship and sets it on a truck, which leaves the terminal for the warehouse.",
  },
  label: {
    title: "Contact",
    priority: "Priority",
    shipTo: "Deliver to",
    service: "Road freight · Europe ⇄ US",
    note: "Hiring for logistics, carrier management or key accounts? Let’s talk.",
    email: "hello@francocanzani.com",
    emailCta: "Email me",
    linkedinCta: "LinkedIn",
    href: LINKEDIN,
  },
};
