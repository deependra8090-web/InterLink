import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import MatchRecommendations from "../components/MatchRecommendations";

const Dashboard = () => {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    document.title = "InterLink 🌍";
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://wallpaperaccess.com/full/89251.jpg')",
        }}
      >
        {/* OVERLAY */}
        <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px]" />
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex flex-col items-center px-6 py-12">

        {/* HERO SECTION */}
        <div className="w-full max-w-3xl">

          {/* GLASS CARD */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl p-8 md:p-12 text-center shadow-2xl + mt-20">

            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">
              Adventure Awaits
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-8">
              Find like-minded travel buddies and explore the world together.
            </p>

            {/* CTA BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* AI RECOMMENDATION BUTTON */}

  {user && (
    <button
      onClick={() => navigate("/ai-recommendations")}
      className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-10 py-4 rounded-full text-lg transition"
    >
      AI Recommendations
    </button>
  )}

              

              {!user && (
               <button
      onClick={() => navigate("/login")}
      className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-10 py-4 rounded-full text-lg transition"
    >
      AI Recommendations
    </button>
              )}
              <button
                onClick={() => navigate("/explore")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-4 rounded-full text-lg transition"
              >
                Explore Trips
              </button>


            </div>
          </div>

          {/* FOOTNOTE */}
          <p className="mt-6 text-center text-white/80 text-sm">
            Join 2,000+ travelers worldwide
          </p>
        </div>

      
      </div>
    </div>
  );
};

export default Dashboard;