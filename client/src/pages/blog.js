import { Box, Breadcrumbs, Container, Grid, Typography } from "@material-ui/core";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import draftToHtml from 'draftjs-to-html';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from 'react-router-dom';
import blogActions from "../actions/blog";
import '../App.css';
import BlogThumb from "../components/BlogThumb";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import { displayMonDDYYYY } from "../helper/handleTime";


export default () => {

    let { id } = useParams();
    const dispatch = useDispatch();
    const location = useLocation();
    const latestBlogs = useSelector(state => state.home).latestBlogs;
    const categories = useSelector(state => state.home).blogCategories;
    const blog = useSelector(state => state.blog).blog;

    useEffect(() => {
        if (!isNaN(id) && id !== undefined) {
            dispatch(blogActions.getBlogById(id))
        }
    }, [id, location]);

    const renderContent = (content) => {
        if (!!content)
            return <div dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(content)) }} />
    }
    if(!blog?.id) return <Loader />
    return (
        <Layout>
            <div className="breadCrumbs">
                <div className="pageTitle">
                    <Box textAlign="center" py={1}>
                        <Typography variant="inherit">BLOG ARTICLE</Typography>
                    </Box>
                </div>
            </div>
                <Box ml={5} py={1}>
                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                        <Link className="link" to="/" >
                            <Typography variant="subtitle2">Home</Typography>
                        </Link>
                        <Link className="link" to="/blogs" >
                            <Typography variant="subtitle2">Blogs</Typography>
                        </Link>
                        <Typography variant="subtitle2">Article</Typography>
                    </Breadcrumbs>
                </Box>
                <Box px={5} mx={5} my={3}>
                    <Grid container spacing={2}>
                        <Grid item lg={9} md={9} sm={12} xs={12}>
                            <img src={blog.imgPath} className="articleImg" />
                            <Box my={2}>
                                <Typography variant="h6">{blog?.title}</Typography>
                                <Grid container direction="row" alignItems="center">
                                    <Grid item>
                                        <AccessTimeIcon fontSize="small" />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle2"> &nbsp;{displayMonDDYYYY(blog?.createdAt) || ""}</Typography>
                                    </Grid>
                                </Grid>
                                {
                                    renderContent(blog?.content)
                                }
                            </Box>
                            {
                                blog?.commentAllow && (<>
                                    <Box>
                                        <hr />
                                        <CommentForm />
                                    </Box>
                                    <Container maxWidth="md">
                                        {
                                            [1, 2].map(item => <Comment key={item} />)
                                        }
                                    </Container>
                                </>)
                            }
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <Box  pl={2} className="fontRoSlab">
                                <Box mb={2}>
                                <Typography variant="inherit" gutterBottom >CATEGORY</Typography>
                                </Box>
                                {
                                    categories.map(item => <Typography key={item.id} variant="subtitle2"><Link to={`/blogs?category=${item.id}`} style={{
                                        textDecoration: 'none',                                    
                                        color: 'black'
                                    }}>{item.name}</Link></Typography>)
                                }
                            </Box>
                            <Box  pl={2} mt={4}  className="fontRoSlab">
                                <Box mb={2}>
                                <Typography variant="inherit" gutterBottom >RECENT POSTS</Typography>
                                </Box>  
                                {
                                    latestBlogs.map(item => <Link key={item.id} to={`/blogs/blog/${item.id}`} style={{textDecoration: 'none', color: 'black'}}>
                                        <BlogThumb key={item.id} blog={item} />
                                        </Link>)
                                }
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
        </Layout>
    )
}