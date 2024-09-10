import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  LineController,
} from "chart.js";
import { useGetUserBookingsQuery } from "@/redux/features/booking/bookingApi";
import { TBooking } from "@/types/TBooking";

// Register necessary elements for the line chart, including LineController
ChartJS.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const LineChart = () => {
  // Fetch user bookings
  const { data = {} } = useGetUserBookingsQuery(undefined);
  const { data: bookings = [] } = data;

  // Helper function to count bookings per month
  const getMonthlyBookings = () => {
    const months = Array(12).fill(0); // Initialize an array for 12 months

    bookings.forEach((booking:TBooking) => {
      const bookingDate = new Date(booking.createdAt);
      const month = bookingDate.getMonth(); // Get the month (0 = January, 11 = December)
      months[month] += 1; // Increment the count for the respective month
    });

    return months;
  };

  // Chart data
  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [
      {
        label: "Monthly Bookings",
        data: getMonthlyBookings(), // Dynamic data from bookings
        borderColor: "rgb(54, 162, 235)", // Line color
        backgroundColor: "rgba(54, 162, 235, 0.2)", // Fill under the line
        fill: true, // Fill area under the line
        tension: 0.4, // Smoothing for the line
      },
    ],
  };

  return (
    <div className="p-5">
      <Chart
        type="line"
        data={chartData}
        width={350} 
        height={350} 
        options={{
          responsive: true,
          maintainAspectRatio: false, 
          plugins: {
            legend: { position: "top" },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                },
              },
            },
          },
          scales: {
            x: {
              beginAtZero: true, // Ensure the x-axis starts at zero
            },
            y: {
              beginAtZero: true, // Ensure the y-axis starts at zero
            },
          },
        }}
      />
    </div>
  );
};

export default LineChart;
