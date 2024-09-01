import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select"; // Assume Select component for dropdown


// Define the type for User
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
}

const initialUsers: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    role: "admin",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    role: "customer",
  },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    role: "customer",
  },
];

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "customer" as "admin" | "customer",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddOrUpdateUser = () => {
    if (editUser) {
      // Update existing user
      setUsers(users.map((user) =>
        user.id === editUser.id
          ? { ...user, ...formData }
          : user
      ));
    //   toast.success("User updated successfully!");
    } else {
      // Add new user
      const newUser = {
        id: (users.length + 1).toString(),
        ...formData,
      };
      setUsers([...users, newUser]);
    //   toast.success("User added successfully!");
    }
    setFormData({ name: "", email: "", role: "customer" });
    setEditUser(null);
  };

  const handleEditUser = (user: User) => {
    setFormData({ name: user.name, email: user.email, role: user.role });
    setEditUser(user);
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
    // toast.success("User removed successfully!");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* User Management Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Add/Edit User Form */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium">{editUser ? "Edit User" : "Add User"}</h3>
                <div className="mt-4 space-y-4">
                  <div className="flex flex-col">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter name"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      id="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      options={[
                        { value: "admin", label: "Admin" },
                        { value: "customer", label: "Customer" },
                      ]}
                    />
                  </div>
                  <Button
                    onClick={handleAddOrUpdateUser}
                    className="bg-blue-500 text-white hover:bg-blue-600"
                  >
                    {editUser ? "Update User" : "Add User"}
                  </Button>
                </div>
              </div>

              {/* User List */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium">User List</h3>
                <table className="min-w-full divide-y divide-gray-200 mt-4">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                          <Button
                            onClick={() => handleEditUser(user)}
                            className="bg-yellow-500 text-white hover:bg-yellow-600"
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDeleteUser(user.id)}
                            className="bg-red-500 text-white hover:bg-red-600"
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserManagement;
