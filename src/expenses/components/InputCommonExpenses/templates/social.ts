import { ExpenseCategoryId } from "@/shared/constants/expense-categories";

import { ExpenseTemplate } from "@/expenses/types";

const categoryId: ExpenseCategoryId = "social";

export const SOCIAL_TEMPLATES: ExpenseTemplate[] = [
  {
    label: "Bar / Tragos",
    categoryId,
    amount: 70,
    keywords: [
      "cerveza",
      "cocktail",
      "chilcano",
      "bar",
      "discoteca",
      "chelitas",
    ],
  },
  {
    label: "Cine",
    categoryId,
    amount: 35,
    keywords: ["cineplanet", "cinemark", "popcorn", "pelicula", "entrada"],
  },
  {
    label: "Regalo",
    categoryId,
    keywords: ["cumpleaños", "detalle", "obsequio", "rosas", "sorpresa"],
  },
  {
    label: "Concierto / Evento",
    categoryId,
    keywords: ["teleticket", "joinnus", "entrada", "show", "teatro"],
  },
  {
    label: "Ropa / Shopping",
    categoryId,
    keywords: [
      "falabella",
      "ripley",
      "zara",
      "hm",
      "malls",
      "ropa",
      "zapatillas",
    ],
  },
  {
    label: "Salida Grupal",
    categoryId,
    keywords: ["reunion", "amigos", "junta", "parrillada", "cuota"],
  },
  {
    label: "Juegos / Gaming Social",
    categoryId,
    keywords: ["escape room", "bowling", "billat", "playstation rental"],
  },
  {
    label: "Pichanga / Fútbol",
    categoryId,
    amount: 20,
    keywords: [
      "cancha",
      "alquiler losa",
      "arbitro",
      "futbol",
      "deporte social",
    ],
  },
  {
    label: "Club / Membresía",
    categoryId,
    keywords: ["regatas", "real club", "asociacion", "cuota social"],
  },
  {
    label: "Belleza / Barbería",
    categoryId,
    amount: 50,
    keywords: ["corte", "barba", "manicure", "spa", "tinte"],
  },
];
