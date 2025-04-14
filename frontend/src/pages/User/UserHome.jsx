import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BsArrowRight } from "react-icons/bs";
import heroBg from "../../assets/images/hero-bg.png";
import registerImg from "../../assets/images/dashImage/register.jpeg";
import fitnessImg from "../../assets/images/dashImage/fitness.jpeg";
import testImg from "../../assets/images/dashImage/test.jpeg";
import applyDLImg from "../../assets/images/dashImage/applyDL.jpeg";
import { useAlert } from "../../components/Alerts/AlertManager";
import { motion } from "framer-motion";

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
      color: "#01B5C5",
    },
    {
      title: "Get Vehicle Fitness Certificate",
      description:
        "Verify your vehicle's fitness and get the certificate by providing essential information like insurance and chassis number.",
      route: "/fitness-check",
      img: fitnessImg,
      color: "#FEB60D",
    },
    {
      title: "Driving License Test",
      description:
        "Take the online test to check your knowledge of road safety, rules, and traffic signs. Instant feedback included.",
      route: "/dl-test",
      img: testImg,
      color: "#01B5C5",
    },
    {
      title: "Apply For Driving License",
      description:
        "Submit your DL application with accurate test and personal details to proceed smoothly with the process.",
      route: "/apply-license",
      img: applyDLImg,
      color: "#FEB60D",
    },
  ];

  return (
    <div
      className="min-h-screen px-6 py-12"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl font-bold mb-8 text-center text-[#01B5C5]"
      >
        Welcome, {userName}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-gray-700 max-w-2xl mx-auto mb-10 text-center"
      >
        Access all the essential services related to your driving journey – from vehicle
        registration to getting your license – all in one place!
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * idx, duration: 0.5 }}
            className="flex md:flex-row flex-col bg-white border border-gray-200 shadow-lg rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all"
            onClick={() => {
              if (checkToken()) navigate(service.route);
            }}
          >
            {/* Image Section */}
            <div className="md:w-1/3 w-full bg-gray-100 flex items-center justify-center p-4">
              <img
                src={service.img}
                alt={service.title}
                className="w-full h-auto max-h-48 object-contain rounded-md"
              />
            </div>

            {/* Text Content */}
            <div className="flex-1 flex flex-col justify-between p-6">
              <div>
                <h2 className="text-xl font-semibold mb-2" style={{ color: service.color }}>
                  {service.title}
                </h2>
                <p className="text-gray-700 text-[15px]">{service.description}</p>
              </div>

              <div className="mt-6 flex justify-end">
                <span
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-white transition-all duration-300"
                  style={{
                    backgroundColor: service.color,
                  }}
                >
                  Proceed <BsArrowRight className="w-5 h-5" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UserHome;
