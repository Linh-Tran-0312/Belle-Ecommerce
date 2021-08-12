import React from 'react';
import Banner from '../components/Banner/Banner';
import Layout from '../components/Layout';
import { Box, Grid, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import ProductFilter from '../components/ProductFilter';
import ProductItem from '../components/ProductItem';

const ShopPage = () => {
    const [page, setPage] = React.useState(1);
    const handleChangePage = (event, value) => {
      setPage(value);
    };
    return(
        <>
        <Layout>
            <Banner />
            <Box my={5} textAlign="center">
                <Box my={5} textAlign="center">
                    <Typography variant="h4">Our Products</Typography>
                </Box>
                <Grid container>
                    <Grid item lg={3} md={4} sm={12} xs={12}>
                        <Box px={2}>
                        <ProductFilter/>
                        </Box>
              
                    </Grid>
                    <Grid item container lg={9} md={8} sm={12} xs={12} >
                        <Grid container item lg={12} md={12} sm={12} xs={12}>
                        {
                        [0,1,2,3,4,5,6,7].map(item =>
                            <Grid key={item} item  container lg={3} md={4} sm={6} xs={6} direction="row" justifyContent="center">
                                <ProductItem />
                            </Grid>
                            )
                    }
                        </Grid>
                        <Grid container item lg={12} md={12} sm={12} xs={12} direction="column" justifyContent="flex-start" alignItems="center">
                           <Box my={5}>
                            <Pagination count={10} variant="outlined" shape="rounded" page={page} onChange={handleChangePage} />
                           </Box>
                        </Grid>
               
                    </Grid>
                </Grid>
            </Box>
        </Layout>
               
     </>
    )
       
}

export default ShopPage