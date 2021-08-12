import { Card, CardMedia, CardContent, Typography, makeStyles } from '@material-ui/core';
const useStyle = makeStyles({
    link: {
        textDecoration: 'none',
    },
    cardThumb: {
        width: '100%',
        heigh: '100px',
        display: 'flex',
        flexDirection: 'row',
        margin: 15,
        boxShadow: 'none',
        borderRadius: 0
    },
    mediaThumb: {
        width: '150px !important',
    },
    contentThumb: {
        height: '100%'
    }
})
export default () => {
    const classes = useStyle();
    return(
             <Card  className={classes.cardThumb}>

                    <CardMedia
                        className={classes.mediaThumb}
                        image="/post-img1.jpg"
                        title="Contemplative Reptile"
                    />
                    <CardContent className={classes.contentThumb}>
                        <Typography gutterBottom variant="body2" component="h2">
                            across all continents except Antarctica
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" component="p">
                            May 02, 2017
                        </Typography>
                    </CardContent>

                </Card>


    )
}