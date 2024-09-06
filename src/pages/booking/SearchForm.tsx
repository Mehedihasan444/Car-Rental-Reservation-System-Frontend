import { Label } from "@/components/ui/label";
import  { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    type: "",
    features: "",
    location: "",
    pickupDate: "",
    dropoffDate: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(formData);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 ">
      <h2 className="text-2xl font-semibold mb-4">Search for Cars</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-5 justify-between">
        <div className="mb-4">
         
          <label className="block text-sm font-medium text-gray-700">
            Car Type
          </label>
      
            <select
              name="type"
              value={formData?.type || ""}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Convertible">Convertible</option>
              <option value="Truck">Truck</option>
              <option value="Coupe">Coupe</option>
              <option value="Minivan">Minivan</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>
       
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Features
          </label>
          <input
            type="text"
            name="features"
            value={formData.features}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            placeholder="GPS, AC, Child Seat..."
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            placeholder="City or Airport"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Pick-up Date
          </label>
          <input
            type="date"
            name="pickupDate"
            value={formData.pickupDate}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Drop-off Date
          </label>
          <input
            type="date"
            name="dropoffDate"
            value={formData.dropoffDate}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4 flex items-end">

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
          >
          Search Cars
        </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
