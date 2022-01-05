
import { makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from 'react-router-dom';
import "swiper/components/pagination/pagination.min.css";
// import Swiper core and required modules
import SwiperCore, {
    Pagination
} from 'swiper/core';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.min.css";
import "../App.css";
 
// install Swiper modules
SwiperCore.use([Pagination]);

const useStyles = makeStyles((theme) => ({
    itemContainer : {
        height: '300px',
        width: '100%',
        objectFit: 'cover',
        [theme.breakpoints.down('sm')] : {
          height: '250px',
          width: '100%',
        },
        [theme.breakpoints.down('xs')] : {
          height: '200px',
          width: '100%',
        },
        position: 'relative',
 
        "&:hover $middle" : {
            opacity: 1
        },
        "&:hover $img" : {
            opacity: 0.3
        },
        position: "relative"
   
      },
    img : {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: ".5s ease",
        backfaceVisibility:" hidden",
        opacity: 1
    },
    middle : {
        transition: ".5s ease",
        opacity: 0,
        top:0,
        left: 0,
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      
      },
    text :{
        backgroundColor:"white",
        color: "black",
        fontSize: "14px",
        padding: "16px",
        textDecoration: 'none',
        fontFamily: "Roboto slab",
 
      },
    myswiper : {
        width: '80%',

    }
}))

export default function CategorySwiper({list}) {

    const classes = useStyles();


    return (
        <div className="categoryContainer">
            <Swiper slidesPerView={2} spaceBetween={0} breakpoints={{
                "440": {
                    "slidesPerView": 3,
                    "spaceBetween": 20
                },
                "640": {
                    "slidesPerView": 3,
                    "spaceBetween": 20
                },
                "768": {
                    "slidesPerView": 3,
                    "spaceBetween": 40
                },
                "1024": {
                    "slidesPerView": 4,
                    "spaceBetween": 20
                }
            }} className={classes.myswiper}>

                    {
                        list?.map(c => ( <SwiperSlide key={c.id}>
                                            <div className={classes.itemContainer}>
                                            <img alt="category" src={c.imgPath} className={classes.img} />
                                            <div className={classes.middle}>
                                            <Link  className={classes.text} to={`/shop?category=${c.id}`} >{c.name.toUpperCase()}</Link>
                                            </div>
                                            </div>           
                                        </SwiperSlide>
                        ))
                    }
          
          </Swiper>
        </div>
    )
}