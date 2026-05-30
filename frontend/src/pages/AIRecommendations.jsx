import React, {
  useState,
  useContext
} from "react";

import { AuthContext }
from "../context/AuthContext";

import MatchRecommendations
from "../components/MatchRecommendations";

const AIRecommendations = () => {

  const { user } =
    useContext(AuthContext);

  const [saved, setSaved] =
    useState(false);

  const [formData, setFormData] =
    useState({

      interests: "",

      budget: "",

      destinationPreferences: "",

      travelStyle: "",

      language: "",

      foodPreference: "",

      preferredTripDuration: ""
    });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response =
        await fetch(

          `https://interlink-2.onrender.com/api/matches/${user._id}`,

          {
            method: "POST",

            headers: {
              "Content-Type":
              "application/json"
            },

            body: JSON.stringify({

              ...formData,

              interests:
              formData.interests
              .split(","),

              destinationPreferences:
              formData.destinationPreferences
              .split(",")
            })
          }
        );

      await response.json();

      setSaved(true);

      alert(
        "Preferences Saved!"
      );

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="min-h-screen bg-slate-100 py-10 px-4">

      <div className="max-w-4xl mx-auto">

        {/* FORM CARD */}

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h1 className="text-4xl font-bold text-slate-800 mb-3">

            AI Travel Buddy Matching ✨

          </h1>

          <p className="text-slate-600 mb-8">

            Find compatible travelers
            using AI-powered matching.

          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              type="text"
              name="interests"
              placeholder="trekking,camping,mountains"
              onChange={handleChange}
              className="w-full border border-slate-300 p-4 rounded-xl"
            />

            <select
              name="budget"
              onChange={handleChange}
              className="w-full border border-slate-300 p-4 rounded-xl"
            >
              <option value="">
                Select Budget
              </option>

              <option value="low">
                Low
              </option>

              <option value="medium">
                Medium
              </option>

              <option value="high">
                High
              </option>
            </select>

            <input
              type="text"
              name="destinationPreferences"
              placeholder="Manali,Goa,Leh"
              onChange={handleChange}
              className="w-full border border-slate-300 p-4 rounded-xl"
            />

            <select
              name="travelStyle"
              onChange={handleChange}
              className="w-full border border-slate-300 p-4 rounded-xl"
            >
              <option value="">
                Travel Style
              </option>

              <option value="solo">
                Solo
              </option>

              <option value="group">
                Group
              </option>

              <option value="luxury">
                Luxury
              </option>

              <option value="adventure">
                Adventure
              </option>
            </select>

            <input
              type="text"
              name="language"
              placeholder="Hindi,English"
              onChange={handleChange}
              className="w-full border border-slate-300 p-4 rounded-xl"
            />

            <select
              name="foodPreference"
              onChange={handleChange}
              className="w-full border border-slate-300 p-4 rounded-xl"
            >
              <option value="">
                Food Preference
              </option>

              <option value="veg">
                Veg
              </option>

              <option value="non-veg">
                Non Veg
              </option>

              <option value="vegan">
                Vegan
              </option>
            </select>

            <input
              type="number"
              name="preferredTripDuration"
              placeholder="Trip Duration in Days"
              onChange={handleChange}
              className="w-full border border-slate-300 p-4 rounded-xl"
            />

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-xl transition"
            >
              Get AI Recommendations
            </button>

          </form>
        </div>

        {/* RESULTS */}

        {saved && (

          <div className="mt-10">

            <div className="bg-white rounded-3xl shadow-xl p-8">

              <h2 className="text-3xl font-bold text-slate-800 mb-6">

                Recommended Travel Buddies 🌍

              </h2>

              <MatchRecommendations />
        

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AIRecommendations;
