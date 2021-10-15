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
import { Box, Typography, Grid, IconButton, Button, TextField, FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Rating from "../Rating";
const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    fullWidth: {
        width: "100%"
    }
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
export default function ProductAdmin() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChange}
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
                                        <TableRow key={row.name}>
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
                    <Grid item container xs={12}>
                        <Grid item xs={6}>
                            <Box>
                                <Button color="primary" fullWidth variant="contained">Add new Product</Button>
                                <Box my={5}>
                                    <Box my={2}>
                                        <TextField type="text" fullWidth label="Product name" variant="outlined" value="Zara" />
                                    </Box>
                                    <Box my={2}>
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
                                    </Box>
                                    <Box my={2}>
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
                        <Grid item xs={6}>
                        </Grid>
                    </Grid>
                </Grid>
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
                                        <TableRow key={row.name}>
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
                                        <TableRow key={row.name}>
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
                                        <TableRow key={row.name}>
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
                                        <TableRow key={row.name}>
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