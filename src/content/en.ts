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
          icon: "truck",
          title: "RLC Transportes",
          description: "Transport management: planning, fleet and regulatory compliance.",
          meta: "Present",
        },
        {
          icon: "route",
          title: "Freight transport",
          description: "Two freight companies where I discovered logistics as a profession.",
        },
      ],
    },
    {
      id: "strengths",
      title: "Strengths",
      items: [
        { icon: "route", title: "Operations", description: "Route planning, fleet allocation and tracking every load." },
        { icon: "chart", title: "Data", description: "KPIs, dashboards and analysis to decide on evidence." },
        { icon: "code", title: "Automation", description: "Python to take repetitive work out of operations." },
        { icon: "languages", title: "Bilingual", description: "Native Spanish and professional English for international work." },
      ],
    },
    {
      id: "education",
      title: "Education",
      items: [
        { icon: "graduation", title: "Universidad Católica de La Plata", description: "University studies.", meta: "2014 – 2017" },
        { icon: "code", title: "Automate the Boring Stuff with Python", description: "Udemy course." },
        { icon: "code", title: "NumPy for Data Science and Machine Learning", description: "Udemy course." },
      ],
    },
    {
      id: "certifications",
      title: "Certifications",
      items: [
        { icon: "chart", title: "Data Analyst", description: "Coderhouse.", meta: "Aug 2021" },
        { icon: "award", title: "First Certificate in English", description: "University of Cambridge.", meta: "Mar 2015" },
        { icon: "award", title: "International Bootcamp", description: "EF English Courses.", meta: "Feb 2014" },
      ],
    },
    {
      id: "languages",
      title: "Languages",
      items: [
        { icon: "languages", title: "Spanish", description: "Native." },
        { icon: "languages", title: "English", description: "Full professional proficiency." },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      items: [{ icon: "linkedin", title: "LinkedIn", description: "The fastest way to reach me.", href: LINKEDIN }],
    },
  ],
  footer: "Made with care, like a well-planned load.",
};
