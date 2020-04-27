import React, { useEffect, useState } from 'react';
import styles from './Questions.module.css';
import { makeStyles } from '@material-ui/core/styles';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { TextField, Stepper, Step, StepLabel, StepContent, Button, Paper, Typography, Divider, TextareaAutosize, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    paddingTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

export default function Question(props) {
   const { questionsByCategories } = props; 
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [stepCategories, setStepCategories] = useState([])
  const steps = getSteps();
  
  function getSteps() {
    let newArry = []
     questionsByCategories && questionsByCategories.forEach(eachCategory => (
      Object.keys(eachCategory).forEach(categoryQuestion => {
        newArry.push(categoryQuestion);
      })
     ))
     return newArry
  }

  function getStepContent(step) {
    if(questionsByCategories) {
      return renderQuestions(questionsByCategories[step])
    }
  }
  
  const renderQuestions = ques => {
    let elm;
    Object.keys(ques).forEach(categoryQuestion => {
      elm = ques[categoryQuestion].map(eachQuestion => {
        return(
          <>
           <Typography color="textSecondary" gutterBottom variant="h6">
            {eachQuestion.ques}
          </Typography>
          {eachQuestion.type === 'textArea' 
            ? <TextareaAutosize rowsMin={5} colMin={5}/>
            : <TextField id="outlined-basic" variant="outlined" type={eachQuestion.type} required={eachQuestion.isRequired} />
          }
          <TextField id="outlined-basic" variant="outlined" rows={2} required={eachQuestion.isRequired} />
          </>
        )
      })
    })
    return elm;
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  
  const submit = e => {
    console.log(e)
  }

  return (
    <Container>
    <div className={`${classes.root} ${styles.stepperTransparent}`}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps && steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <form onSubmit={submit}>
                {getStepContent(index)}
                  <div className={classes.actionsContainer}>
                  <Divider />
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                        type="submit"
                      >
                        {activeStep === steps && steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
              </form>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps && steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
    </Container>
  );
}
