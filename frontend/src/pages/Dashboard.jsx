import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import background from "../assets/travel.jpg";

import {
  Compass,
  Plus,
  Sparkles,
  Users,
  Map,
  ShieldCheck,
  ArrowRight,
  Plane,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    document.title = "InterLink 🌍";
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= NAVBAR ================= */}

      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LOGO */}

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-lg">
              <Plane
                size={23}
                className="text-blue-600"
              />
            </div>

            <div>
              <h1 className="text-xl font-bold text-white">
                Inter<span className="text-blue-400">Link</span> 🌍
              </h1>

              <p className="text-xs text-gray-300">
                AI Travel Buddy Finder
              </p>
            </div>

          </div>


          {/* NAVIGATION */}

          <div className="hidden md:flex items-center gap-8">

            <button
              onClick={() => navigate("/explore")}
              className="text-white hover:text-blue-400 transition"
            >
              Explore Trips
            </button>

            <button
              onClick={() => navigate("/create-trip")}
              className="text-white hover:text-blue-400 transition"
            >
              Create Trip
            </button>

            <button
              onClick={() =>
                user
                  ? navigate("/ai-recommendations")
                  : navigate("/login")
              }
              className="flex items-center gap-2 text-purple-300 hover:text-purple-200 transition"
            >
              <Sparkles size={17} />
              AI Recommendations
            </button>

            <button
              onClick={() => navigate("/about")}
              className="text-white hover:text-blue-400 transition"
            >
              About
            </button>

          </div>


          {/* AUTH */}

          <div>

            {user ? (

              <button
                onClick={() => navigate("/profile")}
                className="px-5 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-medium transition"
              >
                Profile
              </button>

            ) : (

              <button
                onClick={() => navigate("/login")}
                className="px-6 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-medium transition"
              >
                Login
              </button>

            )}

          </div>

        </div>

      </nav>


      {/* ================= HERO ================= */}

      <section className="relative min-h-screen pt-24 overflow-hidden">

        {/* BACKGROUND */}

        <div className="absolute inset-0">

          <img
            src={background}
            alt="Travel destination"
            className="w-full h-full object-cover"
          />

          {/* DARK OVERLAY */}

          <div className="absolute inset-0 bg-slate-950/55" />

          {/* GRADIENT */}

          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/40 to-transparent" />

        </div>


        {/* HERO CONTENT */}

        <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-[calc(100vh-96px)] flex items-center">

          <div className="grid lg:grid-cols-2 gap-14 items-center w-full">

            {/* LEFT */}

            <div className="text-white">

              {/* BADGE */}

              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-purple-200 mb-7">

                <Sparkles size={18} />

                AI-Powered Travel Matching

              </div>


              {/* USER GREETING */}

              {user && (
                <p className="text-blue-300 font-medium mb-3">
                  Welcome back, {user.name || "Traveler"} 👋
                </p>
              )}


              {/* HEADING */}

              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">

                Your Next

                <span className="block">
                  Adventure Starts
                </span>

                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  With The Right Buddy.
                </span>

              </h1>


              {/* DESCRIPTION */}

              <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-xl leading-relaxed">

                Discover amazing trips, connect with like-minded
                travelers and find your perfect travel companion
                using AI-powered recommendations.

              </p>


              {/* BUTTONS */}

              <div className="flex flex-wrap gap-4 mt-9">

                {/* EXPLORE */}

                <button
                  onClick={() => navigate("/explore")}
                  className="flex items-center gap-2 px-7 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xl hover:scale-105 transition"
                >

                  <Compass size={20} />

                  Explore Trips

                  <ArrowRight size={18} />

                </button>


                {/* CREATE */}

                <button
                  onClick={() => navigate("/create-trip")}
                  className="flex items-center gap-2 px-7 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/40 text-white font-semibold hover:bg-white/20 transition"
                >

                  <Plus size={20} />

                  Create Trip

                </button>

              </div>


              {/* AI BUTTON */}

              <button
                onClick={() =>
                  user
                    ? navigate("/ai-recommendations")
                    : navigate("/login")
                }
                className="mt-6 flex items-center gap-2 text-purple-300 hover:text-purple-200 font-semibold transition"
              >

                <Sparkles size={20} />

                Find my travel buddy with AI

                <ArrowRight size={18} />

              </button>

            </div>


            {/* RIGHT SIDE */}

            <div className="hidden lg:block">

              <div className="relative">

                {/* AI CARD */}

                <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-7 shadow-2xl max-w-md ml-auto">

                  <div className="flex items-center justify-between mb-6">

                    <div>

                      <p className="text-sm text-gray-500">
                        AI Travel Buddy Finder
                      </p>

                      <h2 className="text-2xl font-bold text-slate-800">
                        Smart Matching
                      </h2>

                    </div>

                    <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center">

                      <Sparkles
                        className="text-purple-600"
                        size={25}
                      />

                    </div>

                  </div>


                  {/* MATCH */}

                  <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-3">

                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                          R
                        </div>

                        <div>

                          <h3 className="font-bold text-slate-800">
                            Recommended Buddy
                          </h3>

                          <p className="text-sm text-gray-500">
                            Based on your preferences
                          </p>

                        </div>

                      </div>

                      <div className="text-right">

                        <p className="text-xl font-bold text-purple-600">
                          92%
                        </p>

                        <p className="text-xs text-gray-500">
                          Match
                        </p>

                      </div>

                    </div>

                  </div>


                  {/* PREFERENCES */}

                  <div className="mt-5">

                    <p className="text-sm font-semibold text-gray-700 mb-3">
                      Matching factors
                    </p>

                    <div className="flex flex-wrap gap-2">

                      <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm">
                        Adventure
                      </span>

                      <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-sm">
                        Photography
                      </span>

                      <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-sm">
                        Hiking
                      </span>

                      <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-sm">
                        Nature
                      </span>

                    </div>

                  </div>


                  {/* AI BUTTON */}

                  <button
                    onClick={() =>
                      user
                        ? navigate("/ai-recommendations")
                        : navigate("/login")
                    }
                    className="w-full mt-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold flex items-center justify-center gap-2 transition"
                  >

                    <Sparkles size={18} />

                    Get AI Recommendations

                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          {/* TITLE */}

          <div className="text-center mb-14">

            <p className="text-purple-600 font-semibold">
              INTERLINK FEATURES
            </p>

            <h2 className="text-4xl font-bold text-slate-800 mt-2">
              Everything You Need For Your Next Trip
            </h2>

            <p className="text-gray-500 max-w-2xl mx-auto mt-4">
              A full-stack platform designed to help travelers
              discover trips and connect with compatible companions.
            </p>

          </div>


          {/* FEATURES */}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">


            {/* FIND BUDDY */}

            <FeatureCard
              icon={<Users size={26} />}
              title="Find Travel Buddies"
              description="Connect with travelers who share your interests and travel preferences."
            />


            {/* EXPLORE */}

            <FeatureCard
              icon={<Map size={26} />}
              title="Explore Trips"
              description="Discover trips created by other users and find adventures that match your interests."
            />


            {/* AI */}

            <FeatureCard
              icon={<Sparkles size={26} />}
              title="AI Recommendations"
              description="Get personalized travel buddy recommendations based on multiple preferences."
              highlight
              onClick={() =>
                user
                  ? navigate("/ai-recommendations")
                  : navigate("/login")
              }
            />


            {/* SECURITY */}

            <FeatureCard
              icon={<ShieldCheck size={26} />}
              title="Secure Authentication"
              description="User authentication and protected features help keep the platform secure."
            />

          </div>

        </div>

      </section>


      {/* ================= AI SECTION ================= */}

      <section className="py-24 bg-gradient-to-br from-purple-50 to-blue-50">

        <div className="max-w-6xl mx-auto px-6">

          <div className="bg-white rounded-[35px] shadow-xl overflow-hidden">

            <div className="grid md:grid-cols-2">

              {/* LEFT */}

              <div className="p-10 md:p-14">

                <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">

                  <Sparkles
                    className="text-purple-600"
                    size={27}
                  />

                </div>

                <h2 className="text-4xl font-bold text-slate-800 mt-6">

                  Find a Travel Buddy

                  <span className="block text-purple-600">
                    With AI
                  </span>

                </h2>

                <p className="text-gray-600 mt-5 leading-relaxed">

                  InterLink analyzes your travel preferences
                  and helps identify travelers who may be
                  compatible with your trip.

                </p>


                {/* FACTORS */}

                <div className="grid grid-cols-2 gap-3 mt-7">

                  {[
                    "Interests",
                    "Destination",
                    "Budget",
                    "Travel Style",
                    "Food Preferences",
                    "Trip Duration",
                  ].map((item) => (

                    <div
                      key={item}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >

                      <div className="w-2 h-2 bg-purple-500 rounded-full" />

                      {item}

                    </div>

                  ))}

                </div>


                <button
                  onClick={() =>
                    user
                      ? navigate("/ai-recommendations")
                      : navigate("/login")
                  }
                  className="mt-8 px-7 py-4 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold flex items-center gap-2 transition"
                >

                  <Sparkles size={20} />

                  Try AI Recommendations

                  <ArrowRight size={18} />

                </button>

              </div>


              {/* RIGHT */}

              <div className="bg-slate-900 p-10 md:p-14 text-white flex items-center">

                <div className="w-full">

                  <p className="text-purple-300 text-sm font-semibold">
                    HOW IT WORKS
                  </p>

                  <h3 className="text-3xl font-bold mt-2">
                    Personalized Matching
                  </h3>


                  <div className="mt-8 space-y-6">

                    <Step
                      number="01"
                      title="Set Preferences"
                      text="Tell InterLink about your travel interests and preferences."
                    />

                    <Step
                      number="02"
                      title="AI Analysis"
                      text="The recommendation system compares relevant travel preferences."
                    />

                    <Step
                      number="03"
                      title="Discover Matches"
                      text="View compatible travelers and explore potential connections."
                    />

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= TECHNOLOGY ================= */}

      <section className="py-20 bg-white">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <p className="text-purple-600 font-semibold">
            PROJECT TECHNOLOGY
          </p>

          <h2 className="text-3xl font-bold text-slate-800 mt-2">
            Built With Modern Web Technologies
          </h2>

          <div className="flex flex-wrap justify-center gap-3 mt-8">

            {[
              "React.js",
              "JavaScript",
              "Tailwind CSS",
              "Node.js",
              "Express.js",
              "MongoDB",
              "Socket.IO",
              "REST API",
              "JWT",
            ].map((tech) => (

              <span
                key={tech}
                className="px-5 py-2.5 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-purple-100 hover:text-purple-700 transition"
              >
                {tech}
              </span>

            ))}

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="bg-slate-950 text-white py-10">

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-5">

          <div>

            <h2 className="text-2xl font-bold">
              Inter<span className="text-blue-400">Link</span> 🌍
            </h2>

            <p className="text-gray-400 mt-2">
              AI Travel Buddy Finder
            </p>

          </div>

          <p className="text-gray-500">
            Full Stack Development Project
          </p>

        </div>

      </footer>

    </div>
  );
};


