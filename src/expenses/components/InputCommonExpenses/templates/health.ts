import { ExpenseCategoryId } from "@/shared/constants/expense-categories";

import { ExpenseTemplate } from "@/expenses/types";

const categoryId: ExpenseCategoryId = "health";

export const HEALTH_TEMPLATES: ExpenseTemplate[] = [
  {
    label: "Farmacia",
    categoryId,
    keywords: [
      "inkafarma",
      "mifarma",
      "botica",
      "medicinas",
      "pastillas",
      "remedio",
    ],
  },
  {
    label: "Gimnasio",
    categoryId,

    amount: 150,
    keywords: ["smartfit", "bodytech", "entrenamiento", "gym", "mensualidad"],
  },
  {
    label: "Consulta Médica",
    categoryId,
    keywords: [
      "hospital",
      "clinica",
      "delgado",
      "san pablo",
      "internacional",
      "sana",
      "essalud",
      "rebagliati",
      "montefiori",
      "doctor",
      "cita",
    ],
  },
  {
    label: "Dentista",
    categoryId,
    keywords: ["odontologo", "limpieza dental", "brackets", "caries", "diente"],
  },
  {
    label: "Seguro de Salud",
    categoryId,
    keywords: ["rimac", "pacifico", "mapfre", "eps", "oncosalud"],
  },
  {
    label: "Suplementos / Proteína",
    categoryId,
    keywords: [
      "creatina",
      "whey",
      "vitaminas",
      "lab nutricion",
      "nutricionista",
    ],
  },
  {
    label: "Laboratorio / Análisis",
    categoryId,
    keywords: ["sangre", "analisis", "radiografia", "ecografia", "chequeo"],
  },
  {
    label: "Terapia / Psicología",
    categoryId,
    keywords: ["sesion", "terapeuta", "salud mental", "psicologo"],
  },
  {
    label: "Óptica",
    categoryId,
    keywords: ["lentes", "montura", "gmo", "econolentes", "contacto", "vision"],
  },
  {
    label: "Veterinaria",
    categoryId,
    keywords: ["perro", "gato", "mascota", "vacuna", "croquetas", "grooming"],
  },
];
