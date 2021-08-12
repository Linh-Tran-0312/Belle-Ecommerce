import React from 'react'
import { makeStyles } from "@material-ui/core";
import { useState } from "react";
 

const useStyle = makeStyles(() => ({
    figure: {
        width: '80%',
        cursor: 'crosshair',
        backgroundRepeat: 'no-repeat',
        "&:hover $img" : {
            opacity: 0, 
        }
      },
      img: {
        display: 'block',
        width: '100%',
        pointerEvents: 'none',
       
      }
}))
 const ImageHover = ({src}) => {
    const classes = useStyle();
    const [ state, setState ] =  useState({
    backgroundImage: `url(${src})`,
    backgroundPosition: '0% 0%'
  })

  const handleMouseMove = e => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.pageX - left) / width * 100;
    const y = (e.pageY - top) / height * 100;
    setState({ ...state, backgroundPosition: `${x}% ${y}% !important` });
  }

  return(
    <figure onMouseMove={handleMouseMove} className={classes.figure} style={state} >
      <img src={src} className={classes.img}/>
    </figure>
  )
}
  
  
export default ImageHover;
