import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Button, IconButton, Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import VisibilityIcon from '@material-ui/icons/Visibility';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 300,
        height: 385,
        [theme.breakpoints.down('xs')]: {
            height: 285,
            margin: 10,
        },
        position: 'relative',
        "&:hover $action": {
            visibility: 'visible',
            animation: "$fadeIn .3s ease-in-out"
        },
        '&:hover $media1': {
            display: 'none'
          },
          '&:hover $media2': {
            display: 'block',
            animation: "$fadeDown .3s ease-in-out"
          },
        transition: 'transform .2s',
     
      
        borderRadius: 0,
        margin: 20,
    },
    media1: {
        height: 300,
        [theme.breakpoints.down('xs')]: {
            height: 200,
        },
      
    },
    img : {
        objectPosition: 'top',
        objectFit: 'cover'
    },
    media2 : {
        height: 300,
        [theme.breakpoints.down('xs')]: {
          height: 200,
         },
         display: 'none'
      },
    content: {
    textAlign: 'center',
    },
    action : {
    display: 'flex',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 85,
    width: '100%',
    zIndex: 2,
    visibility: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.5)'
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
"@keyframes fadeDown": {
    "0%": {
      opacity: 0,
      transform: "translateY(-5rem)"
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)"
    }
  },
  link: {
    textDecoration: 'none',
    color: 'black',

},
}));

export default function ProductItem({product}) {
    const classes = useStyles();

    return (

        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={product?.imgPaths[0]}
                    title="Contemplative Reptile"
                    className={classes.media1}
                    classes={{img: classes.img}}
                />
                 <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={product?.imgPaths[1]}
                    title="Contemplative Reptile"
                    className={classes.media2}
                    classes={{img: classes.img}}
                 />
                <CardContent className={classes.content} >
             
                    <Typography variant="body2" component="h4" noWrap>
                    <Link to='/product' className={classes.link}>
                     {product?.name}
                        </Link>
                    </Typography>
                    <Typography variant="subtitle2" component="h2" style={{fontWeight: 'bold'}}>
                    {product?.price?.toLocaleString()} VND
                    </Typography>
                    <Typography component="h5" gutterBottom>
                       <Rating rating={3.4} size={20}/>
                    </Typography>
                 
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.action}>
                <IconButton size="small">
                    <FavoriteIcon />
                </IconButton>
                <IconButton size="small" >
                    <ShoppingCartIcon />
                </IconButton>
                <IconButton size="small">
                    <VisibilityIcon />
                </IconButton>
            </CardActions>
        </Card>
   );
}
