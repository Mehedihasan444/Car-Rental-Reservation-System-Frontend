import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUploader } from "@/utils/ImageUploader";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  useCreateCarMutation,
  useUpdateCarMutation,
} from "@/redux/features/car/carApi";
import { useEffect, useState } from "react";
import { TCar } from "@/types/TCar";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import MultiSelect from "@/pages/booking/MultiSelect";

// imagebb credentials
const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const CarForm = ({ selectedCar }: { selectedCar: TCar | null }) => {
  const [createCar] = useCreateCarMutation();
  const [updateCar] = useUpdateCarMutation();
  const [formData, setFormData] = useState<Partial<TCar | null>>(selectedCar);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [imageFile, setImageFile] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[]>(
    selectedCar?.images || []
  );
  const [features, setFeatures] = useState<string[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  useEffect(() => {
    setFormData({ ...formData, features });
  }, [features,formData]);
  // const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.target;
  //   setFormData({ ...formData, features: value.split(",") });
  // };

  const handleImageUpload = (files: FileList | null) => {
    if (files) {
      setImageFile(Array.from(files));
      const newImagePreviews = Array.from(files)?.map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreview([...imagePreview, ...newImagePreviews]);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData?.name) newErrors.name = "Car Name is required";
    if (!formData?.model) newErrors.model = "Model is required";
    if (!formData?.year || isNaN(Number(formData.year)))
      newErrors.year = "Valid Year is required";
    if (!formData?.pricePerHour || isNaN(Number(formData.pricePerHour)))
      newErrors.pricePerHour = "Valid Price Per Hour is required";
    if (!formData?.engineType) newErrors.engineType = "Engine Type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!imagePreview?.length && !imageFile?.length) {
      toast({ description: "No file selected for upload" });
      return;
    }

    // upload images on the imagebb
    const uploadedImageUrls: string[] = [];
    for (const fileUrl of imageFile!) {
      const imgData = new FormData();
      imgData.append("image", fileUrl);

      try {
        const res = await axios.post(imageHostingApi, imgData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.data.success) {
          uploadedImageUrls.push(res.data.data.display_url);
        } else {
          toast({ description: "Image upload failed" });
          return;
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast({ description: "Image upload failed" });
        return;
      }
    }

    try {
      if (selectedCar) {
        const previousImages = selectedCar?.images;
        // Update existing car
        const updatedCar = {
          ...formData,
          pricePerHour: Number(formData?.pricePerHour),
          seatingCapacity: Number(formData?.seatingCapacity),
          noOfDoors: Number(formData?.noOfDoors),
          images: [...previousImages, ...uploadedImageUrls],
        };

        const res = await updateCar({
          carId: selectedCar._id,
          ...updatedCar,
        });
        console.log(res);
        if (res.data.success) {
          toast({
            description: "Car updated successfully",
          });
        }
      } else {
        // Add new car
        const newCar = {
          ...formData,
          pricePerHour: Number(formData?.pricePerHour),
          seatingCapacity: Number(formData?.seatingCapacity),
          noOfDoors: Number(formData?.noOfDoors),
          images: uploadedImageUrls, // Use the uploaded image URLs
        };

        const res = await createCar(newCar);
        if (res.data.success) {
          toast({
            description: "Car added successfully",
          });
        }
      }

      // Clear the form and reset states
      setFormData({});
      setImageFile([]);
      setImagePreview([]);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="name">Car Name</Label>
          <Input
            id="name"
            placeholder="Car Name"
            value={formData?.name || ""}
            onChange={handleInputChange}
          />
          {errors.name && <p className="text-red-600">{errors.name}</p>}
        </div>
        <div className="flex justify-between items-center gap-2">
          <div className="flex flex-col space-y-2 w-full">
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              placeholder="Model"
              value={formData?.model || ""}
              onChange={handleInputChange}
            />
            {errors.model && <p className="text-red-600">{errors.model}</p>}
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <Label htmlFor="color">Color</Label>
            <Input
              id="color"
              placeholder="e.g., Red, White"
              value={formData?.color || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="A brief description of the car"
            value={formData?.description || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-between items-center gap-2">
          <div className="flex flex-col space-y-2 w-full">
            <Label htmlFor="engineType">Engine Type</Label>
            <select
              id="engineType"
              value={formData?.engineType || ""}
              onChange={handleInputChange}
              className="p-2 border rounded"
            >
              <option value="" disabled>
                Select Engine Type
              </option>
              <option value="Electric">Electric</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="CNG">CNG</option>
              <option value="Hybrid">Hybrid</option>
              <option value="LPG">LPG</option>
            </select>
            {errors.engineType && (
              <p className="text-red-600">{errors.engineType}</p>
            )}
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              value={formData?.status || "available"}
              onChange={handleInputChange}
              className="p-2 border rounded"
            >
              <option value="available">Available</option>
              <option value="booked">Booked</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="features">Features (comma-separated)</Label>
          {/* <Input
            id="features"
            placeholder="e.g., Air Conditioning, Navigation System"
            value={(formData?.features || []).join(",")}
            onChange={handleFeatureChange}
          /> */}
          <MultiSelect setFeatures={setFeatures} />
        </div>
        <div className="flex justify-between items-center gap-2">
          <div className="flex flex-col space-y-2 w-full">
            <Label htmlFor="pricePerHour">Price Per Hour</Label>
            <Input
              id="pricePerHour"
              type="number"
              placeholder="e.g., 5000"
              value={formData?.pricePerHour || ""}
              onChange={handleInputChange}
            />
            {errors.pricePerHour && (
              <p className="text-red-600">{errors.pricePerHour}</p>
            )}
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <Label htmlFor="brand">Brand</Label>
            <Input
              id="brand"
              placeholder="e.g., Tesla"
              value={formData?.brand || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex justify-between items-center gap-2">
          <div className="flex flex-col space-y-2 w-full">
            <Label htmlFor="type">Type</Label>
            <select
              id="type"
              value={formData?.type || ""}
              onChange={handleInputChange}
              className="p-2 border rounded"
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

          <div className="flex flex-col space-y-2 w-full">
            <Label htmlFor="fuelType">Fuel Type</Label>
            <select
              id="fuelType"
              value={formData?.fuelType || ""}
              onChange={handleInputChange}
              className="p-2 border rounded"
            >
              <option value="" disabled>
                Select Fuel Type
              </option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
              <option value="CNG">CNG</option>
              <option value="LPG">LPG</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center gap-2">
          <div className="flex flex-col space-y-2 w-full">
            <Label htmlFor="transmission">Transmission</Label>
            <select
              id="transmission"
              value={formData?.transmission || ""}
              onChange={handleInputChange}
              className="p-2 border rounded"
            >
              <option value="" disabled>
                Select Transmission
              </option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>

          <div className="flex flex-col space-y-2 w-full">
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              placeholder="e.g., 2023"
              value={formData?.year || ""}
              onChange={handleInputChange}
            />
            {errors.year && <p className="text-red-600">{errors.year}</p>}
          </div>
        </div>
        <div className="flex justify-between items-center gap-2">
          <div className="flex flex-col space-y-2 w-full">
            <Label htmlFor="noOfDoors">No. of Doors</Label>
            <select
              id="noOfDoors"
              value={formData?.noOfDoors || ""}
              onChange={handleInputChange}
              className="p-2 border rounded"
            >
              <option value="" disabled>
                Select Number of Doors
              </option>
              <option value={2}>2 Doors</option>
              <option value={3}>3 Doors</option>
              <option value={4}>4 Doors</option>
              <option value={5}>5 Doors</option>
            </select>
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <Label htmlFor="seatingCapacity">Seating Capacity</Label>
            <Input
              id="seatingCapacity"
              placeholder="e.g., 5"
              value={formData?.seatingCapacity || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <Label>Upload Car Images</Label>
          <ImageUploader onUpload={handleImageUpload} />
          {imagePreview.length > 0 && (
            <div className="flex flex-wrap mt-2">
              {imagePreview?.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Car image ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-md mr-2 mb-2"
                />
              ))}
            </div>
          )}
        </div>
       {selectedCar&& <div className="flex flex-col space-y-2 w-full">
          <Label htmlFor="seatingCapacity">Current Location</Label>
          <Input
            id="currentLocation"
            placeholder="e.g., 5"
            value={formData?.currentLocation || ""}
            onChange={handleInputChange}
          />
        </div>}
      </div>

      <Button type="submit" className="mt-4">
        {selectedCar ? "Update Car" : "Add Car"}
      </Button>
    </form>
  );
};

export default CarForm;
