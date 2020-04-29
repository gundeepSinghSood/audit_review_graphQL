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
  const { questionsByCategories, questionSet, qSetIndex, setQuestionSet, formValidation, validateAddProjectForm, setFormValidation } = props; 
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [stepCategories, setStepCategories] = useState([])
  const [disableNext, setDisableNext] = useState(true);
  const steps = getSteps();

  
  function getSteps() {
    let newArry = []
      questionsByCategories && questionsByCategories.forEach(category => {
      newArry.push(category.categoryName);
    });
    return newArry
  }

  function getStepContent(step) {
    if(questionsByCategories && questionsByCategories[step]) {
      return renderQuestions(questionsByCategories[step])
    }
  }
  
  const updartedQuestionFields = (e, quesCode, fieldName, categoryName) => {
    const tempCategories =  questionsByCategories;
    questionsByCategories.forEach((category,catIdx) => {
      if(category.categoryName === categoryName) {
        if(category && category.questions) {
        category.questions.forEach((eachQues, quesIdx) => {
          if(eachQues.quesCode === quesCode) {
            tempCategories[catIdx].questions[quesIdx][fieldName] = e.target.value;
            }
          });
        }
      }
    });
    const tempQuesSet = questionSet;
    questionSet[qSetIndex] = tempCategories;
    setQuestionSet(tempQuesSet);
  }
  
  const renderQuestions = category => {
    let elm;
      elm = category.questions.map((eachQuestion, idx) => {
        return(
          <>
           <Typography color="textSecondary" gutterBottom variant="h6">
            {eachQuestion.ques}
          </Typography>
          {eachQuestion.type === 'textArea' 
            ? <TextareaAutosize label={"Notes"} rowsMin={5} colMin={5} required={eachQuestion.isRequired}
              error={formValidation.firstQuestionSetError ? validateField(eachQuestion.quesCode, 'notes', category.categoryName) : false}
              onChange={(e)=> updartedQuestionFields(e, eachQuestion.quesCode, 'notes', category.categoryName)} 
             />
            :  <TextField 
                id="outlined-full-width"
                label={"Notes"} 
                margin="normal"
                variant="outlined"
                autoComplete='off'
                error={formValidation.firstQuestionSetError ? validateField(eachQuestion.quesCode, 'notes', category.categoryName) : false}
                required={eachQuestion.isRequired}
                onChange={(e)=> updartedQuestionFields(e, eachQuestion.quesCode, 'notes', category.categoryName)} 
              />
          }
         <TextField 
                id="outlined-full-width"
                label={'Priority'} 
                margin="normal"
                variant="outlined"
                autoComplete='off'
                className="margin-10"
                onChange={(e)=> updartedQuestionFields(e, eachQuestion.quesCode, 'priority', category.categoryName)} 
              />
          </>
        )
      })
    return elm;
  }
  
    const validateField = (quesCode, fieldName, categoryName) => {
    if(qSetIndex === 0) {
      if(formValidation.firstQuestionSetError && formValidation.firstQuestionSetError[categoryName] && 
        formValidation.firstQuestionSetError[categoryName][quesCode] && 
        !formValidation.firstQuestionSetError[categoryName][quesCode][fieldName]
        ) {
       return false;
      }
    }
    return true;
  }
  
  const validateQuestionForm = (questionSetErrors) => {
    const activeStepLabel = steps[activeStep];
    const categoryArr = Object.keys(questionSetErrors);

    for(let i = 0; i <categoryArr.length; i+=1) {
      if(categoryArr[i] === activeStepLabel){
      const eachCategory = questionSetErrors[categoryArr[i]];
        const quesCodeArr = Object.keys(eachCategory);
        for(let j = 0; j < quesCodeArr.length; j+= 1){
          const eachQuesCode = quesCodeArr[j];
            if(eachCategory[eachQuesCode].notes) {
              return false;
          }
        }
      }
    }
    return true;
  }

  const handleNext = () => {
  let formValues;
    if(qSetIndex === 0) {
      formValues = { firstQuestionSet: questionSet[0] };
    } else if(qSetIndex === 1) {
      formValues = { secondQuestionSet: questionSet[1] };
    }
  const validity = validateAddProjectForm(formValues, formValidation, qSetIndex+1);
  let isQuestionSetFormValid ;
    if(qSetIndex === 0 && validity.firstQuestionSetError) {
      isQuestionSetFormValid = validateQuestionForm(validity.firstQuestionSetError);
    } else if( qSetIndex === 1 && validity.secondQuestionSetError) {
    isQuestionSetFormValid = validateQuestionForm(validity.secondQuestionSetError);
    }
    if(isQuestionSetFormValid){
      setDisableNext(true)
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  console.log('------------>', questionSet);
  setFormValidation(validity);
  };

  const handleBack = () => {
    setDisableNext(true)
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  
  const submit = e => {
    e.preventDefault();
    setDisableNext(false)
    // console.log(e)
  }

  return (
    <Container>
    <div className={`${classes.root} ${styles.stepperTransparent}`}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps && steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <form onSubmit={submit} >
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
