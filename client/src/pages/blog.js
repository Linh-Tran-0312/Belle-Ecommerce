import Layout from "../components/Layout"
import { Link } from 'react-router-dom';
import '../App.css';
import { Grid, Box, Breadcrumbs, Typography, Container } from "@material-ui/core";
import BlogThumb from "../components/BlogThumb";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CommentForm from "../components/CommentForm";
import Comment from "../components/Comment";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { displayMonDDYYYY } from "../helper/handleTime";
import { convertFromRaw } from "draft-js";
import { PageLoading } from "../components/PageLoading";
import draftToHtml from 'draftjs-to-html';
import blogActions from "../actions/blog";
import api from "../api";

export default () => {
    console.log("Blog Detail Page render")
    let { id } = useParams();
    const dispatch = useDispatch();
    const location = useLocation();
    //const [ blog, setBlog ] = useState({});
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
    return (
        <Layout>
            <div className="breadCrumbs">
                <div className="pageTitle">
                    <Box textAlign="center" py={1}>
                        <Typography variant="inherit">BLOG ARTICLE</Typography>
                    </Box>
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
            </div>

            {
                blog?.id ? (
                    <Box px={5} mx={5}>
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
                                <Box px={4} mt={5}>
                                    <Typography variant="body1" gutterBottom>CATEGORY</Typography>
                                    {
                                        categories.map(item => <Typography key={item.id} variant="subtitle2"><Link to={`/blogs?category=${item.id}`} style={{
                                            textDecoration: 'none',
                                            marginLeft: 14,
                                            color: 'black'
                                        }}>{item.name}</Link></Typography>)
                                    }
                                </Box>
                                <Box px={4} mt={4}>
                                    <Typography variant="body1" gutterBottom>RECENT POSTS</Typography>
                                    {
                                        latestBlogs.map(item => <BlogThumb key={item.id} blog={item} />)
                                    }
                                </Box>

                            </Grid>
                        </Grid>
                    </Box>
                ) : (<PageLoading message="Blog content is loading..." size="50px" />)
            }

        </Layout>
    )
}