import { ExpenseCategoryId } from "@/shared/constants/expense-categories";

import { ExpenseTemplate } from "@/expenses/types";

const categoryId: ExpenseCategoryId = "hobbies";

export const HOBBIES_TEMPLATES: ExpenseTemplate[] = [
  {
    label: "Streaming Video",
    categoryId,
    amount: 45,
    keywords: [
      "netflix",
      "disney",
      "hbo",
      "prime video",
      "youtube premium",
      "apple tv",
      "paramount",
    ],
  },
  {
    label: "Streaming Música",
    categoryId,
    amount: 20,
    keywords: ["spotify", "apple music", "tidal", "deezer"],
  },
  {
    label: "Gaming / Videojuegos",
    categoryId,
    keywords: [
      "steam",
      "playstation plus",
      "xbox live",
      "nintendo shop",
      "riot points",
    ],
  },
  {
    label: "Software / AI",
    categoryId,
    amount: 75,
    keywords: [
      "chatgpt",
      "midjourney",
      "cursor",
      "copilot",
      "icloud",
      "google one",
    ],
  },
  {
    label: "Instrumentos / Música",
    categoryId,
    keywords: [
      "cuerdas",
      "guitarra",
      "plugin",
      "interfaz",
      "pedal",
      "clase musica",
    ],
  },
  {
    label: "Libros / Kindle",
    categoryId,
    keywords: ["amazon", "crisol", "buscalibre", "ebook", "audiolibro"],
  },
  {
    label: "Cursos / Educación",
    categoryId,
    keywords: ["udemy", "platzi", "crehana", "domestika", "certificacion"],
  },
  {
    label: "Gadgets / Tech",
    categoryId,
    keywords: ["apple", "xiaomi", "audifonos", "mouse", "teclado", "cable usb"],
  },
  {
    label: "Fotografía / Video",
    categoryId,
    keywords: ["lente", "memoria sd", "tripode", "adobe", "lightroom"],
  },
  {
    label: "Coleccionables",
    categoryId,
    keywords: ["funkos", "cartas", "figuras", "hobby"],
  },
];
