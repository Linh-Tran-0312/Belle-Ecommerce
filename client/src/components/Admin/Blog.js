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
import PostAddIcon from '@material-ui/icons/PostAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { Card, CardMedia, CardActions, CardActionArea, Divider, Slider } from "@material-ui/core";
import { Box, Typography, Grid, IconButton, Button, TextField, FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const useStyles = makeStyles((theme) => ({
    formButton : {
        margin: 5,
    },
    titleBlock: {
        [theme.breakpoints.down("xs")] : {
            flexDirection: "column-reverse"
        }
    },
    blogImg : {
        width: "100%",
       height: "100%",
       position: "absolute",
       top: 0,
       borderRadius: 5
    },
    photoBlock : {
        border: "1px solid #bcbcbc",
        height: 300,
        position: "relative",
        borderRadius: 5,
        backgroundImage: "url('../blog-default-photo.png')",
        backgroundSize: "cover"
    },
    blogImgButton : {
        position: "absolute",
        bottom: 0,
        zIndex: 10,
        color: "black",
        backgroundColor: "rgba(255,255,255,0.3)",
        "&:hover" : {
            backgroundColor: "rgba(255,255,255,0.9)",
            borderColor: "transparent"
        },
        borderColor: "transparent"
    }
}));
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
    createCategories('Fashion Trend', 1),
    createCategories('Collection Review', 2),
    createCategories('Customer Policy', 3),
    createCategories('Special Events', 4),
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
    const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
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
    const handleEditorStateChange = (value) => {
        setEditorState(value);
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
                <Tab label="Blog"  {...a11yProps(0)} />
                <Tab label="Category"  {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Grid container direction="row" justifyContent="flex-start" spacing={1}>
                    <Grid item md={6} sm={12} xs={12}   >
                        <TextField fullWidth id="outlined-basic" onChange={handleChange} name="search" label="Search" placeholder="Search order's @ID, name, address" variant="outlined" />
                    </Grid>
                    <Grid item md={3} sm={6} xs={6}  >
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
                    <Grid item md={3} sm={6} xs={6} >
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
                                <MenuItem value="1">Ascending date</MenuItem>
                                <MenuItem value="2" selected>Descending date</MenuItem>
                                <MenuItem value="3">Ascending name</MenuItem>
                                <MenuItem value="4">Descending name</MenuItem>
                            </Select>
                        </FormControl>
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
                                            <TableCell><strong>Title</strong></TableCell>
                                            <TableCell  ><strong>Category</strong></TableCell>
                                            <TableCell  ><strong>Date</strong></TableCell>
                                            <TableCell  ><strong></strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rowsCategories.map((row, index) => (
                                            <TableRow key={row.name}>
                                                <TableCell component="th" scope="row">
                                                    {`${index + 1}`}
                                                </TableCell>
                                                <TableCell  >Blog unit</TableCell>
                                                <TableCell  >{row.name}</TableCell>
                                                <TableCell  >May 02, 2017</TableCell>
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
                <Box my={2}>
                    <Grid container className={classes.titleBlock} spacing={2}>
                        <Grid item md={8} sm={6} xs={12}>
                            <TextField fullWidth type="text" name="title" label="Title" variant="outlined" required value="Spring Collection in Paris"/>
                        </Grid>
                        <Grid item md={4} sm={6} xs={12}>
                                 <Button variant="contained" size="large" fullWidth color="primary" style={{ height: "100%"}} startIcon={<PostAddIcon/>}>New Blog</Button>
                         </Grid>
                    </Grid>
                </Box>
                <Box className={classes.photoBlock}>
                    <img className={classes.blogImg} alt="" src=""/>
                    <Button variant="outlined" fullWidth className={classes.blogImgButton} color="primary">Add cover photo</Button>
                </Box>
                <Box>
                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={handleEditorStateChange}
                        editorStyle={{ height: 500, border: "1px solid #bcbcbc"}}
                    />
                </Box>
                <Box my={2}>
                    <Grid container direction="row" justifyContent='center' spacing={2}>
                                            <Grid item sm={3} md={2} xs={4}>
                                            <Button variant="contained" color="secondary" fullWidth startIcon={<DeleteIcon/>} >Delete</Button>
                                            </Grid>
                                            <Grid item sm={3} md={2} xs={4}>
                                            <Button variant="contained" color="primary" fullWidth startIcon={<SaveIcon/>} >Save</Button>
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
                                            <Button fullWidth color="secondary" startIcon={<DeleteIcon/>} variant="contained">Delete</Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button color="primary" fullWidth startIcon={<SaveIcon/>} variant="contained">Save</Button>
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