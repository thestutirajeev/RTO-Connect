import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import { motion } from 'framer-motion';

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ServiceCard = ({ item, index }) => {
  const { name, desc, bgColor, textColor, path } = item;

  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-md border-t-4 border-[#FEB60D] rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300"
    >
      <div>
        <h2 className="text-xl font-semibold text-[#01B5C5] mb-2">{name}</h2>
        <p className="text-gray-700 text-[15px]">{desc}</p>
      </div>

      <div className="flex items-center justify-between mt-6">
        <Link
          to={path}
          className="w-[44px] h-[44px] rounded-full border border-[#01B5C5] flex items-center justify-center group hover:bg-[#01B5C5] transition"
        >
          <BsArrowRight className="text-[#01B5C5] group-hover:text-white w-6 h-5" />
        </Link>
        <span
          className="w-[44px] h-[44px] flex items-center justify-center text-[18px] font-bold"
          style={{
            background: bgColor,
            color: textColor,
            borderRadius: '6px 0 0 6px',
          }}
        >
          {index + 1}
        </span>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
