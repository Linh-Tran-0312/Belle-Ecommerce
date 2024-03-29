import { Box, Button, Grid, IconButton, TextField } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddBoxIcon from '@material-ui/icons/AddBox';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SaveIcon from '@material-ui/icons/Save';
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import productActions from "../../actions/adminProduct";
import DeleteButton from "../../components/DeleteButton";
import { MSG } from "../../constants";


const initSize = {
    id: "",
    name:"",
}
export default function ProductSize() {
    const dispatch = useDispatch();
   
    // Size State
    const productSizes = useSelector(state => state.adminProduct).sizes;
    const loading = useSelector(state => state.adminProduct).productSizeLoading;
    const [size, setSize] = useState(initSize);
    const [showSize, setShowSize] = useState(false);


    // Handle events in Size Tab
    const handleSelectSize = (value) => {
        setShowSize(true);
        setSize({ id: value.id, name: value.name })
    }
    const handleAddNewSize = () => {
        setShowSize(true);
        setSize(initSize);
    }
    const handleSizeChange = (e) => {
        setSize({ ...size, name: e.target.value });
    }
    const handleSubmitSize = (e) => {
        e.preventDefault();
        if (!size.id) {
            dispatch(productActions.createProductSize({ name: size.name }))
        } else {
            dispatch(productActions.updateProductSize(size.id, { name: size.name }))
        }
    }
    const handleDeleteSize = (e) => {
        dispatch(productActions.deleteProductSize(size.id));
        setSize(initSize);
        setShowSize(false);
    }

    return (
        <> 
                <Grid container spacing={2}>
                    <Grid item sm={6} xs={12}>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell  ><strong>No</strong></TableCell>
                                        <TableCell><strong>Size Name</strong></TableCell>
                                        <TableCell  ><strong>Details</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {productSizes.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                {`${index + 1}`}
                                            </TableCell>
                                            <TableCell  >{row.name}</TableCell>
                                            <TableCell  ><IconButton size="small" onClick={() => handleSelectSize(row)}><MoreHorizIcon /></IconButton></TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Box>
                            <Button color="primary" fullWidth variant="contained" startIcon={<AddBoxIcon/> } onClick={handleAddNewSize}>New Size</Button>
                            {
                                showSize && (
                                    <form onSubmit={handleSubmitSize}>
                                    <Box my={5}>
                                    <TextField type="text" fullWidth label="Size name" variant="outlined" value={size.name} onChange={handleSizeChange}  required/>
                                    <Box my={2}>                                     
                                    <Grid container spacing={2}>
                                        {
                                            size?.id ? (
                                                <>
                                                 <Grid item xs={6}>
                                                <DeleteButton msgConfirm={MSG.A_PRODUCT_SIZE} deleteFn={handleDeleteSize} disabled={loading}/>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Button color="primary" fullWidth variant="contained" startIcon={<SaveIcon />} type="submit" disabled={loading}>Save</Button>
                                            </Grid>
                                                </>
                                               
                                            ):(
                                                <Grid item xs={12}>
                                                <Button color="primary" fullWidth variant="contained" startIcon={<SaveIcon />} type="submit" disabled={loading}>Create</Button>
                                            </Grid>
                                            )
                                        }
                                          
                                        </Grid>
                                    </Box>
                                </Box>
                                </form>
                                )
                            }
                           
                        </Box>
                    </Grid>
                </Grid>          
        </>
    );
}