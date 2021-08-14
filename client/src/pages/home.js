import React from 'react';
import Layout from '../components/Layout';
import Banner from '../components/Banner/Banner';
import { Link } from 'react-router-dom';
import CollectionSwiper from '../components/CategorySwiper';
import { Parallax, Background } from "react-parallax";
import { Box, Typography, Grid, Container} from '@material-ui/core';
import ProductItem from '../components/ProductItem';
import '../App.css';
const insideStyles = {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };
const HomePage = () =>  {
    return(
        <>
        <Layout>
            <Banner/>
            <Box textAlign="center" mt={5} style={{marginTop: 80}}>
              
                <Box my={4}>
                <h2 className="sectionTitle">Our Collections</h2>
                <span className="fontRoSlab">A wide range of product lines for your choice  </span>
                </Box>
                <Box  flexDirection="column" justifyContent="center" alignItems="center">
                    <CollectionSwiper />
                </Box>
            </Box>
            <Box  my={5} style={{marginTop: 80}}>
            <Parallax bgImage={"./parallax2.jpg"} strength={500} >
                <div className="parallax">
                    <div style={insideStyles}>
                    <div className="parallaxContentBox">
                        <Box textAlign="center">
                            <h2 className="parallaxTitle">Belle <br/> The best choice for your store</h2>
                            <p className="parallaxContent">Is a Spanish fast fashion clothing and accessories retailer. The company was founded in 1975 by Amancio Ortega and Rosalía Mera</p>
                            <Link href="#" className="linkParallax">Purchase Now</Link>
                        </Box>
                    </div>
                    </div>
                </div> 
            </Parallax>
            </Box>
            <Box textAlign="center" mx={4} my={5} style={{marginTop: 80}}>
                <Box my={4}>
                <h2 className="sectionTitle">New Arrivals</h2>
                <p className="fontRoSlab">Grab these new items before they are gone!</p>
                </Box>
                <Grid container>
                    {
                        [0,1,2,3,4,5,6,7].map(item =>
                            <Grid key={item} item  container lg={3} md={4} sm={6} xs={6} direction="row" justifyContent="center">
                                <ProductItem />
                            </Grid>
                            )
                    }

                </Grid>

            </Box>
            <Box my={5} style={{marginTop: 80}}>
            <Container className="latestBlog">
                <Grid container>
                    <Grid item xs={12} lg={12} sm={12} md={12}>
                        <Box textAlign="center" my={3}>
                        <h2 className="sectionTitle">Latest From Our Blogs</h2>  
                        </Box>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <div className="wrapBlog">
                            <Link to="blog-left-sidebar.html" className="article__gridImage">
                                    <img src="./post-img1.jpg" alt="It's all about how you wear" title="It's all about how you wear"/>
                            </Link>
                            <div className="article__gridMeta article__grid-metaHasImage">
                                <div className="wrapBlogInner">
                                   <Box>
                                   <Link to="blog-left-sidebar.html" className="blogTitle">It's all about how you wear</Link>
                                   </Box>                            
                                    <Typography variant="caption" color="action">May 02, 2017</Typography>
                                    <div className="rte article__gridExcerpt">
                                        I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account...
                                    </div>
                                    <ul >
                                        <li><Link to="blog-article.html" className="blogLink">READ MORE</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <div className="wrapBlog">
                            <Link to="blog-left-sidebar.html" className="article__gridImage">
                                    <img src="./post-img2.jpg" alt="It's all about how you wear" title="It's all about how you wear" />
                            </Link>
                            <div className="article__gridMeta article__grid-metaHasImage">
                                <div className="wrapBlogInner">
                                   <Box>
                                   <Link to="blog-left-sidebar.html" className="blogTitle">It's all about how you wear</Link>
                                   </Box>                            
                                    <Typography variant="caption" color="action">May 02, 2017</Typography>
                                    <div className="rte article__gridExcerpt">
                                        I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account...
                                    </div>
                                    <ul >
                                        <li><Link to="blog-article.html" className="blogLink">READ MORE</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </Box>
        </Layout>   
        </>
    )
}
 
  
    
 

export default HomePage