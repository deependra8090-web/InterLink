import React, {
  useEffect,
  useState,
  useContext
} from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext }
from "../context/AuthContext";

const MatchRecommendations = () => {
   const navigate = useNavigate();

  const { user } =
    useContext(AuthContext);

  const [matches, setMatches] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchMatches = async () => {

      try {

        // wait for user
        if (!user?._id) return;

        const response = await fetch(
  `https://interlink-2.onrender.com/api/matches/${user._id}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }
);

        const data =
          await response.json();

        console.log(data);

        // ensure array
        setMatches(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (error) {

        console.log(error);

        setMatches([]);

      } finally {

        setLoading(false);
      }
    };

    fetchMatches();

  }, [user]);

  if (loading) {

    return (
      <p className="text-slate-500">
        Loading recommendations...
      </p>
    );
  }

  return (

    <div className="space-y-5">


      {matches.length === 0 ? (

        <p className="text-slate-500">

          No recommendations found.

        </p>

      ) : (

matches.map((match, index) => (

  <div
    key={match.user?._id || index}
     onClick={() => navigate(`/profile/${match.user?._id}`)}
    className="border border-slate-200 rounded-2xl p-5 bg-white shadow"
  >

    
    <button className="text-xl font-bold hover:text-blue-600 ">
      {match.user?.name}
    </button>

    <p className="mt-2 text-purple-600 font-semibold">
      Compatibility Score: {match.score}%
    </p>

  </div>
))
   
      )}
    </div>
  );
};

export default MatchRecommendations;
