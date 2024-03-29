
import {
    AppBar, Button, Drawer, IconButton, Link, makeStyles, MenuItem, Toolbar,
    Typography
} from "@material-ui/core";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import MenuIcon from "@material-ui/icons/Menu";
import React, { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import CartPopover from "../CartPopup";
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
        [theme.breakpoints.down('sm')]: {
            height: 25
        }
    },
    search: {
        height: '100px',

    },
    link: {
        textDecoration: 'none',
        color: 'white',
        fontSize: 12,
        fontFamily: 'Arial'
    },
    logoLink: {
        color: 'black'
    },
    authBar: {
        textAlign: 'right',
        backgroundColor: 'black',
        padding: 10,
        [theme.breakpoints.up('sm')]: {
            paddingRight: 50
        },
        [theme.breakpoints.down('xs')]: {
            paddingRight: 10
        }
    }
}));

export default function NarBar() {
    const { root, menuButton, toolbar, drawerContainer, toolbarMobile, icons, logo, authBar, link, logoLink } = useStyles();
    const location = useLocation();
    const [page, setPage] = useState(false)
    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false,
    });
    useEffect(() => {
        const path = location?.pathname?.substring(1);
        if (path === "cart" || path === "checkout") {
            setPage(true);
        } else {
            setPage(false)
        }
    }, [location])
    const { mobileView, drawerOpen } = state;

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900
                ? setState((prevState) => ({ ...prevState, mobileView: true }))
                : setState((prevState) => ({ ...prevState, mobileView: false }));
        };

        setResponsiveness();

        window.addEventListener("resize", () => setResponsiveness());

    }, []);

    const displayDesktop = () => {
        return (
            <>
                <div className={authBar}>
                    <Typography variant="button" className={link}>Hotline: 02385338234</Typography>
                </div>
                <Toolbar className={toolbar}>
                    {Logo}
                    <div>{getMenuButtons()}</div>
                    <div className={icons}>
                        {
                            !page && <CartPopover />
                        }
                        <RouterLink to="/user" className={logoLink} >
                            <IconButton color="inherit">
                                <AccountCircleOutlinedIcon />
                            </IconButton>
                        </RouterLink>

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
                    {
                        !page && <CartPopover />
                    }
                     <RouterLink to="/user" className={logoLink} >
                            <IconButton color="inherit">
                                <AccountCircleOutlinedIcon />
                            </IconButton>
                        </RouterLink>
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
              
                    <div className={root}>
                        <AppBar position="relative">
                            {mobileView ? displayMobile() : displayDesktop()}
                        </AppBar>
                    </div>
            }

        </header>
    );
}