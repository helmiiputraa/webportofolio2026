import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { FaJava } from "react-icons/fa";
import {
  SiPhp,
  SiLaravel,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiBootstrap,
  SiMysql,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiGit,
  SiPython,

  SiFigma,
  SiNextdotjs,
  SiPostgresql,
  SiDocker,
  SiVuedotjs,
  SiCplusplus,
  SiAdobephotoshop,
  SiCanva,
} from "react-icons/si";

const familiarTools = [
  { name: "PHP", icon: SiPhp, color: "#777BB4" },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Vue", icon: SiVuedotjs, color: "#4FC08D" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "HTML", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS", icon: SiCss3, color: "#1572B6" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "C++", icon: SiCplusplus, color: "#00599C" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Java", icon: FaJava, color: "#ED8B00" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Canva", icon: SiCanva, color: "#00C4CC" },
  { name: "Photoshop", icon: SiAdobephotoshop, color: "#31A8FF" },
];
const journeyData = {
  internship: {
    title: "Internship",
    gradient: "linear-gradient(135deg, #2563eb, #3b82f6)",
    dotGradient: "linear-gradient(135deg, #2563eb, #60a5fa)",
    shadow: "rgba(37,99,235,0.3)",
    items: [
      {
        period: "2026",
        organization: "Badan Kepegawaian Daerah Provinsi Jawa Tengah",
        role: "Backend Developer Intern",
      },
      {
        period: "2021",
        organization: "CV. Bumi Web",
        role: "Technical Support Intern",
      },
    ],
  },
  organization: {
    title: "Organization",
    gradient: "linear-gradient(135deg, #2563eb, #3b82f6)",
    dotGradient: "linear-gradient(135deg, #2563eb, #60a5fa)",
    shadow: "rgba(37,99,235,0.3)",
    items: [
      {
        period: "2023 - 2024",
        organization: "Google Developer Student Clubs UNNES",
        role: "Member of GDSC UNNES",
      },
      {
        period: "2024 - 2025",
        organization: "I-Secret Ilmu Komputer UNNES",
        role: "Staff of Networking Division",
      },
      {
        period: "2024 - 2025",
        organization: "Google Developer Group of Campus ITS",
        role: "Member of GDGoC ITS",
      },
      {
        period: "2025 - 2026",
        organization: "UKM Riptek UNNES",
        role: "Staff of IT Development Division",
      },
    ],
  },
  committee: {
    title: "Committee",
    gradient: "linear-gradient(135deg, #1e40af, #3b82f6)",
    dotGradient: "linear-gradient(135deg, #1e40af, #60a5fa)",
    shadow: "rgba(30,64,175,0.3)",
    items: [
      {
        period: "2025",
        organization: "UKM Riptek UNNES",
        role: "Technical Mentor IT Development Division of DevXperience 2025",
      },
      {
        period: "2024",
        organization: "I-Secret Ilmu Komputer UNNES",
        role: "Public Relations Division of Grand Launching Workshop PKM 2024",
      },
      {
        period: "2024",
        organization: "HIMA Ilmu Komputer UNNES",
        role: "Equipment Division of INTERFACE 2024",
      },
    ],
  },
};

function TimelineCard({ item, index, dotGradient, isDark, isLast }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  const glowColor = dotGradient.includes("#3b82f6")
    ? "rgba(59,130,246,0.4)"
    : dotGradient.includes("#8b5cf6")
    ? "rgba(139,92,246,0.4)"
    : "rgba(34,197,94,0.4)";

  const lineColor = dotGradient.includes("#3b82f6")
    ? "rgba(59,130,246,0.2)"
    : dotGradient.includes("#8b5cf6")
    ? "rgba(139,92,246,0.2)"
    : "rgba(34,197,94,0.2)";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative"
      style={{ paddingLeft: "48px", paddingBottom: isLast ? "0" : "1.5rem" }}
    >
      {/* Vertical line (continuous behind dot) */}
      {!isLast && (
        <div
          style={{
            position: "absolute",
            left: "14px",
            top: "0",
            bottom: "0",
            width: "2px",
            background: isDark ? lineColor : lineColor,
          }}
        />
      )}

      {/* Gradient dot */}
      <motion.div
        style={{
          position: "absolute",
          left: "4px",
          top: "16px",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          background: dotGradient,
          boxShadow: `0 0 12px ${glowColor}`,
          zIndex: 2,
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.5,
        }}
      />

      {/* Card */}
      <div
        className="rounded-xl transition-all duration-300"
        style={{
          padding: "1.25rem 1.5rem",
          background: isDark ? "rgba(15,23,42,0.6)" : "rgba(255,255,255,0.7)",
          border: `1px solid ${
            isDark ? "rgba(59,130,246,0.08)" : "rgba(37,99,235,0.06)"
          }`,
          backdropFilter: "blur(10px)",
        }}
      >
        <p
          className="font-bold theme-text"
          style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem" }}
        >
          {item.period}
        </p>
        <p
          className="font-bold theme-text-accent"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.95rem",
            marginTop: "0.35rem",
          }}
        >
          {item.organization}
        </p>
        <p
          className="theme-text-secondary"
          style={{
            fontSize: "0.9rem",
            marginTop: "0.35rem",
            lineHeight: "1.6",
          }}
        >
          {item.role}
        </p>
      </div>
    </motion.div>
  );
}

