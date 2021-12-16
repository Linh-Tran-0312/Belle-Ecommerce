const t = new Date(Date.now()).toISOString();

const quarters = [0,0,0,3,3,3,6,6,6,9,9,9];
export enum Period {
    TODAY = "today",
    WEEK = "week",
    MONTH = "month",
    QUARTER = "quarter",
    YEAR = "year"

}
const periodCal = (period: string) => {
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

export default periodCal