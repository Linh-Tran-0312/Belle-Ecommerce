import { makeStyles, Box, Grid, Typography, Popover, Badge, IconButton } from "@material-ui/core"
import { Link } from 'react-router-dom';
import { useState } from "react";
import QtyButton from './QtyButton';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import "../App.css";
import CloseIcon from '@material-ui/icons/Close';
import BlackButton from "./BlackButton";
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
const Item = () => {
    const classes = useStyle()
    return (
        <Box mb={2}>
            <Grid container>
                <Grid item xs={4}>
                    <img src={window.location.origin + "/variant1- (1).jpg"} className={classes.img} alt="" />
                </Grid>
                <Grid item xs={6}>
                    <Link to="/product" className="link"><Typography variant="body2" noWrap>Sleeve Kimono Dress Sleeve Kimono Dress</Typography></Link>
                    <Typography variant="caption" gutterBottom>Black | XL</Typography>
                    <Box>
                        <Grid container direction="row" alignItems="center">
                            <Grid item xs={3}>
                                <Typography variant="subtitle2">Qty</Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <QtyButton width={80} height={27} quantity={1} />
                            </Grid>
                        </Grid>
                    </Box>
                    <Typography variant="subtitle2">$59.00</Typography>
                </Grid>
                <Grid item xs={2} container direction="row" alignItems="flex-start" justifyContent="center" >
                    <IconButton size="small">
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    )
}

export default function CartPopover() {
    const classes = useStyle();
    const [anchorEl, setAnchorEl] = useState(null);

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
                    badgeContent={3}
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
                        <Item />
                        <Item />
                    </Box>
                    <hr />
                    <Grid container direction="row" justifyContent="space-between">
                        <Grid item xs={6}>
                            <Typography variant="body2">CART SUBTOTAL:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Box textAlign="right">
                                <Typography variant="body1">$748.00</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <hr />
                    <Grid container direction="row" justifyContent="center" spacing={1}>
                        <Grid item xs={6} container direction="row" justifyContent="center" >
                           
                            <BlackButton width={'100%'}> <Link to="/cart"className={classes.link}><Typography variant="caption" color="inherit">view cart</Typography></Link></BlackButton>
                            

                        </Grid>
                        <Grid item xs={6} container direction="row" justifyContent="center">
                            <BlackButton width={'100%'}><Typography variant="caption" color="inherit">check out</Typography></BlackButton>
                        </Grid>
                    </Grid>
                </Box>
            </Popover>
        </div>
    );
}