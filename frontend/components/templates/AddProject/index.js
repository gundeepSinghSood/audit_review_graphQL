import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, StepLabel, Container, StepButton, Step, Typography, Stepper } from '@material-ui/core';
import Header from '../../molecules/Header';

import BasicInfo from '../../molecules/BasicInfo';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  formFotter: {
    paddingTop: '50px',
    paddingLeft: '18px'
  }
}));

function getSteps() {
  return ['Bacis Info', 'Select Categories', 'Question Set 1', 'Question Set 2'];
}

export default function AddProject() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [error, setError] = React.useState(false);
  const [basicInfo, setBasicInfo] = useState({});
  const steps = getSteps();

  
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <BasicInfo updateBasicInfo={updateBasicInfo}/>;
      case 1:
        return 'Step 2: What is an ad group anyways?';
      case 2:
        return 'Step 3: This is the bit I really care about!';
      default:
        return 'Unknown step';
    }
  }
  
  const updateBasicInfo = (key, value) => {
    basicInfo[key] = value;
    setBasicInfo({
      ...basicInfo,
    });
  }


  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    if(completed[0]) {
      setError(false);
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? // It's the last step, but not all steps have been completed,
            // find the first step that has been completed
            steps.findIndex((step, i) => !(i in completed))
          : activeStep + 1;
      setActiveStep(newActiveStep);
    } else {
      setError(true)
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    if(completed[0]) {
      setError(false);
      return setActiveStep(step); 
    }
    setError(true)
  };

  const handleComplete = () => {
    console.log(basicInfo)
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
    setError(false);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  
  const isStepFailed = (step) => {
    return step === 0 && error;
  };

  return (
    <Container>
    <Header/>
    <div className={classes.root}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => {
          const labelProps = {};
          if (isStepFailed(index)) {
            labelProps.error = true;
          }
        return (
          <Step key={label}>
            <StepButton onClick={handleStep(index)} completed={completed[index]}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </StepButton>
          </Step>
        )})}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <form>
              {getStepContent(activeStep)}
            </form>
            <div className={classes.formFotter}>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" className={classes.completed}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button variant="contained" color="primary" type="submit" onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                  </Button>
                ))}
            </div>
          </div>
        )}
      </div>
      {error && <div>error</div>}
    </div>
    </Container>
  );
}
