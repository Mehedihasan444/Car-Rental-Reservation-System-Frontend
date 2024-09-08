export type TBookingDetails = {
  _id: string;
  name: string;
  type: string;
  pricePerHour: number;
  status: string;
  engineType: string;
  description: string;
  isDeleted: boolean;
  features: string[];
  images: string[];
  brand: string;
  model: string;
  fuelType: string;
  transmission: string;
  seatingCapacity: number;
  color: string;
  noOfDoors: number;
  year: number;
  insurance?: boolean;
  gps?: boolean;
  childSeat?: boolean;
  pickupDate?: string;
  returnDate?: string;
  pickupLocation?: string;
  destination?: string;
  pickupTime?: string;
  userName?: string;
  email?: string;
  phone?: string;
  nid?: string;
  drivingLicense?: string;
};
