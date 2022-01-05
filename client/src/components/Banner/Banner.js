
import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "swiper/components/pagination/pagination.min.css";
// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination } from 'swiper/core';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.min.css";
import BlackButton from "../BlackButton";
import "./style.css";



// install Swiper modules
SwiperCore.use([Pagination, Autoplay]);
const useStyles = makeStyles((theme) => ({
  title: {

  },
  imgContainerRight: {
    fontFamily: "Helvetica",
    height: '500px',
    width: '100%',
    objectFit: 'cover',
    [theme.breakpoints.down('sm')]: {
      height: '350px',
    },
    [theme.breakpoints.down('xs')]: {
      height: '250px',
    },
    "& h1": {
      [theme.breakpoints.up("md")]: {
        fontSize: '50px',
      },
    },
    display: "flex",
    justifyContent: 'flex-start',
    flexDirection: "row-reverse",
    alignItems: "center",
 
  },
  imgContainerCenter: {
    fontFamily: "Helvetica",
    height: '500px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      height: '350px',
    },
    [theme.breakpoints.down('xs')]: {
      height: '250px',
    },
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center",
    "& h1": {
      [theme.breakpoints.up("md")]: {
        fontSize: '50px',
      },
    },
  },
  link: {
    textDecoration: 'none',
    color: 'white'
},
}))

export default function Banner() {
  const classes = useStyles();


  return (

    <Swiper pagination={true} className="mySwiper" autoplay={{
      "delay": 2500,
      "disableOnInteraction": false
    }}>

      <SwiperSlide>
        <Box className={classes.imgContainerRight} style={{ backgroundImage: "url('./banner (1).jpg')" }}>
          <Box textAlign="center" mr={5}>
            <h1>Our New Collection</h1>
            <h3>Sale up to 50% off</h3>
            <Link to="/shop" className={classes.link}>
            <BlackButton>Shop Now</BlackButton>
            </Link>
          
          </Box>
        </Box>
      </SwiperSlide>
      <SwiperSlide>
        <Box className={classes.imgContainerCenter} style={{ backgroundImage: "url('./banner (4).jpg')", backgroundSize: "cover", }}>
          <Box textAlign="center">
            <h1>Fashion and Show</h1>
            <h3>A World Fashion and Trendy Fashion Clother's </h3>
            <Link to="/shop" className={classes.link}>
            <BlackButton>Shop Now</BlackButton>
            </Link>
          </Box>
        </Box>
      </SwiperSlide>
    </Swiper>

  )
}


