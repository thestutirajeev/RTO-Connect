import React from "react";
import { FaChartPie } from "react-icons/fa"; // Placeholder for pie charts
import Stats from "../../components/Stats/Stats";
import ViewApplication from "../../components/Admin/ViewApplication";
import VehicleList from "../../components/Admin/VehicleList";
import ContactedQueriesList from "../../components/Admin/ContactedQueriesList";
import FeedbackList from "../../components/Feedbacks/FeedbackList";
import UserList from "../../components/Admin/UserList";
const Card = ({ title, children }) => (
  <div className="bg-white shadow-md rounded-lg p-4 h-[260px] overflow-auto no-scrollbar">
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    {children}
  </div>
);

const AdminDash = () => {
  return (
    <>
      {/* 👇 Global styles to hide scrollbar but keep scroll functionality */}
      <style>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>

      <div className="min-h-screen bg-gray-100 px-4 py-4 space-y-4">
        {" "}
        {/* reduced padding and spacing */}
        {/* Layer 1 - Pie Charts */}
        <div className="flex flex-col lg:flex-row gap-4 mb-4 space-y-2">
          {" "}
          {/* added specific margin-bottom */}
          <div className="lg:w-[100%] w-full">
            <Stats />
          </div>
        </div>
        {/* Layer 2 - ViewApplication (30%) & VehicleList (40%) & FeedbackList (30%) */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="lg:w-[30%] w-full">
            <Card title="View Applications">
              <ViewApplication />
            </Card>
          </div>
          <div className="lg:w-[40%] w-full">
            <Card title="Vehicle List">
              <VehicleList />
            </Card>
          </div>
          <div className="lg:w-[30%] w-full">
            <Card title="Feedbacks">
              <FeedbackList />
            </Card>
          </div>
        </div>
        {/* Layer 3 - ContactedQueriesList (70%) & User List (30%) */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="lg:w-[70%] w-full">
            <Card title="Contacted Queries">
              <ContactedQueriesList />
            </Card>
          </div>
          <div className="lg:w-[30%] w-full">
            <Card title="User List">
              <UserList />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDash;
