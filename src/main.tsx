import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LanguageProvider } from "./contexts/LanguageContext.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";

// Suppress React Router future flag warnings
if (typeof console !== 'undefined') {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (args[0]?.includes('React Router Future Flag')) return;
    originalWarn(...args);
  };
}

// Fast rendering - no blocking initialization
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <ErrorBoundary>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ErrorBoundary>
  );
} else {
  console.error("Root element not found");
}
