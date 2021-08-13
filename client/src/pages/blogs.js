import { Grid, Typography, makeStyles, Box, Breadcrumbs, CardActionArea, CardActions } from "@material-ui/core"
import Layout from "../components/Layout"
import '../App.css';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import BlackButton from "../components/BlackButton";
import BlogThumb from '../components/BlogThumb';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import CloseIcon from '@material-ui/icons/Close';
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
}))
const BlogsPage = () => {
    const classes = useStyle();
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
                            <Typography variant="subtitle2"><Link to="/" className={classes.link}>Policy</Link></Typography>
                            <Typography variant="subtitle2"><Link to="/" className={classes.link}>Special Events</Link></Typography>
                            <Typography variant="subtitle2"><Link to="/" className={classes.link}>Trend</Link></Typography>
                            <Typography variant="subtitle2"><Link to="/" className={classes.link}>Beauty</Link></Typography>
                        </Box>
                        <Box px={4} mt={4}>
                            <h5 className="fontRoSlab">RECENT POSTS</h5>
                            {
                                [1, 2, 3, 4].map(item =>
                                    <BlogThumb key={item} />
                                )
                            }
                        </Box>
                    </Grid>
                    <Grid item lg={9} md={9} sm={12} xs={12} >
                        <Box mb={4} px={4} mt={1}>
                            <Box mb={3} >
                                <Paper component="form" className={classes.root}>
                                    <InputBase
                                        className={classes.input}
                                        placeholder="Search"
                                        inputProps={{ 'aria-label': 'search google maps' }}
                                    />
                                    <IconButton className={classes.iconButton} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                </Paper>
                            </Box>
                            <Grid container spacing={3}>
                                {
                                    [1, 2, 3, 4, 5, 6].map(item =>
                                        <Grid item key={item} lg={4} md={4} sm={6} xs={12}>
                                            <Card className={classes.cardItem}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        className={classes.mediaItem}
                                                        image="/post-img1.jpg"
                                                        title="Contemplative Reptile"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom >
                                                            <Link to="/blogs/blog" className="link">
                                                                <span className="fontRoSlab fontSize20" >
                                                                    Lizards are a widespread group of squamat
                                                                </span>
                                                            </Link>
                                                        </Typography>
                                                        <Typography component="span" gutterBottom>
                                                            <Grid container direction="row" alignItems="center">
                                                                <Grid item>
                                                                    <AccessTimeIcon fontSize="small" />
                                                                </Grid>
                                                                <Grid item>
                                                                    <Typography variant="subtitle2" gutterBottom> &nbsp;May 02, 2017 </Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" >
                                                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                                            across all continents except Antarctica
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                                <CardActions>
                                                    <Box textAlign="center">
                                                        <Link to="/blogs/blog" className={classes.link}>
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
                        <Box textAlign="center" my={5}>
                            <BlackButton>Load More</BlackButton>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    )
}
export default BlogsPage;