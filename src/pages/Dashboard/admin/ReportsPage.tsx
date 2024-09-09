import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import printJS from "print-js";
import { useGetAllBookingsQuery } from "@/redux/features/booking/bookingApi";
import dayjs from "dayjs"; 
import { TBooking } from "@/types/TBooking";
import { TChartData } from "@/types/TChartData";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ReportsPage = () => {
  const { data = {} } = useGetAllBookingsQuery(undefined);
  const { data: bookings = [] } = data;

  const [interval, setInterval] = useState<string>("daily");
  const [chartData, setChartData] = useState<TChartData>({
    labels: [],
    datasets: [
      {
        label: "Car Usage",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  // Process bookings data dynamically based on interval
  const processData = (interval: string) => {
    const groupedData: { [key: string]: number } = {};
    bookings.forEach((booking: TBooking) => {
      const date = dayjs(booking.date);
      let key: string;
      switch (interval) {
        case "daily":
          key = date.format("YYYY-MM-DD"); // Group by day
          break;
        case "weekly":
          key = date.format("YYYY-[W]WW"); // Group by week
          break;
        case "monthly":
          key = date.format("YYYY-MM"); // Group by month
          break;
        case "yearly":
          key = date.format("YYYY"); // Group by year
          break;
        default:
          key = date.format("YYYY-MM-DD");
      }
      if (!groupedData[key]) {
        groupedData[key] = 0;
      }
      groupedData[key]++;
    });

    const labels = Object.keys(groupedData);
    const data = Object.values(groupedData);

    setChartData({
      labels,
      datasets: [
        {
          label: "Car Usage",
          data,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    });
  };

  useEffect(() => {
    processData(interval);
  }, [bookings, interval]);

  const handleIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedInterval = e.target.value;
    setInterval(selectedInterval);
  };

  const handlePrintReport = () => {
    printJS({
      printable: "report",
      type: "html",
      header: "Report",
      style: "body { font-family: Arial, sans-serif; }",
      scanStyles: true,
    });
  };

  const options = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
  ];

  return (
    <div className="p-6 bg-gray-50 h-screen overflow-y-scroll">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Reports Card */}
        <Card className="shadow-lg ">
          <CardHeader>
            <CardTitle >Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Report Filters */}
              <div className="bg-white p-4 rounded-lg shadow flex flex-row items-center gap-5 justify-between">
                <h3 className="text-lg font-medium dark:text-black">Filter Reports</h3>
                <div className="flex items-center space-x-4">
                  <select
                    id="interval"
                    value={interval}
                    onChange={handleIntervalChange}
                    className="p-2 border rounded dark:text-black"
                  >
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Chart */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium">Car Usage Report</h3>
                <div className="mt-4">
                  <div id="report">
                    <Chart
                      type="bar"
                      data={chartData}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: { position: "top" as const },
                          tooltip: {
                            callbacks: {
                              label: function (tooltipItem) {
                                return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                              },
                            },
                          },
                        },
                      }}
                    />
                  </div>
                  <Button
                    onClick={handlePrintReport}
                    className="bg-green-500 text-white hover:bg-green-600 mt-4 dark:bg-green-500 dark:text-white dark:hover:bg-green-600"
                  >
                    Print Report
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;
