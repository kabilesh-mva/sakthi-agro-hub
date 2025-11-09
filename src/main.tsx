import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Initialize AOS (Animate On Scroll)
import AOS from "aos";
import "aos/dist/aos.css";

// Initialize AOS when the app starts
AOS.init({
  duration: 1000,
  once: true,
  easing: "ease-out-cubic",
});

createRoot(document.getElementById("root")!).render(<App />);
