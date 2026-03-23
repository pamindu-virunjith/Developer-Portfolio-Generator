import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../components/loading";
import toast from "react-hot-toast";
import NotFound from "./notFound";
import Portfolio from "../components/portfolio";


function PublicPortfolio() {
  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const username = useParams();

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/portfolio/${username.username}`,
        );

        setP(res.data);
        setNotFound(false);
      } catch (err) {
        if (err.response?.status === 404) {
          setNotFound(true);
          toast.error("Portfolio not found");
        } else {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();

  }, [username]);

  if (loading) return <Loading />;
  if (notFound) return <NotFound />;
  if (!p) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto space-y-16 py-8 px-5 xl:px-0">
      <Portfolio p={p} />
    </div>
  );
}

export default PublicPortfolio;
