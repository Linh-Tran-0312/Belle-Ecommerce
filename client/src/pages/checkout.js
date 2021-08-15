import Layout from "../components/Layout"
import "../App.css";
import { useState } from 'react';
import { Box, Typography, Grid, IconButton, RadioGroup, TextField } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import QtyButton from "../components/QtyButton";
import { Link } from 'react-router-dom';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import BlackButton from "../components/BlackButton";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const StyledRadio = withStyles({
    root: {
        color: 'black',
        '&$checked': {
            color: 'black',
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);
const StyledTableCell = withStyles((theme) => ({
    head: {
        color: theme.palette.common.black,
        fontFamily: 'Roboto Slab',

        padding: 8,
        border: '1px solid #e8e9eb'
    },
    body: {
        fontSize: 14,
        border: '1px solid #e8e9eb',
        [theme.breakpoints.down('xs')] : {
            fontSize: 12,
        }
    },
    root: {
        [theme.breakpoints.down('xs')] : {
            padding: 6
        }
    }

}))(TableCell);
const StyledTextField = withStyles((theme) => ({
    root: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            '&.Mui-focused fieldset': {
                borderColor: '#e8e9eb',
            },
        },
        '& .MuiInputLabel-root': {
            color: 'black'
        },


    }

}))(TextField);
const useStyle = makeStyles((theme) => ({
    itemImg: {
        width: '70px',
        height: '90px',
        objectFit: 'cover',
        objectPosition: 'top',
        marginButton: '10px'
    },
    table: {
        minWidth: 320,
        marginBottom: 20,
    },
    priceCol: {
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    bodyXs: {
        fontWeight: 600,
        [theme.breakpoints.down('xs')]: {
            fontSize: '12px'
        }
    },
    noteTextField: {

        marginTop: 15,
        '& .MuiOutlinedInput-root': {
            borderRadius: 0,
        }
    },
    root: {
        width: '100%',
    },
}))
export default () => {
    const classes = useStyle();
    const [ method, setMethod ] = useState(null);

    const handleChangeMethod = (e) => {
        setMethod(e.target.value);
    }
    return (
        <Layout>
            <div className="breadCrumbs" style={{ marginBottom: 0 }}>
                <div className="pageTitle">
                    <Box textAlign="center" py={1}>
                        <Typography variant="inherit">CHECK OUT</Typography>
                    </Box>
                </div>
            </div>
            <Box mx={2} my={4}>
                <Grid container spacing={3} direction="row" justifyContent="center">
                <Grid item lg={6} md={6} sm={12}>
                        <Box sx={{ padding: { xs: 2, sm : 3 }}}  border={1} borderColor="grey.500">
                            <h3 variant="h6" className="fontRoSlab">BILLING DETAILS</h3>
                            <Box my={2} >
                                <Grid container spacing={2}>
                                    <Grid item lg={6} md={4} sm={6} xs={12}>
                                        <StyledTextField label="First Name" variant="outlined" fullWidth required />
                                    </Grid>
                                    <Grid item lg={6} md={4} sm={6} xs={12}>
                                        <StyledTextField label="Last Name" variant="outlined" fullWidth required />
                                    </Grid>
                                </Grid>

                            </Box>
                            <Box my={2}>
                                <Grid container spacing={2}>
                                    <Grid item lg={6} md={4} sm={6} xs={12}>
                                        <StyledTextField label="Email" variant="outlined" fullWidth required />
                                    </Grid>
                                    <Grid item lg={6} md={4} sm={6} xs={12}>
                                        <StyledTextField label="Telephone" variant="outlined" fullWidth required />
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box my={2}>
                                <Grid container spacing={2}>
                                    <Grid item lg={6} md={4} sm={6} xs={12}>
                                        <StyledTextField label="City" variant="outlined" fullWidth required />
                                    </Grid>
                                    <Grid item lg={6} md={4} sm={6} xs={12}>
                                        <StyledTextField label="District" variant="outlined" fullWidth required />
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box my={2}>
                                <Grid container spacing={2}>
                                    <Grid item lg={6} md={4} sm={6} xs={12}>
                                        <StyledTextField label="Ward" variant="outlined" fullWidth required />
                                    </Grid>
                                    <Grid item lg={6} md={4} sm={6} xs={12}>
                                        <StyledTextField label="Street" variant="outlined" fullWidth required />
                                    </Grid>
                                </Grid>

                            </Box>
                            <Typography variant="caption">Your note:</Typography>
                            <StyledTextField multiline fullWidth rows={7} variant="outlined" label="" classes={{ root: classes.noteTextField }} />
                        </Box>
                    </Grid>
               
                    <Grid item lg={6} md={6} sm={12}>
                        <Box sx={{ padding: { xs: 2, sm : 3 }}} border={1} borderColor="grey.500">
                            <h3 variant="h6" className="fontRoSlab">YOUR ORDER</h3>
                            <TableContainer >
                                <Table className={classes.table} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell component="th" scope="row">Product Name</StyledTableCell>
                                            <StyledTableCell align="center"  >Price</StyledTableCell>
                                            <StyledTableCell align="center"  >Size</StyledTableCell>
                                            <StyledTableCell align="center" >Qty</StyledTableCell>
                                            <StyledTableCell align="center" >Subtotal</StyledTableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {[1, 2, 3].map((item) => (
                                            <TableRow key={item}>
                                                <StyledTableCell component="th" scope="row">Spike Jacket</StyledTableCell>
                                                <StyledTableCell align="center" >$99</StyledTableCell>
                                                <StyledTableCell align="center">XL</StyledTableCell>
                                                <StyledTableCell align="center">1</StyledTableCell>
                                                <StyledTableCell align="center">$943491</StyledTableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow  >
                                            <StyledTableCell colSpan={4} component="th" align="right" scope="row">Shipping</StyledTableCell>
                                            <StyledTableCell align="center">$33</StyledTableCell>

                                        </TableRow>
                                        <TableRow  >
                                            <StyledTableCell colSpan={4} component="th" align="right" scope="row">Total</StyledTableCell>
                                            <StyledTableCell align="center">$330</StyledTableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <hr />
                            <h3 variant="h6" className="fontRoSlab">PAYMENT METHOD</h3>
                            <div className={classes.root}>
                            <RadioGroup aria-label="payment" name="method" value={method} onChange={handleChangeMethod}>

                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-label="Expand"
                                        aria-controls="additional-actions1-content"
                                        id="additional-actions1-header"
                                    >

                                            <FormControlLabel
                                                aria-label="Acknowledge"
                                                onClick={(event) => event.stopPropagation()}
                                                onFocus={(event) => event.stopPropagation()}
                                                control={<StyledRadio />}
                                                label="CASH ON DELIVERY"
                                                value="CASH"
                                            />
                                  
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography color="textSecondary">
                                            The click event of the nested action will propagate up and expand the accordion unless
                                            you explicitly stop it.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-label="Expand"
                                        aria-controls="additional-actions2-content"
                                        id="additional-actions2-header"
                                    >

                                            <FormControlLabel
                                                aria-label="Acknowledge"
                                                onClick={(event) => event.stopPropagation()}
                                                onFocus={(event) => event.stopPropagation()}
                                                control={<StyledRadio />}
                                                label="DIRECT BANK TRANSFER"
                                                value="TRANSFER"
                                            />
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography color="textSecondary">
                                            The focus event of the nested action will propagate up and also focus the accordion
                                            unless you explicitly stop it.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-label="Expand"
                                        aria-controls="additional-actions3-content"
                                        id="additional-actions3-header"
                                    >

                                            <FormControlLabel
                                                aria-label="Acknowledge"
                                                onClick={(event) => event.stopPropagation()}
                                                onFocus={(event) => event.stopPropagation()}
                                                control={<StyledRadio />}
                                                label="PAYMENT GATEWAY"
                                                value="GATEWAY"
                                            />
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography color="textSecondary">
                                            If you forget to put an aria-label on the nested action, the label of the action will
                                            also be included in the label of the parent button that controls the accordion
                                            expansion.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-label="Expand"
                                        aria-controls="additional-actions3-content"
                                        id="additional-actions3-header"
                                    >

                                            <FormControlLabel
                                                aria-label="Acknowledge"
                                                onClick={(event) => event.stopPropagation()}
                                                onFocus={(event) => event.stopPropagation()}
                                                control={<StyledRadio />}
                                                label="USING E-WALLET"
                                                value="EWALLET"
                                            />
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography color="textSecondary">
                                            If you forget to put an aria-label on the nested action, the label of the action will
                                            also be included in the label of the parent button that controls the accordion
                                            expansion.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                </RadioGroup>
                            </div>
                            <Box my={2} textAlign="center">
                                    <BlackButton height={'50px'}><strong>place order</strong></BlackButton>
                            </Box>
                        </Box>
                    </Grid>
                  </Grid>
            </Box>
        </Layout>
    )
}