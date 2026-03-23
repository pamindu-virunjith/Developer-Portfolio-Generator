import { Mail, Globe, ExternalLink } from "lucide-react";
import { GrGithub, GrLinkedinOption } from "react-icons/gr";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import SectionTitle from "../components/previewSectionTitle";

function Portfolio({p}) {

    const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.4 },
});


  return (
    <>
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
    </>
  );
}

export default Portfolio;
