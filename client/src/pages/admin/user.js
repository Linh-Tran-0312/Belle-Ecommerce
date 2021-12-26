import { Box, Button, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SaveIcon from '@material-ui/icons/Save';
import Pagination from '@material-ui/lab/Pagination';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import userActions from "../../actions/adminUser";
import OrderDetail from "../../components/Admin/OrderDetailModal";
import OrderStatus from "../../components/OrderStatus";
import { displayMonDDYYYY } from "../../helper/handleTime";
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
const initUser = {
    id: "",
    fname: "",
    lname: "",
    password: "",
    confirm_password: "",
    role: "",
    phone: "",
    email: "",
    address: ""
};
const initFilter = {
    search: "",
    role: "",
    sortMethod: "",
    limit: 5,
    page: 1

}
export default () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const users = useSelector(state => state.adminUser).users;
    const userDetail = useSelector(state => state.adminUser).user;
    const userTotal = useSelector(state => state.adminUser).total;
    const loading = useSelector(state => state.adminUser).userLoading;

    const [filter, setFilter] = useState(initFilter);
    const [ user, setUser ] = useState(initUser);
    const [ showUser, setShowUser] = useState(false);
    const [ pageCount, setPageCount] = useState(0)

    useEffect(() => {
        dispatch(userActions.getUsers(filter));
    },[]);
    useEffect(() => {
       setUser({...userDetail});
    },[userDetail]);
    useEffect(() => {
        const mod = userTotal%filter.limit;
        let pageNumber = userTotal/filter.limit;
         pageNumber = mod === 0 ? pageNumber : Math.floor(pageNumber) + 1;
        setPageCount(pageNumber)
    },[userTotal])
    // Handle filter events
    const handleChangePage = (event, value) => {
        setFilter({...filter, page: value});
        dispatch(userActions.getUsers({...filter, page: value}))
    };
    const handleFilterChange = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value })
    }
    const handleSubmitFilter = (e) => {
        e.preventDefault();
        dispatch(userActions.getUsers(filter))
    }
    const handleReset = (e) => {
        setFilter(initFilter);
    }
    // Handle user events
    const handleAddNewUser = () => {
        setUser(initUser);
        setShowUser(true);
    }
    const handleGetUserById = (id) => {
        setShowUser(true);
        dispatch(userActions.getUserById(id));
    }
    const handleUserChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const handleSubmitUser = (e) => {
        e.preventDefault();
        if(user.id === "")
        {
            dispatch(userActions.createUser(user));
        } else {
            dispatch(userActions.updateUser(user.id, user))
        }
         
    }
    return (
        <>
            <Box>
                <form onSubmit={handleSubmitFilter}>
                <Grid container direction="row" justifyContent="flex-start" spacing={1}>
                    <Grid item md={6} sm={12} xs={12}   >
                        <TextField fullWidth id="outlined-basic" onChange={handleFilterChange} name="search" value={filter.search} label="Search" placeholder="Search user's information" variant="outlined" />
                    </Grid>
                    <Grid item md={3} sm={6} xs={6}  >
                        <FormControl fullWidth variant="outlined"  >
                            <InputLabel id="demo-simple-select-outlined-label">User Role</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={filter.role}
                                onChange={handleFilterChange}
                                label="User Role"
                                name="role"
                            >
                                <MenuItem value="">
                                    <em>All</em>
                                </MenuItem>
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="customer">Customer</MenuItem>
                                <MenuItem value="editor">Editor</MenuItem>

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
                                onChange={handleFilterChange}
                                label="Sort"
                                name="sortMethod"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="1">Ascending name</MenuItem>
                                <MenuItem value="2">Descending name</MenuItem>
                                <MenuItem value="3">Ascending sales</MenuItem>
                                <MenuItem value="4">Descending sales</MenuItem>
                                <MenuItem value="5">Ascending createdAt</MenuItem>
                            
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} container direction="row" justifyContent="space-between">
                        <Grid item>
                        <Button variant="contained" color="primary" size="large" className={classes.formButton} type="submit">
                            Apply
                        </Button>
                        <Button variant="contained" color="default" size="large" className={classes.formButton} onClick={handleReset}>
                            Reset
                        </Button>
                        </Grid>
                        <Grid item md={2} xs={12}>
                        <Button variant="contained" color="primary" size="large" fullWidth startIcon={<PersonAddIcon/>} className={classes.formButton} onClick={handleAddNewUser}>
                            New User
                        </Button>
                        </Grid>
                    </Grid>
                </Grid>
                </form>
            </Box>      
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
                                       
                                        <TableCell  ><strong>Role</strong></TableCell>
                                        <TableCell  ><strong>Sales (VND)</strong></TableCell>
                                        <TableCell  ><strong>Details</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((row, index) => (
                                        <TableRow key={row.id}>
                                            <TableCell component="th" scope="row">
                                                {`${(filter.page - 1)*filter.limit + index + 1}`}
                                            </TableCell>
                                            <TableCell  >{`${row.lname} ${row.fname}`}</TableCell>
                                            <TableCell  >{row.email}</TableCell>
                                            <TableCell  >{row.phone}</TableCell>                                         
                                            <TableCell  >{row.role.toUpperCase()}</TableCell>
                                            <TableCell  >{row.sale.toLocaleString()}</TableCell>
                                            <TableCell  ><IconButton size="small" onClick={() => handleGetUserById(row.id)}><MoreHorizIcon /></IconButton></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Box>
            <Box my={5}  >
                <Pagination count={pageCount} page={filter.page} onChange={handleChangePage} />
            </Box>
            <Divider />
            {
                showUser && (
                    <Box>
                    <Grid container spacing={2}>
                        <Grid item sm={5} xs={12}>
                            <form onSubmit={handleSubmitUser}>
                            <Box my={3} px={1}>
                                <Typography variant="h5" color="primary">User Details</Typography>
                            </Box>
                            <Box my={2}>
                            <FormControl fullWidth variant="outlined" required >
                            <InputLabel id="demo-simple-select-outlined-label">User Role</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={user.role}
                                onChange={handleUserChange}
                                label="User Role"
                                name="role"
                            >
                                 
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="customer">Customer</MenuItem>
                                <MenuItem value="editor">Editor</MenuItem>
    
                            </Select>
                        </FormControl>
                            </Box>
                            <Box my={2}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                    <TextField fullWidth type="text" value={user.fname} label="First Name" required  name="fname" variant="outlined" onChange={handleUserChange}/>
                                    </Grid>
                                    <Grid item xs={6}>
                                    <TextField fullWidth type="text" value={user.lname} label="Last Name" required  name="lname" variant="outlined" onChange={handleUserChange}/>
                                    </Grid>
                                </Grid>                   
                            </Box>
                            <Box my={2}>
                                <TextField fullWidth type="email" value={user.email}  label="Email" required  name="email" variant="outlined" onChange={handleUserChange}/>
                            </Box>
                            {
                                user.id === "" && (
                                    <>
                                     <Box my={2}>
                                        <TextField fullWidth type="text" value={user.password} label="Password" required name="password" variant="outlined" onChange={handleUserChange}/>
                                    </Box>
                                    <Box my={2}>
                                        <TextField fullWidth type="text" value={user.confirm_password} label="Confirm Password" required name="confirm_password" variant="outlined" onChange={handleUserChange}/>
                                    </Box>
                                    </>
                                )
                            }
                            <Box my={2}>
                                <TextField fullWidth type="text" name="phone" value={user.phone} label="Phone Number"  variant="outlined" onChange={handleUserChange}/>
                            </Box>
                            <Box my={2}>
                                <TextField fullWidth type="text" name="address" value={user.address}  label="Address" variant="outlined" onChange={handleUserChange}/>
                            </Box>
                            <Box my={2}>
                                <Grid container direction="row" justifyContent='center' spacing={2}>
                                    <Grid item   md={4} xs={4}>
                                        <Button variant="contained" type="submit" color="primary" fullWidth startIcon={<SaveIcon />}  disabled={loading}>Save</Button>
                                    </Grid>
                                </Grid>
                            </Box>
                            </form>
                        </Grid>
                        <Grid item sm={7} xs={12}>
                            {
                                user?.orders?.length > 0 && (
                                    <>
                                     <Box my={3} px={1}>
                                <Typography variant="h5" color="primary">User Orders</Typography>
                            </Box>
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell  ><strong>No</strong></TableCell>
                                            <TableCell  ><strong>Date</strong></TableCell>
                                            <TableCell><strong>OrderId</strong></TableCell>
                                            <TableCell  ><strong>Status</strong></TableCell>
                                            <TableCell  ><strong>Total (VND)</strong></TableCell>
                                            <TableCell  ><strong>Detail</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {user.orders?.map((row, index) => (
                                            <TableRow key={row.id}>
                                                <TableCell component="th" scope="row">
                                                    {`${index + 1}`}
                                                </TableCell>
                                                <TableCell  >{displayMonDDYYYY(row.orderAt)}</TableCell>
                                                <TableCell  >{row.id}</TableCell>
                                                <TableCell  ><OrderStatus status={row.status}/></TableCell>
                                                <TableCell  >{row.total.toLocaleString()}</TableCell>
                                                <TableCell  ><OrderDetail id={row.id} role="admin"/></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                                    </>
                                )
                            }
                           
                        </Grid>
                    </Grid>
                </Box>
                )
            }
          
        </>
    )
}