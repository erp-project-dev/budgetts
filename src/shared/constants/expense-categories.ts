export const EXPENSE_CATEGORIES = [
  { id: "food", label: "Comida" },
  { id: "home", label: "Hogar" },
  { id: "health", label: "Salud" },
  { id: "social", label: "Social" },
  { id: "hobbies", label: "Hobbies" },
  { id: "travel", label: "Viajes" },
  { id: "other", label: "Otros" },
] as const;

export type ExpenseCategoryId = (typeof EXPENSE_CATEGORIES)[number]["id"];

const labelById = new Map<string, string>(
  EXPENSE_CATEGORIES.map((c) => [c.id, c.label]),
);

export function normalizeExpenseCategoryId(categoryId: string): string {
  return categoryId.startsWith("cat-") ? categoryId.slice(4) : categoryId;
}

export function getExpenseCategoryLabel(categoryId: string): string {
  const normalizedCategoryId = normalizeExpenseCategoryId(categoryId);
  return labelById.get(normalizedCategoryId) ?? normalizedCategoryId;
}

export const DEFAULT_EXPENSE_CATEGORY_ID: ExpenseCategoryId =
  EXPENSE_CATEGORIES[0].id;
