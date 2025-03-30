import Home from "../pages/Home";
import Services from "../pages/Services";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact";
import RTOOfficeList from "../components/RTOOffices/RTOOfficeList";
import Doctors from "../pages/Doctors/Doctors";
import DoctorDetails from "../pages/Doctors/DoctorDetails";


import AdminHome from "../pages/Admin/AdminHome";
import VehicleList from "../pages/Admin/VehicleList";
import ViewApplication from "../pages/Admin/ViewApplication";

import UserHome from "../pages/User/UserHome";
import VehicleRegistration from "../pages/User/VehicleRegistration";
import FitnessCheck from "../pages/User/FitnessCheck";
import DLTest from "../pages/User/DLTest";
import ApplicationForm from "../pages/User/ApplicationForm";

import { Routes, Route } from 'react-router-dom';

const Routers = () => {
  return <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/apply-license" element={<Doctors />} />
    <Route path="/doctors/:id" element={<DoctorDetails />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Signup />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/services" element={<Services />} />
    <Route path="/rto-offices" element={<RTOOfficeList />} />


    <Route path="/admin-home" element={<AdminHome />} />
    <Route path="/vehicle-list" element={<VehicleList />} />
    <Route path="/view-applications" element={<ViewApplication />} />

    <Route path="/user-home" element={<UserHome />} />
    <Route path="/register-vehicle" element={<VehicleRegistration />} />
    <Route path="/fitness-check" element={<FitnessCheck />} />
    <Route path="/dl-test" element={<DLTest />} />
    <Route path="/apply-dllicense" element={<ApplicationForm />} />
  </Routes>   
};

export default Routers;