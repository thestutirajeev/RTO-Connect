import React from "react";
import { useNavigate } from "react-router-dom";
import manageVehicle from "../assets/images/adminDashImage/manageVehicle.png";
import fitnessCheck from "../assets/images/adminDashImage/fitnessCheck.png";
import userManagement from "../assets/images/adminDashImage/userManagement.png";
import approvalRequest from "../assets/images/adminDashImage/approvalRequest.png";
import reports from "../assets/images/adminDashImage/reports.png";
import settings from "../assets/images/adminDashImage/settings.png";
const AdminHome = () => {
    const navigate = useNavigate();
    const sections = [
        {
            title: "Manage Vehicles",
            description: "Add, edit, or remove vehicle records from the system.",
            image: manageVehicle, 
            buttonText: "Manage Now",
            path: "/vehicle-list",
        },
        {
            title: "Check Fitness Certificates",
            description: "Review and approve vehicle fitness certificates.",
            image: fitnessCheck,
            buttonText: "Check Now",
            path: "/admin-home",
        },
        {
            title: "User Management",
            description: "View, add, or remove users and their permissions.",
            image: userManagement,
            buttonText: "Manage Users",
            path: "/admin-home",
        },
        {
            title: "Approval Requests", 
            description: "Approve or reject pending requests from users.",
            image: approvalRequest,
            buttonText: "View Requests",
            path: "/view-applications",
        },
        {
            title: "Reports & Analytics",
            description: "Generate and view detailed reports on vehicle data.",
            image: reports,
            buttonText: "View Reports",
            path: "/admin-home",
        },
        {
            title: "System Settings",
            description: "Configure system settings and preferences.",
            image: settings,
            buttonText: "Configure",
            path: "/admin-home",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-8">
            <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sections.map((section, index) => (
                    <div 
                        key={index} 
                        className="bg-white shadow-lg rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                        <img 
                            src={section.image} 
                            alt={section.title} 
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6 text-center">
                            <h2 className="text-2xl font-semibold text-gray-800">{section.title}</h2>
                            <p className="text-gray-600 mt-2">{section.description}</p>
                            <button 
                              className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-300 shadow-md"
                              onClick={() => navigate(section.path)} >                            
                                {section.buttonText}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminHome;