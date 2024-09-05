import { Chart } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useGetAllBookingsQuery } from "@/redux/features/booking/bookingApi"; // Adjust import based on your setup
import { TBooking } from "@/types/TBooking";

// Register necessary elements for pie chart
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  // Fetch user bookings
  const { data = {} } = useGetAllBookingsQuery(undefined);
  const { data: bookings = [] } = data;

  // Calculate total bookings, canceled and returned rates
  const totalBookings = bookings.length;
  const canceledBookings = bookings.filter((booking:TBooking) => booking.isBooked === "canceled").length;
  const returnedBookings = bookings.filter((booking:TBooking) => booking.isBooked === "returned").length;

  // Prepare data for the chart
  const chartData = {
    labels: ["Canceled Bookings", "Returned Bookings", "Other Bookings"],
    datasets: [
      {
        label: "Booking Status",
        data: [
          canceledBookings, 
          returnedBookings, 
          totalBookings - (canceledBookings + returnedBookings) // Other bookings
        ],
        backgroundColor: [
          "rgb(255, 99, 132)", // Canceled
          "rgb(54, 162, 235)", // Returned
          "rgb(255, 205, 86)", // Other
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="p-5">
      <Chart
        type="pie"
        data={chartData}
        width={350} // Set width of the chart
        height={350} // Set height of the chart
        options={{
          responsive: true,
          maintainAspectRatio: false, // Allows custom width/height
          plugins: {
            legend: { position: "top" },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  const datasetLabel = tooltipItem.dataset.label || "";
                  const value = tooltipItem.raw;
                  return `${datasetLabel}: ${value}`;
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default PieChart;
