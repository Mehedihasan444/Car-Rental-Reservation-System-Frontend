import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Sample data for returned cars (replace with actual data from your API or state)
const returnedCars = [
  {
    id: 1,
    carName: "Tesla Model 3",
    returnDate: "2024-08-20",
    amountDue: 150,
  },
  {
    id: 2,
    carName: "Ford Mustang",
    returnDate: "2024-07-08",
    amountDue: 200,
  },
];

const PaymentManagement = () => {
  const [selectedCar, setSelectedCar] = useState<number | null>(null);
  const [amountPaid, setAmountPaid] = useState<number | "">("");

  const handlePay = (carId: number) => {
    console.log(`Pay for car with ID: ${carId}`);
    // Implement payment logic here
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Payment Management */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Payment Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {returnedCars.length > 0 ? (
                returnedCars.map((car) => (
                  <div
                    key={car.id}
                    className="border border-gray-200 p-4 rounded-lg"
                  >
                    <p className="text-sm font-semibold">Car Name: {car.carName}</p>
                    <p className="text-sm">Return Date: {car.returnDate}</p>
                    <p className="text-sm font-semibold text-red-500">
                      Amount Due: ${car.amountDue}
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => setSelectedCar(car.id)}
                    >
                      Pay Now
                    </Button>
                  </div>
                ))
              ) : (
                <p>No cars to process payment for.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Payment Form */}
        {selectedCar && (
          <Card className="shadow-lg mt-6">
            <CardHeader>
              <CardTitle>Process Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePay(selectedCar);
                }}
              >
                <div className="space-y-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="amountPaid">Amount Paid</Label>
                    <Input
                      id="amountPaid"
                      type="number"
                      value={amountPaid}
                      onChange={(e) => setAmountPaid(Number(e.target.value))}
                      placeholder="Enter amount"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={amountPaid <= 0}
                  >
                    Submit Payment
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PaymentManagement;
