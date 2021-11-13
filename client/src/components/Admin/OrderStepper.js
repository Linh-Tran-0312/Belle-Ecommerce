import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ORDER_STATUS } from '../../constants';
import OrderStatus from '../OrderStatus';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Placed Order', 'In Delivery', 'Completed'];
}


export default function HorizontalLinearStepper({status}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
 
  useEffect(() => {
    switch(status) {
      case ORDER_STATUS.ORDERING:
        setActiveStep(0);
        break;
      case ORDER_STATUS.ORDERED:
        setActiveStep(1);
        break;
      case ORDER_STATUS.DELIVERY:
        setActiveStep(2);
        break;
      case ORDER_STATUS.COMPLETED:
        setActiveStep(3);
        break;
      default:
        setActiveStep(4);
        break;
    }
  },[status])
 
  
  
return (
  <>
  {
    activeStep !== 4 ? (
      <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      
    </div>
    ) : (
      <OrderStatus status={ORDER_STATUS.CANCELED}/>
    )
  }
  </>
 )   
}
