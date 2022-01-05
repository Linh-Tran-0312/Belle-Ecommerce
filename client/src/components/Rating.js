import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarOutlineIcon from '@material-ui/icons/StarOutline';

const Rating = ({rating, size}) => {
    
    return (
        <>
        {
            [1,2,3,4,5].map(item => {
                if( item <= rating ) return <StarIcon key={item} style={{ color: '#ff9500', fontSize: size}}/>;
                else if (rating < item && item === Math.round(rating)) return <StarHalfIcon key={item} style={{ color: '#ff9500', fontSize: size}}/>;
                else return <StarOutlineIcon key={item} style={{ color: '#ff9500', fontSize: size}} />
            })
        }
        </>
    )
   
}

export default Rating