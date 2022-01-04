import { Box, Breadcrumbs, Container, FormControl, Grid, makeStyles, MenuItem, Paper, Select, Tab, Tabs, Typography } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import InfoIcon from '@material-ui/icons/Info';
import StarIcon from '@material-ui/icons/Star';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import orderActions from "../actions/order";
import shopActions from "../actions/shop";
import '../App.css';
import BlackButton from '../components/BlackButton';
import Comment from '../components/Comment';
import CommentForm from '../components/CommentForm';
import Layout from "../components/Layout";
import { PageLoading } from "../components/PageLoading";
import Loader from '../components/Loader';
import ProductImage from "../components/ProductImage";
import QtyButton from '../components/QtyButton';
import Rating from '../components/Rating';
import Review from '../components/Review';
import ReviewForm from '../components/ReviewForm';
import SizeChart from '../components/SizeChart';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import PinterestIcon from '@material-ui/icons/Pinterest';
import EmailIcon from '@material-ui/icons/Email';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import PeopleIcon from '@material-ui/icons/People';
const useStyle = makeStyles((theme) => ({
    tabPaper : {
        boxShadow: 'none',
        color: 'black',
        border: 'none',
        borderRadius: 0,
        borderBottom: '1px solid #a3a3a3',
   
    },
    tabLabel : {
        fontWeight: 'bold',
    },
    formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
  },
  selectMenu : {
      display: 'flex',
      alignItems: "center"
  },
  indicator: {
      backgroundColor: "black"
  }
  
}))
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
                    {children} 
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
    const { productId } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const matchXS = useMediaQuery('(max-width:600px)');
    const [tab, setTab] = useState(0);
    const classes = useStyle();
    const [ message, setMessage ] = useState("");
    const [ item, setItem ] = useState("");
    const [ qty, setQty ] = useState(1);

   // const user = useSelector(state => state.userAuth).user;
   const user = JSON.parse(localStorage.getItem('user'));
    const orderId = useSelector(state => state.order).orderId;
     const product = useSelector(state => state.shop).product;

     const reviews = useSelector(state => state.shop.reviews);
     const reviewCount = useSelector(state => state.shop.reviewCount);
     const reviewLoading = useSelector(state => state.shop.reviewLoading);
 
    useEffect(() => {
        if(!isNaN(productId) && productId !== undefined)
        {
           dispatch(shopActions.getProductById(productId))

        }
        setItem("");
        setQty(1);
          setMessage("");
        },[productId, location]); 
    useEffect(() => {
        dispatch(shopActions.getProductReviews(productId));
        dispatch(shopActions.getReviewCount(productId))
    },[])
    const handleChangeTab = (event, newValue) => {
        setTab(newValue);
    };
    const handleChangeItem = e => {
        setItem(e.target.value)
    }
    const handleChangeQty = (value) => {
        setQty(value);
    }
    const handleAddToCart = (e) => {
        e.preventDefault();
        if(qty > 0 && item !== "") 
        {
            // when user has not logged in
            if(!user?.id) 
            {
                dispatch(orderActions.addItemToCart(product, {productVariantId: item, quantity: qty}));              
            } 
            // when user has logged in
            else {
                console.log(orderId);
                // when use has not had any pending carts before
                if(orderId === "") {  
                    dispatch(orderActions.createOrder({userId: user.id, details: [{ productVariantId: item, quantity: qty, unitPrice: product.price}]}))
                }
                // when user has got a pending cart
                else {
                    dispatch(orderActions.updateOrderItem(orderId, {orderId: orderId, productVariantId: item, quantity: qty, unitPrice: product.price }))
                }
            } 
          setMessage("");
        } else {
            setMessage("Vui lòng chọn một phiên bản bên dưới")
        }
    }
    if(!product?.id) return <Loader />
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
                    <Typography variant="subtitle2">Product</Typography>
                </Breadcrumbs>
                </Box>
              
            </div>
             {/*  Product summary section */}   
            <Container maxWidth="lg" className="featuresBox" >
                <Grid container spacing={2}>
                    <Grid item md={6} sm={6} xs={12}>
                        <Box px={4}>
                            <ProductImage list={product.imgPaths}/>
                        </Box>

                    </Grid>
                    <Grid item md={6} sm={6} xs={12}>
                        <span className="productSingle__title">{product.name.toUpperCase()}</span>
                        <div className="prInfoRow">
                            <div className="productStock"> <span className="instock">In Stock</span></div>
                            <div className="productSku">SKU: <span className="variantSku">{product.sku}</span></div>
                            <div className="productReview"><Rating size={20} rating={Math.ceil(reviewCount?.overallReview)}/> &nbsp; {reviewCount?.reviewCount} reviews</div>
                        </div>
                        <p className="productSingle__price">
                           {product.price.toLocaleString()} VND
                        </p>
                        <div className="rte">
                            {product.summary}
                        </div>
                
                         <Box mx={1} mt={3}>
                                <Typography variant="body2">Phiên bản: <span style={{color: "red"}}>{message}</span> </Typography>
                        </Box>
                       
                         <FormControl className={classes.formControl} required>
                           
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={item}
                            classes={{ selectMenu: classes.selectMenu}}
                            onChange={handleChangeItem}
                            >
                             <MenuItem value="" disabled>
                                Size  | Màu sắc
                                </MenuItem>
                            {
                                product.variants.map(v => 
                                 <MenuItem key={v.id} value={v.id}>
                                Size {v.size.name} | Màu {v.color.name}<FiberManualRecordIcon style={{color: v.color.code}}/>
                                </MenuItem>
                                )
                            }
                            </Select>
                        </FormControl>
                    
                        <div className="featureButtonBox">
                            <Box mr={2}>
                            <QtyButton width={105} height={45}  getQuantity={handleChangeQty} updateCart={false}/>
                            </Box>
                          
                            <button className="addToCartButton" onClick={handleAddToCart}>ADD TO CART</button>
                        </div>
                        
                        <Box my={3} className="wishListBox">
                            <Grid container justifyContent='space-between'>
                                <Grid item className="productReview">
                                <FavoriteBorderIcon fontSize="small" />&nbsp; Add to your wishlist 
                                </Grid>
                                <Grid item  className="productReview">
                                    <FacebookIcon fontSize="small"/>&nbsp;Share &nbsp;<TwitterIcon fontSize="small"/>&nbsp;Tweet &nbsp;<PinterestIcon fontSize="small"/>&nbsp;Pin it &nbsp;<EmailIcon fontSize="small"/>&nbsp;Mail
                                </Grid>
                            </Grid>
                        </Box>
                        <Box mx={1} my={1} className="fontRoSlab">
                            <Typography variant="inherit"  ><strong>Loại hàng:</strong> {product.category.name}</Typography>
                        </Box>
                       <Box mx={1} my={1} className="fontRoSlab">
                              <Typography variant="inherit"><strong>Thương hiệu:</strong> {product.brand.name.toUpperCase()}</Typography>
                        </Box>
                        <Box my={4}>
                            <Box my={2} className="productReview"><LocalShippingIcon fontSize="small" color="action"/> &nbsp; <Typography variant="caption"> GETTING CLOSER! ONLY $199.00 AWAY FROM FREE SHIPPING!</Typography> </Box>
                            <Box my={2} className="productReview"><QueryBuilderIcon fontSize="small" color="action"/> &nbsp; <Typography variant="caption"> ESTIMATED DELIVERY BETWEEN Wed. May 1 and Tue. May 7.</Typography></Box>
                            <Box my={2} className="productReview"><PeopleIcon fontSize="small" color="error"/> &nbsp; <Typography variant="caption"> 14 PEOPLE ARE LOOKING FOR THIS PRODUCT</Typography></Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>          
             {/*  Product feature section */}
            <Container maxWidth="lg" className="featuresBox">
                <Grid container spacing={3}>
                    <Grid item lg={3} md={6} sm={6} className="productFeatures">
                        <img src="../../credit-card.png" alt="Safe Payment" title="Safe Payment" />
                        <div className="productFeatureDetails"><span>Safe Payment</span>Pay with the world's most payment methods.</div>
                    </Grid>
                    <Grid item lg={3} md={6} sm={6} className="productFeatures">
                        <img src="../../shield.png" alt="Confidence" title="Confidence" />
                        <div className="productFeatureDetails"><span>Confidence</span>Protection covers your purchase and personal data.</div>
                    </Grid>
                    <Grid item lg={3} md={6} sm={6} className="productFeatures">
                        <img src="../../worldwide.png" alt="Worldwide Delivery" title="Worldwide Delivery" />
                        <div className="productFeatureDetails"><span>Worldwide Delivery</span>FREE &amp; fast shipping to over 200+ countries &amp; regions.</div>
                    </Grid>
                    <Grid item lg={3} md={6} sm={6} className="productFeatures">
                        <img src="../../phone-call.png" alt="Hotline" title="Hotline" />
                        <div className="productFeatureDetails"><span>Hotline</span>Talk to help line for your question on 4141 456 789, 4125 666 888</div>
                    </Grid>
                </Grid>
            </Container>
              {/*  Product review section */}
            <Container maxWidth="lg" className="featuresBox">
                <Paper className={classes.tabPaper}>
                    <Tabs              
                        value={tab}
                        onChange={handleChangeTab}
                        centered
                        classes={{ indicator: classes.indicator }}
                    >
                        <Tab label={ matchXS ? <InfoIcon style={{ margin: 10, fontSize: 30}}/> : <span className={classes.tabLabel}>PRODUCT DETAILS</span>} {...a11yProps(0)} />
                        <Tab label={matchXS ? <StarIcon style={{ margin: 10, fontSize: 30}}/> : <span className={classes.tabLabel}>PRODUCT REVIEWS</span>} {...a11yProps(1)} />
                        <Tab label={matchXS ? <CommentIcon style={{ margin: 10, fontSize: 30}}/> : <span className={classes.tabLabel}>PRODUCT COMMENTS</span>} {...a11yProps(2)} />
                        <Tab label={matchXS ? <AccessibilityNewIcon style={{ margin: 10, fontSize: 30}}/> : <span className={classes.tabLabel}>SIZE CHART</span>} {...a11yProps(3)} />
                    </Tabs>
                </Paper>
                <TabPanel value={tab} index={0}>
                    <Container maxWidth="lg">
                    <div className="product-description rte">
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                                    <ul>
                                      <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                                      <li>Sed ut perspiciatis unde omnis iste natus error sit</li>
                                      <li>Neque porro quisquam est qui dolorem ipsum quia dolor</li>
                                      <li>Lorem Ipsum is not simply random text.</li>
                                      <li>Free theme updates</li>
                                    </ul>
                                    <h3>Sed ut perspiciatis unde omnis iste natus error sit voluptatem</h3>
                                    <p>You can change the position of any sections such as slider, banner, products, collection and so on by just dragging and dropping.&nbsp;</p>
                                    <h3>Lorem Ipsum is not simply random text.</h3>
<p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.</p>
                                    <p>Change colors, fonts, banners, megamenus and more. Preview changes are live before saving them.</p>
                                    <h3>1914 translation by H. Rackham</h3>
                                    <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.</p>
                                    <h3>Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</h3>
                                    <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
                                    <h3>The standard Lorem Ipsum passage, used since the 1500s</h3>
                                    <p>You can use variant style from colors, images or variant images. Also available differnt type of design styles and size.</p>
                                    <h3>Lorem Ipsum is not simply random text.</h3>
<p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.</p>
                                    <h3>Proin ut lacus eget elit molestie posuere.</h3>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.</p>
                                </div>
                    </Container>
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <Container >
                        <Grid container spacing={1}>
                            <Grid item container lg={6} md={6} sm={12} xs={12}  direction="row" alignItems="flex-start" justifyContent="center" >
                                    <Grid item container sm={6} xs={12} direction="column" alignItems="center" justifyContent="center" >
                                        <div className="ratingBox"  >
                                        <span className="reviewOverall">Overall</span>
                                        <span className="reviewRating">{reviewCount?.overallReview?.toFixed(2)}</span>
                                        <span>({reviewCount?.reviewCount} reviews)</span>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} container sm={6} direction="column" alignItems="center" justifyContent="center">
                                            <p className="reviewCount">Base on {reviewCount?.reviewCount} reviews</p>
                                            {
                                                reviewCount?.details?.map((review,index) => <div key={index} className="starLine"><span>{5 - index} stars &nbsp;</span><Rating size={19} rating={5 - index} /><span> &nbsp;{review}</span></div>
                                                )
                                            }
               {/*                              <div className="starLine"><span>5 stars &nbsp;</span><Rating size={19} rating={5} /><span> &nbsp;1</span></div>
                                            <div className="starLine"><span>4 stars &nbsp;</span><Rating size={19} rating={4} /><span> &nbsp;1</span></div>
                                            <div className="starLine"><span>3 stars &nbsp;</span><Rating size={19} rating={3} /><span> &nbsp;1</span></div>
                                            <div className="starLine"><span>2 stars &nbsp;</span><Rating size={19} rating={2} /><span> &nbsp;1</span></div>
                                            <div className="starLine"><span>1 stars &nbsp;</span><Rating size={19} rating={1} /><span> &nbsp;1</span></div> */}
                                    </Grid>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                {
                                    user?.id ?  <ReviewForm loading={reviewLoading} productId={product?.id} userId={user?.id}/>:
                                            <Typography variant="subtitle2">Please login to review this product</Typography>
                                }
                              
                            </Grid>
                        </Grid>
                   
                      {
                          reviews.map((item,index) => <Review key={index} review={item}/>)
                      }
                      <Box textAlign="center">
                          {
                              reviews.length !== 0 &&  <BlackButton >Load More</BlackButton>

                          }
                      </Box>
                    </Container>
                </TabPanel>
                <TabPanel value={tab} index={2}>
                   <Container maxWidth="lg">
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