import type { Dictionary } from "./types";

const LINKEDIN = "https://www.linkedin.com/in/franco-canzani";

export const en: Dictionary = {
  meta: {
    title: "Franco Canzani · Transport Manager",
    description: "Road transport management with an analytical eye. Operations, fleet and data.",
  },
  name: "Franco Canzani",
  role: "Transport Manager · RLC Transportes",
  summary: [
    "I found my passion for logistics working at two freight companies. Today I run transport operations at RLC Transportes.",
    "I pair day-to-day operations with data analysis: measure, understand and decide with numbers, not gut feeling.",
  ],
  indexLabel: "Index",
  switchLabel: "Español",
  sections: [
    {
      id: "experience",
      title: "Experience",
      items: [
        {
          title: "RLC Transportes",
          description: "Transport management: planning, fleet and regulatory compliance.",
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
};
