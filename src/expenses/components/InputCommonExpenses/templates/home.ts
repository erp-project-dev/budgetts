import { ExpenseCategoryId } from "@/shared/constants/expense-categories";

import { ExpenseTemplate } from "@/expenses/types";

const categoryId: ExpenseCategoryId = "home";

export const HOME_TEMPLATES: ExpenseTemplate[] = [
  {
    label: "Luz / Electricidad",
    categoryId,
    keywords: ["enel", "luz del sur", "recibo luz", "electricidad"],
  },
  {
    label: "Agua",
    categoryId,
    keywords: ["sedapal", "recibo agua", "potable"],
  },
  {
    label: "Internet / Wifi",
    categoryId,
    amount: 110,
    keywords: ["win", "nubyx", "movistar", "claro", "fibra", "router"],
  },
  {
    label: "Mantenimiento Edificio",
    categoryId,
    keywords: ["cuota", "vigilancia", "limpieza edificio", "areas comunes"],
  },
  {
    label: "Gas",
    categoryId,
    amount: 40,
    keywords: ["calidda", "balon de gas", "solgas", "primax gas"],
  },
  {
    label: "Limpieza / Lavandería",
    categoryId,
    amount: 30,
    keywords: [
      "detergente",
      "poett",
      "lavada",
      "planchado",
      "ropa",
      "tintoreria",
    ],
  },
  {
    label: "Ferretería / DIY",
    categoryId,
    keywords: [
      "sodimac",
      "promart",
      "maestro",
      "reparacion",
      "foco",
      "herramientas",
    ],
  },
  {
    label: "Artículos del Hogar",
    categoryId,
    keywords: ["casa ideas", "miniso", "decoracion", "sabanas", "menaje"],
  },
  {
    label: "Seguridad / Alarmas",
    categoryId,
    keywords: ["verisure", "prosegur", "camaras", "monitoreo"],
  },
  {
    label: "Muebles / Electro",
    categoryId,
    keywords: ["refrigeradora", "cocina", "cama", "escritorio", "silla"],
  },
  {
    label: "Mantenimiento Auto",
    categoryId,
    keywords: [
      "taller",
      "aceite",
      "frenos",
      "llantas",
      "mitsui",
      "maquinarias",
    ],
  },
];
