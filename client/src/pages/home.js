import { Box, Container, Grid, Typography } from '@material-ui/core';
import { convertFromRaw } from "draft-js";
import { Parallax } from "react-parallax";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../App.css';
import Banner from '../components/Banner/Banner';
import CollectionSwiper from '../components/CategorySwiper';
import ProductItem from '../components/ProductItem';
import { displayMonDDYYYY } from '../helper/handleTime';

const insideStyles = {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

const HomePage = () => {

    const productCategories = useSelector(state => state.home.productCategories);
    const newArrivals = useSelector(state => state.home.newArrivals);
    const latestBlogs = useSelector(state => state.home.latestBlogs);

    return (
        <>    
                <Banner />
                <Box textAlign="center" mt={5} style={{ marginTop: 80 }}>
                    <Box my={4}>
                        <h2 className="sectionTitle">OUR COLLECTIONS</h2>
                        <span className="fontRoSlab">A wide range of product lines for your choice  </span>
                    </Box>
                    <Box flexDirection="column" justifyContent="center" alignItems="center">
                        <CollectionSwiper list={productCategories} />
                    </Box>
                </Box>
                <Box my={5} style={{ marginTop: 80 }}>
                    <Parallax bgImage={"./parallax2.jpg"} strength={500} >
                        <div className="parallax">
                            <div style={insideStyles}>
                                <div className="parallaxContentBox">
                                    <Box textAlign="center">
                                        <h2 className="parallaxTitle">Belle <br /> The best choice for your store</h2>
                                        <p className="parallaxContent">Is a Spanish fast fashion clothing and accessories retailer. The company was founded in 1975 by Amancio Ortega and Rosalía Mera</p>
                                        <Link to="/" className="linkParallax">Purchase Now</Link>
                                    </Box>
                                </div>
                            </div>
                        </div>
                    </Parallax>
                </Box>
                <Box textAlign="center" mx={4} my={5} style={{ marginTop: 80 }}>
                    <Box my={4}>
                        <h2 className="sectionTitle">NEW ARRIVALS</h2>
                        <p className="fontRoSlab">Grab these new items before they are gone!</p>
                    </Box>
                    <Grid container>
                        {
                            newArrivals.map(product =>
                                <Grid key={product.id} item container lg={3} md={4} sm={6} xs={6} direction="row" justifyContent="center">
                                    <ProductItem product={product} />
                                </Grid>
                            )
                        }
                    </Grid>
                </Box>
                <Box mt={5} style={{ marginTop: 80 }}>
                    <Box my={5}>
                    <Container className="latestBlog">
                        <Grid container>
                            <Grid item xs={12} lg={12} sm={12} md={12}>
                                <Box textAlign="center" my={3}>
                                    <h2 className="sectionTitle">LATEST FROM OUR BLOGS</h2>
                                    <p className="fontRoSlab"> blog Checkout our blog & the latest in style and offers as they happen</p>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container>
                            {
                                latestBlogs?.map(b => (
                                    <Grid key={b.id} item xs={12} sm={12} md={6} lg={6}>
                                        <div className="wrapBlog">
                                            <Link to="blog-left-sidebar.html" className="article__gridImage">
                                                <img src={b?.imgPath} alt="It's all about how you wear" title="It's all about how you wear" className="blogThumb" />
                                            </Link>
                                            <div className="article__gridMeta article__grid-metaHasImage">
                                                <div className="wrapBlogInner">
                                                    <Box>
                                                        <Link to="blog-left-sidebar.html" className="blogTitle">{b?.title}</Link>
                                                    </Box>
                                                    <Typography variant="caption"  >{displayMonDDYYYY(b.createdAt)}</Typography>
                                                    <div className="rte article__gridExcerpt">
                                                        {convertFromRaw(JSON.parse(b?.content))?.getPlainText().substr(0, 140).concat("...")}
                                                    </div>
                                                    <ul >
                                                        <li><Link to={`/blogs/blog/${b.id}`} className="blogLink">READ MORE</Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Container>
                    </Box>
                    
                </Box>           
        </>
    )
}





export default HomePage