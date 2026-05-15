import { ExpenseCategoryId } from "@/shared/constants/expense-categories";

import { ExpenseTemplate } from "@/expenses/types";

const categoryId: ExpenseCategoryId = "travel";

export const TRAVEL_TEMPLATES: ExpenseTemplate[] = [
  {
    label: "Taxi App",
    categoryId,
    amount: 20,
    keywords: ["uber", "cabify", "indrive", "didi", "taxi"],
  },
  {
    label: "Gasolina",
    categoryId,
    keywords: [
      "repsol",
      "primax",
      "petroperu",
      "grifo",
      "combustible",
      "gasohol",
    ],
  },
  {
    label: "Transporte Público",
    categoryId,
    amount: 3,
    keywords: [
      "metropolitano",
      "tren electrico",
      "corredor",
      "colectivo",
      "pasaje",
    ],
  },
  {
    label: "Peaje",
    categoryId,
    amount: 6.6,
    keywords: ["rutas de lima", "peaje", "lima expresa", "evitamiento"],
  },
  {
    label: "Vuelos / Pasajes",
    categoryId,
    keywords: [
      "latam",
      "sky",
      "jetsmart",
      "vuelo",
      "pasaje aereo",
      "paseo",
      "viaje",
    ],
  },
  {
    label: "Alojamiento / Hotel",
    categoryId,
    keywords: ["airbnb", "booking", "hotel", "hospedaje"],
  },
];
