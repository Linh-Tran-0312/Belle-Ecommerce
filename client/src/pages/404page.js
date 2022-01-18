import { Box, Typography } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { Link } from 'react-router-dom';
import "../App.css";
import BlackButton from "../components/BlackButton";
import Layout from "../components/Layout";
 
 
export default () => {
 
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'center', width: '100%', height: '90vh'}}>
                <p className="fontRoSlab" style={{ fontSize: '5vw', fontWeight: 'bold'}}>404 PAGE NOT FOUND</p>
                <Box my={1}>
                <Typography variant="body2">The page you requested does not exist.</Typography>
                </Box>
                <Box  my={2}>
                    <BlackButton><Link to="/shop" className="linkWhite">CONTINUE SHOPPING </Link> <ArrowRightIcon/></BlackButton>
                </Box>
            </Box>

        </>
    )
}