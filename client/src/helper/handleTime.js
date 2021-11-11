const months = [ "January ","February","March","April","May","June","July","August","September","October","November","December"];
export function getMonth(month) {
    return months[month - 1]
}
export function displayMonDDYYYY(time) {
    const date = new Date(time)
    const arr = date.toDateString().substr(4).split(" ");
    return `${arr[0]} ${arr[1]}, ${arr[2]}`
}
export function displayDDMMYYYY(time) {
    const date = new Date(time)
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
}