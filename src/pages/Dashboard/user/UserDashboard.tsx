import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGetUserBookingsQuery } from "@/redux/features/booking/bookingApi";
import { useGetUserQuery, useUpdateUserMutation } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { TBooking } from "@/types/TBooking";
import {  useState } from "react";

const UserDashboard = () => {
  const user = useAppSelector((state: RootState) => state?.auth?.user);
  // fetch user information
  const { data = {} } = useGetUserQuery(user?._id);
  const { data: userInfo } = data;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userInfo?.name || "",
    email: userInfo?.email || "",
    phone: userInfo?.phone || "",
    address: userInfo?.address || "",
  });
  // fetch user bookings
  const { data: bookings = {} } = useGetUserBookingsQuery(undefined);
  const { data: bookingHistory } = bookings;
  // update user information
  const [updateUser]=useUpdateUserMutation()


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave =async () => {
   const res = await updateUser({UserId:user?._id,...formData});
   console.log(res)
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: userInfo?.name || "",
      email: userInfo?.email || "",
      phone: userInfo?.phone || "",
      address: userInfo?.address || "",
    });
    setIsEditing(false);
  };


  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Personal Information */}
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row justify-between items-center ">
            <CardTitle>Personal Information</CardTitle>
            <div className="">
              {isEditing ? (
                ""
              ) : (
                <Button onClick={() => setIsEditing(true)}>Edit</Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold">Name:</p>
                {isEditing ? (
                  <Input
                    name="name"
                    value={formData?.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{formData?.name}</p>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold">Email:</p>
                {isEditing ? (
                  <Input
                    name="email"
                    type="email"
                    value={formData?.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{formData?.email}</p>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold">Phone:</p>
                {isEditing ? (
                  <Input
                    name="phone"
                    value={formData?.phone}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{formData.phone}</p>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold">Address:</p>
                {isEditing ? (
                  <Input
                    name="address"
                    value={formData?.address}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{formData?.address}</p>
                )}
              </div>
            </div>
            {isEditing ? (
              <div className="mt-4 flex gap-4">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save</Button>
              </div>
            ) : (
              ""
            )}
          </CardContent>
        </Card>
        {/* Booking History */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Booking History</CardTitle>
          </CardHeader>
          <CardContent>
            {bookingHistory?.length > 0 ? (
              <div className="space-y-4">
                {bookingHistory?.slice(0,5)?.map((booking: TBooking, index: number) => (
                  <div
                    key={index}
                    className="border border-gray-200 p-4 rounded-lg"
                  >
                    <p className="text-sm font-semibold">
                      Car Name: {booking?.car?.name}
                    </p>
                    <p className="text-sm">Booking Dates: {booking?.date}</p>
                    <p
                      className={`text-sm font-semibold ${
                        booking?.isBooked !== "unconfirmed"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      Status: {booking?.isBooked}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No booking history available.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
