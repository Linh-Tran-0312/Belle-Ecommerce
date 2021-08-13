

import { Button, makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
    button : {
        backgroundColor: 'black',
        color: 'white',
        borderRadius : '0',
        "&:hover" : {
            backgroundColor : '#4b4b4b'
        }
    }
})
export default ({width, height, children}) => {
    const classes = useStyle();
return <Button className={classes.button} style={{width, height}}>{children}</Button>

}