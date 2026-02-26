// ============================================================
// PORTFOLIO DATA — Edit this file to customize your portfolio
// ============================================================

export const personalInfo = {
  name: "Helmi Putra",
  title: "Full Stack Developer & ML Enthusiast",
  tagline: "Building intelligent digital solutions with clean code & machine learning",
  description:
    "an Informatics Engineering student at UNNES specializing in Web Development and Machine Learning. With a strong background in campus tech organizations and professional certifications from BNSP, MikroTik, and Cisco, I bridge technical expertise with collaborative problem-solving to build impactful digital solutions.",
  avatar: "/foto.png",
  resumeUrl: "https://drive.google.com/file/d/1BLbthrGEQosxFgNn2ZRtZICWU7JvCWRI/view?usp=sharing",
};

export const skills = [
  { name: "Frontend Development", level: 90, icon: "frontend" },
  { name: "Backend Development", level: 85, icon: "backend" },
  { name: "Machine Learning", level: 75, icon: "ml" },
  { name: "Database Management", level: 80, icon: "database" },
  { name: "DevOps & Deployment", level: 70, icon: "devops" },
  { name: "Mobile Development", level: 65, icon: "mobile" },
];

export const languages = [
  { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E" },
  { name: "TypeScript", icon: "SiTypescript", color: "#3178C6" },
  { name: "Python", icon: "SiPython", color: "#3776AB" },
  { name: "PHP", icon: "SiPhp", color: "#777BB4" },
  { name: "Java", icon: "SiOpenjdk", color: "#ED8B00" },
  { name: "HTML5", icon: "SiHtml5", color: "#E34F26" },
  { name: "CSS3", icon: "SiCss3", color: "#1572B6" },
];

export const frameworks = [
  { name: "React", icon: "SiReact", color: "#61DAFB" },
  { name: "Next.js", icon: "SiNextdotjs", color: "#ffffff" },
  { name: "Node.js", icon: "SiNodedotjs", color: "#339933" },
  { name: "Express", icon: "SiExpress", color: "#ffffff" },
  { name: "Laravel", icon: "SiLaravel", color: "#FF2D20" },
  { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#06B6D4" },
  { name: "Bootstrap", icon: "SiBootstrap", color: "#7952B3" },
  { name: "Vite", icon: "SiVite", color: "#646CFF" },
];

export const tools = [
  { name: "Git", icon: "SiGit", color: "#F05032" },
  { name: "GitHub", icon: "SiGithub", color: "#ffffff" },
  { name: "VS Code", icon: "SiVscodium", color: "#007ACC" },
  { name: "Figma", icon: "SiFigma", color: "#F24E1E" },
  { name: "Docker", icon: "SiDocker", color: "#2496ED" },
  { name: "Postman", icon: "SiPostman", color: "#FF6C37" },
  { name: "MySQL", icon: "SiMysql", color: "#4479A1" },
  { name: "MongoDB", icon: "SiMongodb", color: "#47A248" },
  { name: "Firebase", icon: "SiFirebase", color: "#FFCA28" },
  { name: "Vercel", icon: "SiVercel", color: "#ffffff" },
];

export const experience = [
  {
    title: "Full Stack Developer",
    company: "Tech Company",
    period: "2024 - Present",
    description:
      "Mengembangkan dan memelihara aplikasi web full-stack menggunakan React, Node.js, dan PostgreSQL. Berkolaborasi dengan tim desain untuk implementasi UI/UX.",
  },
  {
    title: "Frontend Developer",
    company: "Digital Agency",
    period: "2023 - 2024",
    description:
      "Membangun antarmuka pengguna yang responsif dan interaktif menggunakan React dan Tailwind CSS. Mengoptimalkan performa web dan SEO.",
  },
  {
    title: "Junior Web Developer",
    company: "Startup Inc",
    period: "2022 - 2023",
    description:
      "Memulai karir sebagai web developer dengan fokus pada HTML, CSS, JavaScript. Belajar dan mengimplementasikan berbagai framework modern.",
  },
];

export const education = [
  {
    degree: "Sarjana Teknik Informatika",
    school: "Universitas Teknologi",
    period: "2020 - 2024",
    description:
      "Fokus pada pengembangan perangkat lunak dan kecerdasan buatan. IPK 3.75/4.00.",
  },
  {
    degree: "SMA/SMK",
    school: "SMK Teknologi",
    period: "2017 - 2020",
    description: "Jurusan Rekayasa Perangkat Lunak (RPL).",
  },
];

export const projects = [
  {
    id: 1,
    title: "Kopi Senja - Integrated Web Ordering System",
    description:
      "Sebuah platform web modern dan responsif untuk manajemen kedai kopi, dilengkapi dengan fitur landing page yang interaktif, sistem pemesanan menu, dan ringkasan pesanan untuk meningkatkan pengalaman pelanggan.",
    image: "/projects/kopisenja.png",
    techStack: ["React", "Framer Motion", "Tailwind CSS"],
    category: "Frontend",
    liveUrl: "https://kopi-senja-akbar-digital.vercel.app/",
    githubUrl: "https://github.com/helmiiputraa/kopi-senja-akbar-digital",
  },
  {
    id: 2,
    title: "Calmind - AI Powered Mental Support Hub",
    description:
      "Hadir sebagai solusi digital untuk kesehatan mental, Calmind mengintegrasikan fitur Mood Analysis, journaling, konsultasi profesional, AI Chatbot, hingga ruang komunitas berbagi cerita. Karya ini menjadi perwakilan resmi kampus dalam ajang bergengsi Gemastik XVIII-2025 pada Divisi RPL.",
    image: "/projects/homecalmind.png",
    techStack: ["Laravel", "Tailwind CSS", "Axios", "MySQL", "Flask"],
    category: "Full Stack",
    liveUrl: "#",
    githubUrl: "https://github.com/helmiiputraa/Gemastik/tree/master",
  },
  {
    id: 3,
    title: "FitAja - Integrated Gym Management System",
    description:
      "Sistem manajemen gym end-to-end untuk mengelola membership, alat, jadwal, dan transaksi, lengkap dengan fitur progress tracking. Meraih predikat Project Terbaik pada mata kuliah Pemrograman Web.",
    image: "/projects/fitaja.png",
    techStack: ["Laravel", "MySQL", "Tailwind CSS"],
    category: "Fullstack",
    liveUrl: "#",
    githubUrl: "https://github.com/nerveign/gym-manager",
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description:
      "Dashboard cuaca interaktif yang menampilkan prakiraan cuaca, peta cuaca, dan data historis. Menggunakan API OpenWeatherMap.",
    image: "/projects/project4.jpg",
    techStack: ["React", "Chart.js", "OpenWeather API", "CSS Modules"],
    category: "Frontend",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/username/weather",
  },
  {
    id: 5,
    title: "REST API Service",
    description:
      "RESTful API service untuk manajemen data dengan autentikasi JWT, rate limiting, dan dokumentasi Swagger.",
    image: "/projects/project5.jpg",
    techStack: ["Node.js", "Express", "MySQL", "JWT", "Swagger"],
    category: "Backend",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/username/api-service",
  },
];

export const certificates = [
  {
    id: 1,
    name: "Alibaba Cloud Certified Developers",
    issuer: "Alibaba Cloud Academy",
    image: "/certificates/alibaba.jpg",
    issuedDate: "2024-07-07",
    expiryDate: "2027-07-07",
  },
  {
    id: 2,
    name: "CCNA Cisco",
    issuer: "Cisco Networking Academy",
    image: "/certificates/cisco.jpg",
    issuedDate: "2025-02-16",
    expiryDate: null,
  },
  {
    id: 3,
    name: "Front-End Web Development",
    issuer: "Dicoding Indonesia",
    image: "/certificates/dicoding.jpg",
    issuedDate: "2025-09-25",
    expiryDate: "2028-09-25",
  },
  {
    id: 4,
    name: "Front-End Web Level Expert",
    issuer: "IDCamp 2025",
    image: "/certificates/idcamp.jpg",
    issuedDate: "2025-07-10",
    expiryDate: null,
  },
  {
    id: 5,
    name: "Dasar dan Penggunaan Generatif AI",
    issuer: "Codepolitan",
    image: "/certificates/codepolitan.jpg",
    issuedDate: "2025-06-23",
    expiryDate: "2028-06-23",
  },
  {
    id: 6,
    name: "Explore Generative AI",
    issuer: "Microsoft",
    image: "/certificates/microsoft.jpg",
    issuedDate: "2025-05-23",
    expiryDate: null,
  },
];

export const contactInfo = {
  email: "helmipratama117@gmail.com",
  github: "https://github.com/helmiiputraa",
  instagram: "https://instagram.com/helmiiputraa",
  linkedin: "https://www.linkedin.com/in/helmi-putra-noor-pratama",
};

export const chatbotContext = `
Kamu adalah asisten AI di portfolio website milik ${personalInfo.name}. 
Kamu bertugas menjawab pertanyaan pengunjung tentang ${personalInfo.name}.

Informasi tentang ${personalInfo.name}:
- Profesi: ${personalInfo.title}
- Deskripsi: ${personalInfo.description}
- Skills utama: Frontend Development, Backend Development, UI/UX Design
- Bahasa pemrograman: JavaScript, TypeScript, Python, PHP, Java
- Framework: React, Next.js, Node.js, Express, Laravel, Tailwind CSS
- Tools: Git, GitHub, VS Code, Figma, Docker, Postman
- Email: ${contactInfo.email}
- GitHub: ${contactInfo.github}
- LinkedIn: ${contactInfo.linkedin}

Jawab dengan ramah, singkat, dan informatif. Gunakan bahasa Indonesia.
Jika ditanya hal di luar konteks portfolio, arahkan kembali ke topik portfolio.
`;
