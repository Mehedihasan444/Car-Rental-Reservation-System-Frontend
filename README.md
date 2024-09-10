# Car Rental Reservation System

This project is a comprehensive **Car Rental Reservation System** built by vite with the help of **React**, **Redux Toolkit**, and **Chart.js**. The system allows users to browse cars, make bookings, view reports, and manage reservations. The admin can manage bookings, users, and generate visual reports.

## Features

- **User Authentication**: Registration and login system with role-based access (User/Admin).
- **Car Listings**: View available cars with filtering options by type, brand, price, etc.
- **Booking Management**: Users can book, view, and manage their car rentals.
- **Admin Dashboard**: Manage cars, bookings, and payments, with secure access via protected routes.
- **Reports and Analytics**: Visual reports of bookings, including charts like line and pie charts.
- **Dynamic Charts**: Using `Chart.js` to display booking trends and statistics.
- **Review System**: Customers can provide reviews on their rental experience.
- **FAQ Section**: Provides answers to frequently asked questions for users.

## Tech Stack

- **Frontend**: React, Tailwind CSS, ShadCN UI
- **State Management**: Redux Toolkit with `redux-persist` for authentication persistence
- **Charts**: Chart.js integrated with React via `react-chartjs-2`
- **Backend**: MongoDB (via Mongoose) and Express API (not included in this repo, replace with actual API).
- **Form Validation**: Zod for validation schemas
- **Authentication**: JWT-based authentication

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- npm or yarn package manager
- MongoDB server

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Mehedihasan444/Car-Rental-Reservation-System-Frontend.git

   ```

2. Navigate to the project directory:

   cd car-rental-reservation-system

3. Install dependencies:

   npm install

4. Set up environment variables:

   Create a .env.local file in the root of the project and include the following values:

   VITE_IMAGE_HOSTING_KEY= your imagebb key


5. Start the development server:

   npm run dev

   The app will be available at http://localhost:5173.

# Project Structure

    ├── public/

    ├── src/
    │ ├── components/ # Reusable UI components
    │ ├── features/ # Redux slices for bookings, cars, users, etc.
    │ ├── pages/ # Application pages (e.g., Home, Booking, Admin Dashboard)
    │ ├── utils/ # Helper functions and utilities
    │ └── types/ # TypeScript type definitions (e.g., TBooking, TUser)
    ├── .env.local # Environment variables
    ├── package.json # Project metadata and dependencies
    └── README.md # Project documentation
