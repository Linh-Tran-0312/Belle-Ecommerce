import { Box, CircularProgress, makeStyles, TextField, Typography } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import shopActions from "../actions/shop";
import BlackButton from './BlackButton';
const useStyle = makeStyles(() => ({
    ratingBox : {
        display: 'flex',
        justifyContent: 'flex-start',
        margin: '10px 0px'
        },
    star : {
        color: '#ff9500',
        margin: 5,
        fontSize: 30,
        cursor: 'pointer'
    },
    textfield : {
        '& .MuiOutlinedInput-root' : {
            borderRadius: 0,
            '&.Mui-focused fieldset': {
                borderColor: 'black',
            },
        },
        '& .MuiInputLabel-root': {
            color: 'black'
        },

    }
}))

const Star = ({pos, ratedPos, selectPos}) => {
    const classes = useStyle();
    const handleSelect = () => {
        selectPos(pos)
    }
    return(
        <>
        {
            pos <= ratedPos ? <StarIcon className={classes.star} onClick={handleSelect}/> :  <StarOutlineIcon  onClick={handleSelect} className={classes.star}/>
        }
        </>
    )
}
const initState = {
    title: "",
    text: "",
    userId: "",
    productId: "",
    rating: 5
}
const ReviewForm = ({loading, productId, userId}) => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const [ state, setState ] = useState(initState);
    useEffect(() => {
        setState({...state, productId,userId})
    },[productId, userId])
    const handleRating = (number) => {
        setState({...state,rating: number})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(shopActions.createReview(state))
    }
    const handleChange = e => {
        setState({...state, [e.target.name]: e.target.value})
    }
    return(
        <Box>
            <Box my={3} mx={2}>
                <Typography variant="h6">WRITE YOUR REVIEW</Typography>
            </Box>
            <Box mx={2}>
                <Typography variant="body1">Your Rating: </Typography>
                <div className={classes.ratingBox}>
                    {
                        [1,2,3,4,5].map(item => <Star key={item} pos={item} ratedPos={state.rating} selectPos={handleRating} /> )
                    
                    }
 
                </div>
            </Box>
            <TextField
                    id="outlined-full-width"
                    label="REVIEW TITLE"
                    style={{ margin: 8 }}                   
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    name="title"
                    value={state.title}
                    className={classes.textfield}
                    onChange={handleChange}
            /> 
            <TextField
                    id="outlined-multiline-static"
                    label="BODY OF REVIEW"
                    multiline
                    fullWidth
                    rows={4}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    style={{ margin: 8 }}
                    variant="outlined"
                    className={classes.textfield}
                    name="text"
                    value={state.text}
                    onChange={handleChange}
            />
            <Box textAlign="right" my={2}>
            <BlackButton onClick={handleSubmit} width="133px" >
                 {
                     loading ? <CircularProgress style={{ color: "white"}} size={25}/> : "SUBMIT REVIEW"
                 }  
            </BlackButton>
            </Box>
            
        </Box>
    )
}

export default ReviewForm;