import type { Dictionary } from "./types";

const LINKEDIN = "https://es.linkedin.com/in/franco-canzani";

export const es: Dictionary = {
  meta: {
    title: "Franco Canzani · Transport Manager",
    description: "Gestión de transporte por carretera con mirada analítica. Operaciones, flota y datos.",
  },
  name: "Franco Canzani",
  role: "Transport Manager · RLC Transportes",
  summary: [
    "Descubrí mi pasión por la logística trabajando en dos empresas de transporte de cargas. Hoy gestiono operaciones de transporte en RLC Transportes.",
    "Combino el día a día de la operación con el análisis de datos: medir, entender y decidir con números, no con intuición.",
  ],
  indexLabel: "Índice",
  switchLabel: "English",
  sections: [
    {
      id: "experiencia",
      title: "Experiencia",
      items: [
        {
          title: "RLC Transportes",
          description: "Gestión de transporte: planificación, flota y cumplimiento normativo.",
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
};
