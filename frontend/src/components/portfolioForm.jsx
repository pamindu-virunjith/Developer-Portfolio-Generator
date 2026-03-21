import { useState } from "react";
import { Plus, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

const emptyPortfolio = {
  username: "",
  fullName: "",
  title: "",
  bio: "",
  profileImage: "",
  contact: {
    email: "",
    linkedin: "",
    github: "",
    website: "",
  },
  skills: [],
  projects: [
    {
      name: "",
      description: "",
      techStack: [],
      githubLink: "",
      liveDemo: "",
    },
  ],
  experience: [
    {
      company: "",
      role: "",
      duration: "",
      description: "",
    },
  ],
};

const steps = ["Personal Info", "Contact", "Skills", "Projects", "Experience"];

const PortfolioForm = ({
  initialData,
  onSubmit,
  submitLabel = "Preview Portfolio",
}) => {
  const [data, setData] = useState(initialData || { ...emptyPortfolio });
  const [step, setStep] = useState(0);
  const [skillInput, setSkillInput] = useState("");

  const update = (partial) => setData((d) => ({ ...d, ...partial }));

  const updateContact = (partial) =>
    setData((d) => ({
      ...d,
      contact: { ...d.contact, ...partial },
    }));

  const addSkill = () => {
    if (skillInput.trim() && !data.skills.includes(skillInput.trim())) {
      update({ skills: [...data.skills, skillInput.trim()] });
      setSkillInput("");
    }
  };

  const removeSkill = (s) =>
    update({ skills: data.skills.filter((sk) => sk !== s) });

  const canNext = () => {
    if (step === 0) return data.username && data.fullName;
    return true;
  };

  const addProject = () => {
    update({
      projects: [
        ...data.projects,
        {
          name: "",
          description: "",
          techStack: [],
          githubLink: "",
          liveDemo: "",
        },
      ],
    });
  };

  const updateProject = (index, updatedFields) => {
    const updatedProjects = data.projects.map((p, i) =>
      i === index ? { ...p, ...updatedFields } : p,
    );

    update({ projects: updatedProjects });
  };

  const removeProject = (index) => {
    update({
      projects: data.projects.filter((_, i) => i !== index),
    });
  };

  const addExperience = () => {
    update({
      experience: [
        ...data.experience,
        {
          company: "",
          role: "",
          duration: "",
          description: "",
        },
      ],
    });
  };

  const updateExperience = (index, updatedFields) => {
    const updatedExperience = data.experience.map((p, i) =>
      i === index ? { ...p, ...updatedFields } : p,
    );

    update({ experience: updatedExperience });
  };

  const removeExperience = (index) => {
    update({
      experience: data.experience.filter((_, i) => i !== index),
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(data);
      }}
      className="max-w-2xl mx-auto"
    >
      {/* Step indicator */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {steps.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setStep(i)}
            className={`font-display text-sm px-1 md:px-3 py-1.5 rounded-sm md:rounded-full whitespace-nowrap transition-colors ${
              i === step ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]" : i < step ? "bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]" : "bg-[hsl(var(--secondary))] text-[hsl(var(--muted-foreground))]"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Step 1 (Persoal Info) */}
      {step === 0 && (
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Username * <small>(Unique)</small></label>
            <input
              type="text"
              value={data.username}
              onChange={(e) =>
                update({
                  username: e.target.value
                    .toLowerCase()
                    .replace(/[^a-z0-9-_]/g, ""),
                })
              }
              className="w-full border border-[hsl(var(--muted-foreground))]/50 p-2 rounded placeholder:text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--primary))]"
              placeholder="johndoe"
            />
          </div>

          <div>
            <label className="block mb-1">Full Name *</label>
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => update({ fullName: e.target.value })}
              className="w-full border border-[hsl(var(--muted-foreground))]/50 p-2 rounded placeholder:text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--primary))]"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block mb-1">Title</label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => update({ title: e.target.value })}
              className="w-full border  border-[hsl(var(--muted-foreground))]/50 p-2 rounded placeholder:text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--primary))]"
              placeholder="Full Stack Developer"
            />
          </div>

          <div>
            <label className="block mb-1">Bio</label>
            <textarea
              value={data.bio}
              onChange={(e) => update({ bio: e.target.value })}
              className="w-full border  border-[hsl(var(--muted-foreground))]/50 p-2 rounded placeholder:text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--primary))]"
              placeholder="Bio"
            />
          </div>

          <div>
            <label className="block mb-1">Profile Image URL</label>
            <input
              type="text"
              value={data.profileImage}
              onChange={(e) => update({ profileImage: e.target.value })}
              className="w-full border  border-[hsl(var(--muted-foreground))]/50 p-2 rounded placeholder:text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--primary))]"
              placeholder="https://..."
            />
          </div>
        </div>
      )}

      {/* Step 2 (Contact) */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={data.contact.email}
              onChange={(e) => updateContact({ email: e.target.value })}
              className="w-full border  border-[hsl(var(--muted-foreground))]/50 p-2 rounded placeholder:text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--primary))]"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block mb-1">LinkedIn</label>
            <input
              type="email"
              value={data.contact.linkedin}
              onChange={(e) => updateContact({ linkedin: e.target.value })}
              className="w-full border border-[hsl(var(--muted-foreground))]/50 p-2 rounded placeholder:text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--primary))]"
              placeholder="https://linkedin.com/in/..."
            />
          </div>
          <div>
            <label className="block mb-1">Github</label>
            <input
              type="email"
              value={data.contact.github}
              onChange={(e) => updateContact({ github: e.target.value })}
              className="w-full border border-[hsl(var(--muted-foreground))]/50 p-2 rounded placeholder:text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--primary))]"
              placeholder="https://github.com/..."
            />
          </div>
          <div>
            <label className="block mb-1">Website</label>
            <input
              type="email"
              value={data.contact.website}
              onChange={(e) => updateContact({ website: e.target.value })}
              className="w-full border border-[hsl(var(--muted-foreground))]/50 p-2 rounded placeholder:text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--primary))]"
              placeholder="https://yoursite.com"
            />
          </div>
        </div>
      )}

      {/* Step 3 (Skills) */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
              className="border border-[hsl(var(--muted-foreground))]/50 p-2 flex-1 rounded placeholder:text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--primary))]"
              placeholder="Type a Skill and press Enter"
            />
            <button
              type="button"
              onClick={addSkill}
              className="border border-[hsl(var(--primary))]/30 cursor-pointer text-[hsl(var(--primary))] px-3 rounded"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {data.skills.length === 0 && (
              <div className=" flex items-center gap-1">
                No skills yet.
              </div>
            )}
            
            {
            data.skills.map((s) => (
              <span
                key={s}
                className="bg-[hsl(var(--secondary))] text-[hsl(var(--muted-forground))] px-3 py-1 rounded flex items-center gap-1"
              >
                {s}
                <button type="button" onClick={() => removeSkill(s)}>
                  <Trash2 size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* step 4 (Projects) */}
      {step === 3 && (
        <div className="space-y-6">
          {data.projects.map((p, i) => (
            <div
              key={i}
              className="bg-[hsl(var(--secondary))]/50 border border-[hsl(var(--muted-foreground))]/50 rounded-lg p-4 space-y-3"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm text-[hsl(var(--primary))] font-semibold">
                  Project {i + 1}
                </span>

                <button
                  type="button"
                  onClick={() => removeProject(i)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <input
                type="text"
                value={p.name}
                onChange={(e) => updateProject(i, { name: e.target.value })}
                placeholder="Project name"
                className="w-full border border-[hsl(var(--muted-foreground))]/50 p-2 rounded placeholder:text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--primary))]"
              />

              <textarea
                value={p.description}
                onChange={(e) =>
                  updateProject(i, { description: e.target.value })
                }
                placeholder="Description"
                rows={2}
                className="w-full border border-[hsl(var(--muted-foreground))]/50 p-2 rounded placeholder:text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--primary))]"
              />

              <input
                type="text"
                value={p.techStack.join(", ")}
                onChange={(e) =>
                  updateProject(i, {
                    techStack: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
                placeholder="Tech stack (comma-separated)"
                className="w-full border border-[hsl(var(--muted-foreground))]/50 p-2 rounded placeholder:text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--primary))]"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={p.githubLink}
                  onChange={(e) =>
                    updateProject(i, { githubLink: e.target.value })
                  }
                  placeholder="GitHub link"
                  className="w-full border border-[hsl(var(--muted-foreground))]/50 p-2 rounded placeholder:text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--primary))]"
                />

                <input
                  type="text"
                  value={p.liveDemo}
                  onChange={(e) =>
                    updateProject(i, { liveDemo: e.target.value })
                  }
                  placeholder="Live demo link"
                  className="w-full border border-[hsl(var(--muted-foreground))]/50 p-2 rounded placeholder:text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--primary))]"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addProject}
            className="w-full border border-dashed border-[hsl(var(--primary))]/30 text-[hsl(var(--primary))] py-2 rounded flex items-center justify-center gap-2"
          >
            <Plus size={16} /> Add Project
          </button>
        </div>
      )}

      {/* step 5 (experience) */}
      {step === 4 && (
        <div className="space-y-6">
          {data.experience.map((e, i) => (
            <div
              key={i}
              className="bg-[hsl(var(--secondary))]/50 border border-[hsl(var(--muted-foreground))]/50 rounded-lg p-4 space-y-3"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm text-[hsl(var(--primary))] font-semibold">
                  Experience {i + 1}
                </span>

                <button
                  type="button"
                  onClick={() => removeExperience(i)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={e.company}
                  onChange={(ev) =>
                    updateExperience(i, { company: ev.target.value })
                  }
                  placeholder="Company"
                  className="w-full border border-[hsl(var(--muted-foreground))]/50 p-2 rounded placeholder:text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--primary))]"
                />

                <input
                  type="text"
                  value={e.role}
                  onChange={(ev) =>
                    updateExperience(i, { role: ev.target.value })
                  }
                  placeholder="Role"
                  className="w-full border border-[hsl(var(--muted-foreground))]/50  p-2 rounded placeholder:text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--primary))]"
                />
              </div>

              <input
                type="text"
                value={e.duration}
                onChange={(ev) =>
                  updateExperience(i, { duration: ev.target.value })
                }
                placeholder="Duration (e.g. Jan 2022 - Present)"
                className="w-full border border-[hsl(var(--muted-foreground))]/50 p-2 rounded placeholder:text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--primary))]"
              />

              <textarea
                value={e.description}
                onChange={(ev) =>
                  updateExperience(i, { description: ev.target.value })
                }
                placeholder="Description"
                rows={2}
                className="w-full border border-[hsl(var(--muted-foreground))]/50 p-2 rounded placeholder:text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--primary))]"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addExperience}
            className="w-full border border-dashed border-[hsl(var(--primary))]/30 text-[hsl(var(--primary))] py-2 rounded flex items-center justify-center gap-2"
          >
            <Plus size={16} /> Add Experience
          </button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={() => setStep(step - 1)}
          disabled={step === 0}
          className="px-4 py-2 border rounded flex items-center justify-center gap-1"
        >
          <ChevronLeft size={16} /> Back
        </button>

        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={() => setStep(step + 1)}
            disabled={!canNext()}
            className="px-4 py-2 bg-gradient-primary text-[hsl(var(--primary-foreground))] rounded flex items-center justify-center gap-1 "
          
          >
            Next <ChevronRight size={16} />
          </button>
        ) : (
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-primary text-[hsl(var(--primary-foreground))] rounded-sm"
          >
            {submitLabel}
          </button>
        )}
      </div>
    </form>
  );
};

export default PortfolioForm;
