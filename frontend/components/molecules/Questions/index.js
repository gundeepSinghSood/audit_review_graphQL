import React, { useEffect, useState } from 'react';
import styles from './Questions.module.css';
import { useForm } from 'react-hook-form'
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
  const [disableNext, setDisableNext] = useState(true);
  const steps = getSteps();
  const { register, handleSubmit, watch, errors } = useForm()
  
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
      elm = ques[categoryQuestion].map((eachQuestion, idx) => {
        return(
          <>
           <Typography color="textSecondary" gutterBottom variant="h6">
            {eachQuestion.ques}
          </Typography>
          {eachQuestion.type === 'textArea' 
            ? <TextareaAutosize rowsMin={5} colMin={5}/>
            :  <input name={eachQuestion.ques} ref={register({ required: eachQuestion.isRequired })} />
          }
          <input name={`priority${idx}`} ref={register({ required: eachQuestion.isRequired })} />
          {errors.exampleRequired && <span>This field is required</span>}
          </>
        )
      })
    })
    return elm;
  }

  const handleNext = () => {
    setDisableNext(true)
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setDisableNext(true)
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  
  // const submit = e => {
  //   setDisableNext(false)
  //   console.log(e)
  // }
  
  const onSubmit = data => { console.log(data) }

  return (
    <Container>
    <div className={`${classes.root} ${styles.stepperTransparent}`}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps && steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <form onSubmit={handleSubmit(onSubmit)} >
                {getStepContent(index)}
                  <div className={classes.actionsContainer}>
                  <Divider />
                    <div>
                      <Button
                        disabled={activeStep === 0 || disableNext}
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
                        disabled={disableNext}
                      >
                        {activeStep === steps && steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                      <input type="submit" />
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
