import { Link } from "react-router-dom";
import { Code2, Rocket, Share2, Pencil } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion} from "motion/react"

const features = [
  {
    icon: Code2,
    title: "Fill a Form",
    desc: "Enter your skills, projects, and experience in a guided multi-step form.",
  },
  {
    icon: Rocket,
    title: "Generate Portfolio",
    desc: "Preview your portfolio and publish it instantly with one click.",
  },
  {
    icon: Share2,
    title: "Share Your URL",
    desc: "Get a unique shareable link to showcase your work to the world.",
  },
  {
    icon: Pencil,
    title: "Edit Anytime",
    desc: "Come back and update your portfolio whenever you need to.",
  },
];

function HomePage() {
  return (
    <div className="w-full h-full bg-gradient-hero text-white">
      {/* Nav */}
      <nav className="w-full flex items-center justify-between p-6">
        <span className="font-display sm:text-3xl text-[hsl(var(--primary))] font-bold tracking-tight">
          {"<DevFolio />"}
        </span>

        <Link to="/create">
          <button
            className="font-display sm:text-lg border border-[hsl(var(--primary))]/30 text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/10 bg-black py-1 px-2 rounded-md cursor-pointer"
          >
            Create Portfolio
          </button>
        </Link>
      </nav>

      {/* Hero */}
      <section className="w-full flex flex-col items-center text-center px-5 md:px-0 pt-20 pb-32 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-display text-sm text-[hsl(var(--primary))]/70 tracking-widest uppercase mb-4">
            Developer Portfolio Generator
          </p>

          <h1 className="text-4xl md:text-6xl font-bold font-display leading-tight">
            Build Your{" "}
            <span className="text-gradient-primary">Dev Portfolio</span>
            <br />
            In Minutes
          </h1>

          <p className="mt-6 max-w-xl mx-auto text-[hsl(var(--muted-foreground))] text-lg leading-relaxed">
            Fill out a simple form, preview your portfolio, and publish it with a
            unique shareable URL. No design skills needed.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex gap-4 mt-4"
        >
          <Link to="/create">
            <button
              className="bg-gradient-primary text-[hsl(var(--primary-foreground))] font-display font-semibold shadow-glow animate-pulse-glow p-3 rounded-sm cursor-pointer"
            >
              Create Your Portfolio
            </button>
          </Link>

          <Link to="/portfolio/johndoe">
            <button
              className="border border-[hsl(var(--border))] text-[hsl(var(--foreground))] bg-black hover:bg-[hsl(var(--secondary))] font-display p-3 rounded-sm cursor-pointer"
            >
              View Sample
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Features */}
      <section className="px-20 md:px-40 pb-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;

            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.15 * i + 0.4,
                  duration: 0.5,
                }}
                className="bg-card border border-border rounded-lg p-6 shadow-card hover:border-primary/30 transition-colors"
              >
                <Icon className="w-8 h-8 text-[hsl(var(--primary))] mb-4" />

                <h3 className="font-display font-semibold text-foreground mb-2">
                  {f.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-[hsl(var(--border))] py-5 text-center">
        <p className="text-[hsl(var(--muted-foreground))] text-lg ">
          {"<DevFolio />"} — Built with MERN Stack
        </p>
      </footer>
    </div>
  );
}

export default HomePage