import { Box, Typography, TextField, Chip} from '@material-ui/core';
import BlackButton from './BlackButton';
import CancelIcon from '@material-ui/icons/Cancel';
import { useState } from 'react';
 import FaceIcon from '@material-ui/icons/Face';


const CommentForm = () => {

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
                    <Chip
                        size="small"
                      
                        label="Alice Nguyen"
                        onClick={handleClick}
                        onDelete={handleDelete}
                        variant="outlined"
                    />
                </Typography>
         
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