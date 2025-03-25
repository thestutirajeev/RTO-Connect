import React from 'react';
import { Link } from 'react-router-dom';
import aboutImg from '../../assets/images/about.png';
import aboutCardImg from '../../assets/images/about-card.png';

const About = () => {
  return (
    <section>
      <div className="container">
        <div className="flex jusify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
          {/* ===== about img ===== */}
          <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
            <img src={aboutImg} alt="AboutImg" />
            <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%] rounded-[50px]">
              <img src={aboutCardImg} alt="AboutCardImg" />
            </div>
          </div>

          
          {/* ===== about content ===== */}
          <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
            <h2 className="heading">
              Proud to Revolutionize RTO Services
            </h2>
            <p className="text__para">
              For years, we have been committed to transforming RTO operations with innovation and efficiency.
              RTO Connect is designed to streamline services, making vehicle registration, licensing, and 
              compliance faster and more accessible than ever.

            </p>  
            

            <p className="text__para mt-[30px]">         
              Our mission is to enhance user experience, not just by reflecting on what we've achieved, but by 
              constantly improving for the future. We strive to provide seamless, paperless, and hassle-free RTO 
              services—because efficiency is what drives us forward.
            </p>
            
            <Link to="/services">
              <button className="btn">Learn More</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About