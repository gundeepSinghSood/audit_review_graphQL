import BasicInfo from "../../molecules/BasicInfo";

const allFalse = checkObj => Object.values(checkObj).every(item => !item);

const validateBasicInfo = (basicInfo) => {
    const { reviewerName, reviewerEmail, projectName, clientName } = basicInfo;
    const basicInfoError = {
      reviewerName: reviewerName ? false: true,
      reviewerEmail: reviewerEmail ? false: true,
      projectName: projectName ? false: true,
      clientName: clientName ? false: true
    };
    return basicInfoError;
  }
const validateFirstQuestionSet = (firstQuestionSet) => {
    const firstQuestionSetError = {};
    firstQuestionSet.forEach((category, catIdx) => {
        firstQuestionSetError[category.categoryName] = {};
        if(category && category.questions) {
            category.questions.forEach((eachQues, quesIdx) => {
                firstQuestionSetError[category.categoryName][eachQues.quesCode] = {};
                if(firstQuestionSet[catIdx].questions[quesIdx] && firstQuestionSet[catIdx].questions[quesIdx].isRequired){
                    // console.log('firstQuestionSet[catIdx].notes', firstQuestionSet[catIdx].questions[quesIdx].notes);
                }
                firstQuestionSetError[category.categoryName][eachQues.quesCode].notes = firstQuestionSet[catIdx].questions[quesIdx].notes ? false : true
                
            });
        }
    });
    return firstQuestionSetError;
}
const validateQuestionSet = (questionSetErrors) => {
  // const activeStepLabel = steps[activeStep];
  const categoryArr = Object.keys(questionSetErrors);

  for(let i = 0; i <categoryArr.length; i+=1) {
    // if(categoryArr[i] === activeStepLabel){
    const eachCategory = questionSetErrors[categoryArr[i]];
      const quesCodeArr = Object.keys(eachCategory);
      for(let j = 0; j < quesCodeArr.length; j+= 1){
        const eachQuesCode = quesCodeArr[j];
          if(eachCategory[eachQuesCode].notes) {
            return false;
        }
      }
    // }
  }
  return true;
}
  export const validateAddProjectForm = (formValues, formValidation, stepNumber) => {
    const { basicInfo, firstQuestionSet, secondQuestionSet } = formValues;
    let isFormValid = false;;
    let basicInfoError
    let firstQuestionSetError;
    let secondQuestionSetError;
    
    if(stepNumber === 0) {
      if(basicInfo) {
        basicInfoError = validateBasicInfo(basicInfo);
        isFormValid = allFalse(basicInfoError);
      }
    } else if(stepNumber === 1) {
      if(firstQuestionSet) {
        firstQuestionSetError = validateFirstQuestionSet(firstQuestionSet);
        isFormValid = validateQuestionSet(firstQuestionSetError);
      }
    }else if(stepNumber === 2) {
      if(secondQuestionSet) {
        secondQuestionSetError = validateFirstQuestionSet(secondQuestionSet);
        isFormValid = validateQuestionSet(secondQuestionSetError);
      }
    }
    
    return {
      ...formValidation,
      isFormValid,
      basicInfoError: basicInfoError || undefined,
      firstQuestionSetError,
      secondQuestionSetError
    }
  }

