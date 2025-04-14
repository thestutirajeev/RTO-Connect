import { FaHandshake, FaRoad, FaSmile, FaRegClock, FaStopCircle, FaRss } from "react-icons/fa";
import { motion } from "framer-motion";

const DrivingEtiquette = ({ onClose }) => {
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
          Essential Driving Etiquette
        </h2>

        {/* Etiquette List */}
        <div className="space-y-4">
          {/* Etiquette 1 */}
          <div className="flex items-start space-x-3">
            <FaHandshake className="text-[#FEB60D] text-xl mt-1" />
            <div>
              <h4 className="font-semibold text-[#01B5C5]">Be Polite and Respectful</h4>
              <p className="text-gray-700 text-sm">
                Show courtesy to other drivers, pedestrians, and cyclists by yielding the right of way and respecting space.
              </p>
            </div>
          </div>

          {/* Etiquette 2 */}
          <div className="flex items-start space-x-3">
            <FaRoad className="text-[#FEB60D] text-xl mt-1" />
            <div>
              <h4 className="font-semibold text-[#01B5C5]">Follow Lane Discipline</h4>
              <p className="text-gray-700 text-sm">
                Stay in your lane, avoid weaving through traffic, and use turn signals when changing lanes.
              </p>
            </div>
          </div>

          {/* Etiquette 3 */}
          <div className="flex items-start space-x-3">
            <FaSmile className="text-[#FEB60D] text-xl mt-1" />
            <div>
              <h4 className="font-semibold text-[#01B5C5]">Be Patient and Calm</h4>
              <p className="text-gray-700 text-sm">
                Avoid road rage and aggressive behavior. A calm mindset ensures safer and smoother driving.
              </p>
            </div>
          </div>

          {/* Etiquette 4 */}
          <div className="flex items-start space-x-3">
            <FaRegClock className="text-[#FEB60D] text-xl mt-1" />
            <div>
              <h4 className="font-semibold text-[#01B5C5]">Plan Your Time</h4>
              <p className="text-gray-700 text-sm">
                Leave early to avoid rushing. Punctuality reduces stress and prevents risky driving.
              </p>
            </div>
          </div>

          {/* Etiquette 5 */}
          <div className="flex items-start space-x-3">
            <FaStopCircle className="text-[#FEB60D] text-xl mt-1" />
            <div>
              <h4 className="font-semibold text-[#01B5C5]">Yield When Necessary</h4>
              <p className="text-gray-700 text-sm">
                Give way to emergency vehicles, pedestrians, and vehicles with the right of way.
              </p>
            </div>
          </div>

          {/* Etiquette 6 */}
          <div className="flex items-start space-x-3">
            <FaRss className="text-[#FEB60D] text-xl mt-1" />
            <div>
              <h4 className="font-semibold text-[#01B5C5]">Avoid Excessive Honking</h4>
              <p className="text-gray-700 text-sm">
                Use the horn sparingly and only to alert others to potential hazards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DrivingEtiquette;