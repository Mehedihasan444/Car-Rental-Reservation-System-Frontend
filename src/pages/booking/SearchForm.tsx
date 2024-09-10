
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TQueries } from "@/types/TQueries";
import { useState } from "react";
import MultiSelect from "./MultiSelect";

const SearchForm = ({
  queries,
  setQueries,
}: {
  queries: TQueries;
  setQueries: React.Dispatch<React.SetStateAction<TQueries>>;
}) => {
  const [formData, setFormData] = useState({
    type: "",
    features: [] as string[], // Storing selected features as an array
    engineType: "",
  });
const [features,setFeatures]=useState<string[]>([])


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQueries({
      ...queries,
      searchTerm: features,
      type: formData?.type,
      engineType: formData?.engineType,
    });
  };

  return (
    <div className="bg-white shadow-lg dark:bg-slate-700 rounded-lg p-6 mx-5 sm:mx-0">
      <h2 className="text-2xl font-semibold mb-4 dark:text-white">
        Search for Cars
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-5 justify-between ">
          {/* Car Type */}
          <div className="mb-4 flex items-center gap-5">
            <Label className="dark:text-white block text-lg font-medium text-gray-700 w-full">
              Car Type
            </Label>
            <Select
              value={formData?.type || ""}
              onValueChange={(value) =>
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger className="min-w-[180px] dark:text-white">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent >
                <SelectGroup>
                  <SelectItem value="Sedan">Sedan</SelectItem>
                  <SelectItem value="SUV">SUV</SelectItem>
                  <SelectItem value="Hatchback">Hatchback</SelectItem>
                  <SelectItem value="Convertible">Convertible</SelectItem>
                  <SelectItem value="Truck">Truck</SelectItem>
                  <SelectItem value="Coupe">Coupe</SelectItem>
                  <SelectItem value="Minivan">Minivan</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                  <SelectItem value="Electric">Electric</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Car Features - Multiselect */}
          <div className="mb-4 flex items-center gap-5">
            <Label className="dark:text-white block text-lg font-medium text-gray-700">
              Features
            </Label>
            <div className="min-w-[180px] dark:text-white">
            {/* <Select>
        <SelectTrigger className="min-w-[180px] dark:text-white">
          <SelectValue placeholder="Select Features" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem
              value="Air Conditioning"
              onClick={() => handleFeatureChange("Air Conditioning")}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.features.includes("Air Conditioning")}
                  readOnly
                  className="mr-2"
                />
                Air Conditioning
              </div>
            </SelectItem>
            <SelectItem value="GPS" onClick={() => handleFeatureChange("GPS")}>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.features.includes("GPS")}
                  readOnly
                  className="mr-2"
                />
                GPS
              </div>
            </SelectItem>
            <SelectItem
              value="Bluetooth"
              onClick={() => handleFeatureChange("Bluetooth")}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.features.includes("Bluetooth")}
                  readOnly
                  className="mr-2"
                />
                Bluetooth
              </div>
            </SelectItem>
            <SelectItem
              value="Backup Camera"
              onClick={() => handleFeatureChange("Backup Camera")}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.features.includes("Backup Camera")}
                  readOnly
                  className="mr-2"
                />
                Backup Camera
              </div>
            </SelectItem>
            <SelectItem
              value="Heated Seats"
              onClick={() => handleFeatureChange("Heated Seats")}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.features.includes("Heated Seats")}
                  readOnly
                  className="mr-2"
                />
                Heated Seats
              </div>
            </SelectItem>
            <SelectItem
              value="Sunroof"
              onClick={() => handleFeatureChange("Sunroof")}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.features.includes("Sunroof")}
                  readOnly
                  className="mr-2"
                />
                Sunroof
              </div>
            </SelectItem>
            <SelectItem
              value="Child Seat"
              onClick={() => handleFeatureChange("Child Seat")}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.features.includes("Child Seat")}
                  readOnly
                  className="mr-2"
                />
                Child Seat
              </div>
            </SelectItem>
            <SelectItem
              value="Cruise Control"
              onClick={() => handleFeatureChange("Cruise Control")}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.features.includes("Cruise Control")}
                  readOnly
                  className="mr-2"
                />
                Cruise Control
              </div>
            </SelectItem>
            <SelectItem
              value="Automatic Transmission"
              onClick={() => handleFeatureChange("Automatic Transmission")}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.features.includes("Automatic Transmission")}
                  readOnly
                  className="mr-2"
                />
                Automatic Transmission
              </div>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select> */}
      <MultiSelect setFeatures={setFeatures}/>
            </div>
          </div>

          {/* Fuel Type */}
          <div className="mb-4 flex items-center gap-5">
            <Label className="dark:text-white block text-lg font-medium text-gray-700 w-full">
              Fuel Type
            </Label>
            <Select
              value={formData.engineType || ""}
              onValueChange={(value) =>
                setFormData({ ...formData, engineType: value })
              }
            >
              <SelectTrigger className="min-w-[180px] dark:text-white">
                <SelectValue placeholder="Select Engine Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Petrol">Petrol Engine</SelectItem>
                  <SelectItem value="Diesel">Diesel Engine</SelectItem>
                  <SelectItem value="Electric">Electric Engine</SelectItem>
                  <SelectItem value="Hybrid">Hybrid Engine</SelectItem>
                  <SelectItem value="CNG">CNG Engine</SelectItem>
                  <SelectItem value="LPG">LPG Engine</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Search Button */}
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

{
  /* <div className="mb-4 flex flex-col">
            <Label className="dark:text-white block text-lg font-medium text-gray-700">
              Location
            </Label>
            <Input
              type="text"
              name="location"
              value={queries?.location || ""}
              onChange={(e) =>
                setQueries({ ...queries, location: e.target.value })
              }
              placeholder="City or Airport"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <Label className="dark:text-white block text-lg font-medium text-gray-700">
              Pick-up Date
            </Label>
            <Input
              type="date"
              name="pickupDate"
              value={queries?.pickupDate || ""}
              onChange={(e) =>
                setQueries({ ...queries, pickupDate: e.target.value })
              }
            />
          </div>
          <div className="mb-4 flex flex-col">
            <Label className="dark:text-white block text-lg font-medium text-gray-700">
              Drop-off Date
            </Label>
            <Input
              type="date"
              name="dropOffDate"
              value={queries?.dropOffDate || ""}
              onChange={(e) =>
                setQueries({ ...queries, dropOffDate: e.target.value })
              }
            />
          </div> */
}
