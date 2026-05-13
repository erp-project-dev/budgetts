import type { AppRouter } from "@/app/types";

import { LoginProvider } from "../context/LoginProvider";
import { LoginPage } from "../LoginPage";

export const LoginRouter: AppRouter[] = [
  {
    component: () => (
      <LoginProvider>
        <LoginPage />
      </LoginProvider>
    ),
    path: "/login",
    name: "Login",
    isPublic: true,
  },
];
