import React, { useEffect, useState } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import userAvatar from '../../assets/images/user-avatar.png';
import { HiStar } from 'react-icons/hi';

const Reviews = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/contact/displayfeedbacks");
        const data = await res.json();
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <div className='mt-[30px] lg:mt-[55px]'>
      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 0 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
      >
        {feedbacks.slice(0, 5).map((feedback, index) => (
          <SwiperSlide key={index}>
            <div className='py-[30px] px-5 rounded-3'>
              <div className='flex items-center gap-[13px]'>
                <img src={userAvatar} alt='User Avatar' />
                <div>
                  <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor'>
                    {feedback.name}
                  </h4>
                  <div className='flex items-center gap-[2px]'>
                    {[...Array(feedback.rating)].map((_, i) => (
                      <HiStar key={i} className='text-yellowColor w-[18px] h-5' />
                    ))}
                  </div>
                </div>
              </div>
              <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>
                "{feedback.comment}"
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
