import { services } from '../assets/data/services';
import ServiceCard from '../components/Services/ServiceCard';
import { motion } from 'framer-motion';

const Services = () => {
  return (
    <section className="min-h-screen px-6 py-12 bg-[#F9FAFB]">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold mb-4 text-[#01B5C5]"
        >
          Explore Our Services
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-gray-700 max-w-xl mx-auto mb-10"
        >
          Manage your vehicle and license details seamlessly. Choose a service to get started.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((item, index) => (
            <ServiceCard item={item} index={index} key={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
