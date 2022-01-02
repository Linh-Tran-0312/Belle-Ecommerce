import { Box, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import StopIcon from '@material-ui/icons/Stop';
import Pagination from '@material-ui/lab/Pagination';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import reportActions from "../../actions/adminReport";
import { getMonth, getMonthsForReport } from "../../helper/handleTime";


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

const initProPagination = {
    page: 1,
    limit: 5,
    total: 1,
}
export default () => {
    const dispatch = useDispatch()
    const overview = useSelector(state => state.report).overview;
    const salesReport = useSelector(state => state.report).salesReport;
    const orderReport = useSelector(state => state.report).orderReport;
    const productReport = useSelector(state => state.report.productReport);
    const loading = useSelector(state => state.report.loading);

    const [salePeriod, setSalePeriod] = useState("week");
    const [ productPeriod, setProductPeriod ] = useState("week");
    const [ proPagination, setProPagination] = useState(initProPagination);

    const months = getMonthsForReport();
     
    const handleChangeSales = e => {
        setSalePeriod(e.target.value)
        dispatch(reportActions.getSalesReport(e.target.value));
        dispatch(reportActions.getOrderReport(e.target.value));
    }
    const handleChangeProducts = e => {
        setProductPeriod(e.target.value);
        setProPagination(initProPagination);
        dispatch(reportActions.getTopProductReport(e.target.value,initProPagination))
    }
    const handleChangeProductPage= (e,value) => {
        setProPagination({...proPagination, page: value});
        dispatch(reportActions.getTopProductReport(productPeriod,{...proPagination, page: value}))

    }
    useEffect(() => {
        dispatch(reportActions.getOverviewReport());
        dispatch(reportActions.getSalesReport("week"));
        dispatch(reportActions.getOrderReport("week"));
        dispatch(reportActions.getTopProductReport("week",initProPagination))
    },[])

    useEffect(() => {
        const mod = productReport.total % proPagination.limit;
        let pageNumber = productReport.total / proPagination.limit;
        pageNumber = mod === 0 ? pageNumber : Math.floor(pageNumber) + 1;
        setProPagination({...proPagination, total: pageNumber});
    }, [productReport.total])
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
                                        !loading ?  <Typography variant="h5" color="primary">{overview?.sales.toLocaleString()}</Typography>
                                                        : <CircularProgress size={25} />
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
                                        !loading ?  <Typography variant="h5" color="primary">{overview?.orders.toLocaleString()}</Typography>
                                                        : <CircularProgress size={25} />
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
                                       !loading ?  <Typography variant="h5" color="primary">{overview?.registers.toLocaleString()}</Typography>
                                                        :<CircularProgress size={25} /> 
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
                                    onChange={handleChangeSales}
                                    label="Period"
                                    name="period"
                                >
                                    {
                                        months.map(item =>  <MenuItem key={item.time }value={item.time}>{item.name}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                </Box>
                <Grid container>
                    <Grid item md={9} xs={12} style={{ height: 350 }}>
                        {
                            salesReport?.length === 0 ? <CircularProgress />
                            :   <ResponsiveContainer width="100%" height="100%">
                            <BarChart
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
                                <Bar  yAxisId="left" type="monotone" dataKey="sales" fill="#8884d8"  />
                                <Bar yAxisId="right" type="monotone" dataKey="orders" fill="#82ca9d" />
                            </BarChart> 
                        </ResponsiveContainer>
                        }
                      
                    </Grid>
                    <Grid item md={3} xs={12} >
                        <Box style={{ height: 400}}>
                            <Box>
                                <Typography variant="h6" color="primary">Order Status</Typography>
                            </Box>
                            <Box mt={2}>
                          <Typography variant="body1">  <StopIcon style={{color: '#FFBB28',position: 'relative', top: '7px'}}/>Completed Orders: {orderReport[1].value}</Typography>
                                <Typography><StopIcon style={{color: "#0088FE",position: 'relative', top: '7px'}}/>Canceled Orders: {orderReport[0].value}</Typography>
                            </Box>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart width={400} height={400}>
                                    <Pie
                                        data={orderReport}
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
                </Grid>
            </Box>
            <Box component={Paper} p={3} my={2}>
                <Grid container spacing={2}>                  
                    <Grid item xs={12}>
                        <Box mb={2}>
                            <Grid container justifyContent="space-between">
                                    <Grid item>
                                    <Typography variant="h5" color="primary">Top-selling products</Typography>
                                    </Grid>
                                    <Grid item>
                                    <FormControl size="small" fullWidth variant="outlined"  >
                                <InputLabel id="demo-simple-select-outlined-label">Month</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={productPeriod}
                                    onChange={handleChangeProducts}
                                    label="Month"
                                    name="period"
                                >
                                      {
                                        months.map(item =>  <MenuItem key={item.time }value={item.time}>{item.name}</MenuItem>)
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
                                        <TableCell  ><strong>Sales (VND)</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {productReport.products.map((row, index) => (
                                        <TableRow key={row.name}>
                                            <TableCell component="th" scope="row">
                                            {`${(proPagination.page - 1) * proPagination.limit + index + 1}`}
                                            </TableCell>
                                            <TableCell  >{row.name}</TableCell>
                                            <TableCell  >{row.brand}</TableCell>
                                            <TableCell  >{row.quantity}</TableCell>
                                            <TableCell  >{row.sales.toLocaleString()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box my={2}>
                            <Pagination count={proPagination.total} page={proPagination.page} onChange={handleChangeProductPage}/>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}