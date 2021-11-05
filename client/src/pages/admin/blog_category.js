import { Box, Button, Grid, IconButton, TextField } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
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
import DeleteButton from "../../components/DeleteButton";
import blogAction from "../../actions/blog";
const useStyles = makeStyles((theme) => ({
 
}));

const initCategory = {
    id: "",
    name: ""
};

export default function BlogCategory() {
    const classes = useStyles();
    const dispatch = useDispatch();


    // Category State
    const blogCategories = useSelector(state => state.blog).categories;
    const isDeletingBlogCategory = useSelector(state => state.blog).isDeletingBlogCategory;
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
            dispatch(blogAction.createBlogCategory({ name: category.name }))
        } else {
            dispatch(blogAction.updateBlogCategory(category.id, { name: category.name }))
        }
    }
    const handleDeleteCategory = (e) => {
        dispatch(blogAction.deleteBlogCategory(category.id));
        setCategory(initCategory);
        setShowCategory(false);
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
                                                            <Button color="primary" fullWidth startIcon={<SaveIcon />} variant="contained" onClick={handleSubmitCategory}>Save</Button>
                                                        </Grid>
                                                    </>

                                                ) : (
                                                    <>
                                                        <Grid item xs={6}>
                                                            <DeleteButton message="Are your sure to delete this blog category" deleteFn={handleDeleteCategory} status={isDeletingBlogCategory} />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Button color="primary" fullWidth startIcon={<SaveIcon />} variant="contained" onClick={handleSubmitCategory}>Save</Button>
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