import React from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

import manageVehicle from "../../assets/images/adminDashImage/manageVehicle.png";
import fitnessCheck from "../../assets/images/adminDashImage/fitnessCheck.png";
import userManagement from "../../assets/images/adminDashImage/userManagement.png";
import approvalRequest from "../../assets/images/adminDashImage/approvalRequest.png";
import reports from "../../assets/images/adminDashImage/reports.png";
import settings from "../../assets/images/adminDashImage/settings.png";
import heroBg from "../../assets/images/hero-bg.png";

const AdminHome = () => {
  const navigate = useNavigate();

  const sections = 
  [
    {
      title: "Manage Vehicles",
      description: "Add, edit, or remove vehicle records from the system.",
      image: manageVehicle,
      path: "/vehicle-list",
      color: "green",
    },
    {
      title: "Read Feedbacks and Reviews",
      description: "View to user feedback, reviews, ratings and suggestions.",
      image: fitnessCheck,
      path: "/feedback-list",
      color: "blue",
    },
    {
      title: "User Management",
      description: "View, add, or remove users and their permissions.",
      image: userManagement,
      path: "/user-list",
      color: "green",
    },
    {
      title: "Approval Requests",
      description: "Approve or reject pending requests from users.",
      image: approvalRequest,
      path: "/view-applications",
      color: "blue",
    },
    {
      title: "Respond Contacted Queries",
      description: "Respond to user queries and provide assistance.",
      image: reports,
      path: "/contacts-list",
      color: "green",
    },
    {
      title: "System Settings",
      description: "Configure system settings and preferences.",
      image: settings,
      path: "/admin-home",
      color: "blue",
    },
  ];

  return (
    <div
      className="min-h-screen p-6 md:p-10"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white bg-opacity-80 backdrop-blur-md p-6 md:p-10 rounded-lg shadow-md"
        style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-10">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="group flex bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:bg-blue-50 hover:shadow-xl cursor-pointer"
              onClick={() => navigate(section.path)}
            >
              {/* Image on the left */}
              <div className="w-40 sm:w-44 md:w-48 bg-gray-100 overflow-hidden flex items-center justify-center">
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-full object-contain p-4"
                />
              </div>

              {/* Text Content */}
              <div className="flex-1 flex flex-col justify-between p-6">
                <div>
                  <h2
                    className={`text-xl font-semibold text-${section.color}-600 mb-2`}
                  >
                    {section.title}
                  </h2>
                  <p className="text-gray-700 text-[15px]">
                    {section.description}
                  </p>
                </div>

                {/* Proceed Arrow */}
                <div className="mt-6 flex items-center justify-end">
                  <span
                    className={`flex items-center gap-2 text-${section.color}-600 group-hover:text-white bg-${section.color}-100 group-hover:bg-${section.color}-600 px-4 py-2 rounded-md transition-all duration-300 font-medium`}
                  >
                    Proceed <BsArrowRight className="w-5 h-5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
