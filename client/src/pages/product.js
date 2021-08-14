import { useState } from 'react';
import ProductImage from "../components/ProductImage";
import Layout from "../components/Layout";
import { Container, Grid, Breadcrumbs, Box, Typography, Tabs, Tab, Paper, Button, makeStyles } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import InfoIcon from '@material-ui/icons/Info';
import StarIcon from '@material-ui/icons/Star';
import CommentIcon from '@material-ui/icons/Comment';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ReviewForm from '../components/ReviewForm'
import '../App.css';
import Review from '../components/Review';
import BlackButton from '../components/BlackButton';
import Rating from '../components/Rating';
import Comment from '../components/Comment';
import SizeChart from '../components/SizeChart';
import CommentForm from '../components/CommentForm';
import QtyButton from '../components/QtyButton';
import { Link } from 'react-router-dom';
const useStyle = makeStyles({
    tabPaper : {
        boxShadow: 'none',
        color: 'black',
        border: 'none',
        borderRadius: 0,
        borderBottom: '1px solid #a3a3a3',
   
    },
    tabLabel : {
        fontWeight: 'bold',
    }
})
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
                    <Typography>{children}</Typography>
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

const ProductPage = () => {
    const matchXS = useMediaQuery('(max-width:600px)');
    const [tab, setTab] = useState(0);
    const classes = useStyle();
    const handleChangeTab = (event, newValue) => {
        setTab(newValue);
    };
    return (
        <Layout>
           {/*  Breadcrumbs section */}
            <div className="breadCrumbs">
                <Box px={3} py={1}>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    <Link className="link" to="/"  >
                    <Typography variant="subtitle2">Home</Typography>
                    </Link>
                    <Link className="link" to="/shop" >
                    <Typography variant="subtitle2">Shop</Typography>
                    </Link>
                    <Link className="link" to="/shop/accessory" >
                    <Typography variant="subtitle2">Accessory</Typography>
                    </Link>
                    <Typography color="textPrimary">Product</Typography>
                </Breadcrumbs>
                </Box>
              
            </div>
             {/*  Product summary section */}
            <Container maxWidth="md"  >
                <Grid container>
                    <Grid item md={6} sm={6} xs={12}>
                        <Box px={4}>
                            <ProductImage />
                        </Box>

                    </Grid>
                    <Grid item md={6} sm={6} xs={12}>
                        <span className="productSingle__title">Product With Bottom Thumbs</span>
                        <div className="prInfoRow">
                            <div className="productStock"> <span className="instock">In Stock</span></div>
                            <div className="productSku">SKU: <span className="variantSku">19115-rdxs</span></div>
                        </div>
                        <p className="productSingle__price">
                            $788.00
                        </p>
                        <div className="rte">
                            <ul>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                                <li>Sed ut perspiciatis unde omnis iste natus error sit</li>
                                <li>Neque porro quisquam est qui dolorem ipsum quia dolor</li>
                                <li>Lorem Ipsum is not simply random text.</li>
                            </ul>
                        </div>
                        <p className="featureTitle">COLOR: RED</p>
                        <div className="color">
                            <span className="spanColor" style={{ backgroundColor: 'yellow' }}></span>
                            <span className="spanColor" style={{ backgroundColor: 'red' }}></span>
                            <span className="spanColor" style={{ backgroundColor: 'black' }}></span>
                            <span className="spanColor" style={{ backgroundColor: 'orange' }}></span>
                        </div>
                        <p className="featureTitle">SIZE</p>
                        <div className="size">
                            <span className="spanSize">XS</span>
                            <span className="spanSize">S</span>
                            <span className="spanSize">M</span>
                            <span className="spanSize">L</span>
                            <span className="spanSize">XL</span>
                        </div>
                        <div className="featureButtonBox">
                            <Box mr={2}>
                            <QtyButton width={105} height={45} quantity={2}/>
                            </Box>
                          
                            <button className="addToCartButton">ADD TO CART</button>
                        </div>
                        <div className="wishListBox">
                            <FavoriteBorderIcon fontSize="small" />&nbsp;&nbsp;<Typography variant="subtitle2">Add to your wishlist</Typography>
                        </div>
                    </Grid>
                </Grid>
            </Container>
             {/*  Product feature section */}
            <Container maxWidth="md" className="featuresBox">
                <Grid container spacing={3}>
                    <Grid item lg={3} md={6} sm={6} className="productFeatures">
                        <img src="./credit-card.png" alt="Safe Payment" title="Safe Payment" />
                        <div className="productFeatureDetails"><span>Safe Payment</span>Pay with the world's most payment methods.</div>
                    </Grid>
                    <Grid item lg={3} md={6} sm={6} className="productFeatures">
                        <img src="./shield.png" alt="Confidence" title="Confidence" />
                        <div className="productFeatureDetails"><span>Confidence</span>Protection covers your purchase and personal data.</div>
                    </Grid>
                    <Grid item lg={3} md={6} sm={6} className="productFeatures">
                        <img src="./worldwide.png" alt="Worldwide Delivery" title="Worldwide Delivery" />
                        <div className="productFeatureDetails"><span>Worldwide Delivery</span>FREE &amp; fast shipping to over 200+ countries &amp; regions.</div>
                    </Grid>
                    <Grid item lg={3} md={6} sm={6} className="productFeatures">
                        <img src="./phone-call.png" alt="Hotline" title="Hotline" />
                        <div className="productFeatureDetails"><span>Hotline</span>Talk to help line for your question on 4141 456 789, 4125 666 888</div>
                    </Grid>
                </Grid>
            </Container>
              {/*  Product review section */}
            <Container maxWidth="md" className="featuresBox">
                <Paper className={classes.tabPaper}>
                    <Tabs
                   
                        value={tab}
                        onChange={handleChangeTab}
                        indicatorColor="inherit"
                        textColor="inherit"
                        centered
                    >
                        <Tab label={ matchXS ? <InfoIcon style={{ margin: 10, fontSize: 30}}/> : <span className={classes.tabLabel}>DETAILS</span>} {...a11yProps(0)} />
                        <Tab label={matchXS ? <StarIcon style={{ margin: 10, fontSize: 30}}/> : <span className={classes.tabLabel}>REVIEWS</span>} {...a11yProps(1)} />
                        <Tab label={matchXS ? <CommentIcon style={{ margin: 10, fontSize: 30}}/> : <span className={classes.tabLabel}>COMMENTS</span>} {...a11yProps(2)} />
                        <Tab label={matchXS ? <AccessibilityNewIcon style={{ margin: 10, fontSize: 30}}/> : <span className={classes.tabLabel}>SIZE CHART</span>} {...a11yProps(3)} />
                    </Tabs>
                </Paper>
                <TabPanel value={tab} index={0}>
                    <Container maxWidth="md">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                    , when an unknown printer took a galley of type and scrambled it to make a type
                    specimen book. It has survived not only five centuries, but also the leap into 
                    electronic typesetting, remaining essentially unchanged.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                    Sed ut perspiciatis unde omnis iste natus error sit
                    Neque porro quisquam est qui dolorem ipsum quia dolor
                    Lorem Ipsum is not simply random text.
                    Free theme updates
                    </Container>
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <Container >
                        <Grid container spacing={1}>
                            <Grid item container lg={6} md={6} sm={12} xs={12}  direction="row" alignItems="flex-start" justifyContent="center" >
                                    <Grid item container sm={6} xs={12} direction="column" alignItems="center" justifyContent="center" >
                                        <div className="ratingBox">
                                        <span className="reviewOverall">Overall</span>
                                        <span className="reviewRating">3,67</span>
                                        <span>(5 reviews)</span>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} container sm={6} direction="column" alignItems="center" justifyContent="center">
                                            <p className="reviewCount">Base on 5 reviews</p>
                                            <div className="starLine"><span>5 stars &nbsp;</span><Rating size={19} rating={5} /><span> &nbsp;1</span></div>
                                            <div className="starLine"><span>4 stars &nbsp;</span><Rating size={19} rating={4} /><span> &nbsp;1</span></div>
                                            <div className="starLine"><span>3 stars &nbsp;</span><Rating size={19} rating={3} /><span> &nbsp;1</span></div>
                                            <div className="starLine"><span>2 stars &nbsp;</span><Rating size={19} rating={2} /><span> &nbsp;1</span></div>
                                            <div className="starLine"><span>1 stars &nbsp;</span><Rating size={19} rating={1} /><span> &nbsp;1</span></div>
                                    </Grid>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <ReviewForm/>
                            </Grid>
                        </Grid>
                   
                      {
                          [0,1,2,3,4,5].map(item => <Review key={item}/>)
                      }
                      <Box textAlign="center">
                        <BlackButton >Load More</BlackButton>
                      </Box>
                    </Container>
                </TabPanel>
                <TabPanel value={tab} index={2}>
                   <Container maxWidth="md">
                       <CommentForm/>
                   {
                       [1,2,3,4,5].map(item => <Comment key={item}/>)
                   }
                          <Box textAlign="center">
                        <BlackButton >Load More</BlackButton>
                      </Box>
                   </Container>
                  
                </TabPanel>
                <TabPanel value={tab} index={3}>
                   <Container maxWidth="md">
                   <SizeChart/>
                   </Container>
                </TabPanel>
            </Container>
        </Layout>
    )
}

export default ProductPage