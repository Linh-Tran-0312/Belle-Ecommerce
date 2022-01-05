import { Box, Chip, makeStyles, TextField, Typography } from '@material-ui/core';
import BlackButton from './BlackButton';

const useStyle = makeStyles((theme) => ({
    textfield : {
        '& .MuiOutlinedInput-root' : {
            borderRadius: 0,
            '&.Mui-focused fieldset': {
                borderColor: '#e8e9eb',
            },
        },
        '& .MuiInputLabel-root': {
            color: 'black'
        },

    }}))
const CommentForm = () => {
    const classes = useStyle();
    const handleDelete = () => {
        console.info('You clicked the delete icon.');
      };
    
      const handleClick = () => {
        console.info('You clicked the Chip.');
      };

    return(
        <Box>
            <Box my={3} mx={2}>
                <Typography variant="h6">WRITE YOUR COMMENT</Typography>
            </Box>
            <Box my={2} mx={2}>
                <Typography variant="body2">You're replying to: &nbsp; 
            
                </Typography>
                <Chip
                        size="small"
                      
                        label="Alice Nguyen"
                        onClick={handleClick}
                        onDelete={handleDelete}
                        variant="outlined"
                    />
            </Box>
            <TextField
                    id="outlined-multiline-static"
                    label="MESSAGE"
                    multiline
                    fullWidth
                    rows={4}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    style={{ margin: 8 }}
                    variant="outlined"
                    className={classes.textfield}
            />
            <Box textAlign="right" my={2}>
            <BlackButton>
                    SUBMIT COMMENT
            </BlackButton>
            </Box>
            
        </Box>
    )
}

export default CommentForm;