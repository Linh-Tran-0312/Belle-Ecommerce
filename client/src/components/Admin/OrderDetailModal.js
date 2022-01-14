import { Box, Button, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TableRow, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import MoreIcon from '@material-ui/icons/More';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import orderAdminActions from '../../actions/adminOrder';
import orderUserActions from '../../actions/order';
import { ORDER_STATUS } from '../../constants';
import OrderStatus from '../OrderStatus';
import Stepper from "./OrderStepper";
import { displayDDMMYYYY } from '../../helper/handleTime';
import { Link } from "react-router-dom";
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
    link: {
        textDecoration: "none",
        color: "black",
        "&:hover" : {
            color: "#1976d2"
        }
    }

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
    const [detail, setDetail] = React.useState();
    const [loading, setLoading ] = React.useState(false);
    const [ detailLoading, setDetailLoading ] = React.useState(false);
    const detailAdmin = useSelector(state => state.adminOrder).order;
    const loadingAdmin = useSelector(state => state.adminOrder).loading;
    const detailLoadingAdmin =  useSelector(state => state.adminOrder).detailLoading;

    const detailUser = useSelector(state => state.order).order;
    const loadingUser = useSelector(state => state.order).loading;
    const detailLoadingUser =  useSelector(state => state.order).detailLoading;

    const dispatch = useDispatch();
    const [state, setState] = React.useState(initState);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleRefreshOrder = () => {
        if (role === "admin") {
            dispatch(orderAdminActions.getOrderById(id))
        } else {
            dispatch(orderUserActions.getOrderById(id))
        }
    }
    useEffect(() => {
        if (open === true) {
            if (role === "admin") {
                dispatch(orderAdminActions.getOrderById(id))
            } else {
                dispatch(orderUserActions.getOrderById(id))
            }
        }
    }, [open])
    useEffect(() => {
        if (role === "admin") {
            setDetail(detailAdmin);
            setState({ status: detailAdmin?.status, paymentCheck: detailAdmin?.paymentCheck, paymentMethod: detailAdmin?.paymentMethod })
        } else {
            setDetail(detailUser);
            setState({ status: detailUser?.status, paymentCheck: detailUser.paymentCheck, paymentMethod: detailUser.paymentMethod })
        }
    }, [detailAdmin, detailUser])

    useEffect(() => {
        if (role === "admin") {
            setLoading(loadingAdmin)   
     } else {
             setLoading(loadingUser)   
        }
    },[loadingAdmin,loadingUser]);
    useEffect(() => {
        if (role === "admin") {
            setDetailLoading(detailLoadingAdmin)   
     } else {
             setDetailLoading(detailLoadingUser)   
        }
    },[detailLoadingAdmin,detailLoadingUser]);

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }
    const handleSubmitOrder = (e) => {
        dispatch(orderAdminActions.updateOrderStatus(detail.id, state));

    }
    const body = () => {
        if (!detail?.id) return (
        <div style={modalStyle} className={classes.paper}>
        <Grid container direction="column" justifyContent='center' alignItems="center">
            <Grid item>
                <Box my={2}>
                <ErrorOutlineIcon style={{ color: "F44336", fontSize: "40px" }} />
                </Box>
            </Grid>
            <Grid item>
                <Typography variant="h6" color="error">Loading order details failed !</Typography>
                <Box textAlign="center" my={2}>
                <Button onClick={handleRefreshOrder} variant="contained" color="default">Try again</Button>
                </Box>
            </Grid>
        </Grid>
        </div>)
        return (<div style={modalStyle} className={classes.paper}>
            <Typography variant="subtitle2">Mã đơn hàng: {detail?.id}</Typography>
            <Typography variant="subtitle2">Ngày đặt hàng: {displayDDMMYYYY(detail?.orderAt)}</Typography>

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
                                        <Link className={classes.link} to={`/shop/product/${item?.product?.id}`}>  
                                            <Typography variant="subtitle2">{`${item?.product?.name} (${item?.product?.brand}) `}</Typography>  </Link>
                                            <Typography variant="caption">{item?.productVariant?.color?.name}</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="center" >{item?.unitPrice?.toLocaleString()}</StyledTableCell>
                                        <StyledTableCell align="center">{item?.product?.size}</StyledTableCell>
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
                <Typography variant="subtitle2">{detail?.note && `Lưu ý giao hàng: ${detail?.note}`}
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
                         {/*        <Grid item md={2} sm={2} xs={3}>
                                    <Button variant="contained" fullWidth color="secondary" disabled={loading}>Delete</Button>
                                </Grid> */}
                                <Grid item md={2} sm={2} xs={3}>
                                    <Button variant="contained" fullWidth color="default" onClick={handleClose}  disabled={loading}>Cancel</Button>
                                </Grid>
                                <Grid item md={2} sm={2} xs={3}>
                                    <Button variant="contained" fullWidth color="primary" onClick={handleSubmitOrder}  disabled={loading}>SAVE</Button>
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
                   detailLoading ?
                   (<div style={modalStyle} className={classes.paper}>

                    <Grid container direction="column" justifyContent='center' alignItems="center">
                       <Grid item>
                           <Box mt={3}>
                           <CircularProgress />
                           </Box>
                       </Grid>
                       <Grid item>
                        <Typography variant="subtitle1" color="inherit">Loading order details...</Typography>
                        </Grid>
                   </Grid></div> ): body()
                }

            </Modal>
        </div>
    );
}
