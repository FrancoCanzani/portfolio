import type { Dictionary } from "./types";

const LINKEDIN = "https://es.linkedin.com/in/franco-canzani";

export const es: Dictionary = {
  meta: {
    title: "Franco Canzani · Responsable de Transporte Internacional por Carretera y Logística",
    description: "Responsable de logística con más de 8 años moviendo mercancía por Europa y Estados Unidos.",
  },
  name: "Franco Canzani",
  role: "Responsable de Transporte Internacional por Carretera y Logística",
  intro:
    "Responsable de logística con más de 8 años moviendo mercancía por Europa y Estados Unidos. Conecto a clientes con transportistas de confianza, desde cargas completas a temperatura controlada hasta suministro just-in-time para automoción. Gestiono el ciclo completo: captar clientes, negociar tarifas y que cada carga llegue a tiempo.",
  switchLabel: "English",
  sections: [
    {
      id: "experiencia",
      title: "Experiencia",
      items: [
        {
          title: "RLC Transportes",
          description: "Rentabilidad por ruta: coste por kilómetro, tarifas y retornos cargados.",
          meta: "Actualidad",
        },
        {
          title: "Transporte de cargas",
          description: "Dos empresas de cargas donde descubrí la logística como profesión.",
        },
      ],
    },
    {
      id: "formacion",
      title: "Formación",
      items: [
        { title: "Universidad Católica de La Plata", description: "Estudios universitarios.", meta: "2014 – 2017" },
        { title: "Automate the Boring Stuff with Python", description: "Curso en Udemy." },
        { title: "NumPy for Data Science and Machine Learning", description: "Curso en Udemy." },
      ],
    },
    {
      id: "certificaciones",
      title: "Certificaciones",
      items: [
        { title: "Data Analyst", description: "Coderhouse.", meta: "ago 2021" },
        { title: "First Certificate in English", description: "University of Cambridge.", meta: "mar 2015" },
        { title: "International Bootcamp", description: "EF English Courses.", meta: "feb 2014" },
      ],
    },
    {
      id: "idiomas",
      title: "Idiomas",
      items: [
        { title: "Español", description: "Nativo." },
        { title: "Inglés", description: "Competencia profesional completa." },
      ],
    },
    {
      id: "contacto",
      title: "Contacto",
      items: [{ title: "LinkedIn", description: "La forma más rápida de escribirme.", href: LINKEDIN }],
    },
  ],
  figureLabel: "Un camión que va y vuelve entre dos almacenes, descargando y cargando palés en cada extremo.",
};
