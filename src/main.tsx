import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";

import App from "./App.tsx";

import "./main.css";

const Router = import.meta.env.BASE_URL === "/" ? BrowserRouter : HashRouter;

createRoot(document.getElementById("root")!).render(
  <Router>
    <App />
  </Router>,
);
