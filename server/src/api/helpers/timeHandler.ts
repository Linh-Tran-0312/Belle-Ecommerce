
const quarters = [0,0,0,3,3,3,6,6,6,9,9,9];
export enum Period {
    TODAY = "today",
    WEEK = "week",
    MONTH = "month",
    QUARTER = "quarter",
    YEAR = "year"

}
export const periodCal = (period: string) => {
    const now = new Date();
    const time: any = {
        start: null,
        end: now
    }
    switch(period) {
        case Period.TODAY:
            time.start = new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0);
            break;
        case Period.WEEK:
            // start day is Monday
            time.start =  new Date(now.getFullYear(),now.getMonth(),now.getDate() - now.getDay() + 1,0,0,0);
            break;
        case Period.MONTH:
            time.start =  new Date(now.getFullYear(),now.getMonth(),1,0,0,0);
            break;
        case Period.QUARTER:
            time.start =  new Date(now.getFullYear(),quarters[now.getMonth()],1,0,0,0);
            break;
            // default get whole year
        default:
            time.start =  new Date(now.getFullYear(),1,1,0,0,0);
            break;
        
    }
    return time
}

const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
export const getDay = (day: number): string => {
    return days[day]
}

export const getDMY = (time:Date): string => {
    const date = time.getDate();
    const month = time.getMonth();
    const year = time.getFullYear();
    return `${date}-${month}-${year}`;
}
const months = [ "January ","February","March","April","May","June","July","August","September","October","November","December"];
export function getMonth(month: number) {
    return months[month]
}

export const daysInCurrentMonth = () => {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}



 