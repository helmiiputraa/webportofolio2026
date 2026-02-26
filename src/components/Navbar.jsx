import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { HiMenu, HiX } from "react-icons/hi";
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs";
import { HiDocumentArrowDown } from "react-icons/hi2";
import { personalInfo } from "../data/portfolioData";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Certificates", href: "#certificates" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "theme-glass" : ""
        }`}
        style={{
          borderBottom: isScrolled
            ? `1px solid ${isDark ? "rgba(59,130,246,0.1)" : "rgba(37,99,235,0.08)"}`
            : "1px solid transparent",
        }}
      >
        <div
          className="w-full mx-auto flex items-center justify-between"
          style={{
            padding: "1.1rem clamp(2rem, 5vw, 5rem)",
          }}
        >
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#home");
            }}
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <img
              src="/logo.png"
              alt="HP Logo"
              className="w-11 h-11 rounded-xl object-contain"
            />
            <span
              className="text-[1.4rem] font-extrabold tracking-tight theme-text hidden sm:block"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {personalInfo.name.split(" ")[0].toUpperCase()}{" "}
              <span className="theme-text-accent">
                {personalInfo.name.split(" ")[1]?.toUpperCase() || "DEV"}
              </span>
            </span>
          </motion.a>

          {/* Desktop Nav - Center */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className={`relative text-[0.95rem] font-medium transition-all duration-300 cursor-pointer ${
                  activeSection === link.href.slice(1)
                    ? "theme-text-accent"
                    : "theme-text-secondary hover:theme-text"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
                {activeSection === link.href.slice(1) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #3b82f6, #1e3a8a)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300"
              style={{
                background: isDark
                  ? "rgba(59,130,246,0.1)"
                  : "rgba(37,99,235,0.08)",
                border: `1px solid ${isDark ? "rgba(59,130,246,0.15)" : "rgba(37,99,235,0.1)"}`,
              }}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <BsSunFill className="text-yellow-400 text-lg" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <BsMoonStarsFill className="text-blue-600 text-lg" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Download CV Button */}
            <motion.a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:inline-flex items-center gap-2.5 cursor-pointer text-white font-semibold transition-all duration-300"
              style={{
                padding: "0.75rem 1.8rem",
                borderRadius: "9999px",
                fontSize: "0.95rem",
                background: "linear-gradient(135deg, #3b82f6, #1e3a8a)",
                boxShadow: "0 4px 20px rgba(59,130,246,0.35)",
              }}
            >
              <HiDocumentArrowDown className="text-lg" />
              Download CV
            </motion.a>

            {/* Mobile Hamburger */}
            <motion.button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              whileTap={{ scale: 0.9 }}
              className="lg:hidden w-11 h-11 rounded-full flex items-center justify-center cursor-pointer"
              style={{
                background: isDark
                  ? "rgba(59,130,246,0.1)"
                  : "rgba(37,99,235,0.08)",
                border: `1px solid ${isDark ? "rgba(59,130,246,0.15)" : "rgba(37,99,235,0.1)"}`,
              }}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? (
                <HiX className="text-xl theme-text" />
              ) : (
                <HiMenu className="text-xl theme-text" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed left-4 right-4 z-40 theme-glass rounded-2xl p-5 lg:hidden"
            style={{ top: "80px" }}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(link.href)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-300 cursor-pointer ${
                    activeSection === link.href.slice(1)
                      ? "theme-text-accent theme-bg-card"
                      : "theme-text-secondary"
                  }`}
                >
                  {link.name}
                </motion.button>
              ))}
              {/* Mobile CV Button */}
              <motion.a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-full text-base font-semibold text-white mt-3"
                style={{ background: "linear-gradient(135deg, #3b82f6, #1e3a8a)" }}
              >
                <HiDocumentArrowDown className="text-lg" />
                Download CV
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
