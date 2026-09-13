/**
 * Catálogo de servicios: fuente única para la página de Precios y para el
 * selector guiado. Los importes y los textos son exactamente los ya publicados
 * en Precios; si cambian aquí, cambian en los dos sitios a la vez.
 */

export type ObjetivoId = "presentar" | "catalogo" | "vender" | "mejorar" | "no_claro";
export type PaqueteId = "basica" | "catalogo" | "instagram";
export type MaterialId = "logo" | "textos" | "fotos" | "dominio" | "nada";

export type Paquete = {
  id: PaqueteId;
  codigo: string;
  nombre: string;
  /** Etiqueta tal y como aparece publicada ("+150 €" en el suplemento). */
  precioEtiqueta: string;
  /** Importe de este concepto por separado, en euros. */
  importe: number;
  /** Si el paquete se suma a otro, el id de ese otro (catálogo va sobre la básica). */
  seSumaA?: PaqueteId;
  descripcion: string;
  incluye: string[];
  enlace: { texto: string; href: string; externo?: boolean };
  destacado?: boolean;
};

export const PAQUETES: Paquete[] = [
  {
    id: "basica",
    codigo: "01 / ESENCIAL",
    nombre: "Web básica",
    precioEtiqueta: "75 €",
    importe: 75,
    descripcion: "Una presencia web sencilla para publicar tu negocio o idea.",
    incluye: ["Inicio", "Quiénes somos", "Servicios", "Contacto y WhatsApp", "Diseño móvil"],
    enlace: { texto: "Pedir información", href: "https://www.instagram.com/codecraft.es/", externo: true },
    destacado: true,
  },
  {
    id: "catalogo",
    codigo: "02 / CATÁLOGO",
    nombre: "Catálogo o tienda",
    precioEtiqueta: "+150 €",
    importe: 150,
    seSumaA: "basica",
    descripcion: "Se añade a la web básica para mostrar o vender productos.",
    incluye: ["Fichas de producto", "Categorías", "Carrito o pedidos", "Proceso de compra", "Gestión inicial"],
    enlace: { texto: "Ver el servicio", href: "/servicios" },
  },
  {
    id: "instagram",
    codigo: "03 / PRESENCIA",
    nombre: "Web + Instagram",
    precioEtiqueta: "150 €",
    importe: 150,
    descripcion: "Una base web acompañada por la preparación visual del perfil.",
    incluye: ["Web esencial", "Ajuste del perfil", "Imagen coherente", "Contenido inicial", "Conexión entre canales"],
    enlace: { texto: "Consultar pack", href: "https://www.instagram.com/codecraft.es/", externo: true },
  },
];

export type Extra = {
  id: string;
  nombre: string;
  /** Etiqueta publicada, incluido el "desde" cuando el precio no es cerrado. */
  precioEtiqueta: string;
  /** Importe en euros. `null` cuando no hay precio publicado. */
  importe: number | null;
  /** El importe es un punto de partida, no un precio cerrado ("desde ..."). */
  desde?: boolean;
  /** Periodicidad cuando el coste se repite. */
  recurrente?: "mes";
  /** Objetivos del paso 1 para los que se ofrece este extra. */
  objetivos: ObjetivoId[];
  /**
   * Paquetes que ya incluyen este concepto: en ellos no se ofrece ni se cobra.
   * Vacío hoy: ningún extra publicado coincide con el alcance que enumeran los
   * paquetes. Pendiente de confirmar con el estudio (ver notas del PR).
   */
  incluidoEn?: PaqueteId[];
};

export const EXTRAS: Extra[] = [
  { id: "logo", nombre: "Diseño de logo", precioEtiqueta: "30 €", importe: 30, objetivos: ["presentar", "catalogo", "vender"] },
  { id: "formulario", nombre: "Formulario + página de gracias", precioEtiqueta: "30 €", importe: 30, objetivos: ["presentar", "catalogo"] },
  { id: "barra", nombre: "Barra informativa", precioEtiqueta: "30 €", importe: 30, objetivos: ["presentar", "catalogo", "vender"] },
  { id: "pagina", nombre: "Página adicional", precioEtiqueta: "25 €", importe: 25, objetivos: ["presentar", "catalogo", "vender"] },
  { id: "seo", nombre: "SEO básico para publicación", precioEtiqueta: "39 €", importe: 39, objetivos: ["presentar", "catalogo", "vender"] },
  { id: "maps", nombre: "Google Maps / ficha de negocio", precioEtiqueta: "15 €", importe: 15, objetivos: ["presentar", "catalogo"] },
  { id: "legales", nombre: "Textos legales básicos", precioEtiqueta: "25 €", importe: 25, objetivos: ["presentar", "catalogo", "vender"] },
  { id: "multiidioma", nombre: "Versión multiidioma", precioEtiqueta: "59 €", importe: 59, objetivos: ["catalogo", "vender"] },
  { id: "qr", nombre: "Código QR", precioEtiqueta: "15 €", importe: 15, objetivos: ["presentar", "catalogo"] },
  { id: "mantenimiento", nombre: "Mantenimiento web", precioEtiqueta: "desde 29 €/mes", importe: 29, desde: true, recurrente: "mes", objetivos: ["presentar", "catalogo", "vender"] },
];

