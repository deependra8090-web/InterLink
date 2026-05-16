import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTrips } from "../context/TripContext";
import Loader from "../components/common/Loader";
import toast from "react-hot-toast";
import { uploadImage } from "../utils/uploadImage";
import MapBoxView from "../components/maps/MapBoxView";
import api from "../services/api";

const EditTrip = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { updateTrip } = useTrips();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [location, setLocation] = useState({
    lat: 28.6139,
    lng: 77.2090,
    address: "",
  });

  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    maxPeople: "",
    description: "",
  });

  // AUTOCOMPLETE SUGGESTIONS
  const [suggestions, setSuggestions] = useState([]);

  /* ================= FETCH TRIP ================= */
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await api.get(`/trips/edit/${id}`);

        const trip = res.data;

        setFormData({
          destination: trip.destination || "",
          startDate: trip.startDate?.split("T")[0] || "",
          endDate: trip.endDate?.split("T")[0] || "",
          budget: trip.budget || "",
          maxPeople: trip.maxPeople || "",
          description: trip.description || "",
        });

        // LOCATION
        setLocation({
          lat: trip.location?.lat || 28.6139,
          lng: trip.location?.lng || 77.2090,
          address: trip.location?.address || "",
        });

        setPreview(trip.image);

      } catch (err) {
        console.error(err);

        toast.error("Failed to load trip");

        navigate("/explore");

      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id, navigate]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // AUTOCOMPLETE SEARCH
    if (name === "destination") {

      if (!value.trim()) {
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

  /* ================= SELECT SUGGESTION ================= */
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

    setLocation(newLocation);

    setSuggestions([]);
  };

  /* ================= MANUAL SEARCH ================= */
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

      setLocation(newLocation);

      // UPDATE INPUT VALUE
      setFormData((prev) => ({
        ...prev,
        destination: place.display_name,
      }));

      toast.success("Location found");

    } catch (err) {
      console.error(err);

      toast.error("Failed to fetch location");
    }
  };

  /* ================= IMAGE ================= */
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      return toast.error("Image must be under 2MB");
    }

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!location?.lat || !location?.lng) {
      return toast.error("Please select a location");
    }

    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      return toast.error("End date must be after start date");
    }

    try {
      setSaving(true);

      // KEEP OLD IMAGE IF NEW NOT SELECTED
      let imageUrl = preview;

      if (image) {
        imageUrl = await uploadImage(image);
      }

      await updateTrip(id, {
        ...formData,
        budget: Number(formData.budget),
        maxPeople: Number(formData.maxPeople),
        image: imageUrl,
        location,
      });

      toast.success("Trip updated successfully ✨");

      navigate(`/trip/${id}`);

    } catch (error) {
      console.error(error);

      toast.error("Failed to update trip");

    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-6">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Edit Trip ✏️
        </h2>

        {/* MAP */}
        <div className="mb-4">
          <MapBoxView
            lat={location?.lat}
            lng={location?.lng}
            onSelect={setLocation}
            mode="edit"
          />

          {location?.address && (
            <p className="text-sm text-gray-500 mt-2">
              📍 {location.address}
            </p>
          )}
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* DESTINATION SEARCH */}
          <div className="relative flex gap-2">

            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="Search destination..."
              className="input w-full"
              required
            />

            <button
              type="button"
              onClick={handleSearchLocation}
              className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700"
            >
              Search
            </button>

            {/* AUTOCOMPLETE DROPDOWN */}
            {suggestions.length > 0 && (
              <ul className="absolute top-12 left-0 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">

                {suggestions.map((place) => (
                  <li
                    key={place.place_id}
                    onClick={() => handleSelectSuggestion(place)}
                    className="p-3 cursor-pointer hover:bg-gray-100 text-sm"
                  >
                    {place.display_name}
                  </li>
                ))}

              </ul>
            )}
          </div>

          {/* IMAGE */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="h-44 w-full object-cover rounded-xl"
            />
          )}

          {/* DATES */}
          <div className="flex gap-3">

            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="input w-full"
              required
            />

            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="input w-full"
              required
            />
          </div>

          {/* BUDGET */}
          <div className="flex gap-3">

            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="Budget (₹)"
              className="input w-full"
            />

            <input
              type="number"
              name="maxPeople"
              value={formData.maxPeople}
              onChange={handleChange}
              placeholder="Max People"
              className="input w-full"
              required
            />
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

          {/* SUBMIT */}
          <button
            disabled={saving}
            className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default EditTrip;