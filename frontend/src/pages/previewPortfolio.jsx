import { Mail, Globe, ExternalLink, ArrowLeft, Rocket } from "lucide-react";
import { GrGithub, GrLinkedinOption } from "react-icons/gr";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.4 },
});

// const samplePortfolio = {
//   username: "pamindu",
//   fullName: "Pamindu Virunjith",
//   title: "Full Stack Developer",
//   bio: "Passionate developer focused on building modern web applications using the MERN stack. Interested in UI/UX and scalable systems.",

//   profileImage: "https://i.pravatar.cc/300",

//   contact: {
//     email: "pamindu@example.com",
//     linkedin: "https://linkedin.com/in/pamindu",
//     github: "https://github.com/pamindu",
//     website: "https://pamindu.dev",
//   },

//   skills: [
//     "HTML",
//     "CSS",
//     "JavaScript",
//     "React",
//     "Node.js",
//     "MongoDB",
//     "Express",
//     "Tailwind CSS",
//   ],

//   projects: [
//     {
//       name: "Portfolio Generator",
//       description:
//         "A web app that allows developers to create and share their portfolio with a unique URL.",
//       techStack: ["React", "Node.js", "MongoDB"],
//       githubLink: "https://github.com/pamindu/portfolio-generator",
//       liveDemo: "https://portfolio-demo.vercel.app",
//     },
//     {
//       name: "E-commerce Website",
//       description:
//         "Full-stack e-commerce platform with authentication, cart, and payment integration.",
//       techStack: ["React", "Express", "MongoDB"],
//       githubLink: "https://github.com/pamindu/ecommerce-app",
//       liveDemo: "https://ecommerce-demo.vercel.app",
//     },
//   ],

//   experience: [
//     {
//       company: "Sri Lanka Telecom",
//       role: "Intern - Software Development",
//       duration: "Jan 2026 - Present",
//       description:
//         "Worked on scalable mobile applications using AWS technologies and cloud-based architecture.",
//     },
//     {
//       company: "Freelance",
//       role: "Web Developer",
//       duration: "2024 - Present",
//       description:
//         "Designed and developed responsive websites for clients using React and Tailwind CSS.",
//     },
//   ],
// };

function PreviewPortfolio() {
  const location = useLocation();
  const navigate = useNavigate();
  const [publishing, setPublishing] = useState(false);
  const p = location.state;

  const publish = async () => {
    // console.log(p);
    if (!p) return;

    try {
      setPublishing(true);
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("user");

      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/portfolio/",
        p,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      console.log("Portfolio published:");
      // console.log("Portfolio published:", response);
      toast.success(response.data.message);
      // console.log(response.data);
      navigate(`/portfolio/${username}`);
    } catch (err) {
      console.error(err);

      const message = err.response?.data?.message || "Something went wrong";

      toast.error(message);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-16 py-8 px-5 xl:px-0">
      {/* Navigation */}
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/create")}
            className="text-[hsl(var(--primary))] hover:text-[hsl(var(--foreground))] cursor-pointer animate-pulse"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-display text-lg text-[hsl(var(--primary))] font-bold">
            Preview
          </span>
        </div>
        <button
          onClick={publish}
          disabled={publishing}
          className="flex items-center py-0.5 md:py-2 px-1 md:px-2 rounded-sm bg-gradient-primary text-[hsl(var(--primary-foreground))] font-display shadow-glow cursor-pointer"
        >
          <Rocket className="w-4 h-4 mr-2" />{" "}
          {publishing ? "Publishing..." : "Publish Portfolio"}
        </button>
      </nav>
      {/* Header */}
      <motion.section
        {...fadeIn()}
        className="flex flex-col md:flex-row items-center gap-8"
      >
        {p.profileImage && (
          <img
            src={p.profileImage}
            alt={p.fullName}
            className="w-28 h-28 rounded-full border-3 border-[hsl(var(--primary))]/60 shadow-glow  object-cover"
          />
        )}

        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-[hsl(var(--foreground))]">
            {p.fullName}
          </h1>

          {p.title && (
            <p className="text-lg text-[hsl(var(--primary))] mt-1">{p.title}</p>
          )}

          {p.bio && (
            <p className="text-[hsl(var(--muted-foreground))] mt-3 max-w-lg">
              {p.bio}
            </p>
          )}
        </div>
      </motion.section>

      {/* Contact */}
      {(p.contact?.email ||
        p.contact?.linkedin ||
        p.contact?.github ||
        p.contact?.website) && (
        <motion.section {...fadeIn(0.1)}>
          <SectionTitle>Contact</SectionTitle>

          <div className="flex flex-wrap gap-4">
            {p.contact.email && (
              <a
                href={`mailto:${p.contact.email}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 border px-4 py-2 rounded-lg text-xs md:text-sm bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:border-[hsl(var(--primary))]/60 border-[hsl(var(--primary))]/30 transition-colors"
              >
                <Mail size={16} className="text-[hsl(var(--primary))]" />{" "}
                {p.contact.email}
              </a>
            )}

            {p.contact.linkedin && (
              <a
                href={`mailto:${p.contact.linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 border px-4 py-2 rounded text-xs md:text-sm bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:border-[hsl(var(--primary))]/60 border-[hsl(var(--primary))]/30 transition-colors"
              >
                <GrLinkedinOption
                  size={16}
                  className="text-[hsl(var(--primary))]"
                />{" "}
                LinkedIn
              </a>
            )}

            {p.contact.github && (
              <a
                href={`mailto:${p.contact.github}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 border px-4 py-2 rounded text-xs md:text-sm bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:border-[hsl(var(--primary))]/60 border-[hsl(var(--primary))]/30 transition-colors"
              >
                <GrGithub size={16} className="text-[hsl(var(--primary))]" />{" "}
                GitHub
              </a>
            )}

            {p.contact.website && (
              <a
                href={`mailto:${p.contact.website}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 border px-4 py-2 rounded text-xs md:text-sm bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:border-[hsl(var(--primary))]/60 border-[hsl(var(--primary))]/30 transition-colors"
              >
                <Globe size={16} className="text-[hsl(var(--primary))]" />{" "}
                Website
              </a>
            )}
          </div>
        </motion.section>
      )}

      {/* Skills */}
      {p.skills?.length > 0 && (
        <motion.section {...fadeIn(0.2)}>
          <SectionTitle>Skills</SectionTitle>

          <div className="flex flex-wrap gap-2">
            {p.skills.map((s, i) => (
              <span
                key={i}
                className="text-xs md:text-sm px-4 py-1 rounded-full bg-[hsl(var(--secondary))] text-[hsl(var(--primary))] border border-[hsl(var(--primary))]/20"
              >
                {s}
              </span>
            ))}
          </div>
        </motion.section>
      )}

      {/* Projects */}
      {p.projects?.length > 0 && (
        <motion.section {...fadeIn(0.3)}>
          <SectionTitle>Projects</SectionTitle>

          <div className="grid md:grid-cols-2 gap-6">
            {p.projects.map((proj, i) => (
              <div
                key={i}
                className="bg-[hsl(var(--card))] border border-[hsl(var(--muted-foreground))]/30 hover:border-[hsl(var(--primary))]/30 rounded-lg p-6 shadow transition-colors"
              >
                <h3 className="font-semibold text-lg text-[hsl(var(--foreground))]">
                  {proj.name}
                </h3>

                <p className="text-[hsl(var(--muted-foreground))] text-sm mt-2 leading-relaxed">
                  {proj.description}
                </p>

                {proj.techStack?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {proj.techStack.map((t, idx) => (
                      <span
                        key={idx}
                        className="bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] text-xs px-2 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-3 mt-4">
                  {proj.githubLink && (
                    <a
                      href={proj.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-[hsl(var(--primary))] text-sm hover:underline"
                    >
                      <GrGithub size={14} /> Code
                    </a>
                  )}

                  {proj.liveDemo && (
                    <a
                      href={proj.liveDemo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-[hsl(var(--primary))] text-sm"
                    >
                      <ExternalLink size={14} /> Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Experience */}
      {p.experience?.length > 0 && (
        <motion.section {...fadeIn(0.4)}>
          <SectionTitle>Experience</SectionTitle>

          <div className="space-y-6 mb-10">
            {p.experience.map((exp, i) => (
              <div
                key={i}
                className="border-l-2 pl-4 border-[hsl(var(--primary))]/40"
              >
                <h3 className="font-semibold text-hsl(var(--foreground))] text-sm md:text-lg">
                  {exp.role}
                </h3>

                <p className="text-[hsl(var(--primary))] text-sm md:text-lg">
                  {exp.company + " "}
                  <span className="text-gray-500"> • {exp.duration}</span>
                </p>

                {exp.description && (
                  <p className="text-[hsl(var(--muted-foreground))] text-sm md:text-lg mt-2 leading-relaxed">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}

const SectionTitle = ({ children }) => (
  <h2 className="text-xl xl:text-2xl font-semibold mb-6 flex items-center gap-2 text-[hsl(var(--foreground))]">
    <span className="w-8 h-0.5 bg-gradient-primary rounded" />
    {children}
  </h2>
);

export default PreviewPortfolio;
