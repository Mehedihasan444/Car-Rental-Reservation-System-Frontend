import React, { useState, useRef, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa6";

const MultiSelect = ({
  setFeatures,
}: {
  setFeatures: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  //+
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle the dropdown
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  useEffect(() => {
    setFeatures(selectedFeatures);
  }, [selectedFeatures, setFeatures]);
  // Handle outside click to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Handle feature selection
  const handleFeatureChange = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((item) => item !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  // List of available features
  const features = [
    "Air Conditioning",
    "GPS",
    "Bluetooth",
    "Backup Camera",
    "Heated Seats",
    "Sunroof",
    "Child Seat",
    "Cruise Control",
    "Automatic Transmission",
    'Autopilot', 'Long Range Battery', 'Premium Interior', 'Enhanced Safety Features', 'Fast Charging'
  ];

  return (
    <div
      className="relative inline-block text-left min-w-[250px]"
      ref={dropdownRef}
    >
      {/* Dropdown Button */}
      <button
        type="button"
        className="border   py-2 px-4 rounded w-full flex gap-1 items-center justify-between"
        onClick={toggleDropdown}
      >
        {selectedFeatures.length > 0
          ? `${selectedFeatures.length} Feature(s) Selected`
          : "Select Features"}
        <FaAngleDown className="text-gray-500 " />
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
          {features.map((feature) => (
            <div
              key={feature}
              className="px-4 py-2 cursor-pointer flex items-center hover:bg-gray-100"
              onClick={() => handleFeatureChange(feature)}
            >
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedFeatures.includes(feature)}
                readOnly
              />
              {feature}
            </div>
          ))}
        </div>
      )}

      {/* Display selected features */}
      {/* {selectedFeatures.length > 0 && (
        <div className="mt-2">
          <p className="text-gray-700 font-medium">Selected Features:</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {selectedFeatures.map((feature) => (
              <span
                key={feature}
                className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-sm"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default MultiSelect;
