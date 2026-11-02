import type { Dictionary } from "./types";

const LINKEDIN = "https://www.linkedin.com/in/franco-canzani";

export const en: Dictionary = {
  meta: {
    title: "Franco Canzani · International Road Freight & Logistics Manager",
    description: "Logistics manager with 8+ years moving freight across Europe and the US.",
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
      items: [
        {
          title: "RLC Transportes",
          description: "Profitability per route: cost per kilometre, rates and loaded return trips.",
          meta: "Present",
          current: true,
          body: "A truck that comes back empty loses money on half of the trip. I work out the real cost per kilometre of every route, negotiate rates that cover it and find return loads so the truck never drives home empty. That is how a round trip stays profitable.",
          figure: "route",
        },
        {
          title: "Sklum",
          description: "Ocean imports: containers from Asia to the warehouse.",
          body: "Coordinating containers from port to warehouse: tracking vessels, booking terminal slots, arranging drayage and unloading, so stock lands when sales need it.",
          figure: "port",
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
    service: "International freight · Europe ⇄ US",
    note: "The fastest way to reach me.",
    cta: "Message me on LinkedIn",
    href: LINKEDIN,
  },
};
