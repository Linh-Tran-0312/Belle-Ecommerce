

import { Box, Button, Divider, Grid, Modal, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
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
      backgroundColor:"#f6685e"
    }
  }
}));

export default function DeleteModal({ msgConfirm, deleteFn, disabled }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle); 
  const [open, setOpen] = React.useState(false);
 
 
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteFn();
    setOpen(false);
  }
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Box my={2} textAlign="left" style={{
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  }}>
      <Typography variant="h5" >Confirm Delete </Typography>
      
      </Box>
         <Divider/>
        <Box my={3} textAlign="center">     
          <WarningRoundedIcon style={{color: "#f44336"}} fontSize="large"/>      
            <Typography variant="subtitle2">{msgConfirm}</Typography>
        </Box>
        <Divider/>
        <Box my={2}>
        <Grid container spacing={2} direction="row" justifyContent="center">
            <Grid item>
                <Button variant="contained" fullWidth className={classes.red} onClick={handleDelete} > 
                    Delete
                </Button>
            </Grid>
            <Grid item>
            <Button variant="contained" fullWidth color="default" onClick={handleClose}> 
                   Cancel
                </Button>
            </Grid>
        </Grid>
        </Box>
       
    </div>
  );

  return (
    <div>
      <Button variant="contained" fullWidth onClick={handleOpen} className={classes.red}  startIcon={<DeleteIcon/>} disabled={disabled}> 
      Delete
      </Button>
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