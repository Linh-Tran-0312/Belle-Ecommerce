import { Box, Container, Grid, InputBase, makeStyles } from "@material-ui/core";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import PinterestIcon from '@material-ui/icons/Pinterest';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';
import BlackButton from '../BlackButton';
import Footer from './Footer';
import NavBar from './NavBar';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '0px 5px',
        display: 'flex',
        alignItems: 'center',

        [theme.breakpoints.down('sm')]: {
            height: 35,
        },
    },
    input: {
       
        flex: 1,
        height: 40,
        borderRadius: 0,
        boxShadow: 'none',
        border: '1px solid rgb(168, 165, 165)',
        paddingLeft: 20,
        backgroundColor: "white"
    },
    iconButton: {
        padding: 10,
    },
    label: {
        fontFamily: "Poppins,Helvetica,Tahoma,Arial,sans-serif",
        fontSize: "1.29231em",
        fontWeight: 400,
        letterSpacing: "0.03em",
        "& span": {
            display: "block",
            fontSize: 13,
            texAlign: "left",
        },
    },
    subscribeBox : {
        backgroundColor: "#f9f9f9",
        borderTop: "1px solid #e8e9eb"
    },
    icons : {
         
        [theme.breakpoints.up("md")] : {
            display: "flex",
            justifyContent: "flex-end",
            alignItems: 'center'
        },
        [theme.breakpoints.down("md")] : {
            display: "flex",
            justifyContent: "center",
            alignItems: 'center'
        },
    }

}))
const Layout = ({children}) => {
     const classes = useStyles();
    const location = useLocation();
    const ref = useRef()

    useEffect(() => {
       ref.current.scrollIntoView();
    },[location])
    return(
        <div ref={ref}>
        <NavBar />
        {children}
        <Box px={5} py={4} className={classes.subscribeBox}>
                        <Container>
                        <Grid container spacing={2}>
                            <Grid item lg={8} xs={12} container spacing={2} >
                                <Grid item md={3} xs={12}>
                                    <div className={classes.label}>
                                        <span>SIGN UP FOR</span>
                                        NEWSLETTER
                                    </div>
                                </Grid>
                                <Grid item md={9} xs={12} className={classes.root}>
                                <InputBase
                                        className={classes.input}
                                        placeholder="Email adress"
                                    />
                                    <BlackButton height="40px">
                                        SUBSCRIBE
                                    </BlackButton>
                                    </Grid>
                            </Grid>
                            <Grid item lg={4} xs={12} className={classes.icons}>
                            <FacebookIcon style={{marginRight: 10}}/><InstagramIcon style={{marginRight: 10}}/><PinterestIcon style={{marginRight: 10}}/><TwitterIcon style={{marginRight: 10}}/><YouTubeIcon style={{marginRight: 10}}/>
                            </Grid>
                        </Grid>
                        </Container>
                    </Box>
        <Footer/>
        </div>
    )
}

export default Layout;