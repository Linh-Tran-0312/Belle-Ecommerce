import { Box, CircularProgress, Grid, RadioGroup, TextField, Typography } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import orderActions from "../actions/order";
import "../App.css";
import BlackButton from "../components/BlackButton";
import SuccessOrderModal from "../components/SuccessOrderModal";
import shipCal from "../helper/shipCalculator";
const StyledRadio = withStyles({
    root: {
        color: 'black',
        '&$checked': {
            color: 'black',
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);
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
        [theme.breakpoints.down('xs')] : {
            fontSize: 12,
        }
    },
    root: {
        [theme.breakpoints.down('xs')] : {
            padding: 6
        }
    }

}))(TableCell);
const StyledTextField = withStyles((theme) => ({
    root: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            '&.Mui-focused fieldset': {
                borderColor: '#e8e9eb',
            },
        },
        '& .MuiInputLabel-root': {
            color: 'black'
        },


    }

}))(TextField);
const useStyle = makeStyles((theme) => ({
    itemImg: {
        width: '70px',
        height: '90px',
        objectFit: 'cover',
        objectPosition: 'top',
        marginButton: '10px'
    },
    table: {
        minWidth: 320,
        marginBottom: 20,
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
    },
    root: {
        width: '100%',
    },
}))
const initState = {
    address: "",
    paymentMethod: "cod",
    note: "",
    shipping: 0
}
export default () => {
    const classes = useStyle();
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();

    const items = useSelector(state => state.order.items);
    const orderId = useSelector(state => state.order.orderId);
    const subTotal = useSelector(state => state.order.subTotal);
    const loading = useSelector(state => state.order.loading);
    const orderSuccess =  useSelector(state => state.order.orderSuccess);
    const user = useSelector(state => state.userAuth.user);
    
    const shipping = shipCal(subTotal);
    const [ state, setState ] = useState({...initState, shipping: shipping,address: user?.address});
    const [ info, setInfo ] = useState({lname: user?.lname, fname: user?.fname, email: user?.email, phone: user?.phone})
    
    useEffect(() => {
       setState({...state,shipping: shipCal(subTotal) })
    },[subTotal]);

    useEffect(() => {
        if(orderSuccess) {
            setTimeout(() => {
                dispatch(orderActions.clearOrder())
            },6000)
        }
    },[orderSuccess])
    const handleChange = (e) => {
        setState({...state, [e.target.name] : e.target.value});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(orderActions.placeOrder(orderId, state))

    }
    if(items?.length == 0 ) return <Redirect to="/cart" />
    return (
        <>
            <div className="breadCrumbs" style={{ marginBottom: 0 }}>
                <div className="pageTitle">
                    <Box textAlign="center" py={1}>
                        <Typography variant="inherit">CHECK OUT</Typography>
                    </Box>
                </div>
            </div>
            <Box mx={2} my={4}>
                <form onSubmit={handleSubmit}>
                <Grid container spacing={3} direction="row" justifyContent="center">
                    <Grid item lg={6} md={6} sm={12}>
                        <Box sx={{ padding: { xs: 2, sm : 3 }}}  border={1} borderColor="grey.500">
                            <h3 variant="h6" className="fontRoSlab">BILLING DETAILS</h3>
                     <Box my={2} >
                                <Grid container spacing={2}>
                                    <Grid item lg={6} md={4} sm={6} xs={12}>
                                    <Typography variant="subtitle2" gutterBottom>First name</Typography>                             
                                        <StyledTextField   value={info.fname}  disabled variant="outlined" fullWidth required />
                                    </Grid>
                                    <Grid item lg={6} md={4} sm={6} xs={12}>
                                    <Typography variant="subtitle2" gutterBottom>Last name</Typography>                             
                                        <StyledTextField   value={info.lname}  disabled  variant="outlined" fullWidth required />
                                    </Grid>
                              </Grid>
                            </Box> 
                            <Box my={2}>
                                <Grid container spacing={2}>
                                    <Grid item lg={6} md={4} sm={6} xs={12}>
                                    <Typography variant="subtitle2" gutterBottom>Email</Typography>                             
                                    <StyledTextField  variant="outlined" value={info.phone} disabled  fullWidth required />
                                    </Grid>
                                    <Grid item lg={6} md={4} sm={6} xs={12}>
                                    <Typography variant="subtitle2" gutterBottom>Phone number</Typography>                             
                                        <StyledTextField  variant="outlined" value={info.phone} disabled  fullWidth required />
                                    </Grid>
                                </Grid>
                            </Box> 
                            <Box my={2}> 
                            <Typography variant="subtitle2" gutterBottom>Address*</Typography>                             
                                    <StyledTextField variant="outlined" onChange={handleChange} value={state.address} name="address" fullWidth required />                                
                            </Box>
                        
                            <Typography variant="caption">Your note:</Typography>
                            <StyledTextField multiline fullWidth rows={7} variant="outlined" onChange={handleChange}  value={state.note} name="note" classes={{ root: classes.noteTextField }} />
                        </Box>
                    </Grid>
               
                    <Grid item lg={6} md={6} sm={12}>
                        <Box sx={{ padding: { xs: 2, sm : 3 }}} border={1} borderColor="grey.500">
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
                                        {items.map((item) => (
                                            <TableRow key={item.id}>
                                        <StyledTableCell component="th" scope="row">
                                            <Typography variant="subtitle2">  {`${item?.product?.name} (${item?.product?.brand}) `} </Typography>
                                            <Typography variant="caption">{item?.product?.color}</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="center" >{item?.unitPrice?.toLocaleString()}</StyledTableCell>
                                        <StyledTableCell align="center">{item?.product?.size}</StyledTableCell>
                                        <StyledTableCell align="center">{item?.quantity}</StyledTableCell>
                                        <StyledTableCell align="center">{(item?.unitPrice * item?.quantity).toLocaleString()}</StyledTableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow  >
                                            <StyledTableCell colSpan={4} component="th" align="right" scope="row">Shipping</StyledTableCell>
                                            <StyledTableCell align="center">{state?.shipping?.toLocaleString()}</StyledTableCell>

                                        </TableRow>
                                        <TableRow>
                                            <StyledTableCell colSpan={4} component="th" align="right" scope="row">Total</StyledTableCell>
                                            <StyledTableCell align="center">{(subTotal + state?.shipping)?.toLocaleString()}</StyledTableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <hr />
                            <h3 variant="h6" className="fontRoSlab">PAYMENT METHOD</h3>
                            <div className={classes.root}>
                            <RadioGroup aria-label="payment" name="paymentMethod" value={state.paymentMethod} onChange={handleChange} required >

                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-label="Expand"
                                        aria-controls="additional-actions1-content"
                                        id="additional-actions1-header"
                                    >

                                            <FormControlLabel
                                                aria-label="Acknowledge"
                                                onClick={(event) => event.stopPropagation()}
                                                onFocus={(event) => event.stopPropagation()}
                                                control={<StyledRadio />}
                                                label="CASH ON DELIVERY"
                                                value="cod"
                                            />
                                  
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography color="textSecondary">
                                        Khi chọn phương thức thanh toán này, quý khách hàng sẽ trả tiền mặt cho nhân viên giao hàng ngay khi nhận được đơn hàng của mình.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-label="Expand"
                                        aria-controls="additional-actions2-content"
                                        id="additional-actions2-header"
                                    >

                                            <FormControlLabel
                                                aria-label="Acknowledge"
                                                onClick={(event) => event.stopPropagation()}
                                                onFocus={(event) => event.stopPropagation()}
                                                control={<StyledRadio />}
                                                label="DIRECT BANK TRANSFER"
                                                value="banktransfer"
                                            />
                                    </AccordionSummary>
                                    <AccordionDetails>
                                    <Box>
                                        <Typography color="textSecondary">
                                            Quý khách vui lòng thanh toán chuyển khoản qua thông tin số tài khoản sau:
                                        </Typography>
                                        <Typography color="textSecondary">
                                         Tên tài khoản: TRẦN CHÍ LINH
                                        </Typography>
                                        <Typography color="textSecondary">
                                         Số tài khoản: 567393724XXXXX
                                        </Typography>
                                        <Typography color="textSecondary">
                                          Tại ngân hàng Agribank chi nhánh Bình thạnh
                                        </Typography>
                                        <Typography color="textSecondary">
                                          Nội dung chuyển khoản: BELLE-TT-[mã đơn hàng] (sau khi đặt hàng quý khác sẽ được cung cấp mã đơn hàng)
                                        </Typography>
                                        </Box>
                                    </AccordionDetails>
                                </Accordion>
                                </RadioGroup>
                            </div>
                            <Box my={2} textAlign="center">
                                <SuccessOrderModal state={orderSuccess} history={history}/>
                                    <BlackButton height='50px' width="150px" type="submit" disabled={loading}>{ loading ? <CircularProgress style={{color: "white"}} size={30}/> : <strong>place order</strong>}</BlackButton>
                            </Box>
                        </Box>
                    </Grid>
                  </Grid>
                  </form>
            </Box>
        </>
    )
}