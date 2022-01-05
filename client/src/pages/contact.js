import { Box, Breadcrumbs, Grid, TextField, Typography } from '@material-ui/core';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import PhoneIphoneOutlinedIcon from '@material-ui/icons/PhoneIphoneOutlined';
import PinterestIcon from '@material-ui/icons/Pinterest';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import BlackButton from '../components/BlackButton';
import Layout from '../components/Layout';
import Map from '../components/Map';
const ContactPage = () => {
    return(
 
        <Layout>
             <div className="breadCrumbs" style={{ marginBottom: 0}}>
                <div className="pageTitle">
                    <Box textAlign="center" py={1}>
                        <Typography variant="inherit">CONTACT US</Typography>
                    </Box>
                </div>
            </div>
            <Map />
            <div  className="breadCrumbs">
                <Box px={3} py={1}>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                        <Link className="link" to="/" >
                            <Typography variant="subtitle2">Home</Typography>

                        </Link>
                        <Typography variant="subtitle2">Contact</Typography>
                    </Breadcrumbs>
                </Box>
                    
                </div>
            <Box px={4} mb={3}>
            <Grid container spacing={2}>
                <Grid item lg={8} md={8} sm={12} xs={12}>
                    <Box p={1} mb={2}>
                    <span className="fontRoSlab fontSize20">DROP US ALINE</span>
                    <Typography variant="subtitle2" gutterBottom>Lorem Ipsum é um texto modelo da indústria tipográfica e de impressão. O Lorem Ipsum tem vindo a ser o texto padrão usado por estas indústrias desde o ano de 1500</Typography>
                    </Box>
                    <Grid container>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <Box p={1}>
                            <TextField  label="Name"  fullWidth variant="outlined" />
                            </Box>
                            <Box p={1}>
                            <TextField  label="Email"  fullWidth variant="outlined" />
                            </Box>                  
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <Box p={1}>
                            <TextField  label="Phone"  fullWidth variant="outlined" />
                            </Box>
                            <Box p={1}>
                            <TextField  label="Subject" fullWidth variant="outlined" />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item lg={12} sm={12} md={12} xs={12}>
                        <Box p={1}>
                        <TextField  multiline  fullWidth rows={4} label="Message" variant="outlined" />
                        </Box>
                        <Box p={1}>
                            <BlackButton>SEND MESSAGE</BlackButton>
                        </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <Typography variant="subtitle1" gutterBottom>Opening Hours</Typography>
                    <Typography variant="subtitle2" gutterBottom>Mon - Sat : 9am - 11pm</Typography>
                    <Typography variant="subtitle2" gutterBottom>Sunday: 11am - 5pm</Typography>
                    <hr/>
                    <Grid container>
                            <Grid item xs={1}>
                                <LocationOnOutlinedIcon fontSize="small" />
                            </Grid>
                            <Grid item xs={11}>
                                <Typography variant="subtitle2"  > 55 Gallaxy Enque, 2568 steet, 23568 NY </Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={1}>
                                <PhoneIphoneOutlinedIcon fontSize="small" />
                            </Grid>
                            <Grid item xs={11}>
                                <Typography variant="subtitle2"  >(440) 000 000 0000 </Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={1}>
                                <EmailOutlinedIcon fontSize="small" />
                            </Grid>
                            <Grid item xs={11}>
                                <Typography variant="subtitle2"  > sales@yousite.com </Typography>
                            </Grid>
                        </Grid>
                    <hr/>
                    <Box>
                        <FacebookIcon style={{marginRight: 10}}/><InstagramIcon style={{marginRight: 10}}/><PinterestIcon style={{marginRight: 10}}/><TwitterIcon style={{marginRight: 10}}/><YouTubeIcon style={{marginRight: 10}}/>
                    </Box>
                </Grid>
            </Grid>
            </Box>
           </Layout>
    )
        
}

 export default ContactPage