import { Box, Button, Grid, IconButton, TextField } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ColorLens from '@material-ui/icons/ColorLens';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SaveIcon from '@material-ui/icons/Save';
import React, { useState, useEffect } from 'react';
import { ChromePicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import productActions from "../../actions/adminProduct";
import DeleteButton from "../../components/DeleteButton";
import { MSG } from "../../constants";

const initColor = {
    id: "",
    code: "",
    name: "",
}
 
export default function ProductColor() {

    const dispatch = useDispatch();
    
    const [showColorPicker, setShowColorPicker] = React.useState(false);

    const productColors = useSelector(state => state.adminProduct).colors;
    const loading = useSelector(state => state.adminProduct).productColorLoading;
    const [color, setColor] = useState(initColor);
    const [showColor, setShowColor] = useState(false);
 

   
    const handleSelectColor = (value) => {
        setShowColor(true);
        setColor({ id: value.id, name: value.name, code: value.code })
    }
    const handleAddNewColor = () => {
        setShowColor(true);
        setColor(initColor);
    }
    const handleColorChange = (e) => {
        setColor({ ...color, name: e.target.value });
    }
    const handleSubmitColor = (e) => {
        e.preventDefault();
        setShowColorPicker(false);
        if (!color.id) {
            dispatch(productActions.createProductColor({ name: color.name, code: color.code }))
        } else {
            dispatch(productActions.updateProductColor(color.id, { name: color.name, code: color.code }))
        }
    }
    const handleDeleteColor = (e) => {
        dispatch(productActions.deleteProductColor(color.id));
        setColor(initColor);
        setShowColor(false);
    }
    const handleShowColorPicker = (e) => {
        setShowColorPicker(preState => !preState)
    }
    const handleChangePicker = (value) => {
        setColor({...color, code: value.hex})
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
                                        <TableCell><strong>Color Name</strong></TableCell>
                                        <TableCell><strong>Display</strong></TableCell>
                                        <TableCell  ><strong>Code</strong></TableCell>
                                        <TableCell  ><strong>Details</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {productColors.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                {`${index + 1}`}
                                            </TableCell>
                                            <TableCell  >{row.name}</TableCell>
                                            <TableCell  ><div style={{ border: "1px solid #999999", width: 30, height: 30, backgroundColor: row.code}}/></TableCell>
                                            <TableCell  >{row.code}</TableCell>
                                            <TableCell  ><IconButton size="small" onClick={() => handleSelectColor(row)}><MoreHorizIcon /></IconButton></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                       
                                <Box>
                                    <Button color="primary" fullWidth variant="contained" startIcon={<AddBoxIcon />} onClick={handleAddNewColor}>New Color</Button>
                                    {
                                        showColor && (
                                            <form onSubmit={handleSubmitColor}>
                                            
                                            <Box my={5}>
                                            <Box my={1}>
                                                <TextField type="text" fullWidth label="Color name" variant="outlined" value={color.name} onChange={handleColorChange} required/>
                                            </Box>
                                            <Box my={2}>
                                                <Grid container>
                                                    <Grid item xs={10}>
                                                        <TextField type="text" fullWidth label="Color code" variant="outlined" required disabled value={color.code} />
                                                    </Grid>
                                                    <Grid item xs={2} style={{ position: 'relative' }}>
                                                        <Box style={{ display: showColorPicker ? "block" : "none", position: "absolute", zIndex: 10,right: 80, top: -150 }}>
                                                            <ChromePicker
                                                                color={color.code}
                                                                onChangeComplete={handleChangePicker}
                                                            />
                                                        </Box>
                                                        <Box textAlign="center">
                                                        <IconButton onClick={handleShowColorPicker}>
                                                            <ColorLens style={{ color: color.code, fontSize: 35 }} />
                                                        </IconButton>
                                                        </Box>
                                                      
                                                    </Grid>
                                                </Grid>
                                            </Box>
            
                                            <Box my={2}>
                                                <Grid container spacing={2}>
                                                {
                                                        color?.id ? (
                                                            <>
                                                             <Grid item xs={6}>
                                                            <DeleteButton msgConfirm={MSG.A_PRODUCT_COLOR} deleteFn={handleDeleteColor} disabled={loading}/>
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