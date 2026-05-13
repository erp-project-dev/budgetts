import { useContext } from "react";

import { HomeContext } from "../context/home-context";

export function useHome() {
  const context = useContext(HomeContext);

  if (!context) {
    throw new Error("useHome must be used within an HomeProvider");
  }

  return context;
}
