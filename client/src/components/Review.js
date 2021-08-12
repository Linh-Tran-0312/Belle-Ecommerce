import { Box, Typography } from "@material-ui/core"
import Rating from "./Rating"
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles(() => ({
    span : {
        fontWeight: 'bold'
    }
}))
const Review = () => {
    const classes = useStyle()
    return(
        <Box textAlign="left" my={3} mb={4}>
            <hr/>
            <br/>
        <Typography gutterBottom><Rating size={20} rating={4}/></Typography>
        <Typography variant="h6">LOREM IPSUM DOLOR SIT AMET</Typography>
        <Typography variant="subtitle1"><span className={classes.span}>larrydude </span>on<span className={classes.span}> Apr 09, 2019</span></Typography>
        <Box my={3}>
        <Typography variant="subtitle1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Typography>
        </Box>
        </Box>
    )
}

export default Review;