export const NOTAS = [
  { titulo: "DOMINIO", texto: "El dominio se contrata y renueva aparte cada año. El precio depende del nombre y del proveedor elegido." },
  { titulo: "CONTENIDO", texto: "Los precios parten de que el cliente facilita textos, imágenes y datos básicos. Podemos ayudarte a prepararlos como extra." },
  { titulo: "PRESUPUESTO", texto: "Siempre confirmamos el alcance y el precio final antes de empezar el proyecto." },
];

/* ------------------------------------------------------------------ */
/* Selector guiado                                                     */
/* ------------------------------------------------------------------ */

export type Objetivo = {
  id: ObjetivoId;
  etiqueta: string;
  /** Paquete recomendado, o `null` cuando procede un presupuesto personalizado. */
  recomienda: PaqueteId | null;
  /** Por qué se recomienda, en una frase. */
  porque: string;
  /** Segundo paquete publicado que también encaja, si lo hay. */
  alternativa?: PaqueteId;
};

export const OBJETIVOS: Objetivo[] = [
  {
    id: "presentar",
    etiqueta: "Presentar mi negocio o servicios",
    recomienda: "basica",
    porque: "Necesitas explicar quién eres y qué ofreces, y que te puedan contactar. Eso es justo el alcance de la web básica.",
    alternativa: "instagram",
  },
  {
    id: "catalogo",
    etiqueta: "Mostrar un catálogo",
    recomienda: "catalogo",
    porque: "Para enseñar productos hacen falta fichas y categorías, que se añaden sobre la web básica.",
  },
  {
    id: "vender",
    etiqueta: "Vender online",
    recomienda: "catalogo",
    porque: "Vender necesita además carrito y proceso de compra, incluidos en el catálogo o tienda sobre la web básica.",
  },
  {
    id: "mejorar",
    etiqueta: "Mejorar una web existente",
    recomienda: null,
    porque: "Partir de una web que ya existe depende de cómo esté hecha, así que no entra en ninguno de los paquetes publicados.",
  },
  {
    id: "no_claro",
    etiqueta: "No lo tengo claro",
    recomienda: null,
    porque: "Sin saber todavía a dónde quieres llegar, lo honesto es hablarlo antes de poner un precio.",
  },
];

export const MATERIALES: { id: MaterialId; etiqueta: string }[] = [
  { id: "logo", etiqueta: "Logo" },
  { id: "textos", etiqueta: "Textos" },
  { id: "fotos", etiqueta: "Fotos" },
  { id: "dominio", etiqueta: "Dominio" },
  { id: "nada", etiqueta: "Todavía no tengo nada" },
];

/** Importe de partida del paquete, sumando el paquete base cuando lo hay. */
export function importeBase(id: PaqueteId): number {
  const paquete = PAQUETES.find((p) => p.id === id);
  if (!paquete) return 0;
  return paquete.importe + (paquete.seSumaA ? importeBase(paquete.seSumaA) : 0);
}

/** Desglose del precio de partida: la básica más el suplemento, si procede. */
export function desglosePaquete(id: PaqueteId): { nombre: string; importe: number }[] {
  const paquete = PAQUETES.find((p) => p.id === id);
  if (!paquete) return [];
  const previos = paquete.seSumaA ? desglosePaquete(paquete.seSumaA) : [];
  return [...previos, { nombre: paquete.nombre, importe: paquete.importe }];
}

/** Extras que se ofrecen para un objetivo, sin los que el paquete ya incluye. */
export function extrasPara(objetivo: ObjetivoId, paquete: PaqueteId | null): Extra[] {
  return EXTRAS.filter((extra) => {
    if (paquete && extra.incluidoEn?.includes(paquete)) return false;
    // Sin paquete (presupuesto personalizado) se muestran todos: sirven para
    // describir la necesidad aunque el importe quede por valorar.
    return paquete === null || extra.objetivos.includes(objetivo);
  });
}

export const eur = (importe: number) => `${importe} €`;
