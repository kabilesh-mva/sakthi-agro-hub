import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Initialize AOS (Animate On Scroll)
import AOS from "aos";
import "aos/dist/aos.css";

// Toolbar for development mode (to enable: run 'npm install @21st-extension/toolbar' or 'bun install @21st-extension/toolbar')
// Uncomment the following code when the package is installed to enable the toolbar in development mode
/*
import { initToolbar } from "@21st-extension/toolbar";

const stagewiseConfig = {
  plugins: [],
};

function setupStagewise() {
  if (process.env.NODE_ENV === "development") {
    initToolbar(stagewiseConfig);
  }
}

setupStagewise();
*/

// Initialize AOS when the app starts
AOS.init({
  duration: 1000,
  once: true,
  easing: "ease-out-cubic",
});

createRoot(document.getElementById("root")!).render(<App />);
