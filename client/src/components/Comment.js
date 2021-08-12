import { Box, Typography } from "@material-ui/core"
import Rating from "./Rating"
import { makeStyles } from "@material-ui/core";
import ReplyIcon from '@material-ui/icons/Reply';
import BlackButton from "./BlackButton";
const useStyle = makeStyles(() => ({
    span: {
        fontWeight: 'bold'
    }
}))
const Comment = () => {
    const classes = useStyle()
    return (
        <Box textAlign="left" my={3} mb={4}>
            <hr />
            <br />
            <Typography variant="h6">Alice Nguyen</Typography>
            <Typography variant="subtitle1">on<span className={classes.span}> Apr 09, 2019</span></Typography>
            <Box my={2}>
                <Typography variant="subtitle1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Typography>
            </Box>
            <Box my={3}>
            <BlackButton><ReplyIcon/> Reply</BlackButton>

            </Box>
            <Box borderLeft={1} ml={5} px={5}>
                <Typography variant="body2">Alice Nguyen</Typography>
                <Typography variant="subtitle1">on<span className={classes.span}> Apr 09, 2019</span></Typography>
                <Box my={2}>
                    <Typography variant="subtitle1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Typography>
                </Box>
            </Box>
            <Box borderLeft={1} ml={5} px={5}>
                <Typography variant="body2">Alice Nguyen</Typography>
                <Typography variant="subtitle1">on<span className={classes.span}> Apr 09, 2019</span></Typography>
                <Box my={2}>
                    <Typography variant="subtitle1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Comment;