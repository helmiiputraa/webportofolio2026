import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { contactInfo, personalInfo } from "../../data/portfolioData";
import { HiMail, HiArrowRight, HiCheck, HiX } from "react-icons/hi";
import { SiGithub, SiInstagram, SiLinkedin } from "react-icons/si";
import { HiPaperAirplane } from "react-icons/hi2";

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "YOUR_ACCESS_KEY";

const links = [
  {
    name: "Email",
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
    icon: HiMail,
    color: "#EA4335",
    desc: "Send me an email to collaborate",
  },
  {
    name: "GitHub",
    value: contactInfo.github.split("/").pop(),
    href: contactInfo.github,
    icon: SiGithub,
    color: "#9ca3af",
    desc: "View my repositories & contributions",
  },
  {
    name: "Instagram",
    value: contactInfo.instagram.split("/").pop(),
    href: contactInfo.instagram,
    icon: SiInstagram,
    color: "#E4405F",
    desc: "Follow for the latest updates",
  },
  {
    name: "LinkedIn",
    value: contactInfo.linkedin.split("/").pop(),
    href: contactInfo.linkedin,
    icon: SiLinkedin,
    color: "#0A66C2",
    desc: "Connect for professional networking",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle, sending, success, error
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear error for this field as user types
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Custom validation
    const newErrors = {};
    if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    }
    if (formData.message.trim().length < 15) {
      newErrors.message = "Message must be at least 15 characters.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact: ${formData.name}`,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 18px",
    borderRadius: "12px",
    fontSize: "0.95rem",
    fontFamily: "'Outfit', sans-serif",
    outline: "none",
    transition: "all 0.3s ease",
    background: isDark ? "rgba(15,23,42,0.8)" : "rgba(255,255,255,0.9)",
    border: `1px solid ${
      isDark ? "rgba(59,130,246,0.15)" : "rgba(37,99,235,0.12)"
    }`,
    color: isDark ? "#e2e8f0" : "#1e293b",
  };

  return (
    <section id="contact" className="relative">
      <div className="section-container" ref={ref} style={{ paddingBottom: "1rem" }}>
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
            Get In Touch
          </h2>
          <p
            className="theme-text-secondary"
            style={{
              fontSize: "1rem",
              lineHeight: "1.7",
              marginTop: "0.75rem",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
            }}
          >
            Interested in working together? Feel free to reach out through any
            platform below.
          </p>
        </motion.div>

        {/* Two-column layout: Form + Links */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          style={{ maxWidth: "1000px", margin: "0 auto" }}
        >
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} noValidate>
              <div
                className="rounded-2xl"
                style={{
                  padding: "2rem",
                  background: isDark
                    ? "rgba(15,23,42,0.6)"
                    : "rgba(255,255,255,0.7)",
                  border: `1px solid ${
                    isDark
                      ? "rgba(59,130,246,0.08)"
                      : "rgba(37,99,235,0.06)"
                  }`,
                  backdropFilter: "blur(10px)",
                }}
              >
                <h3
                  className="font-bold theme-text"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "1.25rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  Send Me a Message
                </h3>

                {/* Name */}
                <div style={{ marginBottom: "1.25rem" }}>
                  <label
                    className="font-semibold theme-text"
                    style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontFamily: "'Outfit', sans-serif",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{
                      ...inputStyle,
                      border: errors.name
                        ? "1px solid #ef4444"
                        : inputStyle.border,
                    }}
                    className="theme-text"
                  />
                  {errors.name && (
                    <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.4rem", fontFamily: "'Outfit', sans-serif" }}>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div style={{ marginBottom: "1.25rem" }}>
                  <label
                    className="font-semibold theme-text"
                    style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontFamily: "'Outfit', sans-serif",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="youremail@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    style={{
                      ...inputStyle,
                      border: errors.email
                        ? "1px solid #ef4444"
                        : inputStyle.border,
                    }}
                    className="theme-text"
                  />
                  {errors.email && (
                    <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.4rem", fontFamily: "'Outfit', sans-serif" }}>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    className="font-semibold theme-text"
                    style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontFamily: "'Outfit', sans-serif",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Hello! I'm interested in collaborating with you on..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                      minHeight: "130px",
                      border: errors.message
                        ? "1px solid #ef4444"
                        : inputStyle.border,
                    }}
                    className="theme-text"
                  />
                  {errors.message && (
                    <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.4rem", fontFamily: "'Outfit', sans-serif" }}>
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.15, delay: 0 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 text-white font-semibold rounded-xl cursor-pointer"
                  style={{
                    width: "100%",
                    padding: "14px 24px",
                    background:
                      status === "success"
                        ? "linear-gradient(135deg, #22c55e, #16a34a)"
                        : status === "error"
                        ? "linear-gradient(135deg, #ef4444, #dc2626)"
                        : "linear-gradient(135deg, #2563eb, #3b82f6)",
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.95rem",
                    boxShadow:
                      status === "success"
                        ? "0 4px 15px rgba(34,197,94,0.3)"
                        : status === "error"
                        ? "0 4px 15px rgba(239,68,68,0.3)"
                        : "0 4px 15px rgba(37,99,235,0.3)",
                    border: "none",
                    opacity: status === "sending" ? 0.7 : 1,
                    transition: "all 0.3s ease",
                  }}
                >
                  {status === "sending" && (
                    <>
                      <span
                        className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        style={{ animation: "spin 0.8s linear infinite" }}
                      />
                      Sending...
                    </>
                  )}
                  {status === "success" && (
                    <>
                      <HiCheck style={{ fontSize: "1.1rem" }} />
                      Message Sent!
                    </>
                  )}
                  {status === "error" && (
                    <>
                      <HiX style={{ fontSize: "1.1rem" }} />
                      Failed to Send
                    </>
                  )}
                  {status === "idle" && (
                    <>
                      <HiPaperAirplane style={{ fontSize: "1.1rem" }} />
                      Submit Message
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Right: Contact Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            {links.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.a
                  key={c.name}
                  href={c.href}
                  target={c.name !== "Email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{
                    y: -4,
                    scale: 1.02,
                    transition: { duration: 0.2, delay: 0 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-4 rounded-2xl no-underline"
                  style={{
                    padding: "1.25rem 1.5rem",
                    background: isDark
                      ? "rgba(15,23,42,0.6)"
                      : "rgba(255,255,255,0.7)",
                    border: `1px solid ${
                      isDark
                        ? "rgba(59,130,246,0.08)"
                        : "rgba(37,99,235,0.06)"
                    }`,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${c.color}15` }}
                  >
                    <Icon className="text-xl" style={{ color: c.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3
                        className="font-bold theme-text"
                        style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: "1rem",
                          marginBottom: "0.15rem",
                        }}
                      >
                        {c.name}
                      </h3>
                      <HiArrowRight className="text-lg theme-text-accent opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
                    </div>
                    <p
                      className="font-medium theme-text-accent truncate"
                      style={{ fontSize: "0.85rem", marginBottom: "0.1rem" }}
                    >
                      {c.value}
                    </p>
                    <p
                      className="theme-text-secondary"
                      style={{ fontSize: "0.75rem" }}
                    >
                      {c.desc}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{
            marginTop: "4rem",
            paddingTop: "1.5rem",
            paddingBottom: "1rem",
            borderTop: `1px solid ${
              isDark ? "rgba(59,130,246,0.1)" : "rgba(37,99,235,0.08)"
            }`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          {/* Logo — same as navbar */}
          <a href="#home" className="flex items-center gap-3 no-underline">
            <img
              src="/logo.png"
              alt="HP Logo"
              className="w-10 h-10 rounded-xl object-contain"
            />
            <span
              className="text-[1.2rem] font-extrabold tracking-tight theme-text"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {personalInfo.name.split(" ")[0].toUpperCase()}{" "}
              <span className="theme-text-accent">
                {personalInfo.name.split(" ")[1]?.toUpperCase() || "DEV"}
              </span>
            </span>
          </a>
          <p
            className="theme-text-secondary"
            style={{ fontSize: "0.85rem" }}
          >
            Copyright © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
        </motion.div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        #contact input:focus,
        #contact textarea:focus {
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.2);
        }
      `}</style>
    </section>
  );
}
