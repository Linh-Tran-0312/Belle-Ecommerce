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
import { useSelector, useDispatch } from "react-redux";
import orderActions from "../actions/order";
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontFamily: 'Roboto Slab',
        textAlign: 'center',
        padding: 8
    },
    body: {
        fontSize: 14,
    }
    
}))(TableCell);
const useStyle = makeStyles((theme) =>({
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
    priceCol : {
        [theme.breakpoints.down('xs')] : {
            display: 'none'
        }
    },
    bodyXs : {
        fontWeight: 600,
        [theme.breakpoints.down('xs')] : {
            fontSize: '12px'
        }
    },
    noteTextField : {
       
        marginTop: 15,
        '& .MuiOutlinedInput-root' : {
            borderRadius: 0,
        }
    }
}))
export default () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const subTotal = useSelector(state => state.order).subTotal;
    const items = useSelector(state => state.order).items;
    const orderId = useSelector(state => state.order).orderId;

    const handleDeleteItem = (id, itemId) => {
        if(orderId) 
        {   
            dispatch(orderActions.deleteItem(orderId, itemId))
        } else {
            dispatch(orderActions.deleteItemFromCart(id))

        }
      
    }
    
    return (
        <Layout>
            <div className="breadCrumbs" style={{ marginBottom: 0 }}>
                <div className="pageTitle">
                    <Box textAlign="center" py={1}>
                        <Typography variant="inherit">YOUR CART</Typography>
                    </Box>
                </div>
            </div>
            <Box mx={2} my={4}>
             { items.length > 0 ? (
                <Grid container spacing={3}   direction="row" justifyContent="center">
                    <Grid item lg={8} md={8} sm={12}>                      
                        <TableContainer >
                            <Table className={classes.table}  aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell >PRODUCT</StyledTableCell>
                                        <StyledTableCell classes={{ head: classes.priceCol}} >PRICE</StyledTableCell>
                                        <StyledTableCell  >QUANTITY</StyledTableCell>
                                        <StyledTableCell  >TOTAL</StyledTableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.map((item, index) => (
                                        <TableRow key={index}>
                                            <StyledTableCell component="th" scope="row">
                                                <Grid container spacing={1}>
                                                    <Grid item sm={4} xs={12} container direction="row" justifyContent="center" alignItems="center">
                                                        <img src={item.productVariant.product.imgPaths[0]} className={classes.itemImg} alt="" />
                                                    </Grid>
                                                    <Grid item sm={8} xs={12}>
                                                        <Link to="/product" className="link"><Typography variant="body2" gutterBottom classes={{body2: classes.bodyXs}}>{item.productVariant.product.name}</Typography></Link>
                                                        <Typography variant="caption" display="block" gutterBottom>Color: {item.productVariant.color.name}</Typography>
                                                        <Typography variant="caption" display="block"   gutterBottom>Size: {item.productVariant.size.name}</Typography>
                                                    </Grid>   
                                                </Grid>
                                            </StyledTableCell>
                                            <StyledTableCell align="right"  classes={{ body: classes.priceCol}} >{item.unitPrice.toLocaleString()} VND</StyledTableCell>
                                            <StyledTableCell align="right">
                                                <QtyButton width={80} height={27} updateCart={true} quantity={item.quantity}  itemId={item?.id} variantId={item.productVariant.id} />
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                <Grid container>
                                                    <Grid item sm={8} xs={12} container direction="row" justifyContent="center" alignItems="center">
                                                    <Typography variant="subtitle2">{(item.unitPrice*item.quantity).toLocaleString()} VND</Typography>
                                               
                                                    </Grid>
                                                    <Grid item sm={4} xs={12} container direction="row" justifyContent="center" alignItems="center">
                                                        <IconButton size="small" onClick={() => handleDeleteItem(item.productVariant.id, item.id)}><DeleteForeverIcon/></IconButton>
                                                    </Grid>
                                                </Grid>
                                            </StyledTableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        </Grid>
                         <Grid item lg={4} md={4} sm={12}>
                           {/* <Box p={3} border={1} borderColor="grey.500"> 
                               <Typography variant="body2" gutterBottom>ADD A NOTE TO YOUR ORDER</Typography>
                               <TextField multiline fullWidth rows={7} variant="outlined" label="" classes={{ root : classes.noteTextField}}/>
                            </Box>  
                             */}<Box  p={3} border={1} borderColor="grey.500">
                                <Grid container direction="row" justifyContent="space-between">
                                        <Typography variant="body2" gutterBottom classes={{body2: classes.bodyXs}}>SUBTOTAL</Typography>
                                        <Typography variant="body2" gutterBottom classes={{body2: classes.bodyXs}}>{subTotal.toLocaleString()}</Typography>
                                </Grid>
                                <Typography variant="caption" gutterBottom>Shipping &amp; taxes calculated at checkout</Typography>
                                <Box>
                                <Box my={2}>
                                    <Link to="/checkout" className="linkWhite"><BlackButton width={'100%'}>check out</BlackButton></Link>
                                  
                                </Box>
                                <img alt="" src={window.location.origin + "/payment-img.jpg"} style={{ width: '100%'}}/>
                               
                            </Box> 
                            </Box> 
                                     
                      </Grid>
                     </Grid>
                        ) : (<Box textAlign="center" >
                        <Typography variant="h5">Your cart is empty</Typography>
                        <img alt="empty-cart" style={{width: "50vw"}} src="../empty-cart.png"/>
                        </Box>
                        )
                    }
                       
                    
                   
               
            </Box>
        </Layout>
    )
}