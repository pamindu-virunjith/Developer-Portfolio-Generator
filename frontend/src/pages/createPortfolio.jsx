import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import PortfolioForm from "../components/portfolioForm";

function CreatePortfolio() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/preview");
  };

  return (
    <div className="w-full h-full">
      <nav className="flex items-center gap-4 py-6 pl-5">
        <Link
          to="/"
          className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <span className="font-display text-3xl text-[hsl(var(--primary))] font-bold tracking-tight">
          {"<DevFolio />"}
        </span>
      </nav>
      <div className="py-8 px-5 md:px-0 md:pl-8">
        <h1 className="font-display text-2xl font-bold text-[hsl(var(--foreground))] mb-2">
          Create Your Portfolio
        </h1>
        <p className="text-[hsl(var(--muted-foreground))] mb-10">
          Fill in your details across the sections below.
        </p>
        <PortfolioForm onSubmit={handleSubmit}/>
      </div>
    </div>
  );
}

export default CreatePortfolio;
