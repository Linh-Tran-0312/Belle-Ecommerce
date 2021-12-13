import { Box, Button, Grid, IconButton, TextField } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SaveIcon from '@material-ui/icons/Save';
import React, { useState } from 'react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import blogActions from "../../actions/adminBlog";
import DeleteButton from "../../components/DeleteButton";
import { MSG } from "../../constants"


const initCategory = {
    id: "",
    name: ""
};

export default function BlogCategory() {
   
    const dispatch = useDispatch();


    // Category State
    const blogCategories = useSelector(state => state.adminBlog).categories;
    const loading= useSelector(state => state.adminBlog).blogCategoryLoading;

    const [category, setCategory] = useState(initCategory);
    const [showCategory, setShowCategory] = useState(false);
    

    // Handle events in Category Tab
    const handleSelectCategory = (value) => {
        setShowCategory(true);
        setCategory({ id: value.id, name: value.name })
    }
    const handleAddNewCategory = () => {
        setShowCategory(true);
        setCategory(initCategory);
    }
    const handleCategoryChange = (e) => {
        setCategory({ ...category, name: e.target.value })
    }
    const handleSubmitCategory = (e) => {
        if (!category.id) {
            dispatch(blogActions.createBlogCategory({ name: category.name }))
        } else {
            dispatch(blogActions.updateBlogCategory(category.id, { name: category.name }))
        }
    }
    const handleDeleteCategory = (e) => {
         setCategory(initCategory);
        setShowCategory(false); 
        dispatch(blogActions.deleteBlogCategory(category.id));
       
    }

  
    return (
            <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell  ><strong>No</strong></TableCell>
                                    <TableCell><strong>Category Name</strong></TableCell>
                                    <TableCell  ><strong>Detail</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {blogCategories.map((row, index) => (
                                    <TableRow key={row.name}>
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
                        <Button color="primary" fullWidth variant="contained" onClick={handleAddNewCategory}>Add new Category</Button>
                        {
                            showCategory && (
                                <Box my={5}>
                                    <TextField type="text" fullWidth label="Category name" name="name" variant="outlined" value={category.name} onChange={handleCategoryChange} />
                                    <Box my={2}>
                                        <Grid container spacing={2}>
                                            {
                                                !category.id ? (
                                                    <>
                                                        <Grid item xs={12}>
                                                            <Button color="primary" fullWidth startIcon={<SaveIcon />} variant="contained" onClick={handleSubmitCategory} disabled={loading}>Create</Button>
                                                        </Grid>
                                                    </>

                                                ) : (
                                                    <>
                                                        <Grid item xs={6}>
                                                            <DeleteButton msgConfirm={MSG.A_BLOG_CATEGORY} deleteFn={handleDeleteCategory}  disabled={loading}/>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Button color="primary" fullWidth startIcon={<SaveIcon />} variant="contained" onClick={handleSubmitCategory}  disabled={loading}>Save</Button>
                                                        </Grid>
                                                    </>
                                                )
                                            }

                                        </Grid>
                                    </Box>

                                </Box>
                            )
                        }


                    </Box>
                </Grid>
            </Grid>        
    );
}