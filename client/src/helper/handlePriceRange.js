export default (min, max) => {
    let stringDisplay = "";
    if(min === 0 && max === 10000000)
    {
        stringDisplay = "All prices";
    } else if (min === 0 && max < 10000000 )
    {
        stringDisplay = `Below ${max.toLocaleString()} VNĐ`;
    }  else if (min > 0 && max === 10000000 )
    {
        stringDisplay = `Above ${min.toLocaleString()} VNĐ`;
    }
    else {
        stringDisplay = `From ${min.toLocaleString()} - ${max.toLocaleString()} VNĐ `;
    }
    return stringDisplay;
}