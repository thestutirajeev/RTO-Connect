import { FaBalanceScale, FaClipboardList, FaGavel, FaMoneyCheckAlt, FaIdCard } from "react-icons/fa";
import { motion } from "framer-motion";

const LegalRules = ({ onClose }) => {
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
          Essential Legal Rules
        </h2>

        {/* Rules List */}
        <div className="space-y-4">
          {/* Rule 1 */}
          <div className="flex items-start space-x-3">
            <FaBalanceScale className="text-[#FEB60D] text-xl mt-1" />
            <div>
              <h4 className="font-semibold text-[#01B5C5]">Understand Traffic Laws</h4>
              <p className="text-gray-700 text-sm">
                Familiarize yourself with the Motor Vehicles Act and other traffic regulations.
              </p>
            </div>
          </div>

          {/* Rule 2 */}
          <div className="flex items-start space-x-3">
            <FaClipboardList className="text-[#FEB60D] text-xl mt-1" />
            <div>
              <h4 className="font-semibold text-[#01B5C5]">Know Your Responsibilities</h4>
              <p className="text-gray-700 text-sm">
                Learn the responsibilities of drivers, including adherence to legal driving practices.
              </p>
            </div>
          </div>

          {/* Rule 3 */}
          <div className="flex items-start space-x-3">
            <FaGavel className="text-[#FEB60D] text-xl mt-1" />
            <div>
              <h4 className="font-semibold text-[#01B5C5]">Fines & Penalties</h4>
              <p className="text-gray-700 text-sm">
                Stay informed about fines for traffic violations and the consequences of breaking laws.
              </p>
            </div>
          </div>

          {/* Rule 4 */}
          <div className="flex items-start space-x-3">
            <FaMoneyCheckAlt className="text-[#FEB60D] text-xl mt-1" />
            <div>
              <h4 className="font-semibold text-[#01B5C5]">Valid Insurance Policies</h4>
              <p className="text-gray-700 text-sm">
                Ensure your vehicle has valid insurance to avoid legal and financial complications.
              </p>
            </div>
          </div>

          {/* Rule 5 */}
          <div className="flex items-start space-x-3">
            <FaIdCard className="text-[#FEB60D] text-xl mt-1" />
            <div>
              <h4 className="font-semibold text-[#01B5C5]">Carry Required Documents</h4>
              <p className="text-gray-700 text-sm">
                Always keep your driving license, registration certificate, insurance, and PUC certificate handy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LegalRules;