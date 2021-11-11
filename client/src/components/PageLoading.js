
import { CircularProgress, Box, Typography}from '@material-ui/core';

export const PageLoading = ({message, size}) => {
const style ={
    width: "100%",
    paddingTop: "100px",
    paddingBottom: "200px",
    display: "flex",
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center"
}
return(
    <Box style={style}>
        <CircularProgress  style={{color: "black"}}  size={size}/>
        <Box textAlign='center' my={4}>
        <Typography variant="h4">{message}</Typography>
        </Box>
    </Box>
)
}