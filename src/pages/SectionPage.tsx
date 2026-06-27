import { Link } from "react-router-dom";
import { SectionId } from "../data/islands";
import { SECTION_CONTENT, SECTION_PATHS } from "../data/sections";
import { ProjectCard } from "../components/ProjectCard";
import "./SectionPage.css";

interface SectionPageProps {
  sectionId: SectionId;
}

export function SectionPage({ sectionId }: SectionPageProps) {
  const content = SECTION_CONTENT[sectionId];
  const hasProjects = content.projects && content.projects.length > 0;

  return (
    <div className="section-page">
      <div className={`section-page-inner${hasProjects ? " section-page-inner--wide" : ""}`}>
        <Link to="/" className="section-back btn btn-light">
          ← Back to map
        </Link>
        <h1 className="text-h1">{content.title}</h1>
        <p className="text-body">{content.body}</p>

        {hasProjects && (
          <div className="project-grid">
            {content.projects!.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                basePath={SECTION_PATHS[sectionId]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
