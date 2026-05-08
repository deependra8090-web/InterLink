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
  const [location, setLocation] = useState(null);

  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    maxPeople: "",
    description: "",
  });

  /* ================= FETCH ================= */
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

        // ✅ FIX: normalize location
        setLocation({
          lat: trip.location?.lat,
          lng: trip.location?.lng,
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

  /* ================= HANDLERS ================= */
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ================= 🔍 SEARCH LOCATION ================= */
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

      // ✅ update input with full address
      setFormData((prev) => ({
        ...prev,
        destination: place.display_name,
      }));
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch location");
    }
  };

  /* ================= SAVE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!location?.lat || !location?.lng) {
      toast.error("Please select location");
      return;
    }

    try {
      setSaving(true);

      // ✅ FIX: keep old image unless new uploaded
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
        {location?.lat && location?.lng && (
          <MapBoxView
            lat={location.lat}
            lng={location.lng}
            onSelect={setLocation}
            mode="edit"
          />
        )}

        {location?.address && (
          <p className="text-sm text-gray-500 mt-1">
            📍 {location.address}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">

          {/* 🔍 DESTINATION + SEARCH */}
          <div className="flex gap-2">
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
          </div>

          {/* IMAGE */}
          <input type="file" onChange={handleImageChange} />

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
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="Budget"
              className="input w-full"
            />
            <input
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

          <button
            disabled={saving}
            className="w-full bg-blue-600 text-white py-2 rounded-full"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTrip;