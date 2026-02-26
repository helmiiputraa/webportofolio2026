import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { certificates } from "../../data/portfolioData";
import { HiX, HiCalendar, HiBadgeCheck } from "react-icons/hi";

function formatDate(dateStr) {
  if (!dateStr) return "No expiration";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const displayedCerts = certificates.slice(0, 6);

export default function Certificates() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { isDark } = useTheme();
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certificates" className="relative particle-bg">
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
            Certifications
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
            Professional certifications validating my technical expertise
          </p>
        </motion.div>

        {/* Certificates Grid — 4 items, 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCerts.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2, delay: 0 } }}
              onClick={() => setSelectedCert(cert)}
              className="group flex flex-col rounded-2xl overflow-hidden cursor-pointer"
              style={{
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
              {/* Cert Image */}
              <div className="relative overflow-hidden" style={{ height: "220px" }}>
                {cert.image ? (
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    style={{ padding: "0.5rem" }}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                {/* Fallback */}
                <div
                  className="w-full h-full items-center justify-center"
                  style={{
                    display: cert.image ? "none" : "flex",
                    background: isDark
                      ? "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(30,58,138,0.15))"
                      : "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(30,64,175,0.08))",
                  }}
                >
                  <HiBadgeCheck
                    className="theme-text-accent"
                    style={{ fontSize: "3.5rem", opacity: 0.25 }}
                  />
                </div>


              </div>

              {/* Info */}
              <div style={{ padding: "1.25rem 1.5rem 1.5rem" }}>
                <h3
                  className="font-bold theme-text"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "1.05rem",
                    marginBottom: "0.4rem",
                  }}
                >
                  {cert.name}
                </h3>
                <p
                  className="font-medium theme-text-accent"
                  style={{ fontSize: "0.875rem", marginBottom: "0.75rem" }}
                >
                  {cert.issuer}
                </p>
                <div
                  className="flex flex-wrap gap-4"
                  style={{ fontSize: "0.75rem" }}
                >
                  <div className="flex items-center gap-1.5 theme-text-secondary">
                    <HiCalendar className="theme-text-accent" />
                    <span>Issued: {formatDate(cert.issuedDate)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 theme-text-secondary">
                    <HiCalendar className="theme-text-accent" />
                    <span>Expires: {formatDate(cert.expiryDate)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
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
            href="https://drive.google.com/drive/folders/1OcawKahau5tciAWqgENVzF7cjTVPH1XU?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.15, delay: 0 },
            }}
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

      {/* Modal Preview */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
            style={{
              background: isDark
                ? "rgba(10,14,26,0.9)"
                : "rgba(0,0,0,0.6)",
              backdropFilter: "blur(10px)",
            }}
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-2xl max-w-lg w-full overflow-hidden"
              style={{
                background: isDark ? "rgb(15,23,42)" : "rgb(255,255,255)",
                border: `1px solid ${
                  isDark
                    ? "rgba(59,130,246,0.1)"
                    : "rgba(37,99,235,0.08)"
                }`,
              }}
            >
              {/* Modal Image */}
              <div
                className="h-52 flex items-center justify-center"
                style={{
                  background: isDark
                    ? "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(30,58,138,0.2))"
                    : "linear-gradient(135deg, rgba(37,99,235,0.1), rgba(30,64,175,0.1))",
                }}
              >
                {selectedCert.image ? (
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <HiBadgeCheck
                    className="text-8xl theme-text-accent"
                    style={{ opacity: 0.4 }}
                  />
                )}
              </div>

              {/* Modal Content */}
              <div style={{ padding: "1.5rem" }}>
                <div className="flex items-start justify-between" style={{ marginBottom: "1rem" }}>
                  <div>
                    <h3
                      className="font-bold theme-text"
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "1.25rem",
                      }}
                    >
                      {selectedCert.name}
                    </h3>
                    <p
                      className="font-medium theme-text-accent"
                      style={{ fontSize: "0.9rem", marginTop: "0.25rem" }}
                    >
                      {selectedCert.issuer}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedCert(null)}
                    className="w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer"
                    style={{
                      background: isDark
                        ? "rgba(59,130,246,0.1)"
                        : "rgba(37,99,235,0.06)",
                    }}
                  >
                    <HiX className="theme-text" />
                  </motion.button>
                </div>

                <div
                  className="space-y-3 theme-text-secondary"
                  style={{ fontSize: "0.875rem" }}
                >
                  <div className="flex items-center gap-2">
                    <HiCalendar className="theme-text-accent" />
                    <span>Issued: {formatDate(selectedCert.issuedDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiCalendar className="theme-text-accent" />
                    <span>Expires: {formatDate(selectedCert.expiryDate)}</span>
                  </div>

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
