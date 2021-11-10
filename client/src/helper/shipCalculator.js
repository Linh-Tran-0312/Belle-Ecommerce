const shipCal = (total) => {
    if(total > 500000) return 0;
   let fee = (-0.08*total) + 40000;
    fee = Math.round(fee/1000)*1000;
    if(fee < 10000) return 0;
    return fee
  }
export default shipCal;  