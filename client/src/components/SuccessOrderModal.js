

import { Box, Button, Divider, Grid, Modal, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import React from 'react';
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
        borderRadius: 5,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid white',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        [theme.breakpoints.down("lg")]: {
            width: 500,
        },
        [theme.breakpoints.down("xs")]: {
            width: 250,
        }
    },
    red: {
        backgroundColor: "#f44336",
        color: "white",
        "&:hover": {
            backgroundColor: "#f6685e"
        }
    }
}));

export default function SuccessOrderModal({ history, state }) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [time, setTime] = React.useState(5);

    const handleOpen = () => {
        setTime(5)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        history.push("/shop")
    };
    const handleCheckStatus = () => {
        setOpen(false);
        history.push("/user")
    }
    React.useEffect(() => {
        if (state) {
            setOpen(true);
            setTime(5)
        }
    }, [state]);
    React.useEffect(() => {
        if (open && time > 0) {
            setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        }
    }, [open, time]);

    React.useEffect(() => {
        if (time === 0) {
            handleClose();
        }
    }, [time]);
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <Box my={2} textAlign="left" style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}>

            </Box>

            <Box my={3} textAlign="center">
                <CheckCircleOutlineIcon style={{ color: "#5fca3f", fontSize: 50 }} fontSize="large" />
                <Typography variant="subtitle1">Order Successful</Typography>
                <Typography variant="subtitle2">Thank you so much for your order</Typography>
                <Box my={2}>
                    <Typography variant="caption" color="primary">Continue shopping in {time} second</Typography>

                </Box>
            </Box>
            <Divider />
            <Box my={2}>
                <Grid container spacing={2} direction="row" justifyContent="center">
                    <Grid item>
                        <Button variant="contained" fullWidth color="default" onClick={handleCheckStatus} >
                            Check status
                        </Button>
                    </Grid>

                </Grid>
            </Box>

        </div>
    );

    return (
        <div>
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