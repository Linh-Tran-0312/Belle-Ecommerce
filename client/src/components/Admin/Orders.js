import React, { useState} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper, Grid, TextField, Box, IconButton, MenuItem, Button, FormControl, Select, InputLabel } from "@material-ui/core";
import Title from './Title';
import MoreIcon from '@material-ui/icons/More';
import OrderDetail  from "./OrderDetailModal";
import { Query } from "../../constants";
// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
    return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
    createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'Done', 312.44),
    createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'Not yet', 866.99),
    createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'Done', 100.81),
    createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'Done', 654.39),
    createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'Not yet', 212.79),
    createData(10, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'Done', 312.44),
    createData(11, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'Not yet', 866.99),
    createData(12, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'Not yet', 100.81),
    createData(13, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'Not yet', 654.39),
    createData(14, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'Not yet', 212.79),
];

function preventDefault(event) {
    event.preventDefault();
}

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
    textfield : {
        width: "100%"
    },
    formButton : {
        margin: 5,
    },
}));
const initialState = {
    search: "",
    paymentMethod: "",
    paymentStatus: "",
    status: "",
    period: "",
    sortMethod: ""
}
export default function Orders() {

    const classes = useStyles();
    const [ filter, setFilter ] = useState(initialState) 
    console.log(filter)
    const handleChange = (e) => {
     /*    if(e.target.name == "sort") {
            switch(e.target.value) {
                case "1":
                    setFilter({...filter, sortField: "orderAt", sortValue: Query.ASC});
                case "2":
                    setFilter({...filter, sortField: "orderAt", sortValue: Query.DESC});
                case "3":
                    setFilter({...filter, sortField: "total", sortValue: Query.ASC});
                case "4":
                    setFilter({...filter, sortField: "total", sortValue: Query.DESC})
            }
        } else { */
            setFilter({...filter, [e.target.name] : e.target.value})
    }
    const handleReset  = (e) => {
        setFilter(initialState);
    }
    return (
        <React.Fragment>
            <Paper className={classes.paper}>
                <Grid container direction="row" justifyContent="flex-start">
                    <Grid item xs={4} className={classes.formControl} >
                    <TextField className={classes.textfield} id="outlined-basic" onChange={handleChange} name="search" label="Search" placeholder="Search order's @ID, name, address" variant="outlined" />
                    </Grid>
                    <Grid item  >
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Payment Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={filter.paymentStatus}
                            onChange={handleChange}
                            label="Payment Status"
                            name="paymentStatus"
                        >
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>
                            <MenuItem value={true}>Done</MenuItem>
                            <MenuItem value={false}>Not yet</MenuItem>

                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item  >
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={filter.status}
                            onChange={handleChange}
                            label="Status"
                            name="status"
                        >
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>
                            <MenuItem value="ordered">ORDERED</MenuItem>
                            <MenuItem value="delivery">DELIVERY</MenuItem>
                            <MenuItem value="completed">COMPLETED</MenuItem>
                            <MenuItem value="canceled">CANCELED</MenuItem>
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item  >
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Period</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={filter.period}
                            onChange={handleChange}
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
                    <Grid item>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Sort</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={filter.sortMethod}
                            onChange={handleChange}
                            label="Sort"
                            name="sortMethod"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="1">Ascending date</MenuItem>
                            <MenuItem value="2" selected>Descending date</MenuItem>
                            <MenuItem value="3">Ascending sale</MenuItem>
                            <MenuItem value="4">Descending sale</MenuItem>
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item  className={classes.formControl}>
                        <Button variant="contained" color="primary" size="large" className={classes.formButton}>
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
                            <TableCell align="right"><strong>Sale Amount</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell><strong>Details</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.shipTo}</TableCell>
                                <TableCell  align="center">{row.paymentMethod}</TableCell>
                                <TableCell>COD</TableCell>
                                <TableCell align="right">{row.amount}</TableCell>
                                <TableCell>COMPETED</TableCell>
                                <TableCell>
                                     <OrderDetail/>
                                    </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

        </React.Fragment>
    );
}