function JourneyColumn({ data, index, isDark }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="flex flex-col"
    >
      {/* Column Header Pill */}
      <motion.div
        style={{ marginBottom: "2.5rem" }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="text-center font-bold text-white tracking-wide"
          style={{
            background: data.gradient,
            boxShadow: `0 4px 25px ${data.shadow}`,
            fontFamily: "'Outfit', sans-serif",
            fontSize: "1rem",
            letterSpacing: "0.05em",
            padding: "14px 32px",
            borderRadius: "999px",
            width: "100%",
          }}
        >
          {data.title}
        </div>
      </motion.div>

      {/* Timeline Items */}
      <div>
        {data.items.map((item, i) => (
          <TimelineCard
            key={i}
            item={item}
            index={i}
            dotGradient={data.dotGradient}
            isDark={isDark}
            isLast={i === data.items.length - 1}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { isDark } = useTheme();

  const columns = [
    journeyData.internship,
    journeyData.organization,
    journeyData.committee,
  ];

  return (
    <section id="about" className="relative particle-bg">
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="section-title gradient-text"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            About Me
          </h2>
        </motion.div>

        {/* Bio Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            textAlign: "center",
            maxWidth: "900px",
            margin: "0 auto",
            marginBottom: "4rem",
          }}
        >
          <p
            className="theme-text-secondary"
            style={{ fontSize: "1.05rem", lineHeight: "1.9" }}
          >
            Hi, I am{" "}
            <span className="font-semibold theme-text">
              Helmi Putra Noor Pratama
            </span>
            , 6th semester Informatics Engineering student at{" "}
            <span className="font-semibold theme-text">
              Universitas Negeri Semarang
            </span>{" "}
            with a strong passion for IT, specializing in Web Development and
            Machine Learning. Professionally certified by{" "}
            <span className="font-semibold theme-text">
              BNSP, Mikrotik, and Cisco
            </span>
            , with robust technical proficiency in web programming, machine
            learning, UI/UX design, and network management.
          </p>
        </motion.div>

        {/* 3-Column Journey Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {columns.map((col, i) => (
            <JourneyColumn
              key={col.title}
              data={col}
              index={i}
              isDark={isDark}
            />
          ))}
        </div>

        {/* Familiar Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          style={{ marginTop: "5rem" }}
        >
          <div className="text-center" style={{ marginBottom: "2.5rem" }}>
            <h2
              className="gradient-text"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                fontWeight: 800,
                marginBottom: "0.75rem",
              }}
            >
              Familiar Tools
            </h2>
            <p className="theme-text-secondary" style={{ fontSize: "1rem" }}>
              The Tools Behind My Development Workflow
            </p>
          </div>

          <motion.div
            className="grid gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
              maxWidth: "1000px",
              margin: "0 auto",
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ staggerChildren: 0.05 }}
          >
            {familiarTools.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                whileHover={{ scale: 1.08, y: -5, transition: { duration: 0.15, delay: 0 } }}
                className="flex flex-col items-center justify-center gap-3 rounded-xl cursor-default transition-all duration-300"
                style={{
                  padding: "1.5rem 1rem",
                  background: isDark ? "rgba(15,23,42,0.6)" : "rgba(255,255,255,0.7)",
                  border: `1px solid ${isDark ? "rgba(59,130,246,0.08)" : "rgba(37,99,235,0.06)"}`,
                  backdropFilter: "blur(10px)",
                }}
              >
                <tool.icon style={{ fontSize: "2rem", color: tool.name === "Next.js" ? (isDark ? "#ffffff" : "#000000") : tool.color }} />
                <span
                  className="theme-text font-medium"
                  style={{ fontSize: "0.8rem", textAlign: "center" }}
                >
                  {tool.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
