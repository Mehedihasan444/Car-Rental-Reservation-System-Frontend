import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Chart } from "react-chartjs-2"; // For charting
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { printJS } from "print-js"; // For printing reports

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Sample data for reports
const reportData = {
  daily: [10, 20, 15, 25, 30],
  weekly: [70, 80, 90, 85, 100],
  monthly: [300, 350, 400, 450, 500],
  yearly: [4000, 4500, 5000, 5500, 6000]
};

const ReportsPage = () => {
  const [interval, setInterval] = useState<string>("daily");
  const [chartData, setChartData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Car Usage",
        data: reportData.daily,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1
      }
    ]
  });

  const handleIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedInterval = e.target.value;
    setInterval(selectedInterval);
    setChartData({
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [
        {
          label: "Car Usage",
          data: reportData[selectedInterval],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1
        }
      ]
    });
  };

  const handlePrintReport = () => {
    printJS({
      printable: 'report',
      type: 'html',
      header: 'Report',
      style: 'body { font-family: Arial, sans-serif; }',
      scanStyles: true,
    });
  };

  return (
    <div className="p-6 bg-gray-50 h-screen overflow-y-scroll">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Reports Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Report Filters */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium">Filter Reports</h3>
                <div className="mt-4 flex items-center space-x-4">
                  <Select
                    id="interval"
                    value={interval}
                    onChange={handleIntervalChange}
                    options={[
                      { value: "daily", label: "Daily" },
                      { value: "weekly", label: "Weekly" },
                      { value: "monthly", label: "Monthly" },
                      { value: "yearly", label: "Yearly" },
                    ]}
                    className="w-48"
                  />
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
                          legend: {
                            position: 'top' as const,
                          },
                          tooltip: {
                            callbacks: {
                              label: function(tooltipItem) {
                                return ` ${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                              }
                            }
                          }
                        }
                      }}
                    />
                  </div>
                  <Button
                    onClick={handlePrintReport}
                    className="bg-green-500 text-white hover:bg-green-600 mt-4"
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
