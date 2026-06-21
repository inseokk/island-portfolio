import { Link } from "react-router-dom";
import { SectionId } from "../data/islands";
import { SECTION_CONTENT } from "../data/sections";
import "./SectionPage.css";

interface SectionPageProps {
  sectionId: SectionId;
}

export function SectionPage({ sectionId }: SectionPageProps) {
  const content = SECTION_CONTENT[sectionId];

  return (
    <div className="section-page">
      <div className="section-page-inner">
        <Link to="/" className="section-back btn btn-light">
          ← Back to map
        </Link>
        <h1 className="text-h1">{content.title}</h1>
        <p className="text-body">{content.body}</p>
      </div>
    </div>
  );
}
