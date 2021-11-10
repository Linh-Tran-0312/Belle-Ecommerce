const handleFilter = (filter) => {
    let queryString = "";
    if(filter.page) queryString += `page=${filter.page}`;
    if(filter.limit) queryString += `&limit=${filter.limit}`;  
    if(filter.category) queryString += `&category=${filter.category}`;
    if(filter.search) queryString += `&search=${filter.search}`;
    if(filter.brand) queryString += `&brand=${filter.brand}`;
    if(filter.role) queryString += `&role=${filter.role}`;
    if(filter.paymentCheck) queryString += `&paymentCheck=${filter.paymentCheck}`;
    if(filter.status) queryString += `&status=${filter.status}`;
    if(filter.period) queryString += `&period=${filter.period}`;
    return queryString;
}

export default handleFilter;