import { makeStyles } from "@material-ui/core"
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
/**
 .quantityButtonBox {
	margin-right: 20px;
    display: flex;
    justify-content: center;
    width: 105px;
    box-shadow: none;
    border: 1px solid rgba(31, 31, 31, 0.5);
    border-radius: 0
  }
  .quantityInput {
   
  }
  .quantityInput:focus {
      outline: none 
  }
  .quantityButton {
     width: 35px !important;
     height: 45px;
     cursor: pointer;
     background-color: rgb(180, 180, 180);
     border-radius: 0;
     box-shadow: none;
     border: 1px
  }
 */
const useStyle = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        boxShadow: 'none',
        border: '1px solid rgba(31, 31, 31, 0.3)',
        borderRadius: 0
    },
    button : {
        width: '30%',
        cursor: 'pointer',
        borderRadius: 0,
        boxShadow: 'none',
        border: 'none'
    },
    input : {
        textAlign: 'center',
        border: 'none',
        "&:focus" : {
            outline : 'none'
        },
        width: '40%',
        height: '90%'
    }
})
const QtyButton = ({onIncrement, onDecrement, quantity, onChangeQty, width, height}) => {
    const classes = useStyle();
    const iconSize = Math.round(0.5*height)
    const handleIncrement = (e) => {
        onIncrement();
    }
    const handleDecrement = (e) => {
        onDecrement();
    }
    const handleChange = (e) => {
        onChangeQty(e.target.value)
    }
    return(
        <div className={classes.container}  style={{height, width}}  >
        <button className={classes.button} onClick={handleDecrement}    >
            <RemoveIcon style={{fontSize: iconSize}}/>
        </button>
        <input
            className={classes.input}
            value={quantity}
            onChange={handleChange}
            
        />
        <button className={classes.button} onClick={handleIncrement}   >
            <AddIcon style={{fontSize: iconSize}}/>
        </button>
    </div>
    )
}
export default QtyButton