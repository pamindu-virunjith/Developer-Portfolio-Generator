import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PortfolioForm from "../components/portfolioForm";
import { ArrowLeft } from "lucide-react";

function EditPortfolio() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const username = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/portfolio/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load portfolio");
      });
  }, [token, username]);

  if (!data)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full h-screen flex justify-center items-center">
          <div className="w-20 h-20 border-6 border-[hsl(var(--primary))] border-t-black rounded-full animate-spin"></div>
        </div>
        ;
      </div>
    );

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
          Update Your own Portfolio
        </h1>
        <p className="text-[hsl(var(--muted-foreground))] mb-10">
          Fill in your details across the sections below.
        </p>
        <PortfolioForm
          initialData={data}
          submitLabel="Update Portfolio"
          onSubmit={handleUpdate}
        />
      </div>
    </div>
  );

  async function handleUpdate(updatedData) {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/portfolio/${username}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      toast.success(res.data.message);

      navigate(`/portfolio/${username}`);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Update failed");
    }
  }
}

export default EditPortfolio;
