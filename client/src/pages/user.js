import { AppBar, Box, Button, Grid, makeStyles, Paper, Tab, Tabs, TextField, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SaveIcon from '@material-ui/icons/Save';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from 'react-router-dom';
import authActions from '../actions/auth';
import "../App.css";
import OrderDetail from "../components/Admin/OrderDetailModal";
import OrderStatus from '../components/OrderStatus';
import { displayMonDDYYYY } from "../helper/handleTime";
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}


function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        [theme.breakpoints.down("lg")]: {
            width: "70%",
        },
        [theme.breakpoints.down("md")]: {
            width: "100%",
        },
        margin: "0 auto"
    },
    indicator: {
        backgroundColor: "black"
    }
}));

export default () => {

    const orders = useSelector(state => state.userAuth.orders);
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const [profile, setProfile] = useState({});
    const user = useSelector(state => state.userAuth.user);
    const dispatch = useDispatch();
    useEffect(() => {
        setProfile(user);
        if (user?.id) {
            dispatch(authActions.getOrdersByUserId(user.id))
        }
    }, [location, user]);

    const [value, setValue] = useState(0);

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    const handleChange = (e) => {
        setProfile({ ...user, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (profile?.id) {
            dispatch(authActions.updateProfile(profile?.id, { ...user }));
        }
    }
    const handleLogout = (e) => {
        dispatch(authActions.logout(history));
    }

    return (
        <>
            <div className="breadCrumbs" style={{ marginBottom: 0 }}>
                <div className="pageTitle">
                    <Box textAlign="center" py={1}>
                        <Typography variant="inherit">YOUR ACCOUNT</Typography>
                    </Box>
                </div>
            </div>
            <Box maxWidth={1} my={5} >
                <div className={classes.root}>
                    <AppBar position="static" color="transparent">
                        <Tabs
                            value={value}
                            onChange={handleChangeTab}
                            indicatorColor="secondary"
                            textColor="inherit"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                            classes={{ indicator: classes.indicator }}
                        >
                            <Tab icon={<AccountBoxIcon />} {...a11yProps(0)} />
                            <Tab icon={<ShoppingBasketIcon />} {...a11yProps(1)} />
                            <Tab icon={<FavoriteIcon />} {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>

                    <TabPanel value={value} index={0}>
                        <Box mb={4}>
                            <Grid item xs={12} spacing={2} container className="fontRoSlab" direction="row" justifyContent="center" alignItems="center" >
                                <Grid item> <h4>Your Profile</h4></Grid>
                            </Grid>
                        </Box>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item sm={6} xs={12}>
                                    <TextField fullWidth name="fname" required value={profile?.fname} onChange={handleChange} label="First Name" />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <TextField fullWidth name="lname" required value={profile?.lname} onChange={handleChange} label="Last Name" />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <TextField fullWidth name="email" required value={profile?.email} disabled onChange={handleChange} label="Email" />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <TextField fullWidth name="phone" required value={profile?.phone} onChange={handleChange} label="Phone Number" />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField fullWidth name="address" required value={profile?.address} onChange={handleChange} label="Address" />
                                </Grid>
                                <Grid item container spacing={2} >
                                    <Grid item xs={6}>
                                        <Button fullWidth variant="contained" color="primary" type="submit" startIcon={<SaveIcon />} >Save</Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button fullWidth variant="contained" color="default" onClick={handleLogout} startIcon={<ExitToAppIcon />} >Log out</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </TabPanel>
                    <TabPanel value={value} index={1}  >
                        <Box mb={4}>
                            <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" className="fontRoSlab" >
                                <Grid item>
                                    <h4>Your Purchase History</h4>
                                </Grid>
                            </Grid>


                        </Box>
                        <Box width={1} my={2}>
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell  ><strong>No</strong></TableCell>
                                            <TableCell  ><strong>Date</strong></TableCell>
                                            <TableCell><strong>OrderId</strong></TableCell>
                                            <TableCell  ><strong>Status</strong></TableCell>
                                            <TableCell  ><strong>Total</strong></TableCell>
                                            <TableCell  ><strong>Details</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orders.map((row, index) => (
                                            <TableRow key={row.id}>
                                                <TableCell component="th" scope="row">
                                                    {`${index + 1}`}
                                                </TableCell>
                                                <TableCell  >{!row.orderAt ? displayMonDDYYYY(row.orderAt) : displayMonDDYYYY(row.createdAt)}</TableCell>
                                                <TableCell  >{row.id?.toString().padStart(7,"0")}</TableCell>
                                                <TableCell  ><OrderStatus status={row.status} /></TableCell>
                                                <TableCell  >{row.total.toLocaleString()}</TableCell>
                                                <TableCell  ><OrderDetail id={row.id} role="user" /></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>

                    </TabPanel>
                    <TabPanel value={value} index={2}  >
                    <Box mb={4}>
                            <Grid item xs={12} spacing={2} container className="fontRoSlab" direction="row" justifyContent="center" alignItems="center" >
                                <Grid item> <h4>Your Wishlist</h4></Grid>
                            </Grid>
                        </Box>
                    </TabPanel>

                </div>
            </Box>
        </>
    )
}