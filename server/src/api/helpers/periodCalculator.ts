const t = new Date(Date.now()).toISOString();

const quarters = [0,0,0,3,3,3,6,6,6,9,9,9];
const periodCal = (period: string) => {
    const now = new Date();
    const time: any = {
        start: null,
        end: now
    }
    switch(period) {
        case "today":
            time.start = new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0);
            break;
        case "week":
            // start day is Monday
            time.start =  new Date(now.getFullYear(),now.getMonth(),now.getDate() - now.getDay() + 1,0,0,0);
            break;
        case "month":
            time.start =  new Date(now.getFullYear(),now.getMonth(),1,0,0,0);
            break;
        case "quarter":
            time.start =  new Date(now.getFullYear(),quarters[now.getMonth()],1,0,0,0);
            break;
        case "year":
            time.start =  new Date(now.getFullYear(),1,1,0,0,0);
            break;
        default:
            break;
        
    }
    return time
}

export default periodCal