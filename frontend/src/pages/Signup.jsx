import { useState } from 'react';

import signupImg from "../assets/images/signup.gif";
import avatar from "../assets/images/doctor-img01.png";
import { Link } from 'react-router-dom';
import { signup } from '../services/authService';
const Signup = () => {

  //const [selectedFile,setSelectedFile] = useState(null);
  //const [previewURL,setPreviewURL] = useState("");

  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    role: "user"
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //Calling the signup function from authService
      const res = await signup(formData);
      setMessage(res.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* ========== img box ========== */}
          <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <figure className="rounded-l-lg">
              <img src={signupImg} alt="signup" className="w-full rounded-l-lg" />
            </figure>
          </div>

          {/* ========== sign up form ========== */}
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an <span className="text-primaryColor">account</span>
            </h3>

            <form onSubmit={handleSubmit}>
              
              <div className="mb-5">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  name="name" 
                  onChange={handleChange}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                  required 
                />
              </div>

              <div className="mb-5">
                <input 
                  type="email" 
                  placeholder="Enter your Email" 
                  name="email" 
                  onChange={handleChange}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                  required 
                />
              </div>

              <div className="mb-5">
                <input 
                  type="password" 
                  placeholder="Password" 
                  name="password" 
                  onChange={handleChange} 
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                  required 
                />
              </div>

              <div className="mb-5 flex items-center justify-between">
                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Are you a:
                  <select 
                    name="role" 
                    value={formData.role}
                    onChange={handleChange}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </label>

              </div>

              <div className="mt-7">
                <button
                  type="submit"
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                >
                  Sign Up
                </button>
              </div>

              <p className="mt-5 text-textColor text-center">
                Already have an account? <Link to='/login' className="text-primaryColor font-medium ml-1">Login</Link>
              </p>

            </form>
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;