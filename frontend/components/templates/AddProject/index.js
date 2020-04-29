import React, { useEffect, useRef, useState } from 'react';
import styles from './AddProject.module.css';
import { makeStyles } from '@material-ui/core/styles';
import { Button, StepLabel, Container, StepButton, Step, Typography, Stepper, FormControl } from '@material-ui/core';
import Header from '../../molecules/Header';
import { questionRes } from './question.mock';
import InfoIcon from '@material-ui/icons/Info';
import { validateAddProjectForm } from './validation';
import { addProjectApi } from './addProject.api';
import { withAuthSync } from '../../../utils/auth';

import BasicInfo from '../../molecules/BasicInfo';
import Question from '../../molecules/Questions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: '100px',
    marginTop: '50px'
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
  return ['Bacis Info', 'Question Set 1', 'Question Set 2'];
}

function AddProject() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [error, setError] = React.useState(false);
  const [basicInfo, setBasicInfo] = useState({});
  const [questionSet, setQuestionSet] = useState({});
  const [formValidation, setFormValidation]= useState({isFormValid:false});
  const steps = getSteps();
  
  useEffect(() => {
    // console.log(questionRes)
    if(questionRes) {
      if(questionRes.questionsByCategories.length >= 4) {
        const division = Math.round(questionRes.questionsByCategories.length/(steps.length-1));
        setQuestionSet(splitQuestionInParts(questionRes.questionsByCategories, division))
      }
    }
  }, [])
  
  function splitQuestionInParts(array, n) {
    let [...arr]  = array;
    var res = [];
    while (arr.length) {
      res.push(arr.splice(0, n));
    }
    return res;
  }

  
  const getStepContent = (step) => {
    switch (step) {
        case 0:
          return <BasicInfo formValidation={formValidation} updateBasicInfo={updateBasicInfo}/>;
        case 1:
          return <Question
                  questionSet={questionSet}
                  questionsByCategories={questionSet[0]} 
                  setQuestionSet={setQuestionSet}
                  qSetIndex={0} 
                  formValidation={formValidation} 
                  validateAddProjectForm={validateAddProjectForm}
                  setFormValidation={setFormValidation}
                />
        case 2:
          return <Question
                  questionSet={questionSet}
                  questionsByCategories={questionSet[1] }
                  setQuestionSet={setQuestionSet}
                  qSetIndex={1}
                  formValidation={formValidation}
                  validateAddProjectForm={validateAddProjectForm}
                  setFormValidation={setFormValidation}
                />
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
    const formValues = { basicInfo };
    const validity = validateAddProjectForm(formValues, formValidation);
    if (validity.isFormValid) {
      // addProjectApi(basicInfo).then(res => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
        setError(false);
      // }).catch(err => {
      //   setError(true);
      // })
    }
    setFormValidation(validity);
    console.log(formValidation, basicInfo)
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  
  const isStepFailed = (step) => {
    return step === 0 && error;
  };
  
  const submit = event => {
    event.preventDefault();
    console.log(event)
  }

  return (
    <>
    <Header/>
    <Container>
      <div className={classes.root}>
        <Stepper nonLinear activeStep={activeStep} className={`${styles.backgroundRed}`}>
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
              <div>
                {getStepContent(activeStep)}
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
            </div>
          )}
        </div>
        {error && <div>error</div>}
      </div>
    </Container>
    </>
  );
}

export default withAuthSync(AddProject)