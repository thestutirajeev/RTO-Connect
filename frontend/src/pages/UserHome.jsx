import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const UserHome = () => {
  const [userName, setUserName] = useState("User");
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      setUserName(name);
    }
  }, []);

  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      return true;
    } else {
      alert("Please log in first.");
      return false;
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-10">
  <h1 className="text-4xl font-bold text-blue-600 mb-12 text-center">Welcome, User</h1>
  
  {/* Vehicle Registration */}
  <div className="flex flex-row items-center w-full mb-8">
    <div className="w-1/2 pr-4">
      <h2 className="text-2xl font-semibold text-green-600 mb-4">Register Your Vehicle</h2>
      <p className="text-gray-700 text-lg">
        Click this button to register your vehicle in the system and ensure all necessary details are filled out accurately. The form requires your personal details, such as name, email, address, and Aadhar number, along with your vehicle information, including manufacturer, model, type, fuel type, engine and chassis numbers, and registration specifics like start and end dates. The form is structured for clarity, making the process seamless. Ensure the information entered is correct, as this data is essential for maintaining accurate vehicle records and successfully completing the registration process.
      </p>
    </div>
    <div className="w-1/2 pl-4">
      <button
        className="px-6 py-2 text-white bg-green-500 hover:bg-green-600 rounded shadow w-full"
        onClick={() => {
          if (checkToken()) navigate("/register-vehicle");
        }}
      >
        Register Vehicle
      </button>
    </div>
  </div>
  
  {/* Fitness Certificate */}
  <div className="flex flex-row items-center w-full mb-8">
    <div className="w-1/2 pl-4 order-last">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">Get Vehicle Fitness Certificate</h2>
      <p className="text-gray-700 text-lg">
        Click this button to check your vehicle's fitness status and generate its fitness certificate seamlessly. The form requires essential details about your vehicle, such as registration number, chassis and engine numbers, model, manufactured year, vehicle type, fuel type, and emission level. Additionally, you'll need to provide details about the pollution certificate validity and insurance expiry date. This page is designed to simplify the fitness verification process with clear instructions and dropdown menus for selection. Make sure all the information entered is accurate for a smooth evaluation experience.
      </p>
    </div>
    <div className="w-1/2 pr-4 order-first">
      <button
        className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded shadow w-full"
        onClick={() => {
          if (checkToken()) navigate("/fitness-check");
        }}
      >
        Get Vehicle Fitness Certificate
      </button>
    </div>
  </div>

  {/* Driving License Test */}
  <div className="flex flex-row items-center w-full mb-8">
    <div className="w-1/2 pr-4">
      <h2 className="text-2xl font-semibold text-green-600 mb-4">Driving License Test</h2>
      <p className="text-gray-700 text-lg">
        Click this button to take Digital Driving License Test. The test is designed to evaluate your knowledge of traffic rules, road signs, and safe driving practices. The test consists of multiple-choice questions covering various topics, including traffic signals, road markings, speed limits, parking rules, and emergency procedures. The questions are structured to assess your understanding of road safety and traffic regulations, ensuring you're well-prepared to drive responsibly. The test is user-friendly and provides instant feedback on your performance, helping you identify areas for improvement.
      </p>
    </div>
    <div className="w-1/2 pl-4">
      <button
        className="px-6 py-2 text-white bg-green-500 hover:bg-green-600 rounded shadow w-full"
        onClick={() => {
          if (checkToken()) navigate("/dl-test");
        }}
      >
        Take Driving License Test
      </button>
    </div>
  </div>

    {/* Apply For DL */}
    <div className="flex flex-row items-center w-full mb-8">
    <div className="w-1/2 pl-4 order-last">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">Apply For DL</h2>
      <p className="text-gray-700 text-lg">
        Click this button to apply for a new Driving License. The application form requires your personal details, such as test date, Aadhar number, date of birth, and blood group. Ensure all fields are filled correctly to avoid any delays in the application process. The form is designed to capture essential information for processing your Driving License application efficiently. Make sure to review the details before submitting the form to ensure accuracy and completeness. Once submitted, you will receive a confirmation message, and your application will be processed accordingly
      </p>
    </div>
    <div className="w-1/2 pr-4 order-first">
      <button
        className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded shadow w-full"
        onClick={() => {
          if (checkToken()) navigate("/apply-dllicense");
        }}
      >
        Apply For Driving License
      </button>
    </div>
  </div>

  
</div>
  );
};

export default UserHome;
