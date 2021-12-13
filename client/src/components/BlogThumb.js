import { Card, CardMedia, CardContent, Typography, makeStyles } from '@material-ui/core';
import { displayMonDDYYYY } from '../helper/handleTime';
const useStyle = makeStyles({
    link: {
        textDecoration: 'none',
    },
    cardThumb: {
        width: '100%',
        heigh: '100px',
        display: 'flex',
        flexDirection: 'row',
        boxShadow: 'none',
        borderRadius: 0,
        marginTop: 10
    },
    mediaThumb: {
    
        minWidth: "80px",
        maxHeight: "80px"
    },
    contentThumb: {
        height: '100%',
        flexDirection: "column",
        alignItems: "flex-start",
        paddingTop: 0
    },
    customBox: {
        display: "-webkit-box",
        boxOrient: "vertical",
        lineClamp: 2,
        wordBreak: "break-all",
        overflow: "hidden",
        textOverflow: "ellipsis",
     
      }
})
export default ({blog}) => {
    const classes = useStyle();
    return(
             <Card  className={classes.cardThumb}>
                    <CardMedia
                        className={classes.mediaThumb}
                        image={blog.imgPath}
                        title="Contemplative Reptile"
                    />
                    <CardContent className={classes.contentThumb}>
                        <Typography gutterBottom variant="body2" component="h2"  classes={{root: classes.customBox}}>
                           {blog.title}
                        </Typography>
                        <Typography variant="caption" color="textSecondary" component="p">
                           {displayMonDDYYYY(blog.createdAt)}
                        </Typography>
                    </CardContent>
                </Card>
    )
}