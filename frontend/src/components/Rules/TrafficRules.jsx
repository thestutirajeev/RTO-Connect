import { FaTrafficLight, FaCarSide, FaTachometerAlt, FaBan, FaMobileAlt, FaIdCard } from "react-icons/fa";
import { motion } from "framer-motion";

const TrafficRules = ({ onClose }) => {
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
          Essential Traffic Rules
        </h2>

        {/* Rules List */}
        <div className="space-y-4">
          {/* Rule 1 */}
          <div className="flex items-start space-x-3">
            <FaTrafficLight className="text-[#FEB60D] text-xl mt-1" />
            <div>
              <h4 className="font-semibold text-[#01B5C5]">Obey Traffic Signals</h4>
              <p className="text-gray-700 text-sm">
                Always adhere to traffic lights: red means stop, yellow means prepare to stop, and green means go.
              </p>
            </div>
          </div>

          {/* Rule 2 */}
          <div className="flex items-start space-x-3">
            <FaCarSide className="text-[#FEB60D] text-xl mt-1" />
            <div>
              <h4 className="font-semibold text-[#01B5C5]">Follow Lane Discipline</h4>
              <p className="text-gray-700 text-sm">
                Maintain your lane and use indicators when changing lanes or turning.
              </p>
            </div>
          </div>

          {/* Rule 3 */}
          <div className="flex items-start space-x-3">
            <FaTachometerAlt className="text-[#FEB60D] text-xl mt-1" />
            <div>
              <h4 className="font-semibold text-[#01B5C5]">Adhere to Speed Limits</h4>
              <p className="text-gray-700 text-sm">
                Respect speed limits set for different areas to ensure safety for all road users.
              </p>
            </div>
          </div>

          {/* Rule 4 */}
          <div className="flex items-start space-x-3">
            <FaBan className="text-[#FEB60D] text-xl mt-1" />
            <div>
              <h4 className="font-semibold text-[#01B5C5]">No Drunk Driving</h4>
              <p className="text-gray-700 text-sm">
                Driving under the influence is a serious offense and endangers lives.
              </p>
            </div>
          </div>

          {/* Rule 5 */}
          <div className="flex items-start space-x-3">
            <FaMobileAlt className="text-[#FEB60D] text-xl mt-1" />
            <div>
              <h4 className="font-semibold text-[#01B5C5]">Avoid Mobile Usage</h4>
              <p className="text-gray-700 text-sm">
                Do not use mobile phones while driving. If necessary, park safely before attending to calls.
              </p>
            </div>
          </div>

          {/* Rule 6 */}
          <div className="flex items-start space-x-3">
            <FaIdCard className="text-[#FEB60D] text-xl mt-1" />
            <div>
              <h4 className="font-semibold text-[#01B5C5]">Carry Necessary Documents</h4>
              <p className="text-gray-700 text-sm">
                Always have your driving license, vehicle registration, insurance, and PUC certificate while driving.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TrafficRules;
