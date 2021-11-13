import { Box, Button, Grid, IconButton, TextField, Typography } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SaveIcon from '@material-ui/icons/Save';
import DeleteButton from "../../components/DeleteButton";
import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import productActions from "../../actions/adminProduct";
import UploadImage from "../../components/UploadImage";
const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3)
    },
    imgWrapper: {
        width: "250px",
        height: "100%",
        position: "absolute",
        top: 0,  
        zIndex: 4,
        backgroundImage: "url('../img-upload.png')",
        borderRadius: 5
    },

    blogImg: {
        width: "250px",
        height: "100%",
        position: "absolute",
        top: 0,  
        objectFit: "cover",
        zIndex: 5,
        borderRadius: 5
    },
    photoBlock: {
        border: "1px solid #bcbcbc",
        height: 200,
        position: "relative",
        borderRadius: 5,
        backgroundSize: "cover"
    },
    blogImgButton: {
        position: "absolute",
        bottom: 0,
        zIndex: 10,
        color: "black",
        backgroundColor: "rgba(255,255,255,0.3)",
        "&:hover": {
            backgroundColor: "rgba(255,255,255,0.9)",
            borderColor: "transparent"
        },
        borderColor: "transparent"
    }
}));
const initCategory = {
    id: "",
    name: "",
    imgPath: "",
}
export default function ProductCategory() {
    const dispatch = useDispatch();
    const classes = useStyles();
     // Category State
     const productCategories = useSelector(state => state.adminProduct).categories;
     const isDeletingProductCategory = useSelector(state => state.adminProduct).isDeletingProductCategory;
     const [category, setCategory] = useState(initCategory);
     const [showCategory, setShowCategory] = useState(false);
  
  
    
     const handleSelectCategory = (value) => {
         setShowCategory(true);
         setCategory({ id: value.id, name: value.name, imgPath: value.imgPath })
     }
     const handleAddNewCategory = () => {
         setShowCategory(true);
         setCategory(initCategory);
     }
     const handleCategoryChange = (e) => {
         setCategory({ ...category, name: e.target.value });
     }
     const handleGetUrlImage = (url) => {
        setCategory({...category, imgPath: url}) }
     const handleSubmitCategory = (e) => {
         e.preventDefault();
         if (!category.id) {
             dispatch(productActions.createProductCategory({ name: category.name, imgPath: category.imgPath }))
         } else {
             dispatch(productActions.updateProductCategory(category.id, { name: category.name, imgPath: category.imgPath }))
         }
     }
     const handleDeleteCategory = (e) => {
         dispatch(productActions.deleteProductCategory(category.id));
         setCategory(initCategory);
         setShowCategory(false);
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
                                        <TableCell><strong>Category Name</strong></TableCell>
                                        <TableCell  ><strong>Details</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {productCategories.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                {`${index + 1}`}
                                            </TableCell>
                                            <TableCell  >{row.name}</TableCell>
                                            <TableCell  ><IconButton size="small" onClick={() => handleSelectCategory(row)}><MoreHorizIcon /></IconButton></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                    <Box>
                            <Button color="primary" fullWidth variant="contained" startIcon={<AddBoxIcon/> } onClick={handleAddNewCategory}>New Category</Button>
                            {
                                showCategory && (
                                    <form onSubmit={handleSubmitCategory}>
                                    <Box my={5}>
                                        <TextField type="text" fullWidth label="Category name" variant="outlined" value={category.name} onChange={handleCategoryChange} required />
                                        <Box my={2}>
                                            <Typography>Category Image</Typography>
                                        </Box>
                                         
                                        <Box className={classes.photoBlock}>
                                            <div className={classes.imgWrapper}>
                                            <img className={classes.blogImg} alt="" src={category.imgPath} />
                                            </div>
                                        
                                            <div className={classes.blogImgButton} > 
                                            <UploadImage getURL={handleGetUrlImage}/>
                                            </div>                           
                                        </Box>
                                      
                                        <Box my={2}>                                     
                                        <Grid container spacing={2}>
                                            {
                                                category?.id ? (
                                                    <>
                                                    <Grid item xs={6}>
                                                    <DeleteButton message="Are you sure you want to delete this category?" status={isDeletingProductCategory} deleteFn={handleDeleteCategory}/>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Button color="primary" fullWidth variant="contained" startIcon={<SaveIcon />} type="submit">Save</Button>
                                                </Grid>
                                                    </>
                                                
                                                ):(
                                                    <Grid item xs={12}>
                                                    <Button color="primary" fullWidth variant="contained" startIcon={<SaveIcon />} type="submit">Save</Button>
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