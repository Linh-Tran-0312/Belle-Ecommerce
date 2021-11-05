import { Box, Button, Grid, IconButton, TextField } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SaveIcon from '@material-ui/icons/Save';
import DeleteButton from "../../components/DeleteButton";
import React from 'react';
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
export default function ProductCategory() {
    const classes = useStyles();
  
    
    return (
        <>
                <Grid container spacing={2}>
                    <Grid item sm={6} xs={12}>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell  ><strong>No</strong></TableCell>
                                        <TableCell><strong>Category Name</strong></TableCell>
                                        <TableCell  ><strong>Details</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rowsCategories.map((row, index) => (
                                        <TableRow key={index}>
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
                            <Button color="primary" fullWidth variant="contained" startIcon={<AddBoxIcon />}>New Category</Button>
                            <Box my={5}>
                                <TextField type="text" fullWidth label="Category name" variant="outlined" value="Zara" />
                                <Box my={2}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <DeleteButton/>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button color="primary" fullWidth variant="contained" startIcon={<SaveIcon />}>Save</Button>
                                        </Grid>
                                    </Grid>
                                </Box>

                            </Box>

                        </Box>
                    </Grid>
                </Grid>     
        </>
    );
}