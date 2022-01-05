import { Box, makeStyles, Typography } from "@material-ui/core";
import { displayDDMonthYYYY } from "../helper/handleTime";
import Rating from "./Rating";
const useStyle = makeStyles(() => ({
    span : {
        fontWeight: 'bold'
    }
}))
const Review = ({ review}) => {
    const classes = useStyle()
    return(
        <Box textAlign="left" my={3} mb={4}>
            <hr/>
            <br/>
        <Typography gutterBottom><Rating size={20} rating={review?.rating}/></Typography>
        <Typography variant="h6">{review?.title}</Typography>
        <Typography variant="subtitle1"><span className={classes.span}>{`${review?.user?.lname} ${review?.user?.fname}`} </span>on<span className={classes.span}> {displayDDMonthYYYY(review?.createdAt)}</span></Typography>
        <Box my={3}>
        <Typography variant="subtitle1">{review?.text}</Typography>
        </Box>
        </Box>
    )
}

export default Review;