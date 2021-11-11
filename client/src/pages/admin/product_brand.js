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
import { useSelector, useDispatch } from "react-redux";
import DeleteButton from "../../components/DeleteButton";
import productActions from "../../actions/adminProduct";



const initBrand = {
    id: "",
    name: "",
    imgPath: "",
};

export default function ProductBrand() {
    const dispatch = useDispatch();
   // Brand State
   const productBrands = useSelector(state => state.product).brands;
   const isDeletingProductBrand = useSelector(state => state.product).isDeletingProductBrand;
   const [brand, setBrand] = useState(initBrand);
   const [showBrand, setShowBrand] = useState(false);


  
   const handleSelectBrand = (value) => {
       setShowBrand(true);
       setBrand({ id: value.id, name: value.name })
   }
   const handleAddNewBrand = () => {
       setShowBrand(true);
       setBrand(initBrand);
   }
   const handleBrandChange = (e) => {
       setBrand({ ...brand, name: e.target.value });
   }
   const handleSubmitBrand = (e) => {
    e.preventDefault();
       if (!brand.id) {
           dispatch(productActions.createProductBrand({ name: brand.name, imgPath: brand.imgPath }))
       } else {
           dispatch(productActions.updateProductBrand(brand.id, { name: brand.name, imgPath: brand.imgPath }))
       }
   }
   const handleDeleteBrand = (e) => {
       dispatch(productActions.deleteProductBrand(brand.id));
       setBrand(initBrand);
       setShowBrand(false);
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
                                        <TableCell><strong>Brand Name</strong></TableCell>
                                        <TableCell  ><strong>Details</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {productBrands.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                {`${index + 1}`}
                                            </TableCell>
                                            <TableCell  >{row.name}</TableCell>
                                            <TableCell  ><IconButton size="small" onClick={() => handleSelectBrand(row)}><MoreHorizIcon /></IconButton></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Box>
                            <Button color="primary" fullWidth variant="contained" startIcon={<AddBoxIcon/> } onClick={handleAddNewBrand}>New Brand</Button>
                            {
                                showBrand && (
                                    <form onSubmit={handleSubmitBrand}>
                                    <Box my={5}>
                                    <TextField type="text" fullWidth label="Brand name" variant="outlined" value={brand.name} onChange={handleBrandChange} required/>
                                    <Box my={2}>                                     
                                    <Grid container spacing={2}>
                                        {
                                            brand?.id ? (
                                                <>
                                                 <Grid item xs={6}>
                                                <DeleteButton message="Are you sure you want to delete this brand?" status={isDeletingProductBrand} deleteFn={handleDeleteBrand}/>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Button color="primary" fullWidth variant="contained" startIcon={<SaveIcon />} type="submit">Save</Button>
                                            </Grid>
                                                </>
                                               
                                            ):(
                                                <Grid item xs={12}>
                                                <Button color="primary" fullWidth variant="contained" startIcon={<SaveIcon />}  type="submit">Save</Button>
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