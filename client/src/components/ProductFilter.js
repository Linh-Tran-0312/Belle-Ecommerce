import { Box, Accordion, Button, Grid, ButtonGroup, AccordionDetails, AccordionSummary, Typography, Checkbox, FormControlLabel } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles, withStyles } from "@material-ui/core";
import React from 'react';
import Slider from '@material-ui/core/Slider';
import { Link } from 'react-router-dom';

const useStyle = makeStyles((theme) => ({
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
    }
}))
const StyledCheckbox = withStyles({
    root: {
        color: 'black',
        '&$checked': {
            color: 'black',
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);
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

const ProductFilter = () => {
    const classes = useStyle();
    const [category, setCategory] = React.useState('female');
    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    };

    const [price, setPrice] = React.useState([0, 5000]);
    const handleChangePrice = (event, newValue) => {
        setPrice(newValue);
    }

    const [size, setSize] = React.useState({
        XS: true,
        S: true,
        M: true,
        L: true,
        XL: true
    });
    const handleChangeSize = (event) => {
        setSize({ ...size, [event.target.name]: event.target.checked });
    };

    const [brand, setBrand] = React.useState({
        zara: true,
        routine: true,
        lucas: true,
        leo: true,
        bion: true
    });
    const handleChangeBrand = (event) => {
        setBrand({ ...brand, [event.target.name]: event.target.checked });
    };

    return (
        <Box>
            <Box className={classes.filter}>
                <Typography variant="h6">FILTER</Typography>
                <div>
                    <ButtonGroup  size="small" >
                        <Button variant="outlined">APPLY</Button>
                        <Button variant="outlined">CLEAR</Button>
                    </ButtonGroup>

                </div>

            </Box>
            <StyledAccordion>
                <StyledAccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="body2">CATEGORIES</Typography>
                </StyledAccordionSummary>
                <AccordionDetails className={classes.details}>
                    <Typography variant="subtitle2" gutterBottom ><Link to="/shop" className={classes.link}>Women</Link></Typography>
                    <Typography variant="subtitle2" gutterBottom><Link to="/shop" className={classes.link}>Men</Link></Typography>
                    <Typography variant="subtitle2" gutterBottom><Link to="/shop" className={classes.link}>Kids</Link></Typography>
                    <Typography variant="subtitle2" gutterBottom ><Link to="/shop" className={classes.link}>Accessories</Link></Typography>
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
                        <div className={classes.displayPrice}>${price[0]} - ${price[1]}</div>
                        <Slider
                            value={price}
                            max={5000}
                            min={0}
                            step={10}
                            classes={{ colorPrimary: classes.fontBlack }}
                            onChange={handleChangePrice}
                            valueLabelDisplay="off"
                            aria-labelledby="range-slider"

                        />

                    </div>
                </AccordionDetails>
            </StyledAccordion>
            <StyledAccordion>
                <StyledAccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography variant="body2">SIZE</Typography>
                </StyledAccordionSummary>
                <AccordionDetails className={classes.details}>
                    {
                        ['XS', 'S', 'M', 'L', 'XL'].map((item, index) =>
                            <FormControlLabel key={index}
                                control={<StyledCheckbox checked={size[`${item}`]} onChange={handleChangeSize} name={item} />}
                                label={item}
                            />
                        )
                    }

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
                    {
                        ['zara', 'lucas', 'routine', 'leo', 'bion'].map((item, index) =>
                            <FormControlLabel key={index}
                                control={<StyledCheckbox checked={brand[`${item}`]} onChange={handleChangeBrand} name={item} />}
                                label={item.toUpperCase()}
                            />
                        )
                    }                    </AccordionDetails>
            </StyledAccordion>
        </Box>
    )
}
export default ProductFilter;