import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import MoreIcon from '@material-ui/icons/More';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Stepper from "./OrderStepper";
import { TableRow, Grid, Typography, Box, Button, Divider, IconButton, MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';
function rand() {
    return Math.round(Math.random() * 20) - 10;
}
const StyledTableCell = withStyles((theme) => ({
    head: {
        color: theme.palette.common.black,
        fontFamily: 'Roboto Slab',

        padding: 8,
        border: '1px solid #e8e9eb'
    },
    body: {
        fontSize: 14,
        border: '1px solid #e8e9eb',
        [theme.breakpoints.down('xs')]: {
            fontSize: 12,
        }
    },
    root: {
        [theme.breakpoints.down('xs')]: {
            padding: 6
        }
    }

}))(TableCell);
function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: "90vw",
        maxWidth: 700,
        maxHeight: "95vh",
        backgroundColor: theme.palette.background.paper,

        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        overflow: "scroll"
    },
    formControl: {
        minWidth: 240,
        margin: 20
    },
    button : {
        display: "flex",
        justifyContent: "space-around"
    }
}));

export default function SimpleModal() {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [detail, setDetail] = React.useState({})
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {

    }
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <Typography variant="subtitle2">Ma don hang: 22</Typography>
            <Typography variant="subtitle2">Ngay dat hang: 12/09/2021</Typography>

            <Box my={2}>
                <Typography variant="h6">Thong tin Khach Hang</Typography>
                <Typography variant="body2">Ho Ten: Nguyen Van A</Typography>
                <Typography variant="body2">So dien thoai: 098324627</Typography>
                <Typography variant="body2">Email: test2@gmail.com</Typography>
            </Box> <Grid container>
                <Grid item xs={12}>
                    <Box textAlign="center" my={1}>
                        <Typography variant="h6">Danh sach san pham</Typography>
                    </Box>
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
                                        <StyledTableCell align="center">$943491</StyledTableCell>
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
                </Grid>
            </Grid>
            <Box my={2}>
                <Typography variant="subtitle2">Tinh trang thanh toan: Chua Thanh toan</Typography>
                <Typography variant="caption">Luu y: There are two ways to programmatically access the current selection data: using ... Retrieve custom attribute value of the first selected element ...
                </Typography>

            </Box>
            <Divider />
            <Box my={2}>
                <Typography variant="subtitle2"><strong>Tinh trang don hang</strong></Typography>
                <Stepper />
            </Box>
            <Box my={2}>
                <Typography variant="subtitle2"><strong>Hinh thuc thanh toan: COD</strong></Typography>
                
            </Box>
            <Box my={2}>
                <Typography variant="subtitle2"><strong>Tinh trang thanh toan</strong></Typography>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Payment Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value="false"
                        onChange={handleChange}
                        label="Payment Status"
                        name="paymentStatus"
                    >

                        <MenuItem value={true}>This order's already been paid</MenuItem>
                        <MenuItem value={false} selected>This order's not yet been paid</MenuItem>

                    </Select>
                </FormControl>
            </Box>
            <Divider />
            <Box my={2} className={classes.button}>
            <Button variant="contained" color="secondary">Delete</Button>
            <Button variant="contained" color="default">Cancel</Button>
                <Button variant="contained" color="primary">SAVE</Button>
            </Box>
                            
        </div>
    );

    return (
        <div>
            <IconButton type="button" onClick={handleOpen}>
                <MoreIcon />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}
