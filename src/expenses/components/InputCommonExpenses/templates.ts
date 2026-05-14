import { ExpenseTemplate } from "@/expenses/types";

import { FOOD_TEMPLATES } from "./templates/food";
import { HEALTH_TEMPLATES } from "./templates/health";
import { HOBBIES_TEMPLATES } from "./templates/hobbies";
import { HOME_TEMPLATES } from "./templates/home";
import { OTHER_TEMPLATES } from "./templates/other";
import { SOCIAL_TEMPLATES } from "./templates/social";
import { TRAVEL_TEMPLATES } from "./templates/travel";

export const COMMON_EXPENSES: ExpenseTemplate[] = [
  ...FOOD_TEMPLATES,
  ...HOME_TEMPLATES,
  ...HEALTH_TEMPLATES,
  ...SOCIAL_TEMPLATES,
  ...HOBBIES_TEMPLATES,
  ...TRAVEL_TEMPLATES,
  ...OTHER_TEMPLATES,
];
