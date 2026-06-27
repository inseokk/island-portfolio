import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SwePage from "./pages/SwePage";
import PmuxPage from "./pages/PmuxPage";
import ProjectPage from "./pages/ProjectPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/swe" element={<SwePage />} />
      <Route path="/swe/:slug" element={<ProjectPage sectionId="swe" />} />
      <Route path="/pmux" element={<PmuxPage />} />
      <Route path="/pmux/:slug" element={<ProjectPage sectionId="pmux" />} />
    </Routes>
  );
}
