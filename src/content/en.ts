import type { Dictionary } from "./types";

const LINKEDIN = "https://www.linkedin.com/in/franco-canzani";

export const en: Dictionary = {
  meta: {
    title: "Franco Canzani · Account & Logistics Manager",
    description: "Logistics manager living in Dénia, Alicante, helping some of the biggest companies move their goods across Europe.",
  },
  name: "Franco Canzani",
  greeting: "Hello, I’m",
  role: "Account & Logistics Manager",
  intro:
    "I’m a **logistics manager** living in Dénia, Alicante, helping some of Europe’s biggest companies move their goods.",
  sections: [
    {
      id: "experience",
      title: "Experience",
      timeline: true,
      items: [
        {
          title: "RLC Transportes",
          period: "Jul 2024 → Present",
          description: "Import & Export Manager.",
          current: true,
          body: "I manage transport routes to and from Spain with every country in Europe. I look after a portfolio of clients and carriers: preparing quotes, negotiating rates and terms, and finding the right truck for each load, many of them temperature-controlled. I follow every shipment from pickup to delivery, sort out any issues along the way and keep growing the portfolio with clients and carriers I can rely on.",
          figure: "route",
        },
        {
          title: "Sklum",
          period: "Feb 2023 → Jul 2024",
          description: "Supply Planner.",
          body: "I planned supply: deciding what to buy and when, based on stock projections and the demand forecast for each item. I coordinated domestic and international suppliers, most of them shipping containers from Asia, and tracked orders and loading plans so they met the agreed dates and incoterms. I tracked KPIs such as stock coverage, inventory turnover and supplier on-time delivery.",
          figure: "port",
        },
        {
          title: "Wheels Logistics",
          period: "May 2022 → Dec 2022",
          description: "Freight Manager.",
          body: "I ran the import routes from Germany to Ford’s plant in Almussafes, working directly with Ford and its suppliers at the pace of just-in-time production. I planned routes, tracked service KPIs and looked for improvements across the transport network.",
          figure: "loading",
        },
        {
          title: "OneTazo Trucking LLC",
          period: "Jun 2018 → May 2022",
          description: "Dispatcher in Florida, US.",
          body: "I ran a fleet of 25 trucks: assigning loads to each driver, planning departures with the workshop and acting as the daily contact for customers and drivers from pickup to delivery. At the end of each week I handled invoicing, customer collections and driver payments.",
        },
      ],
    },
    {
      id: "education",
      title: "Education",
      items: [
        { title: "Universidad Católica de La Plata", description: "Political Science and International Relations, Argentina.", meta: "2014 – 2017" },
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
