import { Link } from "react-router-dom";
import { Project } from "../data/sections";
import "./ProjectCard.css";

interface ProjectCardProps {
  project: Project;
  basePath: string;
}

export function ProjectCard({ project, basePath }: ProjectCardProps) {
  return (
    <Link to={`${basePath}/${project.slug}`} className="project-card">
      <div
        className="project-card-thumbnail"
        style={
          project.thumbnail
            ? { backgroundImage: `url(${project.thumbnail})`, backgroundSize: "cover", backgroundPosition: "center" }
            : { background: project.thumbnailColor }
        }
      />
      <div className="project-card-body">
        <h2 className="text-h2 project-card-title">{project.title}</h2>
        <p className="text-small project-card-desc">{project.description}</p>
        <div className="project-card-badges">
          {project.badges.map((badge) => (
            <span key={badge} className="project-badge text-label">
              {badge}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
