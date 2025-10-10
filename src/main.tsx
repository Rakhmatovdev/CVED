import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "./i18n.ts";
import { AntdProvider } from "@/app/providers/antd-provider/ui/antd-provider.tsx";

document.documentElement.classList.toggle(
  "dark",
  localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
);

createRoot(document.getElementById("root")!).render(
  <AntdProvider>
    <App />
  </AntdProvider>
);
