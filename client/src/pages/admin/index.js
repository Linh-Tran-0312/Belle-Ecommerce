import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { Container, Box, Paper} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import clsx from 'clsx';
import React, { useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useLocation , useHistory, Redirect} from "react-router-dom";
import blogActions from "../../actions/adminBlog";
import productActions from '../../actions/adminProduct';
import Dashboard from "./dashboard";
import Order from "./order";
import Product from "./product";
import ProductCategory from './product_category';
import ProductBrand from './product_brand';
import ProductColor from './product_color';
import ProductSize from './product_size';
import Blog from "./blog";
import BlogCategory from './blog_category'; 
import Report from "./report";
import Customer from "./user";
import { Menu , secondaryListItems } from '../../components/Admin/Menu';
import { AdminPath } from '../../constants';
import adminAuthActions from '../../actions/adminAuth';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
      height: '100vh',
    overflow: 'auto',  
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  logo: {
    [theme.breakpoints.down('sm')] : {
        height: 25
    }
},
}));

export default function AdminPage() {
  const location = useLocation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const topPage = useRef()
  const [open, setOpen] = React.useState(true);
  const [ page, setPage ] = React.useState(AdminPath.DASHBOARD);
  const [ title, setTitle] = useState("DASHBOARD");
 //const admin = useSelector(state => state.auth).admin;
 const [ admin, setAdmin ] = useState(JSON.parse(localStorage.getItem('admin')));
  React.useEffect(() => {
   
      const pathName = location.pathname.substring(7);
      if(Object.keys(AdminPath).find(path => AdminPath[path] == pathName))
      {
        setPage(pathName);
        const temp = pathName.replace(/\-/g," ").toUpperCase();
        setTitle(temp);
      }
      topPage?.current?.scrollIntoView();
   
    setAdmin(JSON.parse(localStorage.getItem('admin')));
  },[location]);

  useEffect(() => {
    dispatch(blogActions.getBlogCategories());
    dispatch(productActions.getProductBrands());
    dispatch(productActions.getProductCategories());
    dispatch(productActions.getProductColors());
    dispatch(productActions.getProductSizes());
  },[])

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
const handleLogout = (e) => {
  dispatch(adminAuthActions.logout(history))
}
 const renderPage = (page) => {
     switch(page) {
 
        case AdminPath.ORDERS:
          if(admin.role === "admin") {
            return <Order/>;
          } else {
            return <Product />;
          }
        case AdminPath.PRODUCT_LIST:
            return <Product />
        case AdminPath.PRODUCT_CATEGORY:
            return <ProductCategory />;
        case AdminPath.PRODUCT_BRAND:
            return <ProductBrand />;
        case AdminPath.PRODUCT_COLOR:
            return <ProductColor />;
        case AdminPath.PRODUCT_SIZE:
            return <ProductSize />;
/*         case AdminPath.BLOGS:
            return <Blog/>; */
        case AdminPath.BLOG_LIST:
            return <Blog/>;
        case AdminPath.BLOG_CATEGORY:
            return <BlogCategory />;
        case AdminPath.CUSTOMERS:
          return <Customer />;
        /*   if(admin.role === "admin") {
            return <Customer />;
          } else {
            return <Product />;
          } */
        case AdminPath.REPORTS:
          if(admin.role === "admin") {
            return <Report />;
          } else {
            return <Product />;
          }
        default:
          return <Dashboard/>
    }
 }
 if(!admin?.id) return <Redirect to="/admin/login" />
  return (
    <div className={classes.root} >
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {title ? title : "DASHBOARD"}
          </Typography>
          <Typography>
            Xin Chao {admin.fname}
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>       
              <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
        <img src={window.location.origin + '/logo.svg'} alt="logo" className={classes.logo} />
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
        <Menu page={page} role={admin.role}/>    
        </List>
        <Divider />
       
      </Drawer>
      <main className={classes.content}>
      <div className={classes.appBarSpacer} ref={topPage}/>
      <Container maxWidth="lg" className={classes.container}>
        <Box component={Paper} p={2} >
          {
          renderPage(page)
          }
        </Box>     
     </Container>
     </main>
    </div>
  );
}