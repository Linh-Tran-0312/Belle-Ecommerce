import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import blogAction from "../../actions/blog";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import OpacityIcon from '@material-ui/icons/Opacity';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Pagination from '@material-ui/lab/Pagination';
import PostAddIcon from '@material-ui/icons/PostAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import DeleteButton from "../DeleteButton";
import { Card, CardMedia, CardActions, CardActionArea, Divider, Slider } from "@material-ui/core";
import { Box, Typography, Grid, IconButton, Button, TextField, FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const useStyles = makeStyles((theme) => ({
    formButton: {
        margin: 5,
    },
    titleBlock: {
        [theme.breakpoints.down("xs")]: {
            flexDirection: "column-reverse"
        }
    },
    blogImg: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        borderRadius: 5
    },
    photoBlock: {
        border: "1px solid #bcbcbc",
        height: 300,
        position: "relative",
        borderRadius: 5,
        backgroundImage: "url('../blog-default-photo.png')",
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
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
function createCategories(name, id) {
    return { name, id };
}
function createColor(name, id, code) {
    return { name, id, code };
}
const rowsCategories = [
    createCategories('Fashion Trend', 1),
    createCategories('Collection Review', 2),
    createCategories('Customer Policy', 3),
    createCategories('Special Events', 4),
];


const initFilter = {
    search: "",
    category: "",
    sortMethod: "",
    page: 1,
    limit: 2
}
const initCategory = {
    id: "",
    name: ""
};
const initBlog = {
    id: "",
    title: "",
    categoryId: "",
    imgPath: "",
    content: EditorState.createEmpty(),
    commentAllow: true
}
export default function BlogAdmin() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [tab, setTab] = React.useState(0);

    // Category State
    const blogCategories = useSelector(state => state.blog).categories;
    const isDeletingBlogCategory = useSelector(state => state.blog).isDeletingBlogCategory;
    const [category, setCategory] = useState(initCategory);
    const [showCategory, setShowCategory] = useState(false);

    // Blog 
    const pageCount = useSelector(state => state.blog).pagination.total;
    //const page = useSelector(state => state.blog).pagination.page;
    const blogs = useSelector(state => state.blog).blogs;
    const blog = useSelector(state => state.blog).blog;
    //const [blog, setBlog] = useState(initBlog);
    const [showBlog, setShowBlog] = useState(false);
    const [filter, setFilter] = useState(initFilter);

    //const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
    //const [page, setPage] = React.useState(1);

    //Change tab between Blog Tab and Category Tab
    const handleChangeTab = (event, newValue) => {
        setTab(newValue);
    };

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
            dispatch(blog.createBlogCategory({ name: category.name }))
        } else {
            dispatch(blog.updateBlogCategory(category.id, { name: category.name }))
        }
    }
    const handleDeleteCategory = (e) => {
        dispatch(blog.deleteBlogCategory(category.id));
        setCategory(initCategory);
        setShowCategory(false);
    }

    // Handle events in Blog Tab
    useEffect(() => {
        dispatch(blogAction.getBlogs(filter));
    },[])
    const handleFilterChange = (e) => {
        setFilter({...filter, [e.target.name]: e.target.value, page: 1 });
    };
    const handleResetFilter = (e) => {
        setFilter(initFilter);
    };
    const handleSubmitFilter = (e) => {
        dispatch(blogAction.getBlogs(filter)) 
    }
    const handleChangePage = (event, value) => {
        //setFilter({...filter, page : value});
        dispatch(blogAction.getBlogs({...filter, page: value})) 
    };
    const handleAddNewBlog = (e) => {
        setShowBlog(true)
    };
    const handleBlogChange = (e) => {
        //setBlog({ ...blog, [e.target.name]: e.target.value })
    };
    const handleEditorStateChange = (value) => {
        //setBlog({ ...blog, content: value });
    };
    const handleSubmitBlog = (e) => {
        if(!blog.id)
        {
            dispatch(blog.createBlog(blog))
        } else {
            dispatch(blog.updateBlog(blog.id,blog));
        }
    }
    const handleDeleteBlog = (e) => {
        dispatch(blog.deleteBlog(blog.id));
       // setBlog(initBlog);
        setShowBlog(false);
    }


    
    
    
    return (
        <Paper className={classes.root}>
            <Tabs
                value={tab}
                onChange={handleChangeTab}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Blog"  {...a11yProps(0)} />
                <Tab label="Category"  {...a11yProps(1)} />
            </Tabs>
        <TabPanel value={tab} index={0}>
                <Grid container direction="row" justifyContent="flex-start" spacing={1}>
                    <Grid item md={6} sm={12} xs={12}   >
                        <TextField fullWidth id="outlined-basic" onChange={handleFilterChange} name="search" label="Search" placeholder="Search order's @ID, name, address" variant="outlined" />
                    </Grid>
                    <Grid item md={3} sm={6} xs={6}  >
                    <FormControl fullWidth variant="outlined"  >
                                <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={filter.category}
                                    onChange={handleFilterChange}
                                    label="Category"
                                    name="category"
                                >
                                    <MenuItem value="">
                                    <em>All</em>
                                    </MenuItem>
                                    {
                                        blogCategories.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                                       
                    </Grid>
                    <Grid item md={3} sm={6} xs={6} >
                        <FormControl fullWidth variant="outlined"  >
                            <InputLabel id="demo-simple-select-outlined-label">Sort</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={filter.sortMethod}
                                onChange={handleFilterChange}
                                label="Sort"
                                name="sortMethod"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="1">Ascending date</MenuItem>
                                <MenuItem value="2" >Descending date</MenuItem>
                                <MenuItem value="3">Ascending name</MenuItem>
                                <MenuItem value="4">Descending name</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} container direction="row" justifyContent="space-between">
                        <Grid item>
                            <Button variant="contained" color="primary" size="large" className={classes.formButton} onClick={handleSubmitFilter}>
                                Apply
                            </Button>
                            <Button variant="contained" color="default" size="large" className={classes.formButton} onClick={handleResetFilter}>
                                Reset
                            </Button>
                        </Grid>
                        <Grid item sm={3} xs={12}>
                            <Button variant="contained" size="large" fullWidth color="primary" onClick={handleAddNewBlog} startIcon={<PostAddIcon />}>New Blog</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Box my={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell  ><strong>No</strong></TableCell>
                                            <TableCell><strong>Title</strong></TableCell>
                                            <TableCell  ><strong>Category</strong></TableCell>
                                            <TableCell  ><strong>Date</strong></TableCell>
                                            <TableCell  ><strong>Detail</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {blogs.map((row, index) => (
                                            <TableRow key={row.id}>
                                                <TableCell component="th" scope="row">
                                                    {`${(filter.page - 1)*filter.limit + index + 1}`}
                                                </TableCell>
                                                <TableCell  >{row.title}</TableCell>
                                                <TableCell  >{row.category.name}</TableCell>
                                                <TableCell  >{row.createdAt.slice(0,10)}</TableCell>
                                                <TableCell  ><IconButton size="small"><MoreHorizIcon /></IconButton></TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                    <Box my={5}  >
                        <Pagination count={Math.floor(pageCount/filter.limit)} page={filter.page} onChange={handleChangePage} />
                    </Box>
                </Box>
                <Divider />
                {
                    showBlog && (
                        <>
                         <Box my={2}>
                    <Grid container spacing={1}>
                        <Grid item md={7} sm={12} xs={12}>
                            <TextField fullWidth type="text" name="title" label="Title" variant="outlined" required value="Spring Collection in Paris" />
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <FormControl fullWidth variant="outlined"  >
                                <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={blog.categoryId}
                                    onChange={handleBlogChange}
                                    label="Category"
                                    name="categoryId"
                                >
                                    {
                                        blogCategories.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={2} sm={6} xs={12}>
                            <FormControl fullWidth variant="outlined"  >
                                <InputLabel id="demo-simple-select-outlined-label">Comment Allow</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={blog.commentAllow}
                                    onChange={handleBlogChange}
                                    label="Comment Allow"
                                    name="commentAllow"
                                >
                                    <MenuItem value="true">Allow</MenuItem>
                                    <MenuItem value="false">Not Allow</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>

                <Box className={classes.photoBlock}>
                    <img className={classes.blogImg} alt="" src={blog.imgPath} />
                    <Button variant="outlined" fullWidth className={classes.blogImgButton} color="primary">Add cover photo</Button>
                </Box>
                <Box>
                    <Editor
                        editorState={blog.content}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={handleEditorStateChange}
                        editorStyle={{ height: 500, border: "1px solid #bcbcbc" }}
                    />
                </Box>
                <Box my={2}>
                    <Grid container direction="row" justifyContent='center' spacing={2}>
                        {
                            !blog.id ? (
                                <Grid item sm={3} md={2} xs={4}>
                                 <Button variant="contained" color="primary" fullWidth startIcon={<SaveIcon />} onClick={handleSubmitBlog} >Save</Button>
                                </Grid>
                            ) : (
                        <>
                            <Grid item sm = { 3 } md = { 2 } xs = { 4 }>
                                <DeleteButton message = "Are you sure to delete this post?" deleteFn={handleDeleteBlog}/>
                            </Grid>
                            <Grid item sm={3} md={2} xs={4}>
                                <Button variant="contained" color="primary" fullWidth startIcon={<SaveIcon />} onClick={handleSubmitBlog}>Save</Button>
                            </Grid>
                        </>
                        )
                        }

                    </Grid>
                </Box>
                        
                        </>
                    )
                }
               
        </TabPanel >
        <TabPanel value={tab} index={1}>
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
        </TabPanel>
        </Paper >
    );
}