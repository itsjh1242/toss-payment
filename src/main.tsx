// react
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// route
import AppRoutes from "@/routes";
// style
import "@/index.css";

const basename = import.meta.env.VITE_BROWSER_ROUTER_BASE_NAME || "/";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>,
);
