import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface AutoSliderProps {
  children: React.ReactNode[];
  autoplayDelay?: number;
  slidesPerView?: number | 'auto' | { [key: number]: number };
  spaceBetween?: number;
  loop?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
  className?: string;
}

const AutoSlider: React.FC<AutoSliderProps> = ({
  children,
  autoplayDelay = 3000,
  slidesPerView = 1,
  spaceBetween = 20,
  loop = true,
  showNavigation = true,
  showPagination = true,
  className = ''
}) => {
  return (
    <div className={`auto-slider ${className}`}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        loop={loop}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        navigation={showNavigation}
        pagination={showPagination ? { clickable: true } : false}
        breakpoints={typeof slidesPerView === 'object' && slidesPerView !== null ? 
          Object.entries(slidesPerView).reduce((acc, [key, value]) => {
            acc[parseInt(key)] = { slidesPerView: value, spaceBetween };
            return acc;
          }, {} as { [key: number]: { slidesPerView: number; spaceBetween: number } }) : 
          {
            320: {
              slidesPerView: 1,
              spaceBetween: 10
            },
            640: {
              slidesPerView: typeof slidesPerView === 'number' ? Math.min(slidesPerView, 2) : 2,
              spaceBetween: 15
            },
            768: {
              slidesPerView: typeof slidesPerView === 'number' ? Math.min(slidesPerView, 3) : 3,
              spaceBetween: 20
            },
            1024: {
              slidesPerView: typeof slidesPerView === 'number' ? Math.min(slidesPerView, 4) : 4,
              spaceBetween: 25
            },
            1280: {
              slidesPerView: typeof slidesPerView === 'number' ? slidesPerView : 'auto',
              spaceBetween: spaceBetween
            }
          }
        }
        className="w-full"
      >
        {children.map((child, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
      
      <style jsx>{`
        .auto-slider {
          position: relative;
        }
        
        .auto-slider .swiper-button-next,
        .auto-slider .swiper-button-prev {
          color: #3b82f6;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          margin-top: -20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }
        
        .auto-slider .swiper-button-next:hover,
        .auto-slider .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 1);
          transform: scale(1.1);
        }
        
        .auto-slider .swiper-button-next::after,
        .auto-slider .swiper-button-prev::after {
          font-size: 16px;
          font-weight: bold;
        }
        
        .auto-slider .swiper-pagination-bullet {
          background: #3b82f6;
          opacity: 0.5;
          transition: all 0.3s ease;
        }
        
        .auto-slider .swiper-pagination-bullet-active {
          opacity: 1;
          transform: scale(1.2);
        }
        
        .auto-slider .swiper-slide {
          height: auto;
          display: flex;
          align-items: stretch;
        }
        
        @media (max-width: 640px) {
          .auto-slider .swiper-button-next,
          .auto-slider .swiper-button-prev {
            width: 35px;
            height: 35px;
            margin-top: -17.5px;
          }
          
          .auto-slider .swiper-button-next::after,
          .auto-slider .swiper-button-prev::after {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default AutoSlider;