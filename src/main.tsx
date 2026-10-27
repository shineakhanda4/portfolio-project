import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@fontsource-variable/newsreader/wght.css";
import "@fontsource-variable/newsreader/wght-italic.css";
import "@fontsource-variable/manrope/wght.css";
import "@/styles/globals.css";
import { App } from "@/App";
import { preloadPageForPath } from "@/lib/pageRegistry";

const container = document.getElementById("root");

if (!container) {
  throw new Error("The application root element was not found.");
}

const application = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

async function boot() {
  try {
    await preloadPageForPath(window.location.pathname);
  } catch (error) {
    console.error("Initial page preload failed", error);
  }

  if (container?.hasChildNodes()) {
    hydrateRoot(container, application, {
      onRecoverableError(error, errorInfo) {
        console.error("HYDRATION_RECOVERABLE", error, errorInfo.componentStack);
      },
    });
  } else if (container) {
    createRoot(container).render(application);
  }
}

if (import.meta.env.DEV) {
  void boot();
} else {
  const scheduleHydration = () => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        void boot();
      });
    });
  };

  if (document.readyState === "complete") {
    scheduleHydration();
  } else {
    window.addEventListener("load", scheduleHydration, { once: true });
  }
}
