import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { chatbotContext } from "../data/portfolioData";
import { HiChat, HiX, HiPaperAirplane } from "react-icons/hi";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

function getGeminiModel() {
  if (!GEMINI_API_KEY) return null;
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  return genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
}

export default function Chatbot() {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Halo! 👋 Saya asisten AI di portfolio ini. Ada yang ingin ditanyakan?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setIsLoading(true);

    try {
      const model = getGeminiModel();
      if (!model) {
        setMessages((prev) => [...prev, { role: "bot", text: "⚠️ API key belum dikonfigurasi. Tambahkan VITE_GEMINI_API_KEY di file .env" }]);
        setIsLoading(false);
        return;
      }

      const newHistory = [...chatHistory, { role: "user", parts: [{ text }] }];
      const chat = model.startChat({
        history: [
          { role: "user", parts: [{ text: `Ini adalah sistem prompt kamu sebagai chatbot portfolio: ${chatbotContext}` }] },
          { role: "model", parts: [{ text: "Baik, saya siap menjadi asisten portfolio." }] },
          ...chatHistory,
        ],
      });

      const result = await chat.sendMessage(text);
      const response = result.response.text();

      setChatHistory([...newHistory, { role: "model", parts: [{ text: response }] }]);
      setMessages((prev) => [...prev, { role: "bot", text: response }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "bot", text: "Maaf, terjadi kesalahan. Silakan coba lagi. 🙏" }]);
    }
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
        style={{ background: "linear-gradient(135deg, #3b82f6, #1e3a8a)", boxShadow: "0 4px 25px rgba(59,130,246,0.4)" }}
        animate={{ rotate: isOpen ? 90 : 0 }}
      >
        {isOpen ? <HiX className="text-white text-2xl" /> : <HiChat className="text-white text-2xl" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden theme-card"
            style={{ boxShadow: isDark ? "0 10px 50px rgba(0,0,0,0.5)" : "0 10px 50px rgba(0,0,0,0.15)" }}
          >
            {/* Header */}
            <div className="p-4 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #3b82f6, #1e3a8a)" }}>
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <HiChat className="text-white text-lg" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm" style={{ fontFamily: "var(--font-outfit)" }}>Portfolio Assistant</h4>
                <p className="text-xs text-white/70">Powered by Gemini AI</p>
              </div>
              <div className="ml-auto w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-3" style={{ background: isDark ? "var(--color-dark-bg-secondary)" : "var(--color-light-bg)" }}>
              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "text-white rounded-br-md"
                      : "theme-bg-card theme-text rounded-bl-md"
                  }`}
                    style={msg.role === "user" ? { background: "linear-gradient(135deg, #3b82f6, #1e3a8a)" } : undefined}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="theme-bg-card px-4 py-3 rounded-2xl rounded-bl-md flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 theme-bg-card" style={{ borderTop: `1px solid ${isDark ? "rgba(59,130,246,0.1)" : "rgba(37,99,235,0.08)"}` }}>
              <div className="flex items-center gap-2">
                <input value={input} onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ketik pesan..."
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm theme-text border-0 outline-none"
                  style={{ background: isDark ? "var(--color-dark-bg)" : "var(--color-light-bg)", fontFamily: "var(--font-inter)" }} />
                <motion.button onClick={sendMessage} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  disabled={isLoading || !input.trim()}
                  className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg, #3b82f6, #1e3a8a)" }}>
                  <HiPaperAirplane className="text-white text-lg rotate-90" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
