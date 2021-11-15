import { Box, Button, Grid, IconButton, Paper, TextField, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SaveIcon from '@material-ui/icons/Save';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import authActions from '../actions/auth';
import "../App.css";
import Layout from "../components/Layout";
import OrderStatus from '../components/OrderStatus';
import { displayMonDDYYYY } from "../helper/handleTime";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import OrderDetail from "../components/Admin/OrderDetailModal";
const initUser = {
    id: "",
    fname: "",
    lname: "",
    email: "",
    phone: "",
    address: ""
}
export default () => {
    //const userDetail = useSelector(state => state.auth).user;
    const orders = useSelector(state => state.auth).orders;
    const history = useHistory();
    const location = useLocation();
  
    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('user')));
    const dispatch = useDispatch();
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
        if(user?.id) {
            dispatch(authActions.getOrdersByUserId(user.id))
        }
    },[location]);

    /* useEffect(() => {
        setUser(userDetail);
        if(userDetail.id) {
            dispatch(authActions.getOrdersByUserId(userDetail.id))
        }
     
    },[userDetail]) */
    const handleChange = (e) => {
        setUser({...user,[e.target.name] : e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(user.id) {           
           dispatch(authActions.updateProfile(user.id, {...user}));
    }
    }
    const handleLogout = (e) => {
        dispatch(authActions.logout(history));
    }
    if(!user?.id ) return <Redirect to="/auth" />
    return (
        <Layout>
            <div className="breadCrumbs" style={{ marginBottom: 0 }}>
                <div className="pageTitle">
                    <Box textAlign="center" py={1}>
                        <Typography variant="inherit">YOUR ACCOUNT</Typography>
                    </Box>
                </div>
            </div>
            <Box maxWidth={1} my={5} mx={5}>
                <Grid container spacing={3} >
                    <Grid item xs={12} sm={4} md={4}>
                    <Box mb={4}>
                        <Grid container direction="row" justifyContent="flex-start" alignItems="center" >
                            <Grid item>
                            <Typography variant="h5" color="primary">Your Profile | &nbsp;</Typography> 
                            </Grid>                        
                            <Grid item>
                                <Typography variant="h5" color="primary" > Logout </Typography> 
                            </Grid>
                            <Grid item>                                                    
                                <IconButton onClick={handleLogout} >
                                    <ExitToAppIcon  />
                                </IconButton>
                            </Grid>                         
                        </Grid>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Box my={2}>
                            <TextField fullWidth name="fname"  required value={user.fname} onChange={handleChange} label="First Name" variant="outlined" />
                        </Box>
                        <Box my={2}>
                            <TextField fullWidth name="lname"  required value={user.lname} onChange={handleChange}  label="Last Name" variant="outlined" />
                        </Box>
                        <Box my={2}>
                            <TextField fullWidth name="email"  required value={user.email} disabled onChange={handleChange}  label="Email" variant="outlined" />
                        </Box>
                        <Box my={2}>
                            <TextField fullWidth name="phone"  required value={user.phone} onChange={handleChange}  label="Phone Number" variant="outlined" />
                        </Box>
                        <Box my={2}>
                            <TextField fullWidth name="address"  required value={user.address} onChange={handleChange}  label="Address" variant="outlined" />
                        </Box>
                        <Box my={2} textAlign="center">                      
                                <Button variant="contained" color="primary" type="submit"  startIcon={<SaveIcon />} >Save</Button>                          
                        </Box>
                        </form>
                    </Grid>
                    <Grid item xs={12} sm={8} md={8}>
                    <Box mb={4}>
                        <Typography variant="h5" color="primary">Your Orders</Typography>
                    </Box>
                    <Box my={2}>
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
                                            <TableCell  >{!row.orderAt ? displayMonDDYYYY(row.orderAt) :  displayMonDDYYYY(row.createdAt)}</TableCell>
                                            <TableCell  >{row.id}</TableCell>
                                            <TableCell  ><OrderStatus status={row.status}/></TableCell>
                                            <TableCell  >{row.total.toLocaleString()}</TableCell>
                                            <TableCell  ><OrderDetail id={row.id} role="user"/></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                   
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    )
}