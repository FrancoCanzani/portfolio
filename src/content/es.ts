import type { Dictionary } from "./types";

const LINKEDIN = "https://es.linkedin.com/in/franco-canzani";

export const es: Dictionary = {
  meta: {
    title: "Franco Canzani · Responsable de Transporte Internacional",
    description: "Responsable de logística con más de 8 años moviendo mercancía por Europa y Estados Unidos.",
  },
  name: "Franco Canzani",
  role: "Responsable de Transporte Internacional",
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
          current: true,
          body: "Un camión que vuelve vacío pierde dinero en la mitad del viaje. Calculo el coste real por kilómetro de cada ruta, negocio tarifas que lo cubran y busco carga de vuelta para que el camión no regrese de vacío. Así cada ida y vuelta deja margen.",
          figure: "route",
        },
        {
          title: "Sklum",
          description: "Importación marítima: contenedores desde Asia hasta el almacén.",
          body: "Coordinación de contenedores desde el puerto hasta el almacén: seguimiento de buques, citas en terminal, transporte de arrastre y descarga, para que el stock llegue cuando la venta lo necesita.",
          figure: "port",
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
    service: "Transporte internacional · Europa ⇄ EE. UU.",
    note: "La forma más rápida de escribirme.",
    cta: "Escríbeme en LinkedIn",
    href: LINKEDIN,
  },
};
