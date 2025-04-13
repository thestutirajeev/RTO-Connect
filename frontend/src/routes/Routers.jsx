import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact";
import Dashboard from "../pages/Dashboard";

import AdminHome from "../pages/Admin/AdminHome";
import VehicleList from "../pages/Admin/VehicleList";
import ViewApplication from "../pages/Admin/ViewApplication";
import UserList from "../pages/Admin/UserList";
import FeedbackList from "../components/Feedbacks/FeedbackList";
import ContactedQueriesList from "../pages/Admin/ContactedQueriesList"; 

import UserHome from "../pages/User/UserHome";
import VehicleRegistration from "../pages/User/VehicleRegistration";
import FitnessCheck from "../pages/User/FitnessCheck";
import DLTest from "../pages/User/DLTest";
import ApplicationForm from "../pages/User/ApplicationForm";
import ApplicationStatus from "../pages/User/ApplicationStatus";
import Feedback from "../pages/User/FeedbackForm";
import CardPaymentSuccess from "../components/Stripe/CardPaymentSuccess";

import { Routes, Route } from 'react-router-dom';

const Routers = () => {
  return <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Signup />} />
    <Route path="/contact" element={<Contact />} />

    <Route path="/dashboard" element={<Dashboard />} />

    {/* Admin Routes */}
    <Route path="/admin-home" element={<AdminHome />} />
    <Route path="/vehicle-list" element={<VehicleList />} />
    <Route path="/view-applications" element={<ViewApplication />} />
    <Route path="/user-list" element={<UserList />} />
    <Route path="/feedback-list" element={<FeedbackList />} />
    <Route path="/contacts-list" element={<ContactedQueriesList />} />

    {/* User Routes */}

    <Route path="/user-home" element={<UserHome />} />
    <Route path="/register-vehicle" element={<VehicleRegistration />} />
    <Route path="/fitness-check" element={<FitnessCheck />} />
    <Route path="/dl-test" element={<DLTest />} />
    <Route path="/apply-license" element={<ApplicationForm />} />
    <Route path="/application-status" element={<ApplicationStatus />} />
    <Route path="/feedback" element={<Feedback />} />
    <Route path="/card-success" element={<CardPaymentSuccess />} />
  </Routes>   
};

export default Routers;