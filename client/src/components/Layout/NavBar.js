
import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    Button,
    IconButton,
    Drawer,
    Link,
    MenuItem,
    Badge
} from "@material-ui/core";
import LocalMallIcon from '@material-ui/icons/LocalMall';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import SearchBar from './SearchBar';
import CartPopover from "../CartPopup";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
const headersData = [
    {
        label: "HOME",
        href: "/",
    },
    {
        label: "SHOP",
        href: "/shop",
    },
    {
        label: "BLOGS",
        href: "/blogs",
    },
    {
        label: "CONTACT",
        href: "/contact",
    },
];

const useStyles = makeStyles((theme) => ({

    root: {
        backgroundColor: "#white",
   
        "@media (max-width: 900px)": {
            paddingLeft: 0,
        },
        width: '100%',
    },
    menuButton: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 700,
        size: "18px",
        marginLeft: "38px",
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "white",
        color: 'black'
    },
    toolbarMobile: {
        backgroundColor: "white",
        color: 'black',
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "white",
        color: 'black',
    },
    drawerContainer: {
        padding: "20px 30px",
    },
    icons: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: "center",
        color: 'black',
        marginRight: '10px'
    },
    logo: {
        [theme.breakpoints.down('sm')] : {
            height: 25
        }
    },
    search: {
        height: '100px',

    },
    link : {
        textDecoration: 'none',
        color: 'white',
        fontSize: 12,
        fontFamily: 'Arial'
    },
    authBar : {
        textAlign: 'right',
        backgroundColor: 'black',
        padding: 10,
        [theme.breakpoints.up('sm')] : {
            paddingRight: 50
        },
        [theme.breakpoints.down('xs')] : {
            paddingRight: 10
        }
    }
}));

export default function NarBar() {
    const { root, menuButton, toolbar, drawerContainer, toolbarMobile, icons, logo, authBar, link } = useStyles();

    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false,
    });
    const [search, setSearch] = useState(false);
    const { mobileView, drawerOpen } = state;

    const handleOpenSearch = (e) => {
        setSearch(true);
    }
    const handleCloseSearch = (e) => {
        setSearch(false);
    }
    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900
                ? setState((prevState) => ({ ...prevState, mobileView: true }))
                : setState((prevState) => ({ ...prevState, mobileView: false }));
        };

        setResponsiveness();

        window.addEventListener("resize", () => setResponsiveness());

        return () => {
            window.removeEventListener("resize", () => setResponsiveness());
        };
    }, []);

    const displayDesktop = () => {
        return (
            <>
              <div className={authBar}>
                            <RouterLink to="/auth?page=signin" className={link}>LOGIN &nbsp;|</RouterLink>
                            <RouterLink to="/auth?page=signup" className={link}>&nbsp;CREATE ACCOUNT</RouterLink>
                        </div>
                        <Toolbar className={toolbar}>
                {Logo}
                <div>{getMenuButtons()}</div>
                <div className={icons}>
              {/*       <IconButton color="inherit" onClick={handleOpenSearch}>
                        <SearchIcon />
                    </IconButton> */}
                    <CartPopover />
                    <IconButton color="inherit">
                    <AccountCircleOutlinedIcon/>
                    </IconButton>     
                </div>
            </Toolbar>
            </>
           
        );
    };

    const displayMobile = () => {
        const handleDrawerOpen = () =>
            setState((prevState) => ({ ...prevState, drawerOpen: true }));
        const handleDrawerClose = () =>
            setState((prevState) => ({ ...prevState, drawerOpen: false }));

        return (
            <Toolbar className={toolbarMobile}>
                <IconButton
                    {...{
                        edge: "start",
                        color: "inherit",
                        "aria-label": "menu",
                        "aria-haspopup": "true",
                        onClick: handleDrawerOpen,
                    }}
                >
                    <MenuIcon />
                </IconButton>

                <Drawer
                    {...{
                        anchor: "left",
                        open: drawerOpen,
                        onClose: handleDrawerClose,
                    }}
                >
                    <div className={drawerContainer}>{getDrawerChoices()}</div>
                </Drawer>

                <div>{Logo}</div>
                <div className={icons}>
                    {/* <IconButton color="inherit" onClick={handleOpenSearch}>
                        <SearchIcon />
                    </IconButton> */}
                    <CartPopover />              
                    <IconButton color="inherit">                       
                        <AccountCircleOutlinedIcon/>                      
                    </IconButton> 
                </div>
            </Toolbar>
        );
    };

    const getDrawerChoices = () => {
        return headersData.map(({ label, href }) => {
            return (
                <Link
                    {...{
                        component: RouterLink,
                        to: href,
                        color: "inherit",
                        style: { textDecoration: "none" },
                        key: label,
                    }}
                >
                    <MenuItem>{label}</MenuItem>
                </Link>
            );
        });
    };

    const Logo = (
        <img src={window.location.origin + '/logo.svg'} alt="logo" className={logo} />
    );

    const getMenuButtons = () => {
        return headersData.map(({ label, href }) => {
            return (
                <Button
                    {...{
                        key: label,
                        color: "inherit",
                        to: href,
                        component: RouterLink,
                        className: menuButton,
                    }}
                >
                    {label}
                </Button>
            );
        });
    };

    return (
        <header>
            {
                search ? <SearchBar closeSearch={handleCloseSearch} /> :
              <div  className={root}>        
                        <AppBar   position="relative">
                        {mobileView ? displayMobile() : displayDesktop()}
                    </AppBar>       
              </div>
                   
 
                    
            }

        </header>
    );
}