import Layout from "../components/Layout"
import "../App.css";
import { Box, Typography, Grid, IconButton, TextField } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import QtyButton from "../components/QtyButton";
import { Link } from 'react-router-dom';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import BlackButton from "../components/BlackButton";

const StyledTableCell = withStyles((theme) => ({
    head: {
        color: theme.palette.common.black,
        fontFamily: 'Roboto Slab',

        padding: 8,
        border: '1px solid #e8e9eb'
    },
    body: {
        fontSize: 14,
        border: '1px solid #e8e9eb'
    }

}))(TableCell);
const useStyle = makeStyles((theme) => ({
    itemImg: {
        width: '70px',
        height: '90px',
        objectFit: 'cover',
        objectPosition: 'top',
        marginButton: '10px'
    },
    table: {
        minWidth: 350,
    },
    priceCol: {
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    bodyXs: {
        fontWeight: 600,
        [theme.breakpoints.down('xs')]: {
            fontSize: '12px'
        }
    },
    noteTextField: {

        marginTop: 15,
        '& .MuiOutlinedInput-root': {
            borderRadius: 0,
        }
    }
}))
export default () => {
    const classes = useStyle();
    return (
        <Layout>
            <div className="breadCrumbs" style={{ marginBottom: 0 }}>
                <div className="pageTitle">
                    <Box textAlign="center" py={1}>
                        <Typography variant="inherit">CHECK OUT</Typography>
                    </Box>
                </div>
            </div>
            <Box mx={2} my={4}>
                <Grid container spacing={3} direction="row" justifyContent="center">
                    <Grid item lg={6} md={6} sm={12}>
                        <Box p={3} border={1} borderColor="grey.500">
                            <h3 variant="h6" className="fontRoSlab">YOUR ORDER</h3>
                            <TableContainer >
                                <Table className={classes.table} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell component="th" scope="row">Product Name</StyledTableCell>
                                            <StyledTableCell align="center"  >Price</StyledTableCell>
                                            <StyledTableCell align="center"  >Size</StyledTableCell>
                                            <StyledTableCell align="center" >Qty</StyledTableCell>
                                            <StyledTableCell align="center" >Subtotal</StyledTableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {[1, 2, 3].map((item) => (
                                            <TableRow key={item}>
                                                <StyledTableCell component="th" scope="row">Spike Jacket</StyledTableCell>
                                                <StyledTableCell align="center" >$99</StyledTableCell>
                                                <StyledTableCell align="center">XL</StyledTableCell>
                                                <StyledTableCell align="center">1</StyledTableCell>
                                                <StyledTableCell align="center">$991</StyledTableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow  >
                                            <StyledTableCell colSpan={4} component="th" align="right" scope="row">Shipping</StyledTableCell>
                                            <StyledTableCell align="center">$33</StyledTableCell>

                                        </TableRow>
                                        <TableRow  >
                                            <StyledTableCell colSpan={4} component="th" align="right" scope="row">Total</StyledTableCell>
                                            <StyledTableCell align="center">$330</StyledTableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Box>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12}>
                        <Box p={3} border={1} borderColor="grey.500">
                            <h3 variant="h6" className="fontRoSlab">BILLING DETAILS</h3>
                            <Box my={2} >
                                <Grid container spacing={2}>
                                    <Grid item lg={6} md={4} sm={6} xs={12}>
                                        <TextField label="First Name" variant="outlined" fullWidth required />
                                    </Grid>
                                    <Grid item lg={6} md={4} sm={6} xs={12}>
                                        <TextField label="Last Name" variant="outlined" fullWidth required />
                                    </Grid>
                                </Grid>

                            </Box>
                            <Box my={2}>
                                <Grid container spacing={2}>
                                    <Grid item lg={6} md={4} sm={6} xs={12}>
                                        <TextField label="Email" variant="outlined" fullWidth required />
                                    </Grid>
                                    <Grid item lg={6} md={4} sm={6} xs={12}>
                                        <TextField label="Telephone" variant="outlined" fullWidth required />
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box my={2}>
                                <Grid container spacing={2}>
                                    <Grid item lg={6} md={4} sm={6} xs={12}>
                                        <TextField label="City" variant="outlined" fullWidth required />
                                    </Grid>
                                    <Grid item lg={6} md={4} sm={6} xs={12}>
                                        <TextField label="District" variant="outlined" fullWidth required />
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box my={2}>
                                <Grid container spacing={2}>
                                    <Grid item lg={6} md={4} sm={6} xs={12}>
                                        <TextField label="Ward" variant="outlined" fullWidth required />
                                    </Grid>
                                    <Grid item lg={6} md={4} sm={6} xs={12}>
                                        <TextField label="Street" variant="outlined" fullWidth required />
                                    </Grid>
                                </Grid>

                            </Box>
                            <TextField multiline fullWidth rows={7} variant="outlined" label="" classes={{ root: classes.noteTextField }} />
                        </Box>
                        <Box mt={3} p={3} border={1} borderColor="grey.500">
                            <Grid container direction="row" justifyContent="space-between">
                                <Typography variant="body2" gutterBottom classes={{ body2: classes.bodyXs }}>SUBTOTAL</Typography>
                                <Typography variant="body2" gutterBottom classes={{ body2: classes.bodyXs }}>$735.00</Typography>
                            </Grid>
                            <Typography variant="caption" gutterBottom>Shipping &amp; taxes calculated at checkout</Typography>
                            <Box>
                                <Box my={2}>
                                    <BlackButton width={'100%'}>check out</BlackButton>
                                </Box>
                                <img alt="" src={window.location.origin + "/payment-img.jpg"} style={{ width: '100%' }} />

                            </Box>
                        </Box>

                    </Grid>
                </Grid>
            </Box>
        </Layout>
    )
}