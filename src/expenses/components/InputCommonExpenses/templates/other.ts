import { ExpenseCategoryId } from "@/shared/constants/expense-categories";

import { ExpenseTemplate } from "@/expenses/types";

const categoryId: ExpenseCategoryId = "other";

export const OTHER_TEMPLATES: ExpenseTemplate[] = [
  {
    label: "Comisiones Bancarias",
    categoryId,
    keywords: [
      "mantenimiento cuenta",
      "itf",
      "comision",
      "bcp",
      "interbank",
      "bbva",
    ],
  },
  {
    label: "Donación / Caridad",
    categoryId,
    keywords: ["unicef", "techo", "iglesia", "ayuda"],
  },
  {
    label: "Trámites / Notaría",
    categoryId,
    keywords: [
      "reniec",
      "sunat",
      "partida",
      "firma legalizada",
      "copia certificada",
    ],
  },
  {
    label: "Retiro de Efectivo",
    categoryId,
    keywords: ["cajero", "atm", "disposicion", "cash"],
  },
  {
    label: "Reparación Técnica",
    categoryId,
    keywords: ["celular roto", "pantalla", "laptop", "servicio tecnico"],
  },
  {
    label: "Suscripciones Físicas",
    categoryId,
    keywords: ["club el comercio", "revista", "periodico"],
  },
  {
    label: "Multas",
    categoryId,
    keywords: ["papeleta", "sat", "muni", "infraccion"],
  },
  {
    label: "Telefonía Móvil",
    categoryId,
    amount: 50,
    keywords: ["plan postpago", "recarga", "entel", "movistar", "bitel"],
  },
  {
    label: "Varios",
    categoryId,
    keywords: ["imprevisto", "otros", "gasto varios"],
  },
  {
    label: "Transferencia Yape/Plin",
    categoryId,
    keywords: ["yape", "plin", "pago digital", "transferencia"],
  },
  {
    label: "Estacionamiento",
    categoryId,
    amount: 10,
    keywords: ["los portales", "parqueo", "cochera", "ticket"],
  },
  {
    label: "Lavado de Auto",
    categoryId,
    amount: 30,
    keywords: ["carwash", "limpieza auto", "encerado"],
  },
  {
    label: "Seguro Vehicular",
    categoryId,
    keywords: ["soat", "mapfre vehicular", "seguro auto", "gps"],
  },
];
