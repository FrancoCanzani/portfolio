import type { Dictionary } from "./types";

const LINKEDIN = "https://es.linkedin.com/in/franco-canzani";

export const es: Dictionary = {
  meta: {
    title: "Franco Canzani · Account & Logistics Manager",
    description: "Responsable de logística en Dénia, Alicante. Ayudo a algunas de las mayores empresas a mover su mercancía por Europa.",
  },
  name: "Franco Canzani",
  greeting: "Hola, soy",
  role: "Account & Logistics Manager · Transporte internacional por carretera",
  intro:
    "Soy un responsable de logística viviendo en Dénia, Alicante, y ayudo a algunas de las empresas más grandes de Europa a mover su mercancía.",
  sections: [
    {
      id: "experiencia",
      title: "Experiencia",
      timeline: true,
      items: [
        {
          title: "RLC Transportes",
          period: "2022 → Actualidad",
          description: "Rentabilidad por ruta: coste por kilómetro, tarifas y retornos cargados.",
          current: true,
          body: "Un retorno en vacío puede comerse el margen de todo el viaje. Calculo cada ruta según su coste real por kilómetro, negocio tarifas que lo cubran y cierro cargas de vuelta, para que los camiones regresen llenos y cada ida y vuelta sea rentable.",
          figure: "route",
        },
        {
          title: "Sklum",
          period: "2020 → 2022",
          description: "Importación marítima: contenedores desde Asia hasta el almacén.",
          body: "Del buque a la puerta del almacén: seguimiento de navieras, citas en terminal, transporte de arrastre y planificación de descargas, para que el stock llegue cuando ventas lo necesita.",
          figure: "port",
        },
        {
          title: "Transporte de cargas",
          period: "2017 → 2020",
          description: "Donde empezó todo: dos empresas de cargas que convirtieron la logística en mi profesión.",
        },
      ],
    },
    {
      id: "formacion",
      title: "Formación",
      items: [
        { title: "Universidad Católica de La Plata", description: "Estudios universitarios en Argentina.", meta: "2014 – 2017" },
        { title: "Automate the Boring Stuff with Python", description: "Udemy. Automatizar informes repetitivos." },
        { title: "NumPy for Data Science and Machine Learning", description: "Udemy. Trabajar con datos a escala." },
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
  ],
  figures: {
    loading: "Un almacén carga cajas una a una sobre un camión aparcado en el muelle; cuando está lleno, el camión sale.",
    route: "Un camión sale cargado de un almacén, descarga en el otro, vuelve a cargar y regresa con carga de vuelta.",
    port: "Una grúa de muelle descarga un contenedor de un buque y lo deja sobre un camión, que sale de la terminal hacia el almacén.",
  },
  label: {
    title: "Contacto",
    priority: "Prioritario",
    shipTo: "Entregar a",
    service: "Transporte por carretera · Europa ⇄ EE. UU.",
    note: "¿Buscas perfil de logística, gestión de transportistas o grandes cuentas? Hablemos.",
    email: "hola@francocanzani.com",
    emailCta: "Escríbeme",
    linkedinCta: "LinkedIn",
    href: LINKEDIN,
  },
};
