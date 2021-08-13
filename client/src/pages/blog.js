import Layout from "../components/Layout"
import { Link } from 'react-router-dom';
import '../App.css';
import { Grid, Box, Breadcrumbs, Typography, Container } from "@material-ui/core";
import BlogThumb from "../components/BlogThumb";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CommentForm from "../components/CommentForm";
import Comment from "../components/Comment";

export default () => {

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
                        <Link className="link" to="" >
                            <Typography variant="subtitle2">Home</Typography>

                        </Link>
                        <Link className="link" to="" >
                            <Typography variant="subtitle2">Blogs</Typography>

                        </Link>
                        <Typography variant="subtitle2">Article</Typography>
                    </Breadcrumbs>
                </Box>
            </div>
            <Box px={3}>
                <Grid container spacing={2}>
                    <Grid item lg={9} md={9} sm={12} xs={12}>
                        <img src="../blog-post-1.jpg" className="articleImg"/>
                        <Box>
                            <Typography variant="h6">It's all about how you wear</Typography>
                            <Grid container direction="row" alignItems="center">
                                <Grid item>
                                    <AccessTimeIcon fontSize="small" />
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle2"> &nbsp;May 02, 2017 </Typography>
                                </Grid>
                            </Grid>
                            <p>
                                On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.' est qu'il possède une distribution de lettres plus ou moins normale, et en tout cas comparable avec celle du français standard. De nombreuses suites logicielles de.
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                        </Box>
                        <Box>
                            <hr/>
                            <CommentForm />
                        </Box>
                        <Container maxWidth="md">
                        {
                            [1,2].map(item => <Comment key={item} />)
                        }
                        </Container>
  
                    </Grid>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                        <Box px={4} mt={5}>
                            <Typography variant="body1" gutterBottom>CATEGORY</Typography>
                            <Typography variant="subtitle2"><Link to="/" className="link">Policy</Link></Typography>
                            <Typography variant="subtitle2"><Link to="/" className="link">Special Events</Link></Typography>
                            <Typography variant="subtitle2"><Link to="/" className="link">Trend</Link></Typography>
                            <Typography variant="subtitle2"><Link to="/" className="link">Beauty</Link></Typography>
                        </Box>
                        <Box px={4} mt={4}>
                            <Typography variant="body1" gutterBottom>RECENT POSTS</Typography>
                            {
                                [1, 2, 3, 4].map(item => <BlogThumb key={item} />)
                            }
                        </Box>

                    </Grid>
                </Grid>
            </Box>
        </Layout>
    )
}