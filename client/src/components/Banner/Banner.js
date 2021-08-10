 
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"

import "./style.css";

import { makeStyles } from "@material-ui/core";
// import Swiper core and required modules
import SwiperCore, {
  Pagination, Autoplay
} from 'swiper/core';

// install Swiper modules
SwiperCore.use([Pagination, Autoplay]);
const useStyles = makeStyles((theme) => ({
    img : {
        height: '500px',
        width: '100%',
        objectFit: 'cover',
        [theme.breakpoints.down('sm')] : {
          height: '350px',
        },
        [theme.breakpoints.down('xs')] : {
          height: '250px',
        }
    }
}))

export default function Banner() {
  const classes = useStyles();
  
  
  return (
     
    <Swiper pagination={true} className="mySwiper" autoplay={{
  "delay": 2500,
  "disableOnInteraction": false
}}>
             <SwiperSlide><img alt="banner" src="./banner (1).jpg" className={classes.img}/></SwiperSlide>
            <SwiperSlide><img alt="banner" src="./banner (2).jpg" className={classes.img}/></SwiperSlide>
            <SwiperSlide><img alt="banner" src="./banner (3).jpg" className={classes.img}/></SwiperSlide>  </Swiper>
   
  )
}


