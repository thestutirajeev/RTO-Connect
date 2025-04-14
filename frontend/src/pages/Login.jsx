import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { motion, AnimatePresence } from "framer-motion";
import heroBg from '../assets/images/hero-bg.png';


const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData);

      localStorage.setItem("token", res.token);
      localStorage.setItem("userId", res.user._id);
      localStorage.setItem("role", res.user.role);
      localStorage.setItem("email", res.user.email);
      localStorage.setItem("name", res.user.name);

      if (res.user.role === "user") {
        navigate("/user-home");
      } else {
        navigate("/admin-home");
      }
    } catch (error) {
      setMessage(error.message);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.4 }}
      className="px-5 lg:px-0 min-h-screen flex items-center justify-center"
      style={{
              backgroundImage: `url(${heroBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
    >
      <motion.div
        animate={shake ? { x: [-10, 10, -8, 8, 0] } : {}}
        className="w-full max-w-[500px] mx-auto rounded-lg shadow-lg p-8 bg-white/90 backdrop-blur-md"
      >
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[22px] font-bold text-center mb-8 text-[#01B5C5]"
        >
          Hello! <span className="text-[#FEB60D]">Welcome</span> Back 🎊
        </motion.h3>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
{/* Floating Email Input */}
<div className="relative mb-6">
  <input
    type="email"
    name="email"
    placeholder=" "
    value={formData.email}
    onChange={handleChange}
    required
    className="peer w-full border border-[#01B5C5] rounded-md bg-white py-3 px-4 text-gray-800 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#01B5C5]"
  />
  <label
    htmlFor="email"
    className="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-[#01B5C5] bg-white px-1"
  >
    Email
  </label>
</div>

{/* Floating Password Input */}
<div className="relative mb-6">
  <input
    type="password"
    name="password"
    placeholder=" "
    value={formData.password}
    onChange={handleChange}
    required
    className="peer w-full border border-[#01B5C5] rounded-md bg-white py-3 px-4 text-gray-800 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#01B5C5]"
  />
  <label
    htmlFor="password"
    className="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-[#01B5C5] bg-white px-1"
  >
    Password
  </label>
</div>

          {/* Submit Button */}
          <motion.div
            className="mt-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              type="submit"
              className="w-full bg-[#01B5C5] text-white text-[18px] font-semibold rounded-lg px-4 py-3 transition hover:bg-[#01a8b8]"
            >
              Login
            </button>
          </motion.div>

          <p className="mt-5 text-gray-600 text-center">
            Don&apos;t have an account?
            <Link to="/register" className="text-[#FEB60D] font-medium ml-1">
              Register
            </Link>
          </p>
        </motion.form>

        {/* Error Message */}
        <AnimatePresence>
          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-red-600 text-center mt-4"
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
};

export default Login;
