
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
            while (time.start.getDay() != 1) {
                time.start.setDate(time.start.getDate() - 1);
            }
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

export const daysInMonth = (time: string) => {
    const date = new Date(time);
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}
export const displayTime = (time: Date) => {
    const date = time.getDate();
    const month = time.getMonth();
    const year = time.getFullYear();
    const hour = time.getHours();
    const minute = time.getMinutes();
    return `${date}-${month}-${year} ${hour}:${minute}`;
}
export const regYear = /^[\d]{4}$/;
export const regYearMonth = /^[\d]{4}-([0][1-9]|[1][0-2])$/;

export const timeCal = (timeStr: string) => {
    const now = new Date();
    const time: any = {
        start: now,
        end: now
    }
    if(timeStr === "week")
    {    time.start = new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0);
        while (time.start.getDay() != 1) {
            time.start.setDate(time.start.getDate() - 1);
        }
          time.end = new Date();
    }
    else if(regYear.test(timeStr)){
        time.start =  new Date(parseInt(timeStr),0,1);
        time.end =  new Date(parseInt(timeStr),11,31,23,59,59);
    }
    else if(regYearMonth.test(timeStr)){
        const date = new Date(timeStr);
        time.start =  date;
        if(date.getMonth() === 11) {
            time.end =  new Date(date.getFullYear() + 1 ,0,1);
        } else {
            time.end =  new Date(date.getFullYear() ,date.getMonth() + 1,1); 
        }
    }
    return time;
}



 