// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_BASEURL || 'http://localhost:5000/api',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

// Booking Status
export const BOOKING_STATUS = {
  UNCONFIRMED: 'unconfirmed',
  CONFIRMED: 'confirmed',
  CANCELED: 'canceled',
  RETURNED: 'returned',
} as const;

// Payment Status
export const PAYMENT_STATUS = {
  PAID: 'paid',
  DUE: 'due',
  PENDING: 'pending',
  FAILED: 'failed',
} as const;

// Car Status
export const CAR_STATUS = {
  AVAILABLE: 'available',
  BOOKED: 'booked',
  MAINTENANCE: 'maintenance',
} as const;

// Car Types
export const CAR_TYPES = [
  'Sedan',
  'SUV',
  'Hatchback',
  'Coupe',
  'Convertible',
  'Van',
  'Truck',
  'Minivan',
  'Sports Car',
  'Luxury',
] as const;

// Fuel Types
export const FUEL_TYPES = [
  'Petrol',
  'Diesel',
  'Electric',
  'Hybrid',
  'CNG',
] as const;

// Transmission Types
export const TRANSMISSION_TYPES = [
  'Automatic',
  'Manual',
] as const;

// Car Brands
export const CAR_BRANDS = [
  'Toyota',
  'Honda',
  'Ford',
  'BMW',
  'Mercedes-Benz',
  'Audi',
  'Volkswagen',
  'Nissan',
  'Hyundai',
  'Kia',
  'Chevrolet',
  'Tesla',
  'Mazda',
  'Subaru',
  'Lexus',
  'Volvo',
  'Jaguar',
  'Land Rover',
  'Porsche',
  'Ferrari',
] as const;

// Car Features
export const CAR_FEATURES = [
  'Air Conditioning',
  'GPS Navigation',
  'Bluetooth',
  'Backup Camera',
  'Parking Sensors',
  'Cruise Control',
  'Leather Seats',
  'Sunroof',
  'Heated Seats',
  'USB Ports',
  'Child Safety Locks',
  'ABS',
  'Airbags',
  'Power Windows',
  'Central Locking',
  'Fog Lights',
  'Alloy Wheels',
  'Audio System',
] as const;

// User Status
export const USER_STATUS = {
  ACTIVE: 'active',
  BLOCKED: 'blocked',
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  DISPLAY_LONG: 'MMMM dd, yyyy hh:mm a',
  API: 'yyyy-MM-dd',
  TIME: 'HH:mm',
  TIME_12H: 'hh:mm a',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME: 'vite-ui-theme',
  CART: 'booking_cart',
  RECENT_SEARCHES: 'recent_searches',
} as const;

// Route Paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  CARS: '/cars',
  ABOUT: '/about',
  BOOKING: '/booking',
  CAR_DETAILS: (id: string) => `/details/${id}`,
  USER_DASHBOARD: '/dashboard/user',
  USER_BOOKINGS: '/dashboard/user/booking-management',
  USER_PAYMENTS: '/dashboard/user/payment-management',
  ADMIN_DASHBOARD: '/dashboard/admin',
  ADMIN_CARS: '/dashboard/admin/manage-cars',
  ADMIN_BOOKINGS: '/dashboard/admin/manage-bookings',
  ADMIN_RETURNS: '/dashboard/admin/manage-return-cars',
  ADMIN_USERS: '/dashboard/admin/user-management',
  ADMIN_REPORTS: '/dashboard/admin/reports',
} as const;

// Toast Configuration
export const TOAST_CONFIG = {
  SUCCESS_DURATION: 3000,
  ERROR_DURATION: 5000,
  INFO_DURATION: 4000,
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  PHONE_MIN_LENGTH: 10,
  PHONE_MAX_LENGTH: 15,
  ADDRESS_MIN_LENGTH: 5,
  ADDRESS_MAX_LENGTH: 200,
  DESCRIPTION_MIN_LENGTH: 10,
  DESCRIPTION_MAX_LENGTH: 1000,
  COMMENT_MIN_LENGTH: 10,
  COMMENT_MAX_LENGTH: 500,
  MIN_YEAR: 1900,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
} as const;

// Animation Durations (in ms)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  SESSION_EXPIRED: 'Your session has expired. Please login again.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  GENERIC_ERROR: 'An unexpected error occurred. Please try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful! Welcome back.',
  REGISTER_SUCCESS: 'Registration successful! Please login.',
  BOOKING_SUCCESS: 'Booking created successfully!',
  UPDATE_SUCCESS: 'Updated successfully!',
  DELETE_SUCCESS: 'Deleted successfully!',
  PAYMENT_SUCCESS: 'Payment completed successfully!',
} as const;
