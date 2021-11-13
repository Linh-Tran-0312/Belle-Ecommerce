import { makeStyles } from "@material-ui/core"
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
 import { useState, useEffect } from "react";
 import { useDispatch, useSelector } from "react-redux";
import orderActions from "../actions/order";
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
const QtyButton = ({ getQuantity, updateCart, variantId, itemId, quantity, width, height}) => {
    const classes = useStyle();
    const iconSize = Math.round(0.5*height)
    const [state, setState ] = useState(1);
    const orderId = useSelector(state => state.order).orderId;
    const dispatch = useDispatch()
    useEffect(() => {
        if(!updateCart) {
                handleChangeFn(state);
        }   
    },[state])  
    useEffect(() => {
        if(updateCart)
        {
            setState(quantity);
        }
       
    },[quantity])

    const handleIncrement = (e) => {
       setState(state + 1);
       if(updateCart === true){
            if(orderId) {
                dispatch(orderActions.updateItemQuantity(orderId, itemId, { quantity: 1 } ))
            } else {
                dispatch(orderActions.updateItemQuantity({productVariantId : parseInt(variantId), quantity: state + 1})) // item { variantId, quant}
            }
       }  
    }
    const handleDecrement = (e) => {
        if(state > 1 ) 
        {
            setState(state - 1);
             if(updateCart === true){
                if(orderId) {
                    dispatch(orderActions.updateItemQuantity(orderId, itemId, { quantity: -1 } ))
                } else {
                    dispatch(orderActions.updateItemQuantity({productVariantId : parseInt(variantId), quantity: state - 1})) // item { variantId, quant}
                }
       }
        }
    }
    const handleChange = (e) => {
        setState(e.target.value)
    }
    const handleChangeFn = (value) => {
        return getQuantity(value)
    }
    return(
        <div className={classes.container}  style={{height, width}}  >
        <button className={classes.button} onClick={handleDecrement}    >
            <RemoveIcon style={{fontSize: iconSize}}/>
        </button>
        <input
            className={classes.input}
            value={state}
            onChange={handleChange}
            type="number"
            disabled={updateCart}
        />
        <button className={classes.button} onClick={handleIncrement}   >
            <AddIcon style={{fontSize: iconSize}}/>
        </button>
    </div>
    )
}
export default QtyButton