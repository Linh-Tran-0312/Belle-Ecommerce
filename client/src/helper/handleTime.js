const months = ["January ", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export function getMonth(month) {
    return months[month]
}
export function displayMonDDYYYY(time) {
    const date = new Date(time)
    const arr = date.toDateString().substr(4).split(" ");
    return `${arr[0]} ${arr[1]}, ${arr[2]}`
}
export function displayDDMonthYYYY(time) {
    const date = new Date(time)
    return `${date.getDate()} ${getMonth(date.getMonth())}, ${date.getFullYear()}`
}
export function displayDDMMYYYY(time) {
    const date = new Date(time)
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
}

export const getMonthsForReport = () => {
    const now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;

    let arr = [{
        time: "week",
        name: "This week"
    },
    { time: `${year}`, name: `In ${year}`}
];
    while ( year > 2020) {  
            if (month > 9) {      
                arr.push({ time: `${year}-${month}`, name: `${year} ${getMonth(month - 1)}`});
                month -= 1;              
            } else {
                arr.push({ time: `${year}-0${month}`, name: `${year} ${getMonth(month - 1)}`});
             
                if(month == 1) {
                    month = 12;
                    year -= 1;
                } else {
                    month -= 1;
                }           
            }     
    }
    return arr;
}