import { useState } from "react";
import VehicleForm from "../../components/FitnessCheck/VehicleForm";
import EligibilityCheck from "../../components/FitnessCheck/EligibilityCheck";
import Certificate from "../../components/FitnessCheck/Certificate";
import heroBg from '../../assets/images/hero-bg.png';

const FitnessCheck = () => {
    const [vehicleData, setVehicleData] = useState(null);
    const [eligibility, setEligibility] = useState(null);
    return (
        <div className="p-10 bg-white shadow-lg rounded-lg text-center" style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <h1 className="text-3xl font-semibold text-gray-700">Vehicle Fitness Check</h1>
            <VehicleForm onSubmit={setVehicleData} />
            <EligibilityCheck vehicleData={vehicleData} setEligibility={setEligibility} />
            <Certificate vehicleData={vehicleData} eligibility={eligibility} />
        </div>
    );
};

export default FitnessCheck;