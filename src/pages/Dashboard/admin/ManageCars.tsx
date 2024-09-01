import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { v4 as uuidv4 } from "uuid"; 
import { ImageUploader } from "@/utils/ImageUploader";

interface Car {
  id: string;
  name: string;
  model: string;
  year: number;
  features: string[];
  pricePerHour: number;
  imageUrl: string;
}

const initialCars: Car[] = [
  {
    id: "1",
    name: "Toyota Corolla",
    model: "Corolla",
    year: 2022,
    features: ["Air Conditioning", "Navigation System", "Bluetooth"],
    pricePerHour: 25,
    imageUrl: "https://via.placeholder.com/150",
  },
  // Add more static cars if needed
];

const ManageCars = () => {
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [formData, setFormData] = useState<Partial<Car>>({});
  const [editingCarId, setEditingCarId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({ ...formData, features: value.split(",") });
  };

  const handleImageUpload = (file: File | null) => {
    setImageFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCarId) {
      // Update car
      setCars(cars.map((car) =>
        car.id === editingCarId
          ? { ...car, ...formData, imageUrl: imageFile ? URL.createObjectURL(imageFile) : car.imageUrl }
          : car
      ));
    } else {
      // Add new car
      setCars([
        ...cars,
        { id: uuidv4(), ...formData, imageUrl: imageFile ? URL.createObjectURL(imageFile) : "" },
      ]);
    }
    setFormData({});
    setImageFile(null);
    setEditingCarId(null);
  };

  const handleEdit = (car: Car) => {
    setFormData(car);
    setEditingCarId(car.id);
  };

  const handleDelete = (id: string) => {
    setCars(cars.filter((car) => car.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Form for adding/updating cars */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>{editingCarId ? "Update Car" : "Add New Car"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="name">Car Name</Label>
                  <Input
                    id="name"
                    placeholder="Car Name"
                    value={formData.name || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    placeholder="Model"
                    value={formData.model || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    type="number"
                    placeholder="Year"
                    value={formData.year || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="features">Features (comma-separated)</Label>
                  <Input
                    id="features"
                    placeholder="Air Conditioning, Navigation System"
                    value={(formData.features || []).join(",")}
                    onChange={handleFeatureChange}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="pricePerHour">Price Per Hour</Label>
                  <Input
                    id="pricePerHour"
                    type="number"
                    placeholder="Price Per Hour"
                    value={formData.pricePerHour || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="image">Upload Image</Label>
                  <ImageUploader onUpload={handleImageUpload} />
                </div>
              </div>
              <Button className="mt-4" type="submit">
                {editingCarId ? "Update Car" : "Add Car"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Car List */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Manage Cars</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {cars.map((car) => (
                <div key={car.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg bg-white">
                  <img src={car.imageUrl} alt={car.name} className="w-32 h-32 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold">{car.name}</h4>
                    <p className="text-gray-600">Model: {car.model}</p>
                    <p className="text-gray-600">Year: {car.year}</p>
                    <p className="text-gray-600">Price Per Hour: ${car.pricePerHour}</p>
                    <p className="text-gray-600">Features: {car.features.join(", ")}</p>
                  </div>
                  <div className="space-y-2">
                    <Button onClick={() => handleEdit(car)}>Edit</Button>
                    <Button variant="destructive" onClick={() => handleDelete(car.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManageCars;
