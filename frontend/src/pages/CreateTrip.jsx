import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTrips } from "../context/TripContext";
import Loader from "../components/common/Loader";
import toast from "react-hot-toast";
import { uploadImage } from "../utils/uploadImage";
import MapBoxView from "../components/maps/MapBoxView";

const CreateTrip = () => {
  const { createTrip, loading } = useTrips();
  const navigate = useNavigate();
  const { state: locationState } = useLocation();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [tripLocation, setTripLocation] = useState(
    locationState?.location || {
      lat: 28.6139,
      lng: 77.209,
      address: "",
    }
  );

  const [formData, setFormData] = useState({
    destination: locationState?.destination || "",
    startDate: "",
    endDate: "",
    budget: "",
    maxPeople: "",
    description: "",
  });

  // 🔽 NEW: suggestions state
  const [suggestions, setSuggestions] = useState([]);

  /* ================= AUTO FILL ================= */
  useEffect(() => {
    if (!locationState) return;

    if (locationState.destination) {
      setFormData((prev) => ({
        ...prev,
        destination: locationState.destination,
      }));
    }

    if (locationState.location) {
      setTripLocation(locationState.location);
    }
  }, [locationState]);

  /* ================= HANDLERS ================= */

  // 🔽 UPDATED handleChange with autocomplete
  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "destination") {
      if (!value) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${value}&limit=5`
        );
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        console.error(err);
      }
    }
  };

  // 🔽 NEW: select suggestion
  const handleSelectSuggestion = (place) => {
    const newLocation = {
      lat: parseFloat(place.lat),
      lng: parseFloat(place.lon),
      address: place.display_name,
    };

    setFormData((prev) => ({
      ...prev,
      destination: place.display_name,
    }));

    setTripLocation(newLocation);
    setSuggestions([]);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      return toast.error("Image must be under 2MB");
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ================= 🔍 MANUAL SEARCH BUTTON ================= */
  const handleSearchLocation = async () => {
    if (!formData.destination) {
      return toast.error("Enter a location first");
    }

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${formData.destination}`
      );

      const data = await res.json();

      if (!data.length) {
        return toast.error("Location not found");
      }

      const place = data[0];

      const newLocation = {
        lat: parseFloat(place.lat),
        lng: parseFloat(place.lon),
        address: place.display_name,
      };

      setTripLocation(newLocation);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch location");
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tripLocation?.lat || !tripLocation?.lng) {
      return toast.error("Please select a trip location");
    }

    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      return toast.error("End date must be after start date");
    }

    try {
      if (!image) {
        return toast.error("Please upload an image");
      }

      const imageUrl = await uploadImage(image);

      await createTrip({
        ...formData,
        budget: Number(formData.budget),
        maxPeople: Number(formData.maxPeople),
        image: imageUrl,
        location: tripLocation,
      });

      toast.success("Trip created successfully 🎉");
      navigate("/explore");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create trip");
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create a New Trip ✈️
        </h2>

        {/* MAP */}
        <div className="mb-4">
          <MapBoxView
            lat={tripLocation?.lat}
            lng={tripLocation?.lng}
            mode="edit"
            onSelect={setTripLocation}
          />

          {tripLocation.address && (
            <p className="text-sm text-gray-500 mt-1">
              📍 {tripLocation.address}
            </p>
          )}
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* 🔍 DESTINATION + AUTOCOMPLETE */}
          <div className="relative flex gap-2">
            <input
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="Enter destination"
              className="input w-full"
              required
            />

            <button
              type="button"
              onClick={handleSearchLocation}
              className="bg-blue-500 text-white px-4 rounded"
            >
              Search
            </button>

            {/* 🔽 Suggestions */}
            {suggestions.length > 0 && (
              <ul className="absolute top-12 left-0 w-full bg-white border rounded shadow max-h-48 overflow-y-auto z-50">
                {suggestions.map((place) => (
                  <li
                    key={place.place_id}
                    onClick={() => handleSelectSuggestion(place)}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                  >
                    {place.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* IMAGE */}
          <input type="file" accept="image/*" onChange={handleImageChange} />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="h-44 w-full object-cover rounded-xl"
            />
          )}

          {/* DATES */}
          <div className="flex gap-3">
            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="input w-full" required />
            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="input w-full" required />
          </div>

          {/* BUDGET */}
          <div className="flex gap-3">
            <input type="number" name="budget" value={formData.budget} onChange={handleChange} placeholder="Budget (₹)" className="input w-full" />
            <input type="number" name="maxPeople" value={formData.maxPeople} onChange={handleChange} placeholder="Max People" className="input w-full" required />
          </div>

          {/* DESCRIPTION */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your trip..."
            className="input w-full h-28"
            required
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded-full">
            Create Trip
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTrip;