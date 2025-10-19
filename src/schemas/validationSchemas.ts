import { z } from "zod";

// Login Schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Register Schema
export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name is too long"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long")
    .regex(/^[0-9+\-\s()]+$/, "Invalid phone number format"),
  address: z.string().min(5, "Address must be at least 5 characters").max(200, "Address is too long"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Car Schema
export const carSchema = z.object({
  name: z.string().min(2, "Car name must be at least 2 characters").max(100, "Car name is too long"),
  description: z.string().min(10, "Description must be at least 10 characters").max(1000, "Description is too long"),
  color: z.string().min(2, "Color is required"),
  engineType: z.string().min(2, "Engine type is required"),
  status: z.enum(["available", "booked", "maintenance"]).default("available"),
  features: z.array(z.string()).min(1, "At least one feature is required"),
  pricePerHour: z.number().min(1, "Price must be greater than 0").max(10000, "Price is too high"),
  images: z.array(z.string().url("Invalid image URL")).min(1, "At least one image is required"),
  type: z.string().min(2, "Car type is required"),
  brand: z.string().min(2, "Brand is required"),
  model: z.string().min(2, "Model is required"),
  year: z.number()
    .min(1900, "Year must be after 1900")
    .max(new Date().getFullYear() + 1, "Invalid year"),
  fuelType: z.string().min(2, "Fuel type is required"),
  transmission: z.enum(["automatic", "manual"]),
  seatingCapacity: z.number().min(1, "Seating capacity must be at least 1").max(50, "Invalid seating capacity"),
  noOfDoors: z.number().min(2, "Number of doors must be at least 2").max(6, "Invalid number of doors"),
  currentLocation: z.string().optional(),
});

// Booking Schema
export const bookingSchema = z.object({
  date: z.string().min(1, "Date is required"),
  car: z.string().min(1, "Car selection is required"),
  startTime: z.string().min(1, "Start time is required"),
  pickupLocation: z.string().min(3, "Pickup location must be at least 3 characters"),
  destination: z.string().min(3, "Destination must be at least 3 characters"),
  bookedUserInfo: z.object({
    userName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    nid: z.string().min(5, "NID must be at least 5 characters"),
    drivingLicense: z.string().optional(),
  }),
  additionalFeatures: z.object({
    childSeat: z.boolean().optional().default(false),
    gps: z.boolean().optional().default(false),
    insurance: z.boolean().optional().default(false),
  }).optional(),
});

// User Update Schema
export const userUpdateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name is too long").optional(),
  phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long")
    .regex(/^[0-9+\-\s()]+$/, "Invalid phone number format")
    .optional(),
  address: z.string().min(5, "Address must be at least 5 characters").max(200, "Address is too long").optional(),
});

// Review Schema
export const reviewSchema = z.object({
  rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
  comment: z.string().min(10, "Comment must be at least 10 characters").max(500, "Comment is too long"),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
});

// Search/Filter Schema
export const carSearchSchema = z.object({
  searchTerm: z.string().optional(),
  type: z.string().optional(),
  brand: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  features: z.array(z.string()).optional(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
  sort: z.enum(["asc", "desc"]).optional(),
});

// Password Change Schema
export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type CarFormData = z.infer<typeof carSchema>;
export type BookingFormData = z.infer<typeof bookingSchema>;
export type UserUpdateFormData = z.infer<typeof userUpdateSchema>;
export type ReviewFormData = z.infer<typeof reviewSchema>;
export type CarSearchFormData = z.infer<typeof carSearchSchema>;
export type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>;
