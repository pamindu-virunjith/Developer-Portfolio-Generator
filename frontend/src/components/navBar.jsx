import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function NavBar() {

    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    window.location.reload();
  }

  return (
    <div>
      <nav className="w-full flex items-center justify-between p-6">
        <span className="font-display sm:text-3xl text-[hsl(var(--primary))] font-bold tracking-tight">
          {"<DevFolio />"}
        </span>

        {user || token ? (
          <button
            className="bg-gradient-primary text-[hsl(var(--primary-foreground))] font-display md:font-semibold shadow-glow animate-pulse-glow py-1 px-2 md:py-2 md:px-4 rounded-sm cursor-pointer text-sm md:text-base"
            onClick={logOut}
          >
            Sign Out
          </button>
        ) : (
          <Link to="/signin">
            <button className="bg-gradient-primary text-[hsl(var(--primary-foreground))] font-display md:font-semibold shadow-glow animate-pulse-glow py-1 px-2 md:py-2 md:px-4 rounded-sm cursor-pointer text-sm md:text-base">
              Sign In
            </button>
          </Link>
        )}
      </nav>
    </div>
  );
}

export default NavBar;
