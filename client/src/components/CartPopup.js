import { makeStyles, Box, Grid, Typography, Popover, Badge, IconButton } from "@material-ui/core"
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import QtyButton from './QtyButton';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import "../App.css";
import CloseIcon from '@material-ui/icons/Close';
import BlackButton from "./BlackButton";
import orderActions from "../actions/order";
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
            dispatch(orderActions.deleteItemFromCart(item.productVariant.id))

        }
    }

    const classes = useStyle()
    return (
        <Box mb={2}>
            <Grid container>
                <Grid item xs={4}>
                    <img src={item.productVariant.product.imgPaths[0]} className={classes.img} alt="" />
                </Grid>
                <Grid item xs={6}>
                    <Link to="/product" className="link"><Typography variant="body2" noWrap>{item.productVariant.product.name}</Typography></Link>
                    <Typography variant="caption" gutterBottom>{item.productVariant.color.name} | {item.productVariant.size.name}</Typography>
                    <Box>
                        <Grid container direction="row" alignItems="center">
                            <Grid item xs={3}>
                                <Typography variant="subtitle2">Qty</Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <QtyButton width={80} height={27}  updateCart={true} quantity={item.quantity} itemId={item?.id} variantId={item.productVariant.id}/>
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

export default function CartPopover() {

    const subTotal = useSelector(state => state.order).subTotal;
    const items = useSelector(state => state.order).items;
    const dispatch = useDispatch();
    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('user')));
  
    const classes = useStyle();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        if(user?.id) {
            dispatch(orderActions.getCurrentOrder(user.id));
        }
    },[])
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
            </Popover>
        </div>
    );
}