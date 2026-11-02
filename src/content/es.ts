import type { Dictionary } from "./types";

const LINKEDIN = "https://es.linkedin.com/in/franco-canzani";

export const es: Dictionary = {
  meta: {
    title: "Franco Canzani · Account & Logistics Manager",
    description: "Responsable de logística en Dénia, Alicante. Ayudo a algunas de las mayores empresas a mover su mercancía por Europa.",
  },
  name: "Franco Canzani",
  greeting: "Hola, soy",
  role: "Account & Logistics Manager",
  intro:
    "Soy **responsable de logística** viviendo en Dénia, Alicante, y ayudo a algunas de las empresas más grandes de Europa a mover su mercancía.",
  clientsTitle: "Empresas con las que trabajo",
  sections: [
    {
      id: "experiencia",
      title: "Experiencia",
      timeline: true,
      items: [
        {
          title: "RLC Transportes",
          period: "jul 2024 → Actualidad",
          description: "Responsable de importación y exportación.",
          current: true,
          body: "Me encargo de gestionar rutas de transporte desde y hacia España con todos los países de Europa. Llevo una cartera de clientes y transportistas: preparo cotizaciones, negocio tarifas y condiciones, y busco el camión adecuado para cada carga, muchas de ellas a temperatura controlada. Sigo cada servicio desde la recogida hasta la entrega, resuelvo las incidencias y hago crecer la cartera con clientes y proveedores de confianza.",
          figure: "route",
        },
        {
          title: "Sklum",
          period: "feb 2023 → jul 2024",
          description: "Planificador de aprovisionamiento.",
          body: "Me encargaba de planificar el aprovisionamiento: definir qué comprar y cuándo a partir de las proyecciones de stock y la previsión de demanda de cada artículo. Coordinaba a proveedores nacionales e internacionales, la mayoría con mercancía que llegaba en contenedor desde Asia, y controlaba los pedidos y los planes de carga para que cumplieran las fechas y los incoterms acordados. Hacía seguimiento de KPIs como la cobertura de stock, la rotación y el cumplimiento de plazos de los proveedores.",
          figure: "port",
        },
        {
          title: "Wheels Logistics",
          period: "may 2022 → dic 2022",
          description: "Freight Manager.",
          body: "Gestionaba las rutas de importación desde Alemania hasta la planta de Ford en Almussafes, en contacto directo con Ford y sus proveedores y al ritmo de su producción just-in-time. Planificaba las rutas, seguía los KPIs del servicio y buscaba mejoras en la red de transporte.",
          figure: "loading",
        },
        {
          title: "OneTazo Trucking LLC",
          period: "jun 2018 → may 2022",
          description: "Dispatcher en Florida, EE. UU.",
          body: "Gestionaba una flota de 25 camiones: asignaba las cargas a cada conductor, planificaba las salidas con el taller y era el contacto diario de clientes y camioneros desde la recogida hasta la entrega. Al cierre de cada semana me ocupaba de la facturación, los cobros a clientes y los pagos a conductores. Todo en inglés.",
        },
      ],
    },
    {
      id: "formacion",
      title: "Formación",
      items: [
        { title: "Universidad Católica de La Plata", description: "Ciencias Políticas y Relaciones Internacionales, Argentina.", meta: "2014 – 2017" },
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
  contact: {
    title: "Contacto",
    email: { user: "francocanzani", domain: "gmail.com" },
    linkedin: { href: LINKEDIN, handle: "linkedin.com/in/franco-canzani" },
  },
};
