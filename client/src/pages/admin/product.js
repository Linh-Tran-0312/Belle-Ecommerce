import { Box, Button, Card, CardActionArea, CardActions, CardMedia, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Slider, TextField, Typography } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SaveIcon from '@material-ui/icons/Save';
import Pagination from '@material-ui/lab/Pagination';
import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import productActions from "../../actions/adminProduct";
import Rating from "../../components/Rating";
import DeleteButton from "../../components/DeleteButton";
import UploadImage from "../../components/UploadImage";
const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    fullWidth: {
        width: "100%"
    },
    img: {
        maxWidth: 245,
        width: "100%",

    },
    formControl: {
        minWidth: 170,
        margin: 10
    },
    formButton: {
        margin: 5,
    },
    media: {
        height: 140,
    },
});
  
const initFilter = {
    search: "",
    category: "",
    brand: "",
    min: "",
    max: "",
    sortMethod: "",
    page: 1,
    limit: 5
};
const initProduct = {
    id: "",
    name: "",
    sku: "",
    categoryId: "",
    brandId: "",
    price: 0,
    summary: "",
    description: "",
    imgPaths: [],
};
const initVariant = {
    id: "",
    productId: "",
    colorId: "",
    sizeId: "",
    quantity: 0
}
export default function ProductAdmin() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const categories = useSelector(state => state.adminProduct).categories;
    const brands = useSelector(state => state.adminProduct).brands;
    const colors = useSelector(state => state.adminProduct).colors;
    const sizes = useSelector(state => state.adminProduct).sizes;

    const products = useSelector(state => state.adminProduct).products;
    const productDetail = useSelector(state => state.adminProduct).product;
    const productTotal = useSelector(state => state.adminProduct).total;

    const isDeletingProduct = useSelector(state => state.adminProduct).isDeletingProduct;
    const isDeletingProductVariant = useSelector(state => state.adminProduct).isDeletingProductVariant;

    const [ filter, setFilter ] = useState(initFilter);
    const [ product, setProduct ] = useState(initProduct);
    const [ variant, setVariant ] = useState(initVariant);

    const [price, setPrice] = React.useState([0, 5000]);
 
    const [showProduct, setShowProduct] = useState(false);
    const [ showVariant, setShowVariant ] = useState(false);

    const [ pageCount, setPageCount] = useState(0)

    useEffect(() => {
        dispatch(productActions.getProducts(filter));
    },[]);

    useEffect(() => {
       if(productDetail.id !== "")
       {
        setProduct({...productDetail})
       }
   },[productDetail]);

    useEffect(() => {
        const mod = productTotal%filter.limit;
        let pageNumber = productTotal/filter.limit;
         pageNumber = mod === 0 ? pageNumber : Math.floor(pageNumber) + 1;
        setPageCount(pageNumber)
    },[productTotal]);

    //Handle filter state
    const handleChangePage = (event, value) => {
        dispatch(productActions.getProducts({...filter, page: value})) 
        setFilter({...filter, page : value});
    };
    const handleFilterChange = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value })
    }
    const handleChangePrice = (event, newValue) => {
        setPrice(newValue);
    };
    const handleResetFilter = (e) => {
        setFilter(initFilter);
    }
    const handleSubmitFilter = (e) => {
        dispatch(productActions.getProducts({...filter, min: price[0], max: price[1]}));
        setProduct(initProduct);
        setShowProduct(false);

    };

    //Handle product state
    const handleAddNewProduct = (e) => {
        setProduct(initProduct);
        setVariant(initVariant);
        setShowProduct(true);
        setShowVariant(false);
    }
    const handleGetProductById = (id) => {
        dispatch(productActions.getProductById(id));
        setShowProduct(true);
        setShowVariant(false);
        setVariant(initVariant);
    }
    const handleProductChange = (e) => {
        setProduct({...product, [e.target.name]: e.target.value})
    }
    const handleGetUrlImage = (url) => {
        if(url !== "")
        {
            const updatedPaths = product.imgPaths.concat(url);
            setProduct({...product, imgPaths: updatedPaths})
        }
    }
    const handleDeleteProductImage = (img) => {
        const updatedPaths = product.imgPaths.filter(i => i !== img)
        setProduct({...product, imgPaths: updatedPaths})
    }
    const handleSubmitProduct = e => {
        e.preventDefault();
        if(product.id === "")
        {
            dispatch(productActions.createProduct(product));
        } else {
            dispatch(productActions.updateProduct(product.id, product));
        }
    }
    const handleDeleteProduct = (e) => {
        dispatch(productActions.deleteProduct(product.id));
    }
    //Handle variant
    const handleAddNewVariant = (e) => {
        setShowVariant(true);
        setVariant(initVariant);
    }
    const handleSelectVariant = (variant) => {
        setVariant({...variant});
        setShowVariant(true);
    }
    const handleVariantChange = e => {
        setVariant({...variant, [e.target.name] : e.target.value})
    }
    const handleSubmitVariant = (e) => {
        e.preventDefault();
        if(variant.id === "")
        {
            dispatch(productActions.createProductVariant({...variant, productId: product.id}));
        } else {
            dispatch(productActions.updateProductVariant(variant.id, variant));
        }
    }
    const handleDeleteVariant = (e) => {
        dispatch(productActions.deleteProductVariant(variant.id));
        setVariant(initVariant);
    }
 
    return (
        <>
            <Grid container direction="row" justifyContent="flex-start" spacing={1}>
                <Grid item md={4} sm={12} xs={12}   >
                    <TextField fullWidth id="outlined-basic" onChange={handleFilterChange} value={filter.search} name="search" label="Search" placeholder="Search product..." variant="outlined" />
                </Grid>
                <Grid item md={3} sm={4} xs={6}  >
                    <FormControl fullWidth variant="outlined"  >
                        <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={filter.category}
                            onChange={handleFilterChange}
                            label="Category"
                            name="category"
                        >
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>
                            {
                                categories.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem> )
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={3} sm={4} xs={6} >
                    <FormControl fullWidth variant="outlined"  >
                        <InputLabel id="demo-simple-select-outlined-label">Brand</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={filter.brand}
                            onChange={handleFilterChange}
                            label="Brand"
                            name="brand"
                        >
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>                          
                            {
                                brands.map(b => <MenuItem key={b.id} value={b.id}>{b.name}</MenuItem> )
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={2} sm={4} xs={6} >
                    <FormControl fullWidth variant="outlined"  >
                        <InputLabel id="demo-simple-select-outlined-label">Sort</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={filter.sortMethod}
                            onChange={handleFilterChange}
                            label="Sort"
                            name="sortMethod"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="1">Ascending price</MenuItem>
                            <MenuItem value="2" selected>Descending price</MenuItem>
                            <MenuItem value="3">Ascending name</MenuItem>
                            <MenuItem value="4">Descending name</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <div>
                        <Typography id="range-slider" gutterBottom>
                            Price
                        </Typography>
                        <Slider
                            min={0}
                            max={5000}
                            value={price}
                            onChange={handleChangePrice}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                        /*  getAriaValueText={valuetext} */
                        />
                    </div>
                </Grid>
                <Grid item xs={12} container direction="row" justifyContent="space-between">
                    <Grid item>
                        <Button variant="contained" color="primary" size="large" className={classes.formButton} onClick={handleSubmitFilter}>
                            Apply
                        </Button>
                        <Button variant="contained" color="default" size="large" className={classes.formButton} onClick={handleResetFilter}>
                            Reset
                        </Button>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <Button variant="contained" color="primary" size="large" fullWidth startIcon={<AddBoxIcon />} className={classes.formButton} onClick={handleAddNewProduct} >
                            New Product
                        </Button>
                    </Grid>
                </Grid>
            </Grid>       
            <Box my={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell  ><strong>No</strong></TableCell>
                                        <TableCell><strong>Product Name</strong></TableCell>
                                        <TableCell  ><strong>SKU code</strong></TableCell>
                                        <TableCell  ><strong>Category</strong></TableCell>
                                        <TableCell  ><strong>Brand</strong></TableCell>
                                        <TableCell  ><strong>Price (VND)</strong></TableCell>
                                        <TableCell  ><strong>Review</strong></TableCell>
                                        <TableCell  ><strong></strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                {`${(filter.page - 1)*filter.limit + index + 1}`}
                                            </TableCell>
                                            <TableCell  >{row?.name}</TableCell>
                                            <TableCell  >{row?.sku}</TableCell>
                                            <TableCell  >{row?.category?.name}</TableCell>
                                            <TableCell  >{row?.brand?.name}</TableCell>
                                            <TableCell  >{row?.price.toLocaleString()}</TableCell>
                                            <TableCell  > <Rating size={15} rating={4} /></TableCell>
                                            <TableCell  ><IconButton size="small" onClick={() => handleGetProductById(row?.id)}><MoreHorizIcon /></IconButton></TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
                <Box my={5} textAlign="center">
                    <Pagination count={pageCount} page={filter.page} onChange={handleChangePage} />
                </Box>
            </Box>
            <Divider />
            {
                showProduct && (
            <Box my={5}>  
                <Box my={3} textAlign="center">
                <Typography color="primary" variant="h5">Product Details</Typography>    
                </Box>                
                <Grid container spacing={2}>
                    <Grid item sm={6} xs={12}>
                        <form onSubmit={handleSubmitProduct}>      
                            <Box >
                                <Box >
                                    <TextField type="text" fullWidth label="Product name" name="name" variant="outlined" value={product.name} required onChange={handleProductChange} />
                                </Box>
                                <Box my={2}>
                                    <TextField type="text" fullWidth label="SKU code" variant="outlined" name="sku" value={product.sku} onChange={handleProductChange}/>
                                </Box>
                                <Box my={2}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={6}>
                                            <FormControl variant="outlined" className={classes.fullWidth} required>
                                                <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-outlined-label"
                                                    id="demo-simple-select-outlined"
                                                    value={product.categoryId}
                                                    onChange={handleProductChange}
                                                    label="Category"
                                                    name="categoryId"
                                                >
                                                    
                                                    {
                                                        categories.map(row => <MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>)
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl variant="outlined" className={classes.fullWidth}  required>
                                                <InputLabel id="demo-simple-select-outlined-label">Brand</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-outlined-label"
                                                    id="demo-simple-select-outlined"
                                                    value={product.brandId}
                                                    onChange={handleProductChange}
                                                    label="Brand"
                                                    name="brandId"
                                                >
                                                    {
                                                        brands.map(row => <MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>)
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>

                                </Box>
                                <Box my={2}>
                                    <TextField type="text" multiline rows={6} fullWidth label="Summary" variant="outlined" name="summary" value={product.summary}  onChange={handleProductChange}/>
                                </Box>
                                <Box my={2}>
                                    <TextField type="number" fullWidth label="Price" variant="outlined" name="price" value={product.price}  onChange={handleProductChange} required/>
                                </Box>
                                <Box my={2}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <DeleteButton message="Are you sure you want to delete this product. Its variants will be deleted too." deleteFn={handleDeleteProduct} status={isDeletingProduct}/>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button color="primary" fullWidth variant="contained" startIcon={<SaveIcon />} type="submit">Save</Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </form>
                    </Grid>             
                    <Grid item sm={6} xs={12}>
                        <Box p={1} border={1} sx={{ borderColor: "grey" }}>
                            <Box sx={{ height: '100%', height: 435, overflow: "auto" }}>
                                <Grid container spacing={3} style={{
                                    margin: 0,
                                    width: '100%',
                                }}>
                                    {
                                        product.imgPaths.map(item => (
                                            <Grid key={item} item md={4} xs={6}>
                                                <Card className={classes.img}>
                                                    <CardActionArea>
                                                        <CardMedia
                                                            className={classes.media}
                                                            image={item}
                                                            title="Product Image"
                                                        />
                                                    </CardActionArea>
                                                    <CardActions >
                                                        <Box width={1} >
                                                            <DeleteButton message="Are you sure you want to delete this image" deleteFn={() => handleDeleteProductImage(item)} />
                                                        </Box>
                                                    </CardActions>
                                                </Card>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </Box>
                            <Box my={1}>
                                <Box>
                                    <UploadImage getURL={handleGetUrlImage}/>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                {
                    product.id !== "" && (
                        <Box my={4}>
                         <Grid container spacing={4}>
                            <Grid item sm={8} xs={12}>
                                <Box my={2}>
                                    <Grid container direction="row" justifyContent="space-between">
                                        <Grid item>
                                            <Typography variant="h5" color="primary">Variant List</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Button color="primary" fullWidth variant="contained" startIcon={<AddBoxIcon />} onClick={handleAddNewVariant}>New Variant</Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell  ><strong>No</strong></TableCell>
                                                <TableCell  ><strong>Name</strong></TableCell>
                                                <TableCell  ><strong>Color</strong></TableCell>
                                                <TableCell  ><strong>Size</strong></TableCell>
                                                <TableCell  ><strong>Quantity</strong></TableCell>
                                                <TableCell  ><strong>Details</strong></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {product?.variants?.map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell component="th" scope="row">
                                                        {`${index + 1}`}
                                                    </TableCell>
                                                    <TableCell  >{row?.color?.name}</TableCell>
                                                    <TableCell  ><div style={{ marginLeft: 10,border: "1px solid #999999", width: 15, height: 15, backgroundColor: row.color?.code}}/></TableCell>
                                                    <TableCell  >{row?.size?.name}</TableCell>
                                                    <TableCell  >{row?.quantity}</TableCell>
                                                    <TableCell  ><IconButton size="small" onClick={() => handleSelectVariant(row)}><MoreHorizIcon /></IconButton></TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            <Grid item sm={4} xs={12}>
                                {
                                    showVariant && (
                                        <>
                                         <Box my={2} textAlign="center">
                                    <Typography variant="h6">Variant Details</Typography>
                                </Box>
                                <Box my={5}>
                                <form onSubmit={handleSubmitVariant}>                                      
                                    <Box my={2}>
                                        <FormControl variant="outlined" className={classes.fullWidth} required>
                                            <InputLabel id="demo-simple-select-outlined-label">Color</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                value={variant.colorId}
                                                label="Color"
                                                name="colorId"
                                                onChange={handleVariantChange}
                                            >
                                                {
                                                    colors.map(row => <MenuItem key={row.id} value={row.id}>{row.name}<div style={{ marginLeft: 10,border: "1px solid #999999", width: 15, height: 15, backgroundColor: row.code}}/></MenuItem>)
                                                }
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box my={2}>
                                        <FormControl variant="outlined" className={classes.fullWidth} required>
                                            <InputLabel id="demo-simple-select-outlined-label">Size</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                value={variant.sizeId}
                                                label="Size"
                                                name="sizeId"
                                                onChange={handleVariantChange}
                                            >
                                                {
                                                    sizes.map(row => <MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>)
                                                }
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <TextField type="text" fullWidth label="Quantity" name="quantity" variant="outlined" value={variant.quantity}   onChange={handleVariantChange}/>
                                    <Box my={2}>                                              
                                        <Grid container spacing={2}>
                                        {
                                                    !variant.id ? (
                                                        <>
                                                            <Grid item xs={12}>
                                                                <Button color="primary" fullWidth startIcon={<SaveIcon />} variant="contained" type="submit">Save</Button>
                                                            </Grid>
                                                        </>
    
                                                    ) : (
                                                        <>
                                                            <Grid item xs={6}>
                                                                <DeleteButton message="Are your sure to delete this variant" deleteFn={handleDeleteVariant} status={isDeletingProductVariant} />
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Button color="primary" fullWidth startIcon={<SaveIcon />} variant="contained" type="submit">Save</Button>
                                                            </Grid>
                                                        </>
                                                    )
                                                }
                                        </Grid>                                       
                                    </Box>
                                </form>  
                                </Box> 
                                        </>
                                    )
                                }
                                                         
                            </Grid>
                        </Grid>
                    </Box>
                    )
                }
              

            </Box>
                )
            }             
        </>
    );
}