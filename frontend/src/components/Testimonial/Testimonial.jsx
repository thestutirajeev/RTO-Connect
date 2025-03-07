import React from 'react'
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import userAvatar from '../../assets/images/user-avatar.png';
import { HiStar } from 'react-icons/hi';

const Testimonial = () => {
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
        <SwiperSlide>
          <div className='py-[30px] px-5 rounded-3'>
            <div className='flex items-center gap-[13px]'>
              <img src={userAvatar} alt='User Avatar' />
              <div>
                <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor'>Rahul Verma</h4>
                <div className='flex items-center gap-[2px]'>
                  {[...Array(5)].map((_, i) => (
                    <HiStar key={i} className='text-yellowColor w-[18px] h-5' />
                  ))}
                </div>
              </div>
            </div>
            <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>
              "The online RTO application process was super smooth. No long queues, no hassle! Highly recommended."
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className='py-[30px] px-5 rounded-3'>
            <div className='flex items-center gap-[13px]'>
              <img src={userAvatar} alt='User Avatar' />
              <div>
                <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor'>Suyash Iyer</h4>
                <div className='flex items-center gap-[2px]'>
                  {[...Array(5)].map((_, i) => (
                    <HiStar key={i} className='text-yellowColor w-[18px] h-5' />
                  ))}
                </div>
              </div>
            </div>
            <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>
              "I renewed my driving license online through this app. The process was quick and stress-free!"
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className='py-[30px] px-5 rounded-3'>
            <div className='flex items-center gap-[13px]'>
              <img src={userAvatar} alt='User Avatar' />
              <div>
                <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor'>Amit Sharma</h4>
                <div className='flex items-center gap-[2px]'>
                  {[...Array(5)].map((_, i) => (
                    <HiStar key={i} className='text-yellowColor w-[18px] h-5' />
                  ))}
                </div>
              </div>
            </div>
            <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>
              "I was able to check my vehicle registration status easily. No need to visit the RTO office!"
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className='py-[30px] px-5 rounded-3'>
            <div className='flex items-center gap-[13px]'>
              <img src={userAvatar} alt='User Avatar' />
              <div>
                <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor'>Prateek Nair</h4>
                <div className='flex items-center gap-[2px]'>
                  {[...Array(5)].map((_, i) => (
                    <HiStar key={i} className='text-yellowColor w-[18px] h-5' />
                  ))}
                </div>
              </div>
            </div>
            <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>
              "Applied for my learner's license using this app. It saved me so much time!"
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className='py-[30px] px-5 rounded-3'>
            <div className='flex items-center gap-[13px]'>
              <img src={userAvatar} alt='User Avatar' />
              <div>
                <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor'>Arjun Mehta</h4>
                <div className='flex items-center gap-[2px]'>
                  {[...Array(5)].map((_, i) => (
                    <HiStar key={i} className='text-yellowColor w-[18px] h-5' />
                  ))}
                </div>
              </div>
            </div>
            <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>
              "The RTO fee calculator feature is very helpful. I knew exactly what to pay for my registration."
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Testimonial;
