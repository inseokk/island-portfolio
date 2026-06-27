import { useParams, Link } from "react-router-dom";
import { SectionId } from "../data/islands";
import { SECTION_CONTENT, SECTION_PATHS } from "../data/sections";
import "./SectionPage.css";
import "./ProjectPage.css";

interface ProjectPageProps {
  sectionId: SectionId;
}

export default function ProjectPage({ sectionId }: ProjectPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const section = SECTION_CONTENT[sectionId];
  const project = section.projects?.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="section-page">
        <div className="section-page-inner">
          <Link to={SECTION_PATHS[sectionId]} className="section-back btn btn-light">
            ← Back
          </Link>
          <p className="text-body">Project not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section-page">
      <div className="section-page-inner">
        <Link to={SECTION_PATHS[sectionId]} className="section-back btn btn-light">
          ← Back to {section.title}
        </Link>

        <div
          className="project-page-thumbnail"
          style={
            project.thumbnail
              ? { backgroundImage: `url(${project.thumbnail})`, backgroundSize: "cover", backgroundPosition: "center" }
              : { background: project.thumbnailColor }
          }
        />

        <div className="project-page-badges">
          {project.badges.map((badge) => (
            <span key={badge} className="project-badge text-label">
              {badge}
            </span>
          ))}
        </div>

        <h1 className="text-h1">{project.title}</h1>
        <p className="text-body project-page-body">{project.body}</p>
      </div>
    </div>
  );
}
