import { Grid, Typography, makeStyles, Box, Breadcrumbs, CardActionArea, CardActions } from "@material-ui/core"
import Layout from "../components/Layout"
import '../App.css';
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import BlackButton from "../components/BlackButton";
import BlogThumb from '../components/BlogThumb';
const useStyle = makeStyles({
    link: {
        textDecoration: 'none',
       
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
    }
})
const BlogsPage = () => {
    const classes = useStyle();
    return (
        <Layout>
            <div className="breadCrumbs">
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    <Link  className="link" href="/"  >
                        Home
                    </Link>
                    <Typography color="textPrimary">Blogs</Typography>
                </Breadcrumbs>
            </div>
            <Box>
                <Grid container spacing={3}>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                        <Box px={4} mt={5}>
                            <Typography variant="body1" gutterBottom>CATEGORY</Typography>
                            <Typography variant="subtitle2"><Link to="/" className={classes.link}>Policy</Link></Typography>
                            <Typography variant="subtitle2"><Link to="/" className={classes.link}>Special Events</Link></Typography>
                            <Typography variant="subtitle2"><Link to="/" className={classes.link}>Trend</Link></Typography>
                            <Typography variant="subtitle2"><Link to="/" className={classes.link}>Beauty</Link></Typography>
                        </Box>
                        <Box px={4} mt={4}>
                            <Typography variant="body1" gutterBottom>RECENT POSTS</Typography>
                            {
                                [1, 2, 3, 4].map(item =>
                                  <BlogThumb key={item}/>
                                )
                            }
                        </Box>

                    </Grid>
                    <Grid item container lg={9} md={9} sm={12} xs={12} spacing={3}>
                        <Box mx={3} mb={4}>
                            <Box textAlign="center" my={3}>
                                <Typography variant="h5" gutterBottom>Blogs</Typography>
                            </Box>

                            <Grid item container lg={12} md={12} sm={12} xs={12} spacing={3}>
                                {
                                    [1, 2, 3, 4, 5, 6].map(item =>
                                        <Grid item key={item} lg={4} md={4} sm={4} xs={6}>
                                            <Card className={classes.cardItem}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        className={classes.mediaItem}
                                                        image="/post-img1.jpg"
                                                        title="Contemplative Reptile"
                                                    />
                                                    <CardContent>
                                                        <Typography variant="body" gutterBottom component="h2">
                                                            Lizards are a widespread group of squamat
                                                        </Typography>
                                                        <Grid container direction="row" alignItems="center">
                                                            <Grid item>
                                                                <AccessTimeIcon fontSize="small" />
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography variant="subtitle2"> &nbsp;May 02, 2017 </Typography>
                                                            </Grid>
                                                        </Grid>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                                            across all continents except Antarctica
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                                <CardActions>
                                                    <Link to="/blogs/blog" className={classes.link}>
                                                    <BlackButton>Read More <ArrowRightIcon /></BlackButton>
                                                    </Link>
                                                </CardActions>
                                            </Card>

                                        </Grid>
                                    )
                                }
                            </Grid>
                        </Box>

                    </Grid>
                </Grid>
                <Box textAlign="center" my={3}>
                <BlackButton>Load More</BlackButton>
            </Box>
            </Box>
            
        </Layout>
    )
}
export default BlogsPage;