

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, Grid, Box, Typography, Divider} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress'
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
  },
  red: {
    backgroundColor: "#f44336",
    color: "white",
    "&:hover": {
      backgroundColor:"#f6685e"
    }
  }
}));
const usePrevious = (data) => {

    const ref = React.useRef();

    React.useEffect(() => {
      ref.current = data
    }, [data])
    return ref.current;

}
export default function DeleteModal({ message, deleteFn, status }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  //const [ status, setStatus ] = React.useState(deleteStatus);
  const previousStatus = usePrevious(status)
  React.useEffect(() => {
      if(previousStatus == true) 
      {
          handleClose();
      }
  },[status])
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Box my={2} textAlign="left">
      <Typography variant="h5" >Confirm delete</Typography>
      </Box>
         <Divider/>
        <Box my={5}>
            {
                status ? (
                    <Box textAlign="center">
                          <CircularProgress color="secondary" />
                          <Typography color="secondary">Deleting...</Typography>
                    </Box>
                ) : (
                    <Typography >{message}</Typography>
                )
            }
           
        </Box>
        <Divider/>
        <Box my={2}>
        <Grid container spacing={2} direction="row" justifyContent="center">
            <Grid item>
                <Button variant="contained" fullWidth className={classes.red} onClick={() => deleteFn()} > 
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
      <Button variant="contained" fullWidth onClick={handleOpen} className={classes.red}  startIcon={<DeleteIcon/>}> 
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