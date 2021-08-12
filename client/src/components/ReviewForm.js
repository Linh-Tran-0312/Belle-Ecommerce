import { Box, Typography, TextField, Button} from '@material-ui/core';
import BlackButton from './BlackButton';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import { makeStyles  } from '@material-ui/core';
import { useState } from 'react';
const useStyle = makeStyles(() => ({
    ratingBox : {
        display: 'flex',
        justifyContent: 'flex-start',
        margin: '10px 0px'
        },
    star : {
        color: '#e1dc61',
        margin: 5,
        fontSize: 30,
        cursor: 'pointer'
    },
    
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
const ReviewForm = () => {
    const classes = useStyle();
    const [ rating, setRating] = useState(0);
    const handleRating = (number) => {
        setRating(number)
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
                        [1,2,3,4,5].map(item => <Star key={item} pos={item} ratedPos={rating} selectPos={handleRating} /> )
                    
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
            />
            <Box textAlign="right" my={2}>
            <BlackButton>
                    SUBMIT REVIEW
            </BlackButton>
            </Box>
            
        </Box>
    )
}

export default ReviewForm;