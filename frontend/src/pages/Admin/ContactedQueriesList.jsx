import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiArrowRight } from "react-icons/fi";
import heroBg from "../../assets/images/hero-bg.png";


const ContactedQueriesList = () => {
  const [queries, setQueries] = useState([]);

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

  return (
<div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 py-10 px-6 md:px-10"
style={{
    backgroundImage: `url(${heroBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}>
    <h1 className="text-3xl font-bold text-green-700 text-center mb-8">
      Contact Form Queries
    </h1>

    {queries.length === 0 ? (
      <p className="text-center text-gray-600">No contact queries found.</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {queries.map((query) => (
          <div
            key={query._id}
            className="border border-gray-300 rounded-lg p-5 bg-white shadow-md hover:shadow-lg transition flex flex-col justify-between"
          >
            <div className="flex-grow">
              <h3 className="text-base font-semibold text-gray-800 mb-1">
                📧 Email:
                <span className="font-normal ml-1 text-gray-700 break-all">{query.email}</span>
              </h3>
              <h4 className="text-base font-semibold text-gray-800 mb-1">
                📝 Subject:
                <span className="font-normal ml-1 text-gray-700">{query.subject}</span>
              </h4>
              <h4 className="text-base font-semibold text-gray-800 mb-1">
                📝 Message:
              </h4>
              <p className="text-base text-gray-700 mb-3 italic">
                “{query.message}”
              </p>
              <p className="text-sm text-gray-400">
                🕒{" "}
                {new Date(query.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* Open email client button */}
            <div className="mt-4 flex justify-end">
              <a
                href={`mailto:${query.email}`}
                className="w-9 h-9 rounded-full bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200 transition"
                title="Reply"
              >
                <FiArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    )}
</div>
  );
};

export default ContactedQueriesList;
