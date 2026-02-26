import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { projects } from "../../data/portfolioData";
import { HiExternalLink } from "react-icons/hi";
import { SiGithub } from "react-icons/si";
import { HiGlobeAlt } from "react-icons/hi2";

const displayedProjects = projects.slice(0, 3);

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { isDark } = useTheme();

  return (
    <section id="projects" className="relative">
      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <h2
            className="section-title gradient-text"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Project Experience
          </h2>
          <p
            className="theme-text-secondary"
            style={{
              fontSize: "1rem",
              lineHeight: "1.7",
              marginTop: "0.75rem",
              maxWidth: "700px",
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
            }}
          >
            Transforming Innovative Ideas Into Functional Digital Products Through
          </p>
        </motion.div>

        {/* Projects Grid — only top 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isDark={isDark}
            />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ textAlign: "center", marginTop: "3rem" }}
        >
          <motion.a
            href="https://github.com/helmiiputraa"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, transition: { duration: 0.15, delay: 0 } }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 text-white font-semibold rounded-xl cursor-pointer"
            style={{
              padding: "14px 40px",
              background: "linear-gradient(135deg, #2563eb, #3b82f6)",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "1rem",
              boxShadow: "0 4px 20px rgba(37,99,235,0.3)",
              letterSpacing: "0.03em",
            }}
          >
            View All
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, isDark }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, transition: { duration: 0.2, delay: 0 } }}
      className="group flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: isDark ? "rgba(15,23,42,0.6)" : "rgba(255,255,255,0.7)",
        border: `1px solid ${
          isDark ? "rgba(59,130,246,0.08)" : "rgba(37,99,235,0.06)"
        }`,
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Project Image */}
      <div className="relative overflow-hidden" style={{ height: "200px" }}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}
        {/* Fallback placeholder */}
        <div
          className="w-full h-full items-center justify-center"
          style={{
            display: project.image ? "none" : "flex",
            background: isDark
              ? "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(30,58,138,0.15))"
              : "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(30,64,175,0.08))",
          }}
        >
          <HiGlobeAlt
            className="theme-text-accent"
            style={{ fontSize: "3rem", opacity: 0.25 }}
          />
        </div>

        {/* Overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />

        {/* Hover links */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white"
              style={{
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(8px)",
              }}
            >
              <HiExternalLink style={{ fontSize: "1rem" }} />
            </motion.a>
          )}
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white"
              style={{
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(8px)",
              }}
            >
              <SiGithub style={{ fontSize: "0.95rem" }} />
            </motion.a>
          )}
        </div>
      </div>

      {/* Content */}
      <div
        className="flex flex-col flex-1"
        style={{ padding: "1.25rem 1.5rem 1.5rem" }}
      >
        {/* Title */}
        <h3
          className="font-bold theme-text"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "1.15rem",
            marginBottom: "0.6rem",
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="theme-text-secondary flex-1"
          style={{
            fontSize: "0.875rem",
            lineHeight: "1.7",
            textAlign: "justify",
            marginBottom: "1rem",
          }}
        >
          {project.description}
        </p>

        {/* Tech Stack Tags */}
        <div
          className="flex flex-wrap gap-2"
          style={{ marginBottom: "1.25rem" }}
        >
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="font-medium"
              style={{
                fontSize: "0.75rem",
                padding: "4px 12px",
                borderRadius: "8px",
                background: isDark
                  ? "rgba(59,130,246,0.1)"
                  : "rgba(37,99,235,0.08)",
                border: `1px solid ${
                  isDark
                    ? "rgba(59,130,246,0.15)"
                    : "rgba(37,99,235,0.12)"
                }`,
                color: isDark ? "#93c5fd" : "#2563eb",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Button */}
        {project.liveUrl && (
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, transition: { duration: 0.15, delay: 0 } }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 text-white font-semibold rounded-xl cursor-pointer"
            style={{
              padding: "12px 24px",
              background: "linear-gradient(135deg, #2563eb, #3b82f6)",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.9rem",
              boxShadow: "0 4px 15px rgba(37,99,235,0.3)",
              width: "100%",
            }}
          >
            <HiGlobeAlt style={{ fontSize: "1.1rem" }} />
            Check Quest Now!
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}
