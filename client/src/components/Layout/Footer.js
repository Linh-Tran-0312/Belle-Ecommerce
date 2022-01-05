import { Accordion, AccordionDetails, AccordionSummary, Grid, makeStyles, Paper, Typography, withStyles } from '@material-ui/core';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import PhoneIphoneOutlinedIcon from '@material-ui/icons/PhoneIphoneOutlined';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const useStyle = makeStyles(() => ({
    mobileBox: {
        borderTop: '1px solid gray',
        paddingTop: 20,
        color: 'white',
        backgroundColor: '#141414',
    },
    mobile: {

        margin: 10
    },
    link: {
        textDecoration: 'none',
        color: 'white',

    },
    paper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
        borderTop: '1px solid gray',
        borderRadius: 0,
        backgroundColor: '#141414',
        color: 'white'
    },
    contact: {
        marginLeft: 30,
        width: 300
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 30
    }
}))

const StyledAccordion = withStyles(() => ({
    root: {
        "&$expanded": {
            margin: "auto"
        },
        boxShadow: 'none',
        backgroundColor: '#141414',
        color: 'white'
    },
    expanded: {}
}))(Accordion);
const StyledAccordionSummary = withStyles({
    root: {
        borderBottom: '1px solid gray',
        backgroundColor: '#141414',
        color: 'white'
    }
})(AccordionSummary);

const info = ["About us", "Careers", "Privacy policy", "Terms & condition"];
const services = ["Contact Us", "FAQ's", "Orders and Returns", "Support Center"]
const Footer = () => {
    const classes = useStyle();
    const productCategories = useSelector(state => state.home.productCategories);
    const [isDesktopView, setIsDesktopView] = useState(true);
    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900
                ? setIsDesktopView(false)
                : setIsDesktopView(true);
        };

        setResponsiveness();

        window.addEventListener("resize", () => setResponsiveness());

    }, []);
    const desktopFooter = () => {
        return (
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item lg={3} md={3} sm={3}>
                        <Typography variant="h6" gutterBottom>Quick Shop</Typography>
                        {
                            productCategories.map(c => <Typography key={c?.id} variant="subtitle2" ><Link to={`/shop?category=${c?.id}`} className={classes.link}>{c?.name}</Link></Typography>)
                        }

                    </Grid>
                    <Grid item lg={3} md={3} sm={3}>
                        <Typography variant="h6" gutterBottom>Information</Typography>
                        {
                            info.map(i => <Typography key={i} variant="subtitle2"  ><Link to="/blogs" className={classes.link}>{i}</Link></Typography>
                            )
                        }
                    </Grid>
                    <Grid item lg={3} md={3} sm={3}>
                        <Typography variant="h6" gutterBottom>Customer Services</Typography>
                        {
                            services.map(i => <Typography key={i} variant="subtitle2"  ><Link to="/blogs" className={classes.link}>{i}</Link></Typography>
                            )
                        }
                    </Grid>
                    <Grid item lg={3} md={3} sm={3}>
                        <Typography variant="h6" gutterBottom>Contact Us</Typography>
                        <Grid container>
                            <Grid item xs={2}>
                                <LocationOnOutlinedIcon fontSize="small" />
                            </Grid>
                            <Grid item xs={10}>
                                <Typography variant="subtitle2"  > 55 Gallaxy Enque, 2568 steet, 23568 NY </Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={2}>
                                <PhoneIphoneOutlinedIcon fontSize="small" />
                            </Grid>
                            <Grid item xs={10}>
                                <Typography variant="subtitle2"  >(440) 000 000 0000 </Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={2}>
                                <EmailOutlinedIcon fontSize="small" />
                            </Grid>
                            <Grid item xs={10}>
                                <Typography variant="subtitle2"  > sales@yousite.com </Typography>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </Paper>

        )

    }
    const mobileFooter = () => {
        return (
            <div className={classes.mobileBox}>
                <div className={classes.mobile}>
                    <StyledAccordion>
                        <StyledAccordionSummary
                            expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography component="h6">Quick Shop</Typography>
                        </StyledAccordionSummary>
                        <AccordionDetails className={classes.details}>
                            {
                                productCategories.map(c => <Typography key={c?.id} variant="subtitle2" ><Link to={`/shop?category=${c?.id}`} className={classes.link}>{c?.name}</Link></Typography>)
                            }
                        </AccordionDetails>
                    </StyledAccordion>
                    <StyledAccordion>
                        <StyledAccordionSummary
                            expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography component="h6">Information</Typography>
                        </StyledAccordionSummary>
                        <AccordionDetails className={classes.details}>
                            {
                                info.map(i => <Typography key={i} variant="subtitle2"  ><Link to="/blogs" className={classes.link}>{i}</Link></Typography>
                                )
                            }
                        </AccordionDetails>
                    </StyledAccordion>
                    <StyledAccordion>
                        <StyledAccordionSummary
                            expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography component="h6">Customer Services</Typography>
                        </StyledAccordionSummary>
                        <AccordionDetails className={classes.details}>
                            {
                                services.map(i => <Typography key={i} variant="subtitle2"  ><Link to="/blogs" className={classes.link}>{i}</Link></Typography>
                                )
                            } </AccordionDetails>
                    </StyledAccordion>
                    <Typography component="h6" style={{ marginLeft: 16, marginTop: 10 }} gutterBottom>Contact Us</Typography>
                    <div className={classes.contact}>

                        <Grid container >
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

                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            {
                isDesktopView ? desktopFooter() : mobileFooter()
            }
        </>
    )

}

export default Footer;