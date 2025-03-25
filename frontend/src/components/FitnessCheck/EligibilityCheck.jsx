const EligibilityCheck = ({ vehicleData, setEligibility }) => {
    if (!vehicleData) return <p></p>;

    const currentYear = new Date().getFullYear();
    const vehicleAge = currentYear - vehicleData.year;

    // ✅ Convert Insurance Expiry Date to Boolean
    const today = new Date();
    const insuranceExpiryDate = new Date(vehicleData.insuranceExpiry);
    const insuranceValid = insuranceExpiryDate > today; // ✅ Correctly checks if insurance is valid

    // Sample eligibility check logic
    const checkEligibility = () => {
        const today = new Date();
        const insuranceExpiryDate = new Date(vehicleData.insuranceExpiry);
    
        if (insuranceExpiryDate < today || !vehicleData.pollutionValid) {
            setEligibility(false);
        } else {
            setEligibility(true);
        }
    };

    return (
        <div className="p-5 mt-5">
            <button onClick={checkEligibility} className="px-4 py-2 bg-blue-500 text-white rounded">
                Get Certificate
            </button>
        </div>
    );
};

export default EligibilityCheck;