import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SwePage from "./pages/SwePage";
import PmuxPage from "./pages/PmuxPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/swe" element={<SwePage />} />
      <Route path="/pmux" element={<PmuxPage />} />
    </Routes>
  );
}
