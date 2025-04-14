import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiArrowRight } from "react-icons/fi";
import { FiTrash } from "react-icons/fi";

const ContactedQueriesList = () => {
  const [queries, setQueries] = useState([]);
  const [expandedQueryIds, setExpandedQueryIds] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/contact/contacts")
      .then((res) => {
        if (Array.isArray(res.data)) setQueries(res.data);
        else {
          console.error("Unexpected format:", res.data);
          setQueries([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching queries:", err);
      });
  }, []);

  const toggleExpand = (id) => {
    setExpandedQueryIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/contact/delete/${id}`);
      setQueries((prev) => prev.filter((q) => q._id !== id));
    } catch (err) {
      console.error("Error deleting query:", err);
    }
  };

  return (
    <div className="space-y-3">
      {queries.length === 0 ? (
        <p className="text-sm text-center text-gray-500">
          No contact queries found.
        </p>
      ) : (
        queries.map((query) => {
          const isExpanded = expandedQueryIds.includes(query._id);
          const message = query.message || "";
          const shortMessage =
            message.length > 100 && !isExpanded
              ? `${message.slice(0, 100)}...`
              : message;

          return (
            <div
              key={query._id}
              className="border border-gray-300 rounded-md px-4 py-3 bg-white shadow-sm"
            >
              <h3 className="text-sm font-semibold text-gray-800 mb-1">
                📧 Email:
                <span className="font-normal ml-1 text-gray-700 break-all">
                  {query.email}
                </span>
              </h3>
              <h4 className="text-sm font-semibold text-gray-800 mb-1">
                📝 Subject:
                <span className="font-normal ml-1 text-gray-700">
                  {query.subject}
                </span>
              </h4>
              <h4 className="text-sm font-semibold text-gray-800">
                📝 Message:
              </h4>
              <p className="text-sm text-gray-700 italic">
                “{shortMessage}”
                {message.length > 100 && (
                  <button
                    onClick={() => toggleExpand(query._id)}
                    className="ml-2 text-blue-500 text-xs underline"
                  >
                    {isExpanded ? "Show less" : "Show more"}
                  </button>
                )}
              </p>

              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-400">
                  🕒{" "}
                  {new Date(query.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <div className="flex gap-2">
                  <a
                    href={`mailto:${query.email}`}
                    className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200 transition"
                    title="Reply"
                  >
                    <FiArrowRight className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => handleDelete(query._id)}
                    className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition"
                    title="Delete"
                  >
                    <FiTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ContactedQueriesList;
