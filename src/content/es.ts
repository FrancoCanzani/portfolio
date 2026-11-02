import type { Dictionary } from "./types";

const LINKEDIN = "https://es.linkedin.com/in/franco-canzani";

export const es: Dictionary = {
  meta: {
    title: "Franco Canzani · Transport Manager",
    description: "Gestión de transporte por carretera con mirada analítica. Operaciones, flota y datos.",
  },
  name: "Franco Canzani",
  role: "Transport Manager · RLC Transportes",
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
          figure: "route-margin",
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
  figures: {
    routeMargin: {
      fig: "Fig. 1",
      title: "Margen por ruta",
      hint: "Arrastra ↔ palés de retorno",
      readout: "0 / 720 km · margen +0 €",
      label: "Maqueta de una ruta de ida y vuelta entre un almacén y un cliente. Un tráiler sale cargado con 26 palés y vuelve con los palés de retorno elegidos. Dos pilas de monedas comparan ingresos y costes; la diferencia es el margen del viaje.",
      margin: "margen",
      pallets: "palés de retorno",
      keys: { revenue: "Ingresos (1 moneda = 50 €)", cost: "Costes", margin: "Margen" },
      caption:
        "Ida y vuelta de 360 km por trayecto. Coste aproximado de un tráiler en España: 1,25 €/km (combustible 0,43, conductor 0,34, vehículo 0,38, otros 0,10). La ida se cobra a 700 €; el retorno, hasta 600 € con 26 palés. Sin carga de vuelta el viaje pierde 200 €; con el camión lleno gana 400 €.",
    },
  },
};
