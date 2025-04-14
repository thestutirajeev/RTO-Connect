import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Services from "../pages/Services";
import Contact from "../pages/Contact";
import Dashboard from "../pages/Dashboard";

import AdminHome from "../pages/Admin/AdminHome";

import UserHome from "../pages/User/UserHome";
import VehicleRegistration from "../pages/User/VehicleRegistration";
import FitnessCheck from "../pages/User/FitnessCheck";
import DLTest from "../pages/User/DLTest";
import ApplicationForm from "../pages/User/ApplicationForm";
import ApplicationStatus from "../pages/User/ApplicationStatus";
import Feedback from "../pages/User/FeedbackForm";
import CardPaymentSuccess from "../components/Stripe/CardPaymentSuccess";
import TrafficRules from "../pages/User/RulesPage";

import { Routes, Route } from 'react-router-dom';

const Routers = () => {
  return <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Signup />} />
    <Route path="/services" element={<Services/>}/>
    <Route path="/contact" element={<Contact />} />

    <Route path="/dashboard" element={<Dashboard />} />

    {/* Admin Routes */}
    <Route path="/admin-home" element={<AdminHome />} />
  
    {/* User Routes */}

    <Route path="/user-home" element={<UserHome />} />
    <Route path="/register-vehicle" element={<VehicleRegistration />} />
    <Route path="/fitness-check" element={<FitnessCheck />} />
    <Route path="/dl-test" element={<DLTest />} />
    <Route path="/apply-license" element={<ApplicationForm />} />
    <Route path="/application-status" element={<ApplicationStatus />} />
    <Route path="/feedback" element={<Feedback />} />
    <Route path="/card-success" element={<CardPaymentSuccess />} />
    <Route path="/rules" element={<TrafficRules />} />

    {/* Catch-all route */}
    <Route path="*" element={<h1>404 Not Found</h1>} />
  </Routes>   
};

export default Routers;