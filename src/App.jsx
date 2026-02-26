import { useState, useCallback } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import SplashScreen from "./components/SplashScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Certificates from "./components/sections/Certificates";
import Contact from "./components/sections/Contact";


export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <ThemeProvider>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      {!showSplash && (
        <div className="theme-bg min-h-screen transition-colors duration-400">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Projects />
            <Certificates />
            <Contact />
          </main>
        </div>
      )}
    </ThemeProvider>
  );
}
