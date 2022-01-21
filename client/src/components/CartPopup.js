import { Badge, Box, Grid, IconButton, makeStyles, Popover, Typography } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import orderActions from "../actions/order";
import "../App.css";
import BlackButton from "./BlackButton";
import QtyButton from './QtyButton';
const useStyle = makeStyles(() => ({
    link: {
        textDecoration: 'none',
        color: 'white'
    },
    img: {
        width: '70px',
        height: '90px',
        objectFit: 'cover',
        objectPosition: 'top'
    },
    cart: {
        width: 300,
        maxHeight: 400,
        boxShadow: 'none',
        borderRadius: 0,
        padding: 20,
        border: '1px solid #e8e9eb',
        overScroll: 'scroll'
    }
}))
const Item = ({item}) => {
    const dispatch = useDispatch();

    const handleDeleteItem = (e) => {
        if(item.orderId) 
        {   
            dispatch(orderActions.deleteItem(item.orderId, item.id))
        } else {
            dispatch(orderActions.deleteItemFromCart(item.productVariantId))

        }
    }

    const classes = useStyle()
    return (
        <Box mb={2}>
            <Grid container>
                <Grid item xs={4}>
                    <img src={item.product.imgPaths[0]} className={classes.img} alt="" />
                </Grid>
                <Grid item xs={6}>
                    <Link to="/product" className="link"><Typography variant="body2" noWrap>{item.product.name}</Typography></Link>
                    <Typography variant="caption" gutterBottom>{item.product.color} | {item.product.size}</Typography>
                    <Box>
                        <Grid container direction="row" alignItems="center">
                            <Grid item xs={3}>
                                <Typography variant="subtitle2">Qty</Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <QtyButton width={80} height={27}  updateCart={true} quantity={item.quantity} itemId={item?.id} variantId={item.productVariantId}/>
                            </Grid>
                        </Grid>
                    </Box>
                    <Typography variant="subtitle2">{item.unitPrice.toLocaleString()}</Typography>
                </Grid>
                <Grid item xs={2} container direction="row" alignItems="flex-start" justifyContent="center" >
                    <IconButton size="small" onClick={handleDeleteItem}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    )
}
const ItemList = () => {
    const classes = useStyle();
    const subTotal = useSelector(state => state.order).subTotal;
    const items = useSelector(state => state.order).items;

    return (
        <Box>
        <Box>
            {
                items.length > 0 ? (
                    items.map((item, index) => <Item key={index} item={item}/>)
                ) : (
                    <Typography variant="body2">Your cart is empty now</Typography>
                )
            }
        </Box>
        <hr />
        <Grid container direction="row" justifyContent="space-between">
            <Grid item xs={6}>
                <Typography variant="body2">CART SUBTOTAL:</Typography>
            </Grid>
            <Grid item xs={6}>
                <Box textAlign="right">
                    <Typography variant="body1">{subTotal.toLocaleString()} VND</Typography>
                </Box>
            </Grid>
        </Grid>
        <hr />
        <Grid container direction="row" justifyContent="center" spacing={1}>
            <Grid item xs={6} container direction="row" justifyContent="center" >
               
                <BlackButton width={'100%'}> <Link to="/cart"className={classes.link}><Typography variant="caption" color="inherit">view cart</Typography></Link></BlackButton>
                

            </Grid>
            <Grid item xs={6} container direction="row" justifyContent="center">
                <BlackButton width={'100%'}><Link to="/checkout"className={classes.link}><Typography variant="caption" color="inherit">check out</Typography></Link></BlackButton>
            </Grid>
        </Grid>
    </Box>
    )
}
export default function CartPopover() {
    const dispatch = useDispatch();
    const items = useSelector(state => state.order).items;
    const classes = useStyle();
    const [anchorEl, setAnchorEl] = useState(null);

        const user = useSelector(state => state.userAuth.user)
    useEffect(() => {
        if(user?.id) {
            dispatch(orderActions.getCurrentOrder(user.id));
        }
    },[user])
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div >
            <IconButton color="inherit" onClick={handleClick}>
                <Badge
                    badgeContent={items.length}
                    color="error"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}>
                    <LocalMallOutlinedIcon />
                </Badge>
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                classes={{ paper: classes.cart }}

            >
             <ItemList />
            </Popover>
        </div>
    );
}