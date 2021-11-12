
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/thumbs/thumbs.min.css"

import "./styles.css";


// import Swiper core and required modules
import SwiperCore, {
    Navigation, Thumbs
} from 'swiper/core';

// install Swiper modules
SwiperCore.use([Navigation, Thumbs]);


export default function ProductImage({list}) {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);


    return (
        <div className="productSwiper">

            <Swiper style={{ '--swiper-navigation-color': '#fff', '--swiper-pagination-color': '#fff' }} 
            spaceBetween={10} navigation={true} thumbs={{ swiper: thumbsSwiper }} className="myProductSwiper2">
            {
                list.map(i =>  <SwiperSlide key={i}>
                                    <img src={i} alt="img" />
                                </SwiperSlide>)
            }
                
               
            </Swiper>
            <Swiper onSwiper={setThumbsSwiper} spaceBetween={10} slidesPerView={4} freeMode={true} watchSlidesVisibility={true} watchSlidesProgress={true} className="myProductSwiper">
                 {
                list.map(i =>  <SwiperSlide key={i}>
                                    <img src={i} alt="img" />
                                </SwiperSlide>)
            }
     
            </Swiper>
        </div>
    )
}