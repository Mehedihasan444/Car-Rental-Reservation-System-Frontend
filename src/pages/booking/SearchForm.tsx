import { Input } from "@/components/ui/input";
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

const SearchForm = ({
  queries,
  setQueries,
}: {
  queries: TQueries;
  setQueries: React.Dispatch<React.SetStateAction<TQueries>>;
}) => {
  const [formData, setFormData] = useState({
    type: "",
    features: "",
    engineType: "",
    // location: "",
    // pickupDate: "",
    // dropOffDate: ""
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQueries({
      ...queries,
      searchTerm: formData?.features,
      type: formData?.type,
      engineType: formData?.engineType,
      // location: formData?.location,
      // pickupDate: formData?.pickupDate,
      // dropOffDate: formData?.dropOffDate
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 ">
      <h2 className="text-2xl font-semibold mb-4">Search for Cars</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-5 justify-between">
          <div className="mb-4 flex items-center gap-5">
            <Label className="block text-lg font-medium text-gray-700 w-full">
              Car Type
            </Label>

            <Select
              value={formData?.type || ""}
              onValueChange={(value) =>
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger className="min-w-[180px]">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
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
          <div className="mb-4 flex items-center gap-5">
            <Label className="block text-lg font-medium text-gray-700">
              Features
            </Label>
            <Input
              type="text"
              name="features"
              value={formData?.features || ""}
              onChange={(e) =>
                setFormData({ ...formData, features: e.target.value })
              }
              placeholder="GPS, AC, Child Seat..."
            />
          </div>

          {/* Fuel Type filter */}
          <div className="mb-4 flex items-center gap-5">
            <Label className="block text-lg font-medium text-gray-700 w-full">
              Fuel Type
            </Label>
            <Select
              value={formData.engineType || ""}
              onValueChange={(value) =>
                setFormData({ ...formData, engineType: value })
              }
            >
              <SelectTrigger className="min-w-[180px]">
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

          {/* <div className="mb-4 flex flex-col">
            <Label className="block text-lg font-medium text-gray-700">
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
            <Label className="block text-lg font-medium text-gray-700">
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
            <Label className="block text-lg font-medium text-gray-700">
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
          </div> */}
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
