import { Link } from "react-router-dom";
import { FaTrafficLight, FaCarCrash, FaGavel, FaHandsHelping } from "react-icons/fa";
import { motion } from "framer-motion";
import TrafficRules from "../../components/Rules/TrafficRules";
import DrivingEtiqutes from "../../components/Rules/DrivingEtiqutes";
import SafetyRules from "../../components/Rules/SafetyRules";
import LegalRules from "../../components/Rules/LegalRules";
import { useState } from "react";

const RulesPage = () => {
  const [activeRule, setActiveRule] = useState(null);

  const ruleComponents = {
    traffic: <TrafficRules onClose={() => setActiveRule(null)} />,
    safety: <SafetyRules onClose={() => setActiveRule(null)} />,
    etiquette: <DrivingEtiqutes onClose={() => setActiveRule(null)} />,
    legal: <LegalRules onClose={() => setActiveRule(null)} />,
  };

  return (
    <section className="min-h-screen px-6 py-12 relative">
      <div className="max-w-6xl mx-auto text-center">
        {/* Hero Section */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold mb-4 text-[#01B5C5]"
        >
          Know the Rules Before You Drive
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-gray-700 max-w-xl mx-auto mb-10"
        >
          To pass your driving license test and stay safe on the roads, it's important
          to understand the key traffic laws and driving rules. Here's what you need to know!
        </motion.p>

        {/* Rules Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-[#FEB60D] cursor-pointer"
            onClick={() => setActiveRule("traffic")}
          >
            <FaTrafficLight className="text-4xl text-[#FEB60D] mx-auto mb-4" />
            <h3 className="font-semibold text-lg text-[#01B5C5] mb-2">Traffic Signs</h3>
            <p className="text-sm text-gray-600">
              Learn about regulatory, warning, and informatory signs – crucial for your test!
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-[#FEB60D] cursor-pointer"
            onClick={() => setActiveRule("safety")}
          >
            <FaCarCrash className="text-4xl text-[#FEB60D] mx-auto mb-4" />
            <h3 className="font-semibold text-lg text-[#01B5C5] mb-2">Safety Rules</h3>
            <p className="text-sm text-gray-600">
              Always wear your seatbelt, follow lane discipline, and avoid distractions.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-[#FEB60D] cursor-pointer"
            onClick={() => setActiveRule("etiquette")}
          >
            <FaHandsHelping className="text-4xl text-[#FEB60D] mx-auto mb-4" />
            <h3 className="font-semibold text-lg text-[#01B5C5] mb-2">Driving Etiquette</h3>
            <p className="text-sm text-gray-600">
              Respect other drivers, use indicators, and maintain safe distances.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-[#FEB60D] cursor-pointer"
            onClick={() => setActiveRule("legal")}
          >
            <FaGavel className="text-4xl text-[#FEB60D] mx-auto mb-4" />
            <h3 className="font-semibold text-lg text-[#01B5C5] mb-2">Legal Rules</h3>
            <p className="text-sm text-gray-600">
              Know the Motor Vehicle Act, penalties, license types, and when you’re legally eligible.
            </p>
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <Link
            to="/dl-test"
            className="inline-block bg-[#01B5C5] text-white px-8 py-3 rounded-full text-lg hover:bg-[#0195a5] transition"
          >
            Start DL Test
          </Link>
        </motion.div>
      </div>

      {/* Floating Rule Component */}
      {activeRule && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setActiveRule(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-2xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveRule(null)}
              className="absolute top-2 right-3 text-gray-600 text-xl hover:text-red-500"
            >
              ×
            </button>
            {ruleComponents[activeRule]}
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default RulesPage;