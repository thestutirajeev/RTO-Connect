import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //Calling the login function from authService
      const res = await login(formData);

      localStorage.setItem("token", res.token);
      localStorage.setItem("userId", res.user._id);
      console.log("User ID:", res.user._id); // Debugging line
      localStorage.setItem("role", res.user.role);
      localStorage.setItem("email", res.user.email);
      localStorage.setItem("name", res.user.name);
      
      // Redirect user based on role
        if (res.user.role === "user") {
            navigate("/user-home");
        } else {
            navigate("/admin-home");
        }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <motion.section 
     initial={{opacity: 0, y: 30}}
      animate={{opacity: 1, y: 0}}
      exit={{opacity: 0, y: 30}}
      transition={{duration: 0.4}}
      className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
      <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }} className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Hello! <span className="text-primaryColor">Welcome</span> Back 🎊
        </motion.h3>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="py-4 md:py-0">
          <div className="mb-5">
            <input 
              type="email" 
              placeholder="Enter your Email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange}
              className="w-full  py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer"
              required 
            />
          </div>

          <div className="mb-5">
            <input 
              type="password" 
              placeholder="Password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange}
              className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer"
              required 
            />
          </div>

          {/* Submit Button */}
          <motion.div
            className="mt-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              type="submit"
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
            >
              Login
            </button>
          </motion.div>

          <p className="mt-5 text-textColor text-center">
            Don&apos;t have an account? <Link to='/register' className="text-primaryColor font-medium ml-1">Register</Link>
          </p>
        </motion.form>
        {message && <p>{message}</p>}
      </div>
    </motion.section>
  )
};

export default Login;