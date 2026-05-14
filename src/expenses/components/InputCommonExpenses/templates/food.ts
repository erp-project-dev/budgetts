import { ExpenseCategoryId } from "@/shared/constants/expense-categories";

import { ExpenseTemplate } from "@/expenses/types";

const categoryId: ExpenseCategoryId = "food";

export const FOOD_TEMPLATES: ExpenseTemplate[] = [
  {
    label: "Almuerzo",
    categoryId,

    amount: 25,
    keywords: [
      "menu",
      "ejecutivo",
      "siete sopas",
      "la lucha",
      "restaurante",
      "almuerzo",
    ],
  },
  {
    label: "Cena",
    categoryId,

    amount: 45,
    keywords: [
      "cena",
      "noche",
      "madam tusan",
      "edo",
      "osaka",
      "tanta",
      "papachos",
      "chifa",
    ],
  },
  {
    label: "Desayuno",
    categoryId,

    amount: 15,
    keywords: ["pan", "cafeteria", "san antonio", "paltas", "sanguche", "jugo"],
  },
  {
    label: "Café",
    categoryId,

    amount: 14,
    keywords: [
      "starbucks",
      "juan valdez",
      "dunkin",
      "puku puku",
      "origami",
      "espresso",
    ],
  },
  {
    label: "Supermercado",
    categoryId,

    keywords: [
      "wong",
      "metro",
      "tottus",
      "plaza vea",
      "vivanda",
      "makro",
      "mass",
      "viveres",
    ],
  },
  {
    label: "Delivery comida",
    categoryId,

    keywords: [
      "rappi",
      "pedidosya",
      "delivery",
      "brasa",
      "pollo",
      "hamburguesa",
    ],
  },
  {
    label: "Comida rápida",
    categoryId,

    amount: 30,
    keywords: [
      "bembos",
      "kfc",
      "mcdonalds",
      "burger king",
      "popeyes",
      "pizza hut",
    ],
  },
  {
    label: "Snacks / Tambo",
    categoryId,

    amount: 12,
    keywords: [
      "tambo",
      "oxxo",
      "listo",
      "gaseosa",
      "galletas",
      "antojo",
      "tienda",
    ],
  },
  {
    label: "Panadería / Pastelería",
    categoryId,

    amount: 20,
    keywords: ["torta", "pasteles", "dulce", "donas", "empanada", "postre"],
  },
  {
    label: "Helados",
    categoryId,

    amount: 10,
    keywords: ["donofrio", "4d", "pinkberry", "helado", "paleta"],
  },
];
