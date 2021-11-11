import { Box, Breadcrumbs, CardActionArea, CardActions, Grid, makeStyles, Typography } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import SearchIcon from '@material-ui/icons/Search';
import { Link, useLocation, useParams } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import '../App.css';
import BlackButton from "../components/BlackButton";
import BlogThumb from '../components/BlogThumb';
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { convertToHtml, convertFromRaw } from "draft-js"
import { displayMonDDYYYY } from '../helper/handleTime';
import { useQuery } from "../helper/customHook";
import blogActions from "../actions/blog";
const useStyle = makeStyles((theme) => ({
    link: {
        textDecoration: 'none',
        marginLeft: 14,
        color: 'black'
    },
    cardThumb: {
        width: '100%',
        heigh: '100px',
        display: 'flex',
        flexDirection: 'row',
        margin: 15,
        boxShadow: 'none',
        borderRadius: 0
    },
    mediaThumb: {
        width: '150px !important',
    },
    contentThumb: {
        height: '100%'
    },
    cardItem: {
        width: '100%',
        borderRadius: 0,
        boxShadow: 'none'
    },
    mediaItem: {
        height: 150,
        width: '100%'
    },
    root: {
        padding: '0px 5px',
        display: 'flex',
        alignItems: 'center',
        height: 50,
        [theme.breakpoints.down('sm')]: {
            height: 35,
        },
        borderRadius: 0,
        boxShadow: 'none',
        border: '1px solid rgb(168, 165, 165)'

    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    center : {
        display: 'flex',
        justifyContent: "center",
    }
}))
const initFilter = {
    search: "",
    category: "",
    page: 1,
    limit: 6
}
const BlogsPage = () => {
    const query = useQuery();
    const dispatch = useDispatch();
    const classes = useStyle();
    const location = useLocation();

    const categories = useSelector(state => state.home).blogCategories;
    const blogs = useSelector(state => state.blog).blogs;
    const latestBlogs = useSelector(state => state.home).latestBlogs;
    const [ filter, setFilter ] = useState(initFilter);
    const [pageCount, setPageCount] = useState(1);
    
    useEffect(() => {
        dispatch(blogActions.getBlogs(filter))
    },[])

    useEffect(() => {
        setFilter({...filter, category: query.get("category")});
        dispatch(blogActions.getBlogs({...filter, category: query.get("category")}))
    },[location]);

    const handleFilterChange = e => {
        setFilter({ ...filter, [e.target.name]: e.target.value })
    }
    const handleSubmitFilter = e => {
        dispatch(blogActions.getBlogs(filter))
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            dispatch(blogActions.getBlogs(filter))
        }
    }
    const handleReset = () => {
        setFilter(initFilter);
        
    }
    const handleChangePage = (event, value) => {
        dispatch(blogActions.getBlogs({...filter, page: value}));
        setFilter({...filter, page: value});
        setPageCount(value);
    };
    return (
        <Layout>
            <div className="breadCrumbs">
                <div className="pageTitle">
                    <Box textAlign="center" py={1}>
                        <Typography variant="inherit">BLOGS</Typography>
                    </Box>
                </div>
                <Box ml={5} py={1}>
                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                        <Link className="link" href="/"  >
                            <Typography variant="subtitle2">Blogs</Typography>

                        </Link>
                        <Typography variant="subtitle2">Blogs</Typography>
                    </Breadcrumbs>
                </Box>
            </div>
            <Box>
                <Grid container spacing={3}>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                        <Box px={4} mt={1}>
                            <h5 className="fontRoSlab" >CATEGORY</h5>
                            {
                                categories.map(item => <Typography key={item.id} variant="subtitle2"><Link to={`/blogs?category=${item.id}`} className={classes.link}>{item.name}</Link></Typography> )
                            }
                        
                        </Box>
                        <Box px={4} mt={4}>
                            <h5 className="fontRoSlab">RECENT POSTS</h5>
                            {
                                latestBlogs.map(item =>
                                    <BlogThumb key={item.id}  blog={item}/>
                                )
                            }
                        </Box>
                    </Grid>
                    <Grid item lg={9} md={9} sm={12} xs={12} >
                        <Box mb={4} px={4} mt={1}>
                            <Box mb={3} >
                                <Paper  className={classes.root}>
                                    <InputBase
                                        className={classes.input}
                                        placeholder="What are you looking for..."
                                        onKeyDown={handleKeyDown}
                                        value={filter.search}
                                        name="search"
                                        onChange={handleFilterChange}
                                    />
                                    <IconButton className={classes.iconButton} aria-label="search" onClick={handleSubmitFilter}>
                                        <SearchIcon />
                                    </IconButton>
                                </Paper>
                            </Box>
                            <Grid container spacing={3}>
                                {
                                    blogs.map(item =>
                                        <Grid item key={item.id} lg={4} md={4} sm={6} xs={12}>
                                            <Card className={classes.cardItem}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        className={classes.mediaItem}
                                                        image={item.imgPath}
                                                        title="Contemplative Reptile"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom >
                                                            <Link to="/blogs/blog" className="link">
                                                                <span className="fontRoSlab fontSize20" >
                                                                    {item.title}
                                                                </span>
                                                            </Link>
                                                        </Typography>
                                                        <Typography component="span" gutterBottom>
                                                            <Grid container direction="row" alignItems="center">
                                                                <Grid item>
                                                                    <AccessTimeIcon fontSize="small" />
                                                                </Grid>
                                                                <Grid item>
                                                                    <Typography variant="subtitle2" gutterBottom> &nbsp;{displayMonDDYYYY(item.createdAt)}</Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" >
                                                        {convertFromRaw(JSON.parse(item?.content))?.getPlainText().substr(0,140).concat("...")}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                                <CardActions>
                                                    <Box textAlign="center">
                                                        <Link to={`/blogs/blog/${item.id}`} className={classes.link}>
                                                            <BlackButton>Read More <ArrowRightIcon /></BlackButton>
                                                        </Link>
                                                    </Box>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    )
                                }
                            </Grid>
                        </Box>
                        <Box my={5} className={classes.center} py={5}>
                                    <Pagination count={pageCount} variant="outlined" shape="rounded" page={filter.page} onChange={handleChangePage} />
                                </Box>
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    )
}
export default BlogsPage;