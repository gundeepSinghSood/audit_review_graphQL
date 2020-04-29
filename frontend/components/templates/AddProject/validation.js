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

  export const validateAddProjectForm = (formValues, formValidation) => {
    const { basicInfo, firstQuestionSet } = formValues;
    // console.log('firstQuestionSet',firstQuestionSet);
    let basicInfoError
    let isBasicInfoValid;
    let firstQuestionSetError;
    if(basicInfo) {
        basicInfoError = validateBasicInfo(basicInfo);
        isBasicInfoValid = allFalse(basicInfoError);
    }
    if(firstQuestionSet){
    firstQuestionSetError = validateFirstQuestionSet(firstQuestionSet);
    }
    // console.log('firstQuestionSetError', firstQuestionSetError);
    
    return {
      ...formValidation,
      isFormValid: isBasicInfoValid || false,
      basicInfoError: basicInfoError || undefined,
      firstQuestionSetError: firstQuestionSetError || undefined
    }
  }
