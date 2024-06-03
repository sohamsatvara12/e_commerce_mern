import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  EffectFade,
} from "swiper/modules";

import '../../css/slider.css';

function BannerSlider() {
  return (
    <div className="page-width">
      <Swiper
          modules={[Navigation, Pagination, Scrollbar, Autoplay, EffectFade]}
        spaceBetween={10}
        slidesPerView={3}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000 }}
        loop
        className="home-banner-slider mt-5"
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
  
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
      >
        <SwiperSlide><img src="/images/home-banner-slider/banner-1.webp" alt="" className="rounded-2xl w-screen" /></SwiperSlide>
        <SwiperSlide><img src="/images/home-banner-slider/banner-2.webp" alt="" className="rounded-2xl w-screen" /></SwiperSlide>
        <SwiperSlide><img src="/images/home-banner-slider/banner-3.webp" alt="" className="rounded-2xl w-screen" /></SwiperSlide>
        <SwiperSlide><img src="/images/home-banner-slider/banner-4.webp" alt="" className="rounded-2xl w-screen" /></SwiperSlide>
        <SwiperSlide><img src="/images/home-banner-slider/banner-5.webp" alt="" className="rounded-2xl w-screen" /></SwiperSlide>
        <SwiperSlide><img src="/images/home-banner-slider/banner-6.jpg" alt="" className="rounded-2xl w-screen" /></SwiperSlide>
        <SwiperSlide><img src="/images/home-banner-slider/banner-7.webp" alt="" className="rounded-2xl w-screen" /></SwiperSlide>
      </Swiper>
    </div>
  );
}

export default BannerSlider;
