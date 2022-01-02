import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0px 24px',
    display: 'flex',
    alignItems: 'center',
    height: 100,
    [theme.breakpoints.down('sm')]: {
        height: 70,
      },
    borderRadius: 0
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
    margin: 20
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SearchBar({ closeSearch}) {
  const classes = useStyles();
    const handleCloseSearch = () => {
        closeSearch();
    }
  return (
    <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu">
      <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search entire store..."
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton onClick={handleCloseSearch} className={classes.iconButton} aria-label="search">
         <CloseIcon/>
      </IconButton>
    </Paper>
  );
}
