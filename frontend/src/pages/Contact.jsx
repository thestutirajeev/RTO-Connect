import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", subject: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/contact", formData);
      alert("Query submitted successfully!");
      setFormData({ email: "", subject: "", message: "" });
      navigate("/");
    } catch (error) {
      console.error("Error submitting query:", error);
      alert("Failed to submit query.");
    }
  };

  return (
    <section>
      <div className="px-4 mx-auto max-w-screen-md">
        <h2 className="heading text-center">Contact Us</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text__para">
          Got a technical issue? Want to send feedback about a beta feature? Let us know.
        </p>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="form__label">Your Email</label>
            <input type="email" id="email" placeholder="example@gmail.com" className="form__input mt-1" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="subject" className="form__label">Subject</label>
            <input type="text" id="subject" placeholder="Let us know how we can help you" className="form__input mt-1" value={formData.subject} onChange={handleChange} required />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="form__label">Message</label>
            <textarea rows="6" id="message" placeholder="Leave a comment..." className="form__input mt-1" value={formData.message} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn rounded sm:w-fit">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
