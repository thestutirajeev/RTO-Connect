import Home from "../pages/Home";
import Services from "../pages/Services";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact";
import RTOOfficeList from "../components/RTOOffices/RTOOfficeList";
import Dashboard from "../pages/Dashboard";

import AdminHome from "../pages/Admin/AdminHome";
import VehicleList from "../pages/Admin/VehicleList";
import ViewApplication from "../pages/Admin/ViewApplication";
import UserList from "../pages/Admin/UserList";

import UserHome from "../pages/User/UserHome";
import VehicleRegistration from "../pages/User/VehicleRegistration";
import FitnessCheck from "../pages/User/FitnessCheck";
import DLTest from "../pages/User/DLTest";
import ApplicationForm from "../pages/User/ApplicationForm";
import ApplicationStatus from "../pages/User/ApplicationStatus";
import Feedback from "../pages/User/FeedbackForm";

import { Routes, Route } from 'react-router-dom';

const Routers = () => {
  return <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Signup />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/services" element={<Services />} />
    <Route path="/rto-offices" element={<RTOOfficeList />} />

    <Route path="/dashboard" element={<Dashboard />} />

    <Route path="/admin-home" element={<AdminHome />} />
    <Route path="/vehicle-list" element={<VehicleList />} />
    <Route path="/view-applications" element={<ViewApplication />} />
    <Route path="/user-list" element={<UserList />} />

    <Route path="/user-home" element={<UserHome />} />
    <Route path="/register-vehicle" element={<VehicleRegistration />} />
    <Route path="/fitness-check" element={<FitnessCheck />} />
    <Route path="/dl-test" element={<DLTest />} />
    <Route path="/apply-license" element={<ApplicationForm />} />
    <Route path="/application-status" element={<ApplicationStatus />} />
    <Route path="/feedback" element={<Feedback />} />
  </Routes>   
};

export default Routers;