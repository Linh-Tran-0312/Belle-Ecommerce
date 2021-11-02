import { Box, Grid,Typography, Button, FormControl, MenuItem, TextField, InputLabel, Paper, Select, IconButton } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { Link } from 'react-router-dom';
import "../App.css";
import BlackButton from "../components/BlackButton";
import Layout from "../components/Layout";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import OpacityIcon from '@material-ui/icons/Opacity';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Pagination from '@material-ui/lab/Pagination';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
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
export default () => {


    const handleChange = (e) => {

    }
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
                        <Typography variant="h5" color="primary">Your Profile</Typography>
                    </Box>
                        <Box my={2}>
                            <TextField fullWidth type="text" value="Henry" label="First Name" variant="outlined" />
                        </Box>
                        <Box my={2}>
                            <TextField fullWidth type="text" value="Nguyen" label="Last Name" variant="outlined" />
                        </Box>
                        <Box my={2}>
                            <TextField fullWidth type="text" value="henrynguyen@gmail.com" disabled label="Email" variant="outlined" />
                        </Box>
                        <Box my={2}>
                            <TextField fullWidth type="text" value="0987665225" label="Phone Number" variant="outlined" />
                        </Box>
                        <Box my={2}>
                            <TextField fullWidth type="text" value="227 Nguyen Van Cu, district 5, HCM city" label="Address" variant="outlined" />
                        </Box>
                        <Box my={2} textAlign="center">
                            
                                    <Button variant="contained" color="primary"  startIcon={<SaveIcon />} >Save</Button>
                                
                             
                        </Box>
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
                                    {rows.map((row, index) => (
                                        <TableRow key={row.name}>
                                            <TableCell component="th" scope="row">
                                                {`${index + 1}`}
                                            </TableCell>
                                            <TableCell  >{row.date}</TableCell>
                                            <TableCell  >{row.id}</TableCell>
                                            <TableCell  >{row.status}</TableCell>
                                            <TableCell  >{row.sale}</TableCell>
                                            <TableCell  ><IconButton size="small"><MoreHorizIcon /></IconButton></TableCell>
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