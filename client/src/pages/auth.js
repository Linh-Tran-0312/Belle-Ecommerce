import { Box, TextField, Typography, Container } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../App.css";
import BlackButton from "../components/BlackButton";
import Layout from "../components/Layout";

const StyledTextField = withStyles((theme) => ({
    root: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            '&.Mui-focused fieldset': {
                borderColor: '#e8e9eb',
            },
        },
        '& .MuiInputLabel-root': {
            color: 'black'
        },


    }

}))(TextField);
const useStyle = makeStyles((theme) => ({

}))
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
export default () => {
    const query = useQuery();
    const classes = useStyle();
    const location = useLocation();
    const [ isSignIn, setIsSignIn] = useState(true);
 
    useEffect(() => {
        if(query.get('page') === "signin" || query.get('page') === null) {
       setIsSignIn(true)
        } else {
       setIsSignIn(false)
        }
       
    },[location])
   
    return (
        <Layout>
            <div className="breadCrumbs" style={{ marginBottom: 0 }}>
                <div className="pageTitle">
                    <Box textAlign="center" py={1}>
                        <Typography variant="inherit">{ isSignIn ? "LOGIN" : "CREATE NEW ACCOUNT"}</Typography>
                    </Box>
                </div>
            </div>
            <Container maxWidth="sm">
                <Box mx={2} my={4}>
                    {
                        !isSignIn && <>
                            <Box my={2}>
                                <StyledTextField label="First Name" variant="outlined" fullWidth/>
                            </Box>
                            <Box my={2}>
                                <StyledTextField label="Last Name" variant="outlined" fullWidth/>
                            </Box>
                            <Box my={2}>
                                <StyledTextField label="Phone Number" variant="outlined" fullWidth/>
                            </Box>
                            <Box my={2}>
                                <StyledTextField label="Address" variant="outlined" fullWidth/>
                            </Box>
                        </>
                    }

                    <Box my={2}>
                        <StyledTextField label="Email" variant="outlined" fullWidth/>
                    </Box>
                    <Box my={2}>
                        <StyledTextField label="Password" variant="outlined" fullWidth/>
                    </Box>
                    {
                        !isSignIn && <Box my={2}>
                                        <StyledTextField label="Confirm Password" variant="outlined" fullWidth/>
                                    </Box>
                    }
                     
                    <Box my={3} sx={{ display: 'flex', justifyContent: 'center'}}>
                        <BlackButton>{ isSignIn ? "SIGN IN" : "REGISTER"}</BlackButton>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                        <Typography variant="caption">
                        <Link to="/" className="link">Forgot your password? &nbsp;|&nbsp;</Link>
                        {
                            !isSignIn ?  <Link to="/auth?page=signin" className="link">Already have an account</Link>
                            :  <Link to="/auth?page=signup" className="link">Create account</Link>
                        }
                       
                        </Typography>
                    </Box>
                </Box>

            </Container>

        </Layout>
    )
}