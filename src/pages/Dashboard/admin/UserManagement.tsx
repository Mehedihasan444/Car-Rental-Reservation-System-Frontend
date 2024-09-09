import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "@/redux/features/user/userApi";
import { TUser } from "@/redux/features/auth/authSlice";
import { toast } from "@/components/ui/use-toast";

const UserManagement = () => {
  // fetch all users
  const { data = {} } = useGetAllUsersQuery(undefined);
  const { data: users } = data;
  // update user
  const [updateUser] = useUpdateUserMutation();
  // delete user
  const [deleteUser] = useDeleteUserMutation();
  const [editUser, setEditUser] = useState<TUser | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    _id: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleUpdateUser = async (id: string) => {
    if (editUser) {
      // Update existing user
      const newData = {
        UserId: id,
        role: formData?.role,
      };

      const res = await updateUser(newData);
      if (res.data.success) {
        toast({ description: "User updated successfully!" });
        setEditUser(null);
      }
    }
  };

  const handleEditUser = (user: TUser) => {
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      _id: user._id,
    });
    setEditUser(user);
  };

  const handleDeleteUser = async (id: string) => {
    const res = await deleteUser(id);
    if (res.data.success) {
      toast({ description: "User deleted successfully!" });
      setEditUser(null);
    }
  };
  const handleUserStatus = async (UserId: string, status: string) => {
    const newData = {
      UserId,
      status,
    };
    const res = await updateUser(newData);
    if (res?.data?.success) {
      toast({ description: "User status updated successfully!" });
      setEditUser(null);
    }
  };
  return (
    <div className="p-6 bg-gray-50 h-screen overflow-y-scroll">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* User Management Card */}
        <Card className="shadow-lg">
          <CardHeader className="flex justify-between items-center flex-row">
            <CardTitle>User Management</CardTitle>
            <Button
              onClick={() => setShowForm(!showForm)}
              className={`${!showForm ? "hidden" : ""}`}
            >
              Cancel
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Add/Edit User Form */}
              {showForm && (
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-medium">
                    {editUser ? "Edit User" : "Add User"}
                  </h3>
                  <div className="mt-4 space-y-4">
                    <div className="flex justify-between items-center gap-5">
                      <div className="flex flex-col w-full">
                        <Label htmlFor="name">Name</Label>
                        <p className="">{formData.name}</p>
                      </div>
                      <div className="flex flex-col w-full">
                        <Label htmlFor="email">Email</Label>

                        <p className="">{formData.email}</p>
                      </div>
                      <div className="flex flex-col w-full">
                        <Label htmlFor="role">Role</Label>
                        <select
                          id="role"
                          value={formData?.role}
                          onChange={handleInputChange}
                          className="p-2 border rounded"
                        >
                          <option value="admin">Admin</option>
                          <option value="user">User</option>
                        </select>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleUpdateUser(formData?._id)}
                      className="bg-blue-500 text-white hover:bg-blue-600"
                    >
                      Update User
                    </Button>
                  </div>
                </div>
              )}
              {/* User List */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium">User List</h3>
                <div className=" w-full overflow-x-scroll ">
                  <table className="min-w-full divide-y divide-gray-200 mt-4">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users?.map((user: TUser) => (
                        <tr key={user._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {user.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm  ">
                            <span className="bg-red-100 text-red-800 inline-flex px-3 py-1 text-xs font-medium leading-5 rounded-full">
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm ">
                            <span className="bg-green-100 text-green-800 inline-flex px-3 py-1 text-xs font-medium leading-5 rounded-full">
                              {user?.status || "N/A"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                            <Button
                              onClick={() => {
                                handleEditUser(user);
                                setShowForm(!showForm);
                              }}
                              className="bg-yellow-500 text-white hover:bg-yellow-600"
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={() => handleDeleteUser(user._id)}
                              className="bg-red-500 text-white hover:bg-red-600"
                              disabled={user?.isDeleted}
                            >
                              Delete
                            </Button>
                            <Button
                              variant={
                                user?.status === "active"
                                  ? "default"
                                  : "outline"
                              }
                              onClick={() =>
                                handleUserStatus(
                                  user._id,
                                  user?.status === "active"
                                    ? "blocked"
                                    : "active"
                                )
                              }
                            >
                              {user?.status === "active"
                                ? "Block"
                                : user?.status === "blocked"
                                ? "Active"
                                : ""}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserManagement;
