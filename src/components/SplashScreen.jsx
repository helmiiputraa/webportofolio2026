import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { personalInfo } from "../data/portfolioData";

export default function SplashScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const { isDark } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800);
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            background: isDark
              ? "linear-gradient(135deg, #0a0e1a 0%, #111827 50%, #0a0e1a 100%)"
              : "linear-gradient(135deg, #f0f4ff 0%, #ffffff 50%, #f0f4ff 100%)",
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Background Orbs */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: isDark
                ? "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full"
            style={{
              background: isDark
                ? "radial-gradient(circle, rgba(30,58,138,0.12) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(30,64,175,0.08) 0%, transparent 70%)",
              top: "20%",
              right: "20%",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />

          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
              className="mb-6"
            >
              <img
                src="/logo.png"
                alt="HP Logo"
                className="w-24 h-24 rounded-2xl object-contain"
                style={{
                  filter: "drop-shadow(0 0 40px rgba(59,130,246,0.4))",
                }}
              />
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-3"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              <span className="gradient-text">{personalInfo.name}</span>
            </motion.h1>

            {/* Title */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-lg theme-text-secondary"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {personalInfo.title}
            </motion.p>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              className="mt-8 w-[200px] h-1 rounded-full overflow-hidden"
              style={{
                background: isDark
                  ? "rgba(59,130,246,0.1)"
                  : "rgba(37,99,235,0.1)",
              }}
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.5, duration: 1.2, ease: "easeInOut" }}
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #3b82f6, #1e3a8a, #06b6d4)",
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