/* =====================================================
   FEATURE CARD
===================================================== */

const FeatureCard = ({
  icon,
  title,
  description,
  highlight = false,
  onClick,
}) => {

  return (

    <div
      onClick={onClick}
      className={`p-7 rounded-3xl border transition duration-300 hover:-translate-y-2 hover:shadow-xl ${
        highlight
          ? "bg-purple-50 border-purple-200 cursor-pointer"
          : "bg-white border-gray-100"
      }`}
    >

      <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">

        {icon}

      </div>

      <h3 className="text-xl font-bold text-slate-800 mt-5">
        {title}
      </h3>

      <p className="text-gray-500 mt-3 leading-relaxed">
        {description}
      </p>

      {highlight && (
        <div className="flex items-center gap-1 mt-5 text-purple-600 font-semibold text-sm">

          Explore AI Matching

          <ArrowRight size={15} />

        </div>
      )}

    </div>

  );
};


/* =====================================================
   HOW IT WORKS STEP
===================================================== */

const Step = ({
  number,
  title,
  text,
}) => {

  return (

    <div className="flex gap-4">

      <div className="w-10 h-10 rounded-full bg-purple-600 flex-shrink-0 flex items-center justify-center text-sm font-bold">

        {number}

      </div>

      <div>

        <h4 className="font-bold text-lg">
          {title}
        </h4>

        <p className="text-gray-400 text-sm mt-1 leading-relaxed">
          {text}
        </p>

      </div>

    </div>

  );
};


export default Dashboard;