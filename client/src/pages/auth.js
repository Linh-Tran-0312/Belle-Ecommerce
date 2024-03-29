import { Box, Container, TextField, Typography, CircularProgress, } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import authActions from '../actions/auth';
import "../App.css";
import BlackButton from "../components/BlackButton";
import { useQuery } from "../helper/customHook";
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

 
const initState = {
    fname: "",
    lname: "",
    phone: "",
    email: "",
    password: "",
    confirm_password: "",
    address: "",
}
export default (props) => {
    const query = useQuery();
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch()
    const message = useSelector(state => state.userAuth).error;
    const orderItems = useSelector(state => state.order.items);
    const loading = useSelector(state => state.userAuth.loading);
    const [ isSignIn, setIsSignIn] = useState(true);
    const [ state, setState ] = useState(initState);

    useEffect(() => {
        if(query.get('page') === "signin" || query.get('page') === null) {
       setIsSignIn(true)
        } else {
       setIsSignIn(false)
        }
  
    },[location]);

    const handleChange = (e) => {
        setState({...state, [e.target.name] : e.target.value})
    }

   const handleSubmit = e => {
       e.preventDefault();
       if(isSignIn) {
           dispatch(authActions.login({email: state.email, password: state.password}, history, props?.location?.state?.from || "/user", orderItems))
       } else {
        dispatch(authActions.register({...state}, history,props?.location?.state?.from || "/user", orderItems))
       }
   }
    return (
        <>
            <div className="breadCrumbs" style={{ marginBottom: 0 }}>
                <div className="pageTitle">
                    <Box textAlign="center" py={1}>
                        <Typography variant="inherit">{ isSignIn ? "LOGIN" : "CREATE NEW ACCOUNT"}</Typography>
                    </Box>
                </div>
            </div>
            <Container maxWidth="sm">
                <Box mx={2} my={4}>
                    <form onSubmit={handleSubmit}>
                    {
                        !isSignIn && <>
                            <Box my={2}> 
                                <StyledTextField name="fname" value={state.fname} onChange={handleChange} label="First Name" variant="outlined" fullWidth/>
                            </Box>
                            <Box my={2}>
                                <StyledTextField name="lname" value={state.lname} onChange={handleChange} label="Last Name" variant="outlined" fullWidth/>
                            </Box>
                            <Box my={2}>
                                <StyledTextField name="phone" value={state.phone} onChange={handleChange} label="Phone Number" variant="outlined" fullWidth/>
                            </Box>
                            <Box my={2}>
                                <StyledTextField name="address" value={state.address} onChange={handleChange} required label="Address" variant="outlined" fullWidth/>
                            </Box>
                        </>
                    }

                    <Box my={2}>
                        <StyledTextField type="email" name="email" label="Email" value={state.email} onChange={handleChange} required variant="outlined" fullWidth/>
                    </Box>
                    <Box my={2}>
                        <StyledTextField type="password" name="password" label="Password" value={state.password} onChange={handleChange} required variant="outlined" fullWidth autoComplete="on"/>
                    </Box>
                    {
                        !isSignIn && <Box my={2}>
                                        <StyledTextField type="password" name="confirm_password" value={state.confirm_password} onChange={handleChange}  label="Confirm Password" variant="outlined" fullWidth/>
                                    </Box>
                    }
                     <Typography color="error" variant="subtitle2">{message}</Typography>
                    <Box my={3} sx={{ display: 'flex', justifyContent: 'center'}}>
                        <BlackButton type="submit" width="100%" >{ loading ? <CircularProgress style={{color: "white"}} size={25}/>  : isSignIn ? "SIGN IN" : "REGISTER"}</BlackButton>
                    </Box>
                    </form>
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

        </>
    )
}