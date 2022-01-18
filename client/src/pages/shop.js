import { Accordion, AccordionDetails, AccordionSummary, Box, Button, ButtonGroup, Grid, IconButton, InputBase, makeStyles, Paper, Typography, withStyles } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Slider from '@material-ui/core/Slider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';
import Pagination from '@material-ui/lab/Pagination';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import shopActions from "../actions/shop";
import Banner from '../components/Banner/Banner';
import ProductItem from '../components/ProductItem';
import { useQuery } from "../helper/customHook";
import handlePriceRange from "../helper/handlePriceRange";

const StyledAccordion = withStyles(() => ({
    root: {
        "&$expanded": {
            margin: "auto"
        },
        boxShadow: 'none'
    },
    expanded: {}
}))(Accordion);
const StyledAccordionSummary = withStyles({
    root: {
        borderBottom: '1px solid gray',
    }
})(AccordionSummary);
const useStyles = makeStyles((theme) => ({
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
    price: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingLeft: 30
    },
    link: {
        textDecoration: 'none',
        color: 'black',
        fontSize: '1rem'
    },
    displayPrice: {
        border: '1px solid gray',
        padding: 10,
        color: 'black',
        fontFamily: 'Arial',
        fontSize: '14px',
        margin: 15
    },
    fontBlack: {
        color: 'black',
    },
    fontRobo: {
        fontFamily: 'Roboto Slab'
    },
    filter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    radio: {
        '&$checked': {
          color: 'black'
        }
      },
      checked: {},
    center : {
        display: 'flex',
        justifyContent: "center",
    }
}))

const initFilter = {
    search: "",
    category: "",
    brand: "",
    min: "",
    max: "",
    sortMethod: "",
    page: 1,
    limit: 8
};

const ShopPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useLocation()
    const query = useQuery();
    const categories = useSelector(state => state.home.productCategories);
    const brands = useSelector(state => state.home.productBrands);
    const products = useSelector(state => state.shop.products);
    const total = useSelector(state => state.shop.total);  
  
    const [pageCount, setPageCount] = React.useState(1);
    const [filter, setFilter] = useState(initFilter);
    const [price, setPrice] = React.useState([0, 10000000]);

    useEffect(() => {
        const mod = total % filter.limit;
        let pageNumber = total / filter.limit;
        pageNumber = mod === 0 ? pageNumber : Math.floor(pageNumber) + 1;
        setPageCount(pageNumber)
    }, [total]) 
    useEffect(() => {
        dispatch(shopActions.getProducts(filter));
    },[]);
    useEffect(() => {
        setFilter({...filter, category: query.get("category")});
        dispatch(shopActions.getProducts({...filter, category: query.get("category")}))
    },[location]);
    const handleChangePrice = (event, newValue) => {
        setPrice(newValue);
    }
    const handleFilterChange = e => {
        setFilter({ ...filter, [e.target.name]: e.target.value })
    }
    const handleSubmitFilter = e => {
        dispatch(shopActions.getProducts({...filter, min: price[0], max: price[1]}))
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            dispatch(shopActions.getProducts({...filter, min: price[0], max: price[1]}))
        }
    }
    const handleReset = () => {
        setFilter(initFilter);
        setPrice([0, 10000000]);
    }
    const handleChangePage = (event, value) => {
        dispatch(shopActions.getProducts({...filter, page: value}));
        setFilter({...filter, page: value});
    };
    return (
            <>
                <Banner />
                <Box my={5} textAlign="center">
                    <Box my={5} textAlign="center">
                        <h2 className="fontRoSlab">Our Products</h2>
                    </Box>
                    <Box px={5} >
                    <Grid container spacing={2}>
                        <Grid item lg={3} md={4} sm={12} xs={12}>
                            <Box px={2}>
                                <Box>
                                    <Box className={classes.filter}>
                                        <Typography variant="h6">FILTER</Typography>
                                        <div>
                                            <ButtonGroup size="small" >
                                                <Button variant="outlined" onClick={handleSubmitFilter}>APPLY</Button>
                                                <Button variant="outlined" onClick={handleReset}>CLEAR</Button>
                                            </ButtonGroup>

                                        </div>

                                    </Box>
                                    <StyledAccordion>
                                        <StyledAccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography variant="body2">SORT</Typography>
                                        </StyledAccordionSummary>
                                        <AccordionDetails className={classes.details}>
                                        <FormControl component="fieldset">
                    
                                            <RadioGroup  name="sortMethod" value={filter.sortMethod}  onChange={handleFilterChange}>
                                            <FormControlLabel   value="4" control={<Radio  classes={{root: classes.radio, checked: classes.checked}}/>} label="Descending name" />
                                            <FormControlLabel   value="3" control={<Radio  classes={{root: classes.radio, checked: classes.checked}}/>} label="Ascending name" />
                                            <FormControlLabel   value="2" control={<Radio  classes={{root: classes.radio, checked: classes.checked}}/>} label="Descending price" />
                                            <FormControlLabel   value="1" control={<Radio  classes={{root: classes.radio, checked: classes.checked}}/>} label="Ascending price" />

                                            </RadioGroup>
                                            </FormControl>
                                        </AccordionDetails>
                                    </StyledAccordion>   
                                    <StyledAccordion>
                                        <StyledAccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography variant="body2">CATEGORIES</Typography>
                                        </StyledAccordionSummary>
                                        <AccordionDetails className={classes.details}>
                                        <FormControl component="fieldset">
                    
                                            <RadioGroup  name="category" value={filter.category}  onChange={handleFilterChange}>
                                            <FormControlLabel   value="" control={<Radio  classes={{root: classes.radio, checked: classes.checked}}/>} label="Tất cả" />
                                                {
                                                    categories.map(c =>  <FormControlLabel key={c.id} value={`${c.id}`} control={<Radio  classes={{root: classes.radio, checked: classes.checked}} />} label={c.name} /> )
                                                }                                               
                                            </RadioGroup>
                                            </FormControl>
                                        </AccordionDetails>
                                    </StyledAccordion>                                   
                                    <StyledAccordion>
                                        <StyledAccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2a-content"
                                            id="panel2a-header"
                                        >
                                            <Typography variant="body2">BRANDS</Typography>
                                        </StyledAccordionSummary>
                                        <AccordionDetails className={classes.details}>
                                        <RadioGroup onChange={handleFilterChange} name="brand" value={filter.brand}  >
                                        <FormControlLabel   value="" control={<Radio  classes={{root: classes.radio, checked: classes.checked}}/>} label="Tất cả" />
                                            {
                                                brands.map((b) =>(
                                                    <FormControlLabel key={b.id}
                                                    control={<Radio  classes={{root: classes.radio, checked: classes.checked}} />} 
                                                        label={b.name.toUpperCase()}
                                                        value={`${b.id}`} 
                                                    />
                                                )
                                                   
                                                )
                                            }
                                            </RadioGroup>
                                            </AccordionDetails>
                                    </StyledAccordion>
                                    <StyledAccordion>
                                        <StyledAccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2a-content"
                                            id="panel2a-header"
                                        >
                                            <Typography variant="body2">PRICE</Typography>
                                        </StyledAccordionSummary>
                                        <AccordionDetails className={classes.details}>
                                            <div className={classes.price}>
                                                <div className={classes.displayPrice}>{handlePriceRange(price[0],price[1])}</div>
                                                <Slider
                                                    value={price}
                                                    max={10000000}
                                                    min={0}
                                                    step={100000}
                                                    classes={{ colorPrimary: classes.fontBlack }}
                                                    onChange={handleChangePrice}
                                                    valueLabelDisplay="off"
                                                    aria-labelledby="range-slider"

                                                />

                                            </div>
                                        </AccordionDetails>
                                    </StyledAccordion>             
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item lg={9} md={8} sm={12} xs={12} >
                            <Box>
                                <Box mb={3} px={2}>
                                    <Paper className={classes.root}>
                                        <InputBase
                                            className={classes.input}
                                            placeholder="What are you looking for..."
                                            onKeyDown={handleKeyDown}
                                            value={filter.search}
                                            onChange={handleFilterChange}
                                            name="search"
                                        />
                                        <IconButton className={classes.iconButton} aria-label="search" onClick={handleSubmitFilter}>
                                            <SearchIcon />
                                        </IconButton>
                                    </Paper>
                                </Box>
                                <Grid container>
                                    {
                                        products.map(p =>
                                            <Grid key={p.id} item container lg={3} md={4} sm={6} xs={6} direction="row" justifyContent="center">
                                                <ProductItem product={p} />
                                            </Grid>
                                        )
                                    }
                                </Grid>
                                <Box my={5} className={classes.center}>
                                    <Pagination count={pageCount} variant="outlined" shape="rounded" page={filter.page} onChange={handleChangePage} />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    </Box>
                  
                </Box>
            </>
    )

}

export default ShopPage