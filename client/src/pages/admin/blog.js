import { Box, Button, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SaveIcon from '@material-ui/icons/Save';
import Pagination from '@material-ui/lab/Pagination';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import React, { useEffect, useState } from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import blogActions from "../../actions/adminBlog";
import DeleteButton from "../../components/DeleteButton";
import UploadImage from "../../components/UploadImage";
const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3)
    },
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

const initFilter = {
    search: "",
    category: "",
    sortMethod: "",
    page: 1,
    limit: 2
}
 
const initBlog = {
    id: "",
    title: "",
    categoryId: "",
    imgPath: "",
    content: "",
    commentAllow: true
}
export default function BlogAdmin() {
    const classes = useStyles();
    const dispatch = useDispatch();
 
    // Blog 
    const blogCategories = useSelector(state => state.blog).categories;
    const blogTotal = useSelector(state => state.blog).pagination.total;
   
    //const page = useSelector(state => state.blog).pagination.page;
    const blogs = useSelector(state => state.blog).blogs;
    const blogDetail = useSelector(state => state.blog).blog;
    const isDeletingBlog = useSelector(state => state.blog).isDeletingBlog;
    const [blog, setBlog] = useState(initBlog);
    const [showBlog, setShowBlog] = useState(false);
    const [filter, setFilter] = useState(initFilter);
    const [ pageCount, setPageCount] = useState(0)
    const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
  
    
    // Handle events in Blog Tab
    useEffect(() => {
        dispatch(blogActions.getBlogs(filter));
    },[])
    useEffect(() => {
        const contentSate = convertFromRaw(JSON.parse(blogDetail.content));
        setEditorState(EditorState.createWithContent(contentSate)); 
        setBlog({...blogDetail});  
                
    },[blogDetail]);
    useEffect(() => {
        const mod = blogTotal%filter.limit;
        let pageNumber = blogTotal/filter.limit;
         pageNumber = mod === 0 ? pageNumber : Math.floor(pageNumber) + 1;
        setPageCount(pageNumber)
    },[blogTotal])
    const handleFilterChange = (e) => {
        setFilter({...filter, [e.target.name]: e.target.value, page: 1 });
    };
    const handleResetFilter = (e) => {
        setFilter(initFilter);
    };
    const handleSubmitFilter = (e) => {
        dispatch(blogActions.getBlogs(filter)) 
    }
    const handleChangePage = (event, value) => {
        dispatch(blogActions.getBlogs({...filter, page: value})) 
        setFilter({...filter, page : value});
       
    };

    const handleGetBlogDetail = (id) => {
        dispatch(blogActions.getBlogById(id));
        setShowBlog(true);
    }
    const handleAddNewBlog = (e) => {
        setShowBlog(true);
        setEditorState(EditorState.createEmpty());
        setBlog(initBlog);
    };
    const handleBlogChange = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value })
    };
    const handleGetUrlImage = (url) => {
        setBlog({...blog, imgPath: url})
    }
    const handleEditorStateChange = (value) => {
        setEditorState(value)
    };
    const handleSubmitBlog = (e) => {
        e.preventDefault();
        if(!blog.id)
        {
            dispatch(blogActions.createBlog({...blog, content:  JSON.stringify(convertToRaw(editorState.getCurrentContent()))}))
        } else {

            dispatch(blogActions.updateBlog(blog.id,{...blog, content:  JSON.stringify(convertToRaw(editorState.getCurrentContent()))}));
        }
    }
    const handleDeleteBlog = (e) => {
        dispatch(blogActions.deleteBlog(blog.id));
        setBlog(initBlog);
        setShowBlog(false);
    }

    return (
        <>
                <Grid container direction="row" justifyContent="flex-start" spacing={1}>
                    <Grid item md={6} sm={12} xs={12}   >
                        <TextField fullWidth id="outlined-basic" onChange={handleFilterChange} name="search" label="Search" placeholder="Search order's @ID, name, address" variant="outlined" />
                    </Grid>
                    <Grid item md={3} sm={6} xs={6}  >
                    <FormControl fullWidth variant="outlined" >
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
                                        {blogs?.map((row, index) => (
                                            <TableRow key={row.id}>
                                                <TableCell component="th" scope="row">
                                                    {`${(filter.page - 1)*filter.limit + index + 1}`}
                                                </TableCell>
                                                <TableCell  >{row.title}</TableCell>
                                                <TableCell  >{row.category.name}</TableCell>
                                                <TableCell  >{row.createdAt.slice(0,10)}</TableCell>
                                                <TableCell  ><IconButton size="small" onClick={() => handleGetBlogDetail(row.id)}><MoreHorizIcon /></IconButton></TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                    <Box my={5}  >
                        <Pagination count={pageCount} page={filter.page} onChange={handleChangePage} />
                    </Box>
                </Box>
                <Divider />
                {
                    showBlog && (
                        <form onSubmit={handleSubmitBlog}> 
                         <Box my={2}>
                    <Grid container spacing={1}>
                        <Grid item md={7} sm={12} xs={12}>
                            <TextField fullWidth type="text" name="title" label="Title" variant="outlined" required  value={blog.title}  onChange={handleBlogChange} />
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <FormControl fullWidth variant="outlined"   required>
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
                                        blogCategories.map(c => <MenuItem key={c.id} value={c.id} >{c.name}</MenuItem>)
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
                   {/*  <Button variant="outlined" fullWidth className={classes.blogImgButton} color="primary"> */}
                   <div className={classes.blogImgButton} > 
                   <UploadImage getURL={handleGetUrlImage}/>
                   </div>                           
                </Box>
                <Box>
                    <Editor
                        editorState={editorState}
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
                                 <Button variant="contained" color="primary" fullWidth startIcon={<SaveIcon />} type="submit" >Save</Button>
                                </Grid>
                            ) : (
                        <>
                            <Grid item sm={3} md={2} xs={4}>
                                <DeleteButton message = "Are you sure you want to delete this post?" deleteFn={handleDeleteBlog} status={isDeletingBlog}/> 
                            </Grid>
                            <Grid item sm={3} md={2} xs={4}>
                                <Button variant="contained" color="primary" fullWidth startIcon={<SaveIcon />} type="submit">Save</Button>
                            </Grid>
                        </>
                        )
                        }

                    </Grid>
                </Box>
                        
                        </form>
                    )
                }     
        </>
    );
}