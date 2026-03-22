import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, ArrowLeft } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/user/", {
        username,
        password,
      })
      .then(() => {
        // console.log(response);
        setLoading(false);
        navigate("/signin");
        toast.success("User created successfully");
      })
      .catch((error) => {
        console.error(error);
        console.log();
        setLoading(false);
        toast.error(error.response.data.message +". Enter unique username");
        setPassword("");
        setConfirmPassword("")
      });
  };
  return (
    <div>
      <Link
        to="/"
        className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors fixed top-4 left-4"
      >
        <span className="flex text-sm md:text-lg items-center">
          <ArrowLeft className="w-4 h-4 md:w-6 md:h-6 mr-1 animate-pulse" /> Back
        </span>
      </Link>
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <Link
              to="/"
              className="font-display text-xl md:text-3xl  text-[hsl(var(--primary))] font-bold tracking-tight inline-block"
            >
              {"<DevFolio />"}
            </Link>
          </div>

          <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-[hsl(var(--card))] rounded-lg px-8 pt-6 pb-8 mb-4">
            <div className="space-y-1 pb-4">
              <div className="text-xl xl:text-2xl font-display text-[hsl(var(--foreground))]">
                Create an account
              </div>
              <div className="text-[hsl(var(--muted-foreground))] text-sm">
                Get started building your developer portfolio
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2 flex flex-col">
                  <label
                    htmlFor="email"
                    className="text-[hsl(var(--foreground))] text-sm"
                  >
                    Username*
                  </label>
                  <input
                    id="username"
                    type="text"
                    placeholder="johndoe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--primary))] p-2 rounded-md placeholder:text-sm"
                  />
                </div>
                <div className="space-y-2 flex flex-col mb-4">
                  <label
                    htmlFor="password"
                    className="text-[hsl(var(--foreground))] text-sm"
                  >
                    Password*
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--primary))] p-2 rounded-md placeholder:text-sm"
                  />
                </div>
                <div className="space-y-2 flex flex-col mb-4">
                  <label
                    htmlFor="ConfirmPassword"
                    className="text-[hsl(var(--foreground))] text-sm"
                  >
                    Confirm Password*
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--primary))] p-2 rounded-md placeholder:text-sm"
                  />
                </div>
              </div>
              <div className="flex-col gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-md bg-gradient-primary text-[hsl(var(--primary-foreground))] font-display font-semibold shadow-glow active:scale-[0.97] transition-transform cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  {loading ? "Creating..." : "Create Account"}
                </button>
                <p className="text-sm text-[hsl(var(--muted-foreground))] text-center mt-3">
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="text-[hsl(var(--primary))] hover:underline underline-offset-4 font-medium"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default SignUp;
