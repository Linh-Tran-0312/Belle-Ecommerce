import { Paper, Box, Grid, Typography, MenuItem, FormControl, Select, InputLabel } from "@material-ui/core";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import StopIcon from '@material-ui/icons/Stop';
import { makeStyles, CircularProgress } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Sector, Cell } from 'recharts';
import { useEffect, useState } from "react";
import { getMonth } from "../../helper/handleTime";
import { useDispatch, useSelector } from "react-redux";
import reportActions from "../../actions/adminReport";

const useStyles = makeStyles({

})
const saleData = [
    {
        name: 'Monday',
        sales: 30000000,
        orders: 24,
        amt: 2400,
    },
    {
        name: 'Tuesday',
        sales: 30000000,
        orders: 13,
        amt: 2210,
    },
    {
        name: 'Wednesday',
        sales: 20000000,
        orders: 98,
        amt: 2290,
    },
    {
        name: 'Thursday',
        sales: 27800000,
        orders: 39,
        amt: 2000,
    },
    {
        name: 'Friday',
        sales: 18900000,
        orders: 48,
        amt: 2181,
    },
    {
        name: 'Saturday',
        sales: 23900000,
        orders: 38,
        amt: 2500,
    },
    {
        name: 'Sunday',
        sales: 34900000,
        orders: 43,
        amt: 2100,
    },
];
const orderData = [
    { name: 'Canceled', value: 800 },
    { name: 'Completed', value: 150 },
];
const COLORS = ['#0088FE', "#FFBB28"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};
const thisMonth = new Date();
const rowsProduct = [
    {name: "Caro shirt", brand : "Leo", quantity: 140, total : 3400000},
    {name: "Black shirt", brand : "Zara", quantity: 45, total : 540000},
    {name: "Soft hat", brand : "H&M", quantity: 30, total : 3403400},
    {name: "Az Polo", brand : "Leo", quantity: 60, total : 3403400},
    {name: "Green shirt", brand : "Leo", quantity: 20, total : 3403400},
]

