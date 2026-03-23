import { Link } from "react-router-dom";
import { Code2, Pencil, Rocket, Share2, Trash2 } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Footer from "../components/footer";
import NavBar from "../components/navBar";

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
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const [isPortfolioFound, setIsPortfolioFound] = useState(false);

  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem("token");

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/portfolio/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setIsPortfolioFound(true);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setIsPortfolioFound(false);
        } else {
          console.error(err);
        }
      });
  }, [user]);

  async function deletePortfolio() {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/portfolio/${user}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(res.data.message || "Deleted successfully");
      setIsPortfolioFound(false);

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Delete failed");
    }
  }

  return (
    <div className="w-full h-full text-white">
      {/* Nav */}
      <NavBar />

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

          <h1 className="text-3xl md:text-6xl font-bold font-display leading-tight">
            Build Your{" "}
            <span className="text-gradient-primary">Dev Portfolio</span>
            <br />
            In Minutes
          </h1>

          <p className="mt-6 max-w-xl mx-auto text-[hsl(var(--muted-foreground))] text-sm md:text-lg leading-relaxed">
            Fill out a simple form, preview your portfolio, and publish it with
            a unique shareable URL. No design skills needed.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex gap-4 mt-4"
        >
          {isPortfolioFound ? (
            <div className="flex gap-4 flex-col md:flex-row justify-center items-center">
              <div>
                <Link to={`/portfolio/${user}`}>
                <button className="bg-gradient-primary text-[hsl(var(--primary-foreground))] font-display font-semibold shadow-glow animate-pulse-glow p-3 rounded-sm cursor-pointer">
                  View Your Portfolio
                </button>
              </Link>
              </div>
              <div className="flex gap-4 justify-center items-center">
                <Link to={`/edit/${user}`}>
                <button className="border border-[hsl(var(--primary))]/50 text-[hsl(var(--primary))] font-display p-3 rounded-sm cursor-pointer">
                  <Pencil className="w-5 h-5" />
                </button>
              </Link>
              <button
                onClick={deletePortfolio}
                className="text-red-600 border border-[hsl(var(--primary))]/50 p-3 rounded-sm cursor-pointer"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-4 flex-col md:flex-row">
              <Link to="/create">
                <button className="bg-gradient-primary text-[hsl(var(--primary-foreground))] font-display font-semibold shadow-glow animate-pulse-glow p-3 rounded-sm cursor-pointer">
                  Create Your Portfolio
                </button>
              </Link>
              <Link to="/sample">
                <button className="border border-[hsl(var(--border))] text-[hsl(var(--foreground))] bg-black hover:bg-[hsl(var(--secondary))] font-display p-3 rounded-sm cursor-pointer">
                  View Sample
                </button>
              </Link>
            </div>
          )}
        </motion.div>
      </section>

      {/* Features */}
      <section className="px-10 md:px-40 pb-10">
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
                className="bg-card border border-[hsl(var(--border))] rounded-lg p-6 shadow-card hover:border-primary/30 transition-colors"
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
      <Footer/>
    </div>
  );
}

export default HomePage;
