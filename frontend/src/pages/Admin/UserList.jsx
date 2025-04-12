import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa"; // ✅ Import trash icon

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (!role || role !== "admin") {
      navigate("/login");
      return;
    }
    fetchUsers();
  }, [navigate]);

  const fetchUsers = () => {
    fetch("http://localhost:5000/api/users/fetchusers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        role: localStorage.getItem("role"),
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  };

  const deleteUser = (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    fetch(`http://localhost:5000/api/users/delete/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        role: localStorage.getItem("role"),
      },
    })
      .then((res) => {
        if (res.ok) {
          setUsers(users.filter((user) => user._id !== userId));
        } else {
          alert("Failed to delete user");
        }
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = Object.values(user)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesRole = filterRole ? user.role === filterRole : true;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="text-xs">
      <input
        type="text"
        placeholder="Search by name, email, role..."
        className="border p-1 mb-2 w-full text-xs"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="mb-2 flex gap-2">
        <button
          onClick={() => setFilterRole("")}
          className={`px-2 py-1 rounded text-xs ${filterRole === "" ? "bg-gray-600 text-white" : "bg-gray-200"}`}
        >
          All
        </button>
        <button
          onClick={() => setFilterRole("user")}
          className={`px-2 py-1 rounded text-xs ${filterRole === "user" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Users
        </button>
        <button
          onClick={() => setFilterRole("admin")}
          className={`px-2 py-1 rounded text-xs ${filterRole === "admin" ? "bg-red-600 text-white" : "bg-gray-200"}`}
        >
          Admins
        </button>
      </div>

      <div className="overflow-x-auto no-scrollbar max-h-[280px] overflow-y-auto">
        <table className="w-full border-collapse border border-gray-300 text-xs">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-1">Name</th>
              <th className="border p-1">Email</th>
              <th className="border p-1">Role</th>
              <th className="border p-1">Del</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="border p-1">{user.name}</td>
                <td className="border p-1">{user.email}</td>
                <td className={`border p-1 ${user.role === "admin" ? "text-red-600" : "text-blue-600"}`}>
                  {user.role}
                </td>
                <td className="border p-1 text-center">
                  <button onClick={() => deleteUser(user._id)} className="text-red-600 hover:text-red-800">
                    <FaTrash size={12} />
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
