import React, { useState} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper, Grid, TextField, Box, MenuItem, FormControl, Select, InputLabel } from "@material-ui/core";
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
    return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
    createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
    createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
    createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
    createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
    createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
    createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
    createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
    createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
    createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
    createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
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
    }
}));
const initialState = {
    search: "",
    paymentMethod: null,
    sale: null,
    paymentStatus: null,
    status: null,
    period: null,
    age: null,

}
export default function Orders() {

    const classes = useStyles();
    const [ filter, setFilter ] = useState(initialState) 

    const handleChange = (e) => {
        setFilter({...filter, [e.target.name] : e.target.value})
    }
    return (
        <React.Fragment>
            <Paper className={classes.paper}>
                <Grid container direction="row" justifyContent="flex-start">
                    <Grid item xs={4} className={classes.formControl} >
                    <TextField className={classes.textfield} id="outlined-basic" onChange={handleChange} name="search" label="Search" placeholder="Search order's ID, name, address" variant="outlined" />
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
                            label="Payment Status"
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
                            label="Payment Status"
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
                    <Grid item  ></Grid>
                </Grid>
         
            </Paper>
            <Paper className={classes.paper}>
                <Box>
                    <Title>All Orders</Title>
                  
                </Box>

                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell>Ship To</TableCell>
                            <TableCell>Payment Status</TableCell>
                            <TableCell align="right">Sale Amount</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.shipTo}</TableCell>
                                <TableCell>{row.paymentMethod}</TableCell>
                                <TableCell align="right">{row.amount}</TableCell>
                                <TableCell>COMPETED</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

        </React.Fragment>
    );
}