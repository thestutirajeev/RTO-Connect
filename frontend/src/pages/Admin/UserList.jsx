import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState(""); // "" (all), "user", or "admin"

  // 🔐 Check if logged-in user is admin
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (!role || role !== "admin") {
      navigate("/login");
      return;
    }

    fetchUsers(); // Fetch users initially
  }, [navigate]);

  // Function to fetch users
  const fetchUsers = () => {
    fetch("http://localhost:5000/api/users/fetchusers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "role": localStorage.getItem("role"),
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  };

  // 🔥 Function to delete a user
  const deleteUser = (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    fetch(`http://localhost:5000/api/users/delete/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "role": localStorage.getItem("role"),
      },
    })
      .then((res) => {
        if (res.ok) {
          setUsers(users.filter((user) => user._id !== userId)); // Remove from UI
        } else {
          alert("Failed to delete user");
        }
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  // 🔍 Filter logic
  const filteredUsers = users.filter((user) => {
    const matchesSearch = Object.values(user)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesRole = filterRole ? user.role === filterRole : true;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Users</h2>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search by name, email, role..."
        className="border p-2 mb-4 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* 👥 Role Filter Buttons */}
      <div className="mb-4">
        <button
          onClick={() => setFilterRole("")}
          className={`px-4 py-2 rounded ${filterRole === "" ? "bg-gray-600 text-white" : "bg-gray-300"}`}
        >
          All
        </button>
        <button
          onClick={() => setFilterRole("user")}
          className={`px-4 py-2 ml-2 rounded ${filterRole === "user" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
        >
          Users
        </button>
        <button
          onClick={() => setFilterRole("admin")}
          className={`px-4 py-2 ml-2 rounded ${filterRole === "admin" ? "bg-red-600 text-white" : "bg-gray-300"}`}
        >
          Admins
        </button>
      </div>

      {/* 📋 User Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className={`border p-2 ${user.role === "admin" ? "text-red-600" : "text-blue-600"}`}>
                  {user.role}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
