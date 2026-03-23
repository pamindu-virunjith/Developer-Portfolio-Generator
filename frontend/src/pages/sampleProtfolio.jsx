
import Portfolio from "../components/portfolio";


const samplePortfolio = {
  fullName: "John Doe",
  title: "Full Stack Developer",
  bio: "Passionate developer focused on building modern web applications using the MERN stack. Interested in UI/UX and scalable systems.",

  profileImage: "https://i.pravatar.cc/300",

  contact: {
    email: "johndoe@example.com",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    website: "https://johndoe.dev",
  },

  skills: [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "MongoDB",
    "Express",
    "Tailwind CSS",
  ],

  projects: [
    {
      name: "TaskFlow",
      description:
        "A project management tool with real-time collaboration features.",
      techStack: ["React", "Node.js", "MongoDB"],
      githubLink: "https://github.com/pamindu/portfolio-generator",
      liveDemo: "https://portfolio-demo.vercel.app",
    },
    {
      name: "E-commerce Website",
      description:
        "Full-stack e-commerce platform with authentication, cart, and payment integration.",
      techStack: ["React", "Express", "MongoDB"],
      githubLink: "https://github.com/pamindu/ecommerce-app",
      liveDemo: "https://ecommerce-demo.vercel.app",
    },
  ],

  experience: [
    {
      company: "TechCorp",
      role: "Frontend Developer",
      duration: "Jan 2026 - Present",
      description:
        "Building responsive web applications and component libraries.",
    },
    {
      company: "Freelance",
      role: "Web Developer",
      duration: "2024 - Present",
      description:
        "Designed and developed responsive websites for clients using React and Tailwind CSS.",
    },
  ],
};

function SamplePortfolio() {
  const p = samplePortfolio;

  return (
    <div className="max-w-4xl mx-auto space-y-16 py-8 px-5 xl:px-0">
      <Portfolio p={p} />
    </div>
  );
}

export default SamplePortfolio;
