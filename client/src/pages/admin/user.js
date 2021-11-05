import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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
import { Card, CardMedia, CardActions, CardActionArea, Divider, Slider } from "@material-ui/core";
import { Box, Typography, Grid, IconButton, Button, TextField, FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    formControl: {
        minWidth: 170,
        margin: 10
    },
    formButton: {
        margin: 5,
    },

});
const initialState = {
    search: "",
    role: "",
    sortMethod: ""
}
function createUsers(name, id, email, address, role, phone, sale) {
    return { name, id, email, address, role, phone, sale };
}
function createOrders(id, date, status, sale) {
    return { id, date, status, sale }
}
const rowsUsers = [
    createUsers('Henry Nguyen', 1, "henrynguyen@gmail.com", "223 BoodHill Street, District 1", "Customer", "09837432", 20000),
    createUsers('John Hamstan', 1, "johnham@gmail.com", "223 BoodHill Street, District 1", "Customer", "09837432", 20000),
    createUsers('Alice Nguyen', 1, "alice@gmail.com", "223 BoodHill Street, District 1", "Customer", "09837432", 20000),
    createUsers('Pete Tran', 1, "petertran@gmail.com", "223 BoodHill Street, District 1", "Customer", "09837432", 20000),
    createUsers('Henra Nguyen', 1, "henrynguyen@gmail.com", "223 BoodHill Street, District 1", "Customer", "09837432", 20000),
];
const rowsOrders = [
    createOrders(1, "22-03-2021", "COMPLETE", 23000),
    createOrders(2, "27-01-2021", "DELIVERY", 24000),
    createOrders(3, "12-04-2020", "CANCELED", 256000),
    createOrders(4, "22-03-2021", "NEW ORDER", 13000),
    createOrders(3, "25-07-2019", "COMPLETE", 236000),
]
export default () => {
    const [filter, setFilter] = React.useState(initialState);
    const classes = useStyles();
    const [page, setPage] = React.useState(1);

    const handleChangePage = (event, value) => {
        setPage(value);
    };
    const handleChange = (e) => {

        setFilter({ ...filter, [e.target.name]: e.target.value })
    }
    const handleReset = (e) => {
        setFilter(initialState);
    }
    return (
        <>
            <Grid container direction="row" justifyContent="flex-start" spacing={1}>
                <Grid item md={6} sm={12} xs={12}   >
                    <TextField fullWidth id="outlined-basic" onChange={handleChange} name="search" label="Search" placeholder="Search user's name, address, role" variant="outlined" />
                </Grid>
                <Grid item md={3} sm={6} xs={6}  >
                    <FormControl fullWidth variant="outlined"  >
                        <InputLabel id="demo-simple-select-outlined-label">User Role</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={filter.role}
                            onChange={handleChange}
                            label="User Role"
                            name="role"
                        >
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>
                            <MenuItem value="1">Admin</MenuItem>
                            <MenuItem value="2">Customer</MenuItem>
                            <MenuItem value="3">Editor</MenuItem>

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={3} sm={6} xs={6} >
                    <FormControl fullWidth variant="outlined"  >
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
                            <MenuItem value="1">Ascending Sales</MenuItem>
                            <MenuItem value="2" selected>Descending Sales</MenuItem>
                            <MenuItem value="3">Ascending name</MenuItem>
                            <MenuItem value="4">Descending name</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} container direction="row" justifyContent="space-between">
                    <Grid item>
                    <Button variant="contained" color="primary" size="large" className={classes.formButton}>
                        Apply
                    </Button>
                    <Button variant="contained" color="default" size="large" className={classes.formButton} onClick={handleReset}>
                        Reset
                    </Button>
                    </Grid>
                    <Grid item md={2} xs={12}>
                    <Button variant="contained" color="primary" size="large" fullWidth startIcon={<PersonAddIcon/>} className={classes.formButton} >
                        New User
                    </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Box my={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell  ><strong>No</strong></TableCell>
                                        <TableCell><strong>Name</strong></TableCell>
                                        <TableCell  ><strong>Email</strong></TableCell>
                                        <TableCell  ><strong>Phone</strong></TableCell>
                                        <TableCell  ><strong>Address</strong></TableCell>
                                        <TableCell  ><strong>Role</strong></TableCell>
                                        <TableCell  ><strong>Sales</strong></TableCell>
                                        <TableCell  ><strong></strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rowsUsers.map((row, index) => (
                                        <TableRow key={row.name}>
                                            <TableCell component="th" scope="row">
                                                {`${index + 1}`}
                                            </TableCell>
                                            <TableCell  >{row.name}</TableCell>
                                            <TableCell  >{row.email}</TableCell>
                                            <TableCell  >{row.phone}</TableCell>
                                            <TableCell  >{row.address}</TableCell>
                                            <TableCell  >{row.role}</TableCell>
                                            <TableCell  >{row.sale}</TableCell>
                                            <TableCell  ><IconButton size="small"><MoreHorizIcon /></IconButton></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Box>
            <Box my={5}  >
                <Pagination count={10} page={page} onChange={handleChangePage} />
            </Box>
            <Divider />
            <Box>
                <Grid container spacing={2}>
                    <Grid item sm={5} xs={12}>
                        <Box my={3} px={1}>
                            <Typography variant="h5">User Details</Typography>
                        </Box>
                        <Box my={2}>
                        <FormControl fullWidth variant="outlined"  >
                        <InputLabel id="demo-simple-select-outlined-label">User Role</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value="2"
                            onChange={handleChange}
                            label="User Role"
                            name="role"
                        >
                             
                            <MenuItem value="1">Admin</MenuItem>
                            <MenuItem value="2">Customer</MenuItem>
                            <MenuItem value="3">Editor</MenuItem>

                        </Select>
                    </FormControl>
                        </Box>
                        <Box my={2}>
                            <TextField fullWidth type="text" value="Henry Ngueyn" label="Name" variant="outlined" />
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
                        <Box my={2}>
                            <Grid container direction="row" justifyContent='center' spacing={2}>
                                <Grid item   md={4} xs={4}>
                                    <Button variant="contained" color="secondary" fullWidth startIcon={<DeleteIcon />} >Delete</Button>
                                </Grid>
                                <Grid item   md={4} xs={4}>
                                    <Button variant="contained" color="primary" fullWidth startIcon={<SaveIcon />} >Save</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item sm={7} xs={12}>
                        <Box my={3} px={1}>
                            <Typography variant="h5">User's Orders</Typography>
                        </Box>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell  ><strong>No</strong></TableCell>
                                        <TableCell  ><strong>Date</strong></TableCell>
                                        <TableCell><strong>OrderId</strong></TableCell>
                                        <TableCell  ><strong>Status</strong></TableCell>
                                        <TableCell  ><strong>Total</strong></TableCell>
                                        <TableCell  ><strong></strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rowsOrders.map((row, index) => (
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
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}