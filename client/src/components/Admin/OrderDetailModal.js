import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import MoreIcon from '@material-ui/icons/More';
import SettingsIcon from '@material-ui/icons/Settings';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Stepper from "./OrderStepper";
import orderAdminActions from '../../actions/adminOrder';
import orderUserActions from '../../actions/order';
import CircularProgress from '@material-ui/core/CircularProgress';
import OrderStatus from '../OrderStatus';
import { ORDER_STATUS } from '../../constants';
import { TableRow, Grid, Typography, Box, Button, Divider, IconButton, MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';
 
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

}));

const initState = {
    status: "",
    paymentCheck: "",
    paymentMethod: ""
}
export default function SimpleModal({ id, role }) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [ detail, setDetail] = React.useState();

     const detailAdmin = useSelector(state => state.adminOrder).order;
 
    const  detailUser = useSelector(state => state.order).order;
 
    
    const dispatch = useDispatch();
    const [state, setState] = React.useState(initState);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if(open === true) {
            if(role === "admin") {
                console.log("AA")
                dispatch(orderAdminActions.getOrderById(id))
            } else {
                dispatch(orderUserActions.getOrderById(id))
            }
        }
       
     
    }, [open])
    useEffect(() => {
        if(role === "admin") {
            setDetail(detailAdmin);
            setState({ status: detailAdmin.status, paymentCheck: detailAdmin.paymentCheck, paymentMethod: detailAdmin.paymentMethod })
        } else {
            setDetail(detailUser);
            setState({ status: detailUser.status, paymentCheck: detailUser.paymentCheck, paymentMethod: detailUser.paymentMethod })
        }
    },[detailAdmin, detailUser])
 

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }
    const handleSubmitOrder = (e) => {
        dispatch(orderAdminActions.updateOrderStatus(detail.id, state));

    }
    const body = () => {
        if (!detail?.id) return <CircularProgress />
        return (<div style={modalStyle} className={classes.paper}>
            <Typography variant="subtitle2">Mã đơn hàng: {detail?.id}</Typography>
            <Typography variant="subtitle2">Ngày đặt hàng: {new Date(detail?.orderAt).toLocaleDateString()}</Typography>

            <Box my={2}>
                <Typography variant="h6">Thông tin khách hàng</Typography>
                <Typography variant="body2">Tên: {`${detail?.user?.lname} ${detail?.user?.fname}`}</Typography>
                <Typography variant="body2">Số điện thoại: {detail?.user?.phone}</Typography>
                <Typography variant="body2">Email:  {detail?.user?.email}</Typography>
            </Box> <Grid container>
                <Grid item xs={12}>
                    <Box textAlign="center" my={1}>
                        <Typography variant="h5">HÓA ĐƠN</Typography>
                    </Box>
                    <TableContainer >
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell component="th" scope="row">Sản phẩm</StyledTableCell>
                                    <StyledTableCell align="center"  >Đơn giá(VNĐ)</StyledTableCell>
                                    <StyledTableCell align="center"  >Size</StyledTableCell>
                                    <StyledTableCell align="center" >Số lượng</StyledTableCell>
                                    <StyledTableCell align="center" >Thành tiền (VNĐ)</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {detail?.details?.map((item, index) => (
                                    <TableRow key={index}>
                                        <StyledTableCell component="th" scope="row">
                                            <Typography variant="subtitle2">  {`${item?.productVariant?.product?.name} (${item?.productVariant?.product?.brand?.name}) `} </Typography>
                                            <Typography variant="caption">{item?.productVariant?.color?.name}</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="center" >{item?.unitPrice?.toLocaleString()}</StyledTableCell>
                                        <StyledTableCell align="center">{item?.productVariant?.size?.name}</StyledTableCell>
                                        <StyledTableCell align="center">{item?.quantity}</StyledTableCell>
                                        <StyledTableCell align="center">{(item?.unitPrice * item?.quantity).toLocaleString()}</StyledTableCell>
                                    </TableRow>
                                ))}
                                <TableRow  >
                                    <StyledTableCell colSpan={4} component="th" align="right" scope="row">Phí vận chuyển</StyledTableCell>
                                    <StyledTableCell align="center">{detail?.shipping?.toLocaleString()}</StyledTableCell>

                                </TableRow>
                                <TableRow  >
                                    <StyledTableCell colSpan={4} component="th" align="right" scope="row">Tổng cộng</StyledTableCell>
                                    <StyledTableCell align="center">{detail?.total?.toLocaleString()}</StyledTableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <Box my={2}>
                <Typography variant="subtitle2">Tình trạng thanh toán: <strong>{detail?.paymentCheck ? "Đã thanh toán" : "Chưa thanh toán"}</strong></Typography>
                <Typography variant="subtitle2">{ detail?.note !== "" && `Lưu ý giao hàng: ${detail?.note}`}
                </Typography>

            </Box>
            <Divider />
            <Box my={3}>
               
                {
                   role === "admin" ? (
                        <> 
                        <Box textAlign="center" my={2}>
                            <Typography variant="h6" gutterBottom color="primary">CẬP NHẬT TÌNH TRẠNG ĐƠN HÀNG </Typography>
                        </Box>
                        <Grid container justifyContent="space-between" spacing={2}>
                            <Grid item sm={4} xs={10}>
                                <Box my={2}>
                                    <Box my={2}>
                                        <Typography variant="subtitle2"><strong>Hình thức thanh toán</strong></Typography>
                                    </Box>
                                    <FormControl variant="outlined" fullWidth>
                                        <InputLabel id="demo-simple-select-outlined-label">Payment Methoad</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={state.paymentMethod}
                                            onChange={handleChange}
                                            label="Payment Method"
                                            name="paymentMethod"
                                        >

                                            <MenuItem value="cod">Cash On Delivery</MenuItem>
                                            <MenuItem value="banktransfer" selected>Bank Transfer</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item sm={4} xs={10}>
                                <Box my={2}>
                                    <Box my={2}>
                                        <Typography variant="subtitle2"><strong>Tình trạng thanh toán</strong></Typography>
                                    </Box>
                                    <FormControl variant="outlined" fullWidth>
                                        <InputLabel id="demo-simple-select-outlined-label">Payment Status</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={state.paymentCheck}
                                            onChange={handleChange}
                                            label="Payment Status"
                                            name="paymentCheck"
                                        >
                                            <MenuItem value={true}>Done</MenuItem>
                                            <MenuItem value={false}>Not yet</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item sm={4} xs={10}>
                                <Box my={2}>
                                    <Box my={2}>
                                        <Typography variant="subtitle2"><strong>Tình trạng đơn hàng</strong></Typography>
                                    </Box>
                                    <FormControl variant="outlined" fullWidth>
                                        <InputLabel id="demo-simple-select-outlined-label">Order Status</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={state.status}
                                            onChange={handleChange}
                                            label="Order Status"
                                            name="status"
                                        >
                                            <MenuItem value={ORDER_STATUS.ORDERED}><OrderStatus status={ORDER_STATUS.ORDERED} /></MenuItem>
                                            <MenuItem value={ORDER_STATUS.DELIVERY}  ><OrderStatus status={ORDER_STATUS.DELIVERY} /></MenuItem>
                                            <MenuItem value={ORDER_STATUS.COMPLETED}><OrderStatus status={ORDER_STATUS.COMPLETED} /></MenuItem>
                                            <MenuItem value={ORDER_STATUS.CANCELED}  ><OrderStatus status={ORDER_STATUS.CANCELED} /></MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                        </Grid>
                        </>

                    ) : (
                        <>
                         <Box textAlign="center" my={2}>
                            <Typography variant="h6" gutterBottom color="primary">TÌNH TRẠNG ĐƠN HÀNG </Typography>
                        </Box>
                        <Stepper status={detail?.status} />
                        </>
                        
                    )
                }

            </Box>
            <Divider />
            <Box my={2}>
                <Grid container direction="row" justifyContent='center' spacing={2}>
                    {
                        role === "admin" ? (
                            <>
                                <Grid item md={2} sm={2} xs={3}>
                                    <Button variant="contained" fullWidth color="secondary">Delete</Button>
                                </Grid>
                                <Grid item md={2} sm={2} xs={3}>
                                    <Button variant="contained" fullWidth color="default" onClick={handleClose}>Cancel</Button>
                                </Grid>
                                <Grid item md={2} sm={2} xs={3}>
                                    <Button variant="contained" fullWidth color="primary" onClick={handleSubmitOrder}>SAVE</Button>
                                </Grid>
                            </>
                        ) : (
                            <Grid item md={2} sm={2} xs={3}>
                                <Button variant="contained" fullWidth color="default" onClick={handleClose}>Cancel</Button>
                            </Grid>
                        )
                    }

                </Grid>
            </Box>
        </div >)

    };

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
                {
                    body()
                }

            </Modal>
        </div>
    );
}
