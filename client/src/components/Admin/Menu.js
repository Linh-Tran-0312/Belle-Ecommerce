import React from 'react';
import { Link } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Collapse from '@material-ui/core/Collapse';
import PeopleIcon from '@material-ui/icons/People';
import PostAddIcon from '@material-ui/icons/PostAdd';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import StoreIcon from '@material-ui/icons/Store';
import BrandingWatermarkIcon from '@material-ui/icons/BrandingWatermark';
import FormatSizeIcon from '@material-ui/icons/FormatSize';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CategoryIcon from '@material-ui/icons/Category';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { AdminPath } from '../../constants';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  subMenu: {
    fontSize: "15px"
  }
}));
export const Menu = ({ page, role }) => {
  const [openBlog, setOpenBlog] = React.useState(false);
  const classes = useStyles();
  const handleClickBlog = () => {
    setOpenBlog(!openBlog);
  };
  const [openProduct, setOpenProduct] = React.useState(false);

  const handleClickProduct = () => {
    setOpenProduct(!openProduct);
  };
  return (
    <div>
      {
        role === "admin" ? (
          <>
            <ListItem button selected={AdminPath.DASHBOARD === page ? true : false} component={Link} to="/admin">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button selected={AdminPath.ORDERS === page ? true : false} component={Link} to="/admin?section=orders">
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItem>
            <ListItem button onClick={handleClickProduct}>
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Products" />
              {openProduct ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openProduct} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested} selected={AdminPath.PRODUCT_LIST === page ? true : false} component={Link} to="/admin?section=product-list" >
                  <ListItemIcon>
                    <StoreIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Product List" classes={{ primary: classes.subMenu }} />
                </ListItem>
                <ListItem button className={classes.nested} selected={AdminPath.PRODUCT_CATEGORY === page ? true : false} component={Link} to="/admin?section=product-category" >
                  <ListItemIcon>
                    <CategoryIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Category" classes={{ primary: classes.subMenu }} />
                </ListItem>
                <ListItem button className={classes.nested} selected={AdminPath.PRODUCT_BRAND === page ? true : false} component={Link} to="/admin?section=product-brand">
                  <ListItemIcon>
                    <BrandingWatermarkIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Brand" classes={{ primary: classes.subMenu }} />
                </ListItem>
                <ListItem button className={classes.nested} selected={AdminPath.PRODUCT_COLOR === page ? true : false} component={Link} to="/admin?section=product-color">
                  <ListItemIcon>
                    <FormatColorFillIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Color" classes={{ primary: classes.subMenu }} />
                </ListItem>
                <ListItem button className={classes.nested} selected={AdminPath.PRODUCT_SIZE === page ? true : false} component={Link} to="/admin?section=product-size">
                  <ListItemIcon>
                    <FormatSizeIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Size" classes={{ primary: classes.subMenu }} />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button onClick={handleClickBlog}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Blogs" />
              {openBlog ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openBlog} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested} selected={AdminPath.BLOG_LIST === page ? true : false} component={Link} to="/admin?section=blog-list">
                  <ListItemIcon>
                    <PostAddIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Blog List" classes={{ primary: classes.subMenu }} />
                </ListItem>
                <ListItem button className={classes.nested} selected={AdminPath.BLOG_CATEGORY === page ? true : false} component={Link} to="/admin?section=blog-category">
                  <ListItemIcon>
                    <CategoryIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Blog Category" classes={{ primary: classes.subMenu }} />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button selected={AdminPath.CUSTOMERS === page ? true : false} component={Link} to="/admin?section=customers">
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Customers" />
            </ListItem>
            <ListItem button selected={AdminPath.REPORTS === page ? true : false} component={Link} to="/admin?section=reports">
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItem>
          </>
        ) : (
          <>
 
 
    <ListItem button  onClick={handleClickProduct}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Products" />
      {openProduct ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
    <Collapse in={openProduct} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} selected={AdminPath.PRODUCT_LIST === page ? true : false} component={Link} to="/admin?section=product-list" >
            <ListItemIcon>
            <StoreIcon fontSize="small"/>
            </ListItemIcon>
            <ListItemText primary="Product List" classes={{primary: classes.subMenu }}/>
          </ListItem>
          <ListItem button className={classes.nested} selected={AdminPath.PRODUCT_CATEGORY === page ? true : false} component={Link} to="/admin?section=product-category" >
            <ListItemIcon>
            <CategoryIcon fontSize="small"/>
            </ListItemIcon>
            <ListItemText primary="Category" classes={{primary: classes.subMenu }}/>
          </ListItem>
          <ListItem button className={classes.nested} selected={AdminPath.PRODUCT_BRAND === page ? true : false} component={Link} to="/admin?section=product-brand">
            <ListItemIcon>
            <BrandingWatermarkIcon fontSize="small"/>
            </ListItemIcon>
            <ListItemText primary="Brand" classes={{primary: classes.subMenu }}/>
          </ListItem>
          <ListItem button className={classes.nested} selected={AdminPath.PRODUCT_COLOR === page ? true : false} component={Link} to="/admin?section=product-color">
            <ListItemIcon>
            <FormatColorFillIcon fontSize="small"/>
            </ListItemIcon>
            <ListItemText primary="Color" classes={{primary: classes.subMenu }}/>
          </ListItem>
          <ListItem button className={classes.nested} selected={AdminPath.PRODUCT_SIZE === page ? true : false} component={Link} to="/admin?section=product-size">
            <ListItemIcon>
            <FormatSizeIcon fontSize="small"/>
            </ListItemIcon>
            <ListItemText primary="Size" classes={{primary: classes.subMenu }}/>
          </ListItem>
        </List>
      </Collapse>
    <ListItem button  onClick={handleClickBlog}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Blogs" />
      {openBlog ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
    <Collapse in={openBlog} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} selected={AdminPath.BLOG_LIST === page ? true : false} component={Link} to="/admin?section=blog-list">
            <ListItemIcon>
            <PostAddIcon fontSize="small"/>
            </ListItemIcon>
            <ListItemText primary="Blog List" classes={{primary: classes.subMenu }}/>
          </ListItem>
          <ListItem button className={classes.nested} selected={AdminPath.BLOG_CATEGORY === page ? true : false} component={Link} to="/admin?section=blog-category">
            <ListItemIcon>
            <CategoryIcon fontSize="small"/>
            </ListItemIcon>
            <ListItemText primary="Blog Category" classes={{primary: classes.subMenu }}/>
          </ListItem>
        </List>
      </Collapse>
          </>
        )
      }


    </div>
  )
};

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);