import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import heroBg from '../assets/images/hero-bg.png';
import { useAlert } from "../components/Alerts/AlertManager";
import { motion } from "framer-motion";

const Contact = () => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", subject: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/contact/contact", formData);
      showAlert("success", "Query submitted successfully!");
      setFormData({ email: "", subject: "", message: "" });
      navigate("/");
    } catch (error) {
      console.error("Error submitting query:", error);
      showAlert("failure", "Failed to submit query.");
    }
  };

  return (
    <section
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="py-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="px-4 mx-auto max-w-screen-md bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-xl p-8"
      >
        <h2 className="heading text-center text-[#01B5C5]">Contact Us</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text__para text-gray-700">
          Got a technical issue? Want to send feedback about a beta feature? Let us know.
        </p>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="form__label">Your Email</label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              className="form__input mt-1 focus:shadow-md focus:outline-none focus:ring-2 focus:ring-[#01B5C5] transition"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="subject" className="form__label">Subject</label>
            <input
              type="text"
              id="subject"
              placeholder="Let us know how we can help you"
              className="form__input mt-1 focus:shadow-md focus:outline-none focus:ring-2 focus:ring-[#01B5C5] transition"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="form__label">Message</label>
            <textarea
              rows="6"
              id="message"
              placeholder="Leave a comment..."
              className="form__input mt-1 focus:shadow-md focus:outline-none focus:ring-2 focus:ring-[#01B5C5] transition"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            type="submit"
            className="btn rounded sm:w-fit bg-[#01B5C5] text-white px-6 py-3 font-semibold transition-all hover:brightness-110"
          >
            Submit
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
