
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from 'react-router-dom';
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "../App.css";
 
import { makeStyles } from "@material-ui/core";

// import Swiper core and required modules
import SwiperCore, {
    Pagination
} from 'swiper/core';

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
        "&:hover $button" : {
            visibility: 'visible',
            animation: "$fadeIn .3s ease-in-out"
        },
        "&:hover" : {
            backgroundColor: "rgba(0,0,0,0.5)"
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center' 
    },
    "@keyframes fadeIn": {
        "0%": {
          opacity: 0,
          transform: "translateY(5rem)"
        },
        "100%": {
          opacity: 1,
          transform: "translateY(0)"
        }
      },
    img : {
        width: '100%',
        height: '100%',
        objectFit: 'cover' 
    },
    button: {
        width: "100%",
        bottom: '20px',
        textDecoration: 'none',
        fontFamily: "Roboto slab",
        padding: 10,
        color: 'black',
        backgroundColor: 'white',
        visibility: 'hidden',
        position: 'absolute',  
        [theme.breakpoints.down('sm')] : {
           fontSize: 14
          },
        zIndex: 1
          
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
                                            <Link className={classes.button} to={`/shop?category=${c.id}`} >{c.name}</Link>
                                            </div>           
                                        </SwiperSlide>
                        ))
                    }
          
          </Swiper>
        </div>
    )
}