export default () => {
    const dispatch = useDispatch()
    const overview = useSelector(state => state.report).overview;
    const salesReport = useSelector(state => state.report).salesReport;
    const [salePeriod, setSalePeriod] = useState("week");
    const handleChange = e => {
        setSalePeriod(e.target.value)
        dispatch(reportActions.getSalesReport(e.target.value))
    }
    useEffect(() => {
        dispatch(reportActions.getOverviewReport());
        dispatch(reportActions.getSalesReport("week"))
    },[])
    return (
        <>
            <Box component={Paper} p={3} my={2}>
                <Box mb={3} >
                    <Grid container justifyContent="space-between">
                        <Grid item>
                        <Typography variant="h5" color="primary">Overview</Typography>
                        </Grid>
                        <Grid item>
                        <Typography variant="h5" color="primary">{getMonth(thisMonth.getMonth())}</Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Grid container spacing={3}>
                    <Grid item sm={4} xs={12} >
                        <Box p={2} border={1}>
                            <Grid container alignItems="center">
                                <Grid item xs={9}>
                                    <Typography variant="body1">Total Money (VND)</Typography>
                                    {
                                        overview?.sales ?  <Typography variant="h5" color="primary">{overview?.sales.toLocaleString()}</Typography>
                                                        : <CircularProgress />
                                    }
                                   
                                </Grid>
                                <Grid item xs={3}>
                                    <MonetizationOnIcon color="primary" fontSize="large" />
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item sm={4} xs={12} >
                        <Box p={2} border={1}>
                            <Grid container alignItems="center">
                                <Grid item xs={9}>
                                    <Typography variant="body1">New Orders</Typography>
                                    {
                                        overview?.sales ?  <Typography variant="h5" color="primary">{overview?.orders.toLocaleString()}</Typography>
                                                        : <CircularProgress />
                                    }
                                </Grid>
                                <Grid item xs={3}>
                                    <AddShoppingCartIcon color="primary" fontSize="large" />
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item sm={4} xs={12}  >
                        <Box p={2} border={1}>
                            <Grid container alignItems="center">
                                <Grid item xs={9}>
                                    <Typography variant="body1">New Registers</Typography>
                                    {
                                        overview?.sales ?  <Typography variant="h5" color="primary">{overview?.registers.toLocaleString()}</Typography>
                                                        : <CircularProgress />
                                    }
                                </Grid>
                                <Grid item xs={3}>
                                    <PersonAddIcon color="primary" fontSize="large" />
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box component={Paper} p={3} my={2}>
                <Box mb={3}>
                    <Grid container justifyContent="space-between">
                        <Grid item sm={6} xs={12}>
                            <Typography variant="h5" color="primary">Sales and Orders</Typography>
                        </Grid>
                        <Grid item sm={3} xs={12}>
                            <FormControl size="small" fullWidth variant="outlined"  >
                                <InputLabel id="demo-simple-select-outlined-label">Period</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={salePeriod}
                                    onChange={handleChange}
                                    label="Period"
                                    name="period"
                                >

                                    <MenuItem value="week">This Week</MenuItem>
                                    <MenuItem value="month">This Month</MenuItem>
                                    <MenuItem value="quarter">This Quarter</MenuItem>
                                    <MenuItem value="year">This Year</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                </Box>
                <Grid container>
                    <Grid item xs={12} style={{ height: 350 }}>
                        {
                            salesReport?.length === 0 ? <CircularProgress />
                            :   <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                width={500}
                                height={250}
                                data={salesReport}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="time" />
                                <YAxis yAxisId="left" tickFormatter={(value) => new Intl.NumberFormat('en').format(value)} />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                                <Legend height={10} />
                                <Line  yAxisId="left" type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                                <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                        }
                      
                    </Grid>
                </Grid>
            </Box>
            <Box component={Paper} p={3} my={2}>
                <Grid container spacing={2}>
                    <Grid item md={3} xs={12} >
                        <Box style={{ height: 400}}>
                            <Box>
                                <Typography variant="h6" color="primary">Order Status</Typography>
                            </Box>
                            <Box mt={2}>
                          <Typography variant="body1">  <StopIcon style={{color: '#0088FE',position: 'relative', top: '7px'}}/>Completed Orders: {orderData[0].value}</Typography>
                                <Typography><StopIcon style={{color: "#FFBB28",position: 'relative', top: '7px'}}/>Canceled Orders: {orderData[1].value}</Typography>
                            </Box>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart width={400} height={400}>
                                    <Pie
                                        data={orderData}
                                        cx="50%"
                                        cy="30%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {orderData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </Box>
                    </Grid>
                    <Grid item md={9} xs={12}>
                        <Box mb={2}>
                            <Grid container justifyContent="space-between">
                                    <Grid item>
                                    <Typography variant="h6" color="primary">Top-selling products</Typography>
                                    </Grid>
                                    <Grid item>
                                    <FormControl size="small" fullWidth variant="outlined"  >
                                <InputLabel id="demo-simple-select-outlined-label">Month</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value="10"
                                    onChange={handleChange}
                                    label="Month"
                                    name="period"
                                >
                                    {
                                        [1,2,3,4,5,6,7,8,9,10,11,12].map(item =>  <MenuItem key={item} value={item}>{getMonth(item)}</MenuItem>)
                                    }

                                </Select>
                            </FormControl>
                                    </Grid>
                            </Grid>
                        </Box>
                    <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell  ><strong>No</strong></TableCell>
                                        <TableCell><strong>Product</strong></TableCell>
                                        <TableCell  ><strong>Brand</strong></TableCell>
                                        <TableCell  ><strong>Sell Quantity</strong></TableCell>
                                        <TableCell  ><strong>Revenue</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rowsProduct.map((row, index) => (
                                        <TableRow key={row.name}>
                                            <TableCell component="th" scope="row">
                                                {`${index + 1}`}
                                            </TableCell>
                                            <TableCell  >{row.name}</TableCell>
                                            <TableCell  >{row.brand}</TableCell>
                                            <TableCell  >{row.quantity}</TableCell>
                                            <TableCell  >{row.total}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}