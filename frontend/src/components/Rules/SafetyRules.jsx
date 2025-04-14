import { FaHardHat, FaCarCrash, FaShieldAlt, FaFireExtinguisher, FaFirstAid, FaHandsHelping } from "react-icons/fa";
import { motion } from "framer-motion";

const SafetyRules = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full relative shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 text-2xl hover:text-red-500"
        >
          ×
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-[#01B5C5] mb-4 text-center">
          Essential Safety Rules
        </h2>

        {/* Rules List */}
        <div className="space-y-4">
          {/* Rule 1 */}
          <div className="flex items-start space-x-3">
            <FaHardHat className="text-[#FEB60D] text-xl mt-1" />
            <div>
              <h4 className="font-semibold text-[#01B5C5]">Wear Protective Gear</h4>
              <p className="text-gray-700 text-sm">
                Always wear a helmet or seatbelt to protect yourself in case of accidents.
              </p>
            </div>
          </div>

          {/* Rule 2 */}
          <div className="flex items-start space-x-3">
            <FaCarCrash className="text-[#FEB60D] text-xl mt-1" />
            <div>
              <h4 className="font-semibold text-[#01B5C5]">Avoid Reckless Driving</h4>
              <p className="text-gray-700 text-sm">
                Maintain safe distances and avoid speeding or sudden maneuvers.
              </p>
            </div>
          </div>

          {/* Rule 3 */}
          <div className="flex items-start space-x-3">
            <FaShieldAlt className="text-[#FEB60D] text-xl mt-1" />
            <div>
              <h4 className="font-semibold text-[#01B5C5]">Follow Safety Protocols</h4>
              <p className="text-gray-700 text-sm">
                Adhere to traffic signs and road regulations to ensure everyone’s safety.
              </p>
            </div>
          </div>

          {/* Rule 4 */}
          <div className="flex items-start space-x-3">
            <FaFireExtinguisher className="text-[#FEB60D] text-xl mt-1" />
            <div>
              <h4 className="font-semibold text-[#01B5C5]">Equip Your Vehicle</h4>
              <p className="text-gray-700 text-sm">
                Keep a fire extinguisher and first-aid kit in your vehicle at all times.
              </p>
            </div>
          </div>

          {/* Rule 5 */}
          <div className="flex items-start space-x-3">
            <FaFirstAid className="text-[#FEB60D] text-xl mt-1" />
            <div>
              <h4 className="font-semibold text-[#01B5C5]">Learn Emergency Response</h4>
              <p className="text-gray-700 text-sm">
                Be prepared to administer basic first aid or call for help in emergencies.
              </p>
            </div>
          </div>

          {/* Rule 6 */}
          <div className="flex items-start space-x-3">
            <FaHandsHelping className="text-[#FEB60D] text-xl mt-1" />
            <div>
              <h4 className="font-semibold text-[#01B5C5]">Assist in Crisis Situations</h4>
              <p className="text-gray-700 text-sm">
                Help fellow drivers or pedestrians in case of accidents or breakdowns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SafetyRules;