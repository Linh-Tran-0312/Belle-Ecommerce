import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import OrderDetail from "../../components/Admin/OrderDetailModal";
import Title from '../../components/Admin/Title';
import OrderStatus from "../../components/OrderStatus";
import orderActions from "../../actions/adminOrder";
import Pagination from '@material-ui/lab/Pagination';
import { CompositeDecorator } from "draft-js";
const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    paper: {
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    formControl : {
        minWidth: 170,
        margin: 10
    },
    formButton : {
        margin: 5,
    },
}));
const initFilter = {
    search: "",
    limit: 5,
    page: 1,
    paymentMethod: "",
    paymentCheck: "",
    status: "",
    period: "",
    sortMethod: ""
}
const paymentMethodToString = (string) => {
    if(string === "cod") return "COD";
    if(string === "banktransfer") return "BANK TRANSFER"
};
const paymentStatusToString = (status) => {
    if(status) return "Done";
    else {
        return "Not yet"
    }
}
export default function Orders() {
     const classes = useStyles();
     const dispatch = useDispatch();
      // Orders
      const orders = useSelector(state => state.adminOrder).orders;
      const orderTotal = useSelector(state => state.adminOrder).total;
      const orderDetail = useSelector(state => state.adminOrder).order;
       
      const [filter, setFilter] = useState(initFilter);
      const [ order, setOrder] = useState({})
      const [ pageCount, setPageCount] = useState(0)
    
    
      useEffect(() => {
          dispatch(orderActions.getOrders(filter));
      },[])
      useEffect(() => {
          setOrder({...orderDetail});                 
      },[orderDetail]);

      useEffect(() => {
          const mod = orderTotal%filter.limit;
          let pageNumber = orderTotal/filter.limit;
           pageNumber = mod === 0 ? pageNumber : Math.floor(pageNumber) + 1;
          setPageCount(pageNumber)
      },[orderTotal])

      const handleFilterChange = (e) => {
          setFilter({...filter, [e.target.name]: e.target.value, page: 1 });
      };
      const handleReset = (e) => {
          setFilter(initFilter);
      };
      const handleSubmitFilter = (e) => {
          dispatch(orderActions.getOrders(filter)) 
      }
      const handleChangePage = (event, value) => {
          dispatch(orderActions.getOrders({...filter, page: value})) 
          setFilter({...filter, page : value});   
      };

      const handleGetOrderById = (id) => {
          dispatch(orderActions.getOrderById(id));
      }
    return (
        <>
            <Paper className={classes.paper}>
                <Grid container direction="row" justifyContent="flex-start" spacing={1}>
                    <Grid item  md={4} sm={12} xs={12}   >
                    <TextField fullWidth id="outlined-basic" onChange={handleFilterChange} name="search" label="Search" placeholder="Search order's information..." variant="outlined" />
                    </Grid>
                    <Grid item  md={2} sm={3} xs={6}  >
                    <FormControl  fullWidth variant="outlined"  >
                        <InputLabel id="demo-simple-select-outlined-label">Payment Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={filter.paymentCheck}
                            onChange={handleFilterChange}
                            label="Payment Status"
                            name="paymentCheck"
                        >
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>
                            <MenuItem value="true">Done</MenuItem>
                            <MenuItem value="false">Not yet</MenuItem>

                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item   md={2} sm={3} xs={6} >
                    <FormControl fullWidth variant="outlined"  >
                        <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={filter.status}
                            onChange={handleFilterChange}
                            label="Status"
                            name="status"
                        >
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>
                            <MenuItem value="ordered">NEW ORDER</MenuItem>
                            <MenuItem value="delivery">IN DELIVERY</MenuItem>
                            <MenuItem value="completed">COMPLETED</MenuItem>
                            <MenuItem value="canceled">CANCELED</MenuItem>
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item   md={2} sm={3} xs={6} >
                    <FormControl fullWidth  variant="outlined"  >
                        <InputLabel id="demo-simple-select-outlined-label">Period</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={filter.period}
                            onChange={handleFilterChange}
                            label="Period"
                            name="period"
                        >
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>
                            <MenuItem value="today">Today</MenuItem>
                            <MenuItem value="week">This Week</MenuItem>
                            <MenuItem value="month">This Month</MenuItem>
                            <MenuItem value="quarter">This Quarter</MenuItem>
                            <MenuItem value="year">This Year</MenuItem>
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item  md={2} sm={3} xs={6} >
                    <FormControl fullWidth  variant="outlined"  >
                        <InputLabel id="demo-simple-select-outlined-label">Sort</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={filter.sortMethod}
                            onChange={handleFilterChange}
                            label="Sort"
                            name="sortMethod"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="1">Ascending date</MenuItem>
                            <MenuItem value="2">Descending date</MenuItem>
                            <MenuItem value="3">Ascending sale</MenuItem>
                            <MenuItem value="4">Descending sale</MenuItem>
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item  md={12} sm={12} xs={12}   >
                        <Button variant="contained" color="primary" size="large" className={classes.formButton} onClick={handleSubmitFilter}>
                            Apply
                        </Button>
                        <Button variant="contained" color="default" size="large" className={classes.formButton} onClick={handleReset}>
                           Reset
                        </Button>
                    </Grid>          
                </Grid> 
            </Paper>
            <Paper className={classes.paper}>
                <Box>
                    <Title>All Orders</Title>              
                </Box>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Order ID</strong></TableCell>
                            <TableCell><strong>Date</strong></TableCell>
                            <TableCell><strong>Customer</strong></TableCell>
                            <TableCell><strong>Ship To</strong></TableCell>
                            <TableCell><strong>Payment Status</strong></TableCell>
                            <TableCell><strong>Payment Method</strong></TableCell>
                            <TableCell align="right"><strong>Sale (VND)</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell><strong>Details</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((row) => (
                            <TableRow key={row?.id}>
                                <TableCell>{row?.id}</TableCell>
                                <TableCell>{new Date(row?.orderAt).toLocaleDateString()}</TableCell>
                                <TableCell>{`${row?.user?.lname} ${row?.user?.fname}`}</TableCell>
                                <TableCell>{row?.address}</TableCell>
                                <TableCell  align="center">{paymentMethodToString(row?.paymentMethod)}</TableCell>
                                <TableCell>{paymentStatusToString(row?.paymentCheck)}</TableCell>
                                <TableCell align="right">{row?.total.toLocaleString()}</TableCell>
                                <TableCell><OrderStatus status={row?.status}/></TableCell>
                                <TableCell>
                                     <OrderDetail  id={row?.id} admin={true}/>
                                    </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Box my={5}  >
                        <Pagination count={pageCount} page={filter.page} onChange={handleChangePage} />
                    </Box>
            </Paper>
        </>
    );
} 