import { Chip } from "@material-ui/core"
import { ORDER_STATUS } from "../constants"

const OrderStatus = ({status}) => {

    const render = () => {
        switch(status){
            case ORDER_STATUS.ORDERED:
                return  <Chip  size="small" label="NEW ORDER" variant="outlined" style={{borderColor: "#31d74c",backgroundColor: "#31d74c", color: "white"}}/>
            case ORDER_STATUS.ORDERING:
                return  <Chip  size="small" label="PENDING" variant="outlined" style={{borderColor: "#b68f52",backgroundColor: "#b68f52", color: "white"}}/>
            case ORDER_STATUS.DELIVERY:
                return   <Chip  size="small" label="IN DELIVERY" variant="outlined" style={{borderColor: "#3d85c6",backgroundColor: "#3d85c6", color: "white"}}/>
            case ORDER_STATUS.CANCELED:
                return  <Chip  size="small" label="CANCELED" variant="outlined" style={{borderColor:"#444444",backgroundColor: "#444444", color: "white"}}/>
            case ORDER_STATUS.COMPLETED:
                return   <Chip   size="small" label="COMPLETED" variant="outlined" style={{borderColor:"#f1c232",backgroundColor: "#f1c232", color: "white"}}/>
            default:
            break;
        }
    }
   return render();

}

export default OrderStatus;