import { ArrowLeft, Rocket } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Portfolio from "../components/portfolio";



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

      if(!token || !username){
        toast.error("You need to login to publish your portfolio.");
        navigate("/signin");
        return
      }

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
          <span className="font-display md:text-lg text-[hsl(var(--primary))] font-bold">
            Preview
          </span>
        </div>
        <button
          onClick={publish}
          disabled={publishing}
          className="flex items-center text-sm md:text-base py-1 md:py-2 px-1 md:px-2 rounded-sm bg-gradient-primary text-[hsl(var(--primary-foreground))] font-display shadow-glow cursor-pointer"
        >
          <Rocket className="w-4 h-4 mr-2" />{" "}
          {publishing ? "Publishing..." : "Publish"}
        </button>
      </nav>

      {/* Portfolio */}
      <Portfolio p={p} />
    </div>
  );
}

export default PreviewPortfolio;
