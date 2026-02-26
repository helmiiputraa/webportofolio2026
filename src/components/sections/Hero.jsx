import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { personalInfo } from "../../data/portfolioData";
import { HiArrowDown } from "react-icons/hi";
import { useEffect, useState } from "react";

function TypingEffect({ texts, speed = 100, deleteSpeed = 50, pauseTime = 2000 }) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [phase, setPhase] = useState("typing"); // typing, pausing, deleting

  useEffect(() => {
    const fullText = texts[textIndex % texts.length];

    let timer;
    if (phase === "typing") {
      if (displayText.length < fullText.length) {
        timer = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        }, speed);
      } else {
        timer = setTimeout(() => setPhase("deleting"), pauseTime);
      }
    } else if (phase === "deleting") {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deleteSpeed);
      } else {
        setTextIndex((prev) => (prev + 1) % texts.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, phase, textIndex, texts, speed, deleteSpeed, pauseTime]);

  return (
    <span>
      {displayText}
      <span className="typing-cursor" />
    </span>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { isDark } = useTheme();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const typingTexts = [
    "FullStack",
    "Frontend",
    "Backend",
  ];

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div className="absolute inset-0 particle-bg" style={{ y }} />

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: isDark
              ? "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)",
            top: "-10%",
            left: "-10%",
          }}
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: isDark
              ? "radial-gradient(circle, rgba(30,58,138,0.1) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(30,64,175,0.06) 0%, transparent 70%)",
            bottom: "10%",
            right: "-5%",
          }}
          animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Content - Split Layout */}
      <motion.div
        className="relative z-10 w-full mx-auto"
        style={{ opacity, maxWidth: "1400px", paddingLeft: "clamp(2rem, 5vw, 5rem)", paddingRight: "clamp(2rem, 5vw, 5rem)", paddingTop: "8rem", paddingBottom: "5rem" }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8">
          {/* Left Side - Text Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Greeting */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 theme-text"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Hi, I&apos;m {personalInfo.name}!
            </motion.h2>

            {/* Large Role Title with Typing */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="mb-14"
            >
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-none"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                <span className="gradient-text">
                  <TypingEffect texts={typingTexts} />
                </span>
              </h1>
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-none"
                style={{ fontFamily: "'Outfit', sans-serif", color: isDark ? "#ffffff" : "#0f172a", marginTop: "-0.1em" }}
              >
                Developer
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-base md:text-lg max-w-xl leading-relaxed theme-text-secondary lg:mx-0 mx-auto"
              style={{ marginTop: "1rem" }}
            >
              {personalInfo.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-nowrap items-center justify-center lg:justify-start gap-3 sm:gap-5"
              style={{ marginTop: "2rem" }}
            >
              <motion.button
                onClick={() =>
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 cursor-pointer text-white font-semibold transition-all duration-300"
                style={{
                  padding: "0.85rem 2rem",
                  borderRadius: "9999px",
                  fontSize: "0.95rem",
                  background: "linear-gradient(135deg, #3b82f6, #1e3a8a)",
                  boxShadow: "0 4px 20px rgba(59,130,246,0.35)",
                }}
              >
                Explore Now!
              </motion.button>
              <motion.button
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="font-semibold cursor-pointer theme-text transition-all duration-300"
                style={{
                  padding: "0.85rem 2rem",
                  borderRadius: "9999px",
                  fontSize: "0.95rem",
                  border: `2px solid ${"rgba(59,130,246,0.3)"}`,
                  background: isDark ? "rgba(59,130,246,0.08)" : "rgba(37,99,235,0.06)",
                }}
              >
                Contact Me
              </motion.button>
            </motion.div>
          </div>

          {/* Right Side - Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 100 }}
            className="flex-shrink-0"
          >
            <div className="relative">
              {/* Smoke/Mist Effect behind photo */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: "120%",
                  height: "120%",
                  top: "-10%",
                  left: "-10%",
                  background: isDark
                    ? "radial-gradient(circle, rgba(59,130,246,0.25) 0%, rgba(30,58,138,0.15) 40%, transparent 70%)"
                    : "radial-gradient(circle, rgba(37,99,235,0.15) 0%, rgba(30,64,175,0.08) 40%, transparent 70%)",
                  filter: "blur(40px)",
                }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: "80%",
                  height: "80%",
                  top: "5%",
                  right: "-15%",
                  background: isDark
                    ? "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)"
                    : "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
                  filter: "blur(30px)",
                }}
                animate={{ scale: [1, 1.2, 1], x: [0, 15, 0], y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: "60%",
                  height: "60%",
                  bottom: "-5%",
                  left: "-10%",
                  background: isDark
                    ? "radial-gradient(circle, rgba(30,58,138,0.25) 0%, transparent 70%)"
                    : "radial-gradient(circle, rgba(30,64,175,0.1) 0%, transparent 70%)",
                  filter: "blur(25px)",
                }}
                animate={{ scale: [1, 1.3, 1], x: [0, -10, 0], y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              />

              {/* Circular Photo */}
              <motion.div
                className="relative overflow-hidden"
                style={{
                  width: "clamp(220px, 30vw, 480px)",
                  height: "clamp(220px, 30vw, 480px)",
                  borderRadius: "50%",
                  border: `3px solid ${isDark ? "rgba(59,130,246,0.25)" : "rgba(37,99,235,0.2)"}`,
                  boxShadow: isDark
                    ? "0 0 60px rgba(59,130,246,0.15), 0 0 120px rgba(30,58,138,0.1)"
                    : "0 0 60px rgba(37,99,235,0.1), 0 0 120px rgba(30,64,175,0.05)",
                }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                {/* Smoke / Mist inside circle behind photo */}
                <motion.div
                  className="absolute"
                  style={{
                    width: "70%", height: "70%",
                    top: "15%", left: "10%",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(59,130,246,0.5) 0%, rgba(30,58,138,0.3) 40%, transparent 70%)",
                    filter: "blur(35px)",
                    zIndex: 0,
                  }}
                  animate={{ scale: [1, 1.3, 1], x: [0, 20, -10, 0], y: [0, -15, 10, 0], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute"
                  style={{
                    width: "60%", height: "60%",
                    top: "30%", right: "5%",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(99,160,255,0.4) 0%, rgba(59,130,246,0.2) 40%, transparent 70%)",
                    filter: "blur(30px)",
                    zIndex: 0,
                  }}
                  animate={{ scale: [1, 1.4, 1], x: [0, -25, 15, 0], y: [0, 10, -20, 0], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
                <motion.div
                  className="absolute"
                  style={{
                    width: "50%", height: "50%",
                    bottom: "10%", left: "20%",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(30,58,138,0.5) 0%, rgba(59,130,246,0.2) 50%, transparent 70%)",
                    filter: "blur(25px)",
                    zIndex: 0,
                  }}
                  animate={{ scale: [1, 1.5, 1], x: [0, 15, -20, 0], y: [0, -10, 15, 0], opacity: [0.4, 0.6, 0.4] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />

                {/* Photo on top */}
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  className="w-full h-full object-contain"
                  style={{ transform: "scale(1.05)", position: "relative", zIndex: 1 }}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center theme-bg-card">
                        <span class="text-8xl">👨‍💻</span>
                      </div>
                    `;
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>


    </section>
  );
}
