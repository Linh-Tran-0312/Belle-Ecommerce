import { Box } from "@material-ui/core";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff', 
  },
  box: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "white",
      color: "black"
  }
  
})); 
export default () => {
    const classes = useStyles();
    return (  <Box className={classes.box}>
        <img alt="loader" src={window.location.origin + '/loader.gif'}/>
      </Box>
    )
}
