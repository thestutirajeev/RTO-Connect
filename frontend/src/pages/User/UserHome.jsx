import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BsArrowRight } from "react-icons/bs";
import heroBg from "../../assets/images/hero-bg.png";

// Add these image imports
import registerImg from "../../assets/images/dashImage/register.jpeg";
import fitnessImg from "../../assets/images/dashImage/fitness.jpeg";
import testImg from "../../assets/images/dashImage/test.jpeg";
import applyDLImg from "../../assets/images/dashImage/applyDL.jpeg";
import { useAlert } from "../../components/Alerts/AlertManager";

const UserHome = () => {
  const { showAlert } = useAlert();
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
      showAlert("failure", "Please log in first.");
      return false;
    }
  };

  const services = [
    {
      title: "Register Your Vehicle",
      description:
        "Register your vehicle with personal and vehicle details. Ensure everything is accurate for successful registration.",
      route: "/register-vehicle",
      img: registerImg,
      color: "green",
    },
    {
      title: "Get Vehicle Fitness Certificate",
      description:
        "Verify your vehicle's fitness and get the certificate by providing essential information like insurance and chassis number.",
      route: "/fitness-check",
      img: fitnessImg,
      color: "blue",
    },
    {
      title: "Driving License Test",
      description:
        "Take the online test to check your knowledge of road safety, rules, and traffic signs. Instant feedback included.",
      route: "/dl-test",
      img: testImg,
      color: "blue",
    },
    {
      title: "Apply For Driving License",
      description:
        "Submit your DL application with accurate test and personal details to proceed smoothly with the process.",
      route: "/apply-license",
      img: applyDLImg,
      color: "green",
    },
  ];

  return (
    <div
      className="min-h-screen p-4 md:p-10"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
        <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-10">
          Welcome, {userName}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <div
            key={idx}
            className="group flex md:flex-row flex-col bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:bg-blue-50 hover:shadow-xl cursor-pointer"
            onClick={() => {
              if (checkToken()) navigate(service.route);
            }}
          >
            {/* Left Image */}
            <div className="md:w-1/3 w-full h-full bg-gray-100 flex items-center justify-center p-4">
              <img
                src={service.img}
                alt={service.title}
                className="w-full h-auto max-h-48 object-contain"
              />
            </div>
          
            {/* Right Content */}
            <div className="flex-1 flex flex-col justify-between p-6">
              <div>
                <h2 className={`text-xl font-semibold text-${service.color}-600 mb-2`}>
                  {service.title}
                </h2>
                <p className="text-gray-700 text-[15px]">{service.description}</p>
              </div>
          
              {/* Arrow Link */}
              <div className="mt-6 flex items-center justify-end">
                <span
                  className={`flex items-center gap-2 text-${service.color}-600 group-hover:text-white bg-${service.color}-100 group-hover:bg-${service.color}-600 px-4 py-2 rounded-md transition-all duration-300`}
                >
                  Proceed <BsArrowRight className="w-5 h-5" />
                </span>
              </div>
            </div>
          </div>
          
          ))}
        </div>
    </div>
  );
};

export default UserHome;
