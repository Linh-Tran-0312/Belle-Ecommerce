import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import OpacityIcon from '@material-ui/icons/Opacity';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Pagination from '@material-ui/lab/Pagination';
import { Card, CardMedia, CardActions, CardActionArea, Divider, Slider } from "@material-ui/core";
import { Box, Typography, Grid, IconButton, Button, TextField, FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Rating from "../Rating";
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
function createCategories(name, id) {
    return { name, id };
}
function createColor(name, id, code) {
    return { name, id, code };
}
const rowsCategories = [
    createCategories('Ao khoac nam', 1),
    createCategories('Ao khoac nu', 2),
    createCategories('Phu kien', 3),
    createCategories('Mu', 4),
    createCategories('Vay', 5),
];
const rowsBrands = [
    createCategories('Zara', 1),
    createCategories('Routine', 2),
    createCategories('Uniqulo', 3),
    createCategories('Channel', 4),
    createCategories('Leo', 5),
];
const rowsSizes = [
    createCategories('XS', 1),
    createCategories('L', 2),
    createCategories('M', 3),
    createCategories('XL', 4),
    createCategories('XXL', 5),
];
const rowsColors = [
    createColor("Blue", 1, "#0b5394"),
    createColor("Red", 2, "#cc0000"),
    createColor("Yellow", 3, "#f1c232"),
    createColor("Violet", 4, "#c90076"),
    createColor("Purple", 5, "#674ea7")
];
const initialState = {
    search: "",
    category: "",
    brand: "",
    min: "",
    max: "",
    sortMethod: ""
}
export default function ProductAdmin() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [price, setPrice] = React.useState([0, 10000]);
    const [page, setPage] = React.useState(1);

    const handleChangePage = (event, value) => {
        setPage(value);
    };
    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };
    const [filter, setFilter] = React.useState(initialState)
    console.log(filter)
    const handleChange = (e) => {
        /*    if(e.target.name == "sort") {
               switch(e.target.value) {
                   case "1":
                       setFilter({...filter, sortField: "orderAt", sortValue: Query.ASC});
                   case "2":
                       setFilter({...filter, sortField: "orderAt", sortValue: Query.DESC});
                   case "3":
                       setFilter({...filter, sortField: "total", sortValue: Query.ASC});
                   case "4":
                       setFilter({...filter, sortField: "total", sortValue: Query.DESC})
               }
           } else { */
        setFilter({ ...filter, [e.target.name]: e.target.value })
    }
    const handleChangePrice = (event, newValue) => {
        setPrice(newValue);
    };
    const handleReset = (e) => {
        setFilter(initialState);
    }
    return (
        <Paper className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChangeTab}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Product"  {...a11yProps(0)} />
                <Tab label="Category"  {...a11yProps(1)} />
                <Tab label="Brand"  {...a11yProps(2)} />
                <Tab label="Color"  {...a11yProps(3)} />
                <Tab label="Size"  {...a11yProps(4)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Grid container direction="row" justifyContent="flex-start" spacing={1}>
                    <Grid item md={4} sm={12} xs={12}   >
                        <TextField fullWidth id="outlined-basic" onChange={handleChange} name="search" label="Search" placeholder="Search order's @ID, name, address" variant="outlined" />
                    </Grid>
                    <Grid item md={3} sm={4} xs={6}  >
                        <FormControl fullWidth variant="outlined"  >
                            <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={filter.category}
                                onChange={handleChange}
                                label="Category"
                                name="category"
                            >
                                <MenuItem value="">
                                    <em>All</em>
                                </MenuItem>
                                <MenuItem value="1">Ao khoac nam</MenuItem>
                                <MenuItem value="2">Ao khoac nu</MenuItem>
                                <MenuItem value="3">Phu kien</MenuItem>
                                <MenuItem value="4">Vay</MenuItem>
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
                                onChange={handleChange}
                                label="Brand"
                                name="brand"
                            >
                                <MenuItem value="">
                                    <em>All</em>
                                </MenuItem>
                                <MenuItem value="1">Zara</MenuItem>
                                <MenuItem value="2">channel</MenuItem>
                                <MenuItem value="3">Gucci</MenuItem>
                                <MenuItem value="4">Hermet</MenuItem>
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
                                onChange={handleChange}
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
                                max={10000}
                                value={price}
                                onChange={handleChangePrice}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                            /*  getAriaValueText={valuetext} */
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12}   >
                        <Button variant="contained" color="primary" size="large" className={classes.formButton}>
                            Apply
                        </Button>
                        <Button variant="contained" color="default" size="large" className={classes.formButton} onClick={handleReset}>
                            Reset
                        </Button>
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
                                            <TableCell  ><strong>Price</strong></TableCell>
                                            <TableCell  ><strong>Review</strong></TableCell>
                                            <TableCell  ><strong></strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rowsCategories.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell component="th" scope="row">
                                                    {`${index + 1}`}
                                                </TableCell>
                                                <TableCell  >{row.name}</TableCell>
                                                <TableCell  >{row.id}</TableCell>
                                                <TableCell  >Category</TableCell>
                                                <TableCell  >Brand</TableCell>
                                                <TableCell  >Price</TableCell>
                                                <TableCell  > <Rating size={15} rating={4} /></TableCell>
                                                <TableCell  ><IconButton size="small"><MoreHorizIcon /></IconButton></TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                    <Box my={5} textAlign="center">
                        <Pagination count={10} page={page} onChange={handleChangePage} />
                    </Box>
                </Box>
                <Divider />
                <Box my={5}>
                    <Grid container spacing={2}>
                        <Grid item sm={6} xs={12}>
                            <Box>
                                <Button color="primary" fullWidth variant="contained">Add new Product</Button>
                                <Box my={5}>
                                    <Box my={2}>
                                        <TextField type="text" fullWidth label="Product name" variant="outlined" value="Zara" />
                                    </Box>
                                    <Box my={2}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={6}>
                                                <FormControl variant="outlined" className={classes.fullWidth}>
                                                    <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        value="Zara"

                                                        label="Category"
                                                        name="paymentStatus"
                                                    >
                                                        <MenuItem value="Zara">
                                                            Ao khoac nam
                                                        </MenuItem>
                                                        {
                                                            rowsCategories.map(row => <MenuItem value={row.id}>{row.name}</MenuItem>)
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <FormControl variant="outlined" className={classes.fullWidth}>
                                                    <InputLabel id="demo-simple-select-outlined-label">Brand</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        value="Zara"

                                                        label="Brand"
                                                        name="paymentStatus"
                                                    >
                                                        <MenuItem value="Zara">
                                                            Zara
                                                        </MenuItem>
                                                        {
                                                            rowsBrands.map(row => <MenuItem value={row.id}>{row.name}</MenuItem>)
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>

                                    </Box>
                                    <Box my={2}>
                                        <TextField type="text" multiline rows={4} fullWidth label="Summary" variant="outlined" />
                                    </Box>
                                    <Box my={2}>
                                        <TextField type="text" fullWidth label="Price" variant="outlined" value="200000" />
                                    </Box>
                                    <Box my={2}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Button fullWidth color="secondary" variant="contained">Delete</Button>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Button color="primary" fullWidth variant="contained">Save</Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <Box  p={1} border={1} sx={{ borderColor: "grey" }}>
                                <Box sx={{ height: '100%', height: 400, overflow: "auto" }}>
                                    <Grid container spacing={3} style={{
                                        margin: 0,
                                        width: '100%',
                                    }}>
                                        {
                                            [0, 1, 3, 4, 5].map(item => (
                                                <Grid key={item} item md={4} xs={6}>
                                                    <Card className={classes.img}>
                                                        <CardActionArea>
                                                            <CardMedia
                                                                className={classes.media}
                                                                image="https://image.vietnamnews.vn/uploadvnnews/Article/2021/3/18/142705_hoa.jpg"
                                                                title="Contemplative Reptile"
                                                            />
                                                        </CardActionArea>
                                                        <CardActions >
                                                            <Button fullWidth size="small" color="secondary">
                                                                <DeleteOutlineIcon />
                                                            </Button>
                                                        </CardActions>
                                                    </Card>
                                                </Grid>
                                            ))
                                        }
                                    </Grid>
                                </Box>
                                <Box my={1}>
                                    <Button variant="outlined" color="primary" fullWidth>Add Image</Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item sm={6} xs={12}>
                            <Box my={2}>
                                <Typography variant="h6">Ao vest tong nam</Typography>
                            </Box>
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell  ><strong>No</strong></TableCell>
                                            <TableCell  ><strong>Color</strong></TableCell>
                                            <TableCell  ><strong>Size</strong></TableCell>
                                            <TableCell  ><strong>Quantity</strong></TableCell>
                                            <TableCell  ><strong></strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rowsCategories.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell component="th" scope="row">
                                                    {`${index + 1}`}
                                                </TableCell>
                                                <TableCell  >Blue</TableCell>
                                                <TableCell  >XS</TableCell>
                                                <TableCell  >29</TableCell>
                                                <TableCell  ><IconButton size="small"><MoreHorizIcon /></IconButton></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <Box>
                                <Button color="primary" fullWidth variant="contained">Add new Variant</Button>
                                <Box my={5}>
                                    <Box my={2}>
                                        <FormControl variant="outlined" className={classes.fullWidth}>
                                            <InputLabel id="demo-simple-select-outlined-label">Color</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                value="Zara"

                                                label="Color"
                                                name="color"
                                            >
                                                <MenuItem value="Zara">
                                                    Violet
                                                </MenuItem>
                                                {
                                                    rowsBrands.map(row => <MenuItem value={row.id}>{row.name}</MenuItem>)
                                                }
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box my={2}>
                                        <FormControl variant="outlined" className={classes.fullWidth}>
                                            <InputLabel id="demo-simple-select-outlined-label">Size</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                value="Zara"

                                                label="Size"
                                                name="size"
                                            >
                                                <MenuItem value="Zara">
                                                    XXLl
                                                </MenuItem>
                                                {
                                                    rowsBrands.map(row => <MenuItem value={row.id}>{row.name}</MenuItem>)
                                                }
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <TextField type="text" fullWidth label="Quantity" variant="outlined" value="20" />
                                    <Box my={2}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Button fullWidth color="secondary" variant="contained">Delete</Button>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Button color="primary" fullWidth variant="contained">Save</Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

            </TabPanel>
            <TabPanel value={value} index={1}>
                <Grid container spacing={2}>
                    <Grid item sm={6} xs={12}>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell  ><strong>No</strong></TableCell>
                                        <TableCell><strong>Category Name</strong></TableCell>
                                        <TableCell  ><strong>ID</strong></TableCell>
                                        <TableCell  ><strong></strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rowsCategories.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                {`${index + 1}`}
                                            </TableCell>
                                            <TableCell  >{row.name}</TableCell>
                                            <TableCell  >{row.id}</TableCell>
                                            <TableCell  ><IconButton size="small"><MoreHorizIcon /></IconButton></TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Box>
                            <Button color="primary" fullWidth variant="contained">Add new Category</Button>
                            <Box my={5}>
                                <TextField type="text" fullWidth label="Category name" variant="outlined" value="Zara" />
                                <Box my={2}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Button fullWidth color="secondary" variant="contained">Delete</Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button color="primary" fullWidth variant="contained">Save</Button>
                                        </Grid>
                                    </Grid>
                                </Box>

                            </Box>

                        </Box>
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Grid container spacing={2}>
                    <Grid item sm={6} xs={12}>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell  ><strong>No</strong></TableCell>
                                        <TableCell><strong>Brand Name</strong></TableCell>
                                        <TableCell  ><strong>ID</strong></TableCell>
                                        <TableCell  ><strong></strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rowsBrands.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                {`${index + 1}`}
                                            </TableCell>
                                            <TableCell  >{row.name}</TableCell>
                                            <TableCell  >{row.id}</TableCell>
                                            <TableCell  ><IconButton size="small"><MoreHorizIcon /></IconButton></TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Box>
                            <Button color="primary" fullWidth variant="contained">Add new Brand</Button>
                            <Box my={5}>
                                <TextField type="text" fullWidth label="Category name" variant="outlined" value="Zara" />
                                <Box my={2}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Button fullWidth color="secondary" variant="contained">Delete</Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button color="primary" fullWidth variant="contained">Save</Button>
                                        </Grid>
                                    </Grid>
                                </Box>

                            </Box>

                        </Box>
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Grid container spacing={2}>
                    <Grid item sm={6} xs={12}>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell  ><strong>No</strong></TableCell>
                                        <TableCell><strong>Color Name</strong></TableCell>
                                        <TableCell  ><strong>ID</strong></TableCell>
                                        <TableCell  ><strong>Code</strong></TableCell>
                                        <TableCell  ><strong></strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rowsColors.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                {`${index + 1}`}
                                            </TableCell>
                                            <TableCell  >{row.name} <OpacityIcon style={{ color: row.code, position: "relative", top: 5 }} /></TableCell>
                                            <TableCell  >{row.id}</TableCell>
                                            <TableCell  >{row.code}</TableCell>
                                            <TableCell  ><IconButton size="small"><MoreHorizIcon /></IconButton></TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Box>
                            <Button color="primary" fullWidth variant="contained">Add new Color</Button>
                            <Box my={5}>
                                <Box my={1}>
                                    <TextField type="text" fullWidth label="Color name" variant="outlined" value="Blue" />

                                </Box>
                                <Box my={2}>
                                    <TextField type="text" fullWidth label="Color code" variant="outlined" value="#3e5e4d" />

                                </Box>

                                <Box my={2}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Button fullWidth color="secondary" variant="contained">Delete</Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button color="primary" fullWidth variant="contained">Save</Button>
                                        </Grid>
                                    </Grid>
                                </Box>

                            </Box>

                        </Box>
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={4} >
                <Grid container spacing={2}>
                    <Grid item sm={6} xs={12}>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell  ><strong>No</strong></TableCell>
                                        <TableCell><strong>Size Name</strong></TableCell>
                                        <TableCell  ><strong>ID</strong></TableCell>
                                        <TableCell  ><strong></strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rowsSizes.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                {`${index + 1}`}
                                            </TableCell>
                                            <TableCell  >{row.name}</TableCell>
                                            <TableCell  >{row.id}</TableCell>
                                            <TableCell  ><IconButton size="small"><MoreHorizIcon /></IconButton></TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Box>
                            <Button color="primary" fullWidth variant="contained">Add new Size</Button>
                            <Box my={5}>
                                <TextField type="text" fullWidth label="Category name" variant="outlined" value="XXL" />
                                <Box my={2}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Button fullWidth color="secondary" variant="contained">Delete</Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button color="primary" fullWidth variant="contained">Save</Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </TabPanel>
        </Paper>
    );
}