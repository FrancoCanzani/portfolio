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
  figureLabel: "A truck driving back and forth between two warehouses, unloading and loading pallets at each end.",
};
