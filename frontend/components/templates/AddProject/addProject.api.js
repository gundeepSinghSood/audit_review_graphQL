import {API_DOMAIN} from '../../../env.json'; 

 export const addProjectApi = async (basicInfoInput) => {
  const userID = localStorage.getItem('userID');
  
  const reviwerID = await getReviwerID(basicInfoInput.reviewerName);
  
  if(reviwerID) {
    const requestBody = {
      query:`
        mutation {
          createProject(
            projectInput: {creatorObjectID: "${userID}", 
            reviewerObjectID: "${reviwerID}"
            basicInput: {
              reviewerEmail: "${basicInfoInput.reviewerEmail}",
              reviewerName: "${basicInfoInput.reviewerName}",
              createdDate: "${new Date().toISOString()}",
              projectName: "${basicInfoInput.projectName}",
              clientName: "${basicInfoInput.clientName}"
            }}) {
            basicInput {
              reviewerName
            }
            creator {
              username
            }
          }
        }
      `
    };
    
  fetch(`${API_DOMAIN}`, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if(res.status !== 200 && res.status !== 201) {
        throw new Error('Failed');
      }
      return res.json();
    }).then(resData => {
      console.log(resData)
    }).catch(err => {
      console.log(err);
    });
  }
 }
 
 const getReviwerID = (reviwerName) => new Promise(resolve => {
   const requestBody = {
     query:`
      query {
          getUserByName(username: "${reviwerName}") {
            _id
            username
          }
        }
     `
   };
   
    fetch(`${API_DOMAIN}`, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if(res.status !== 200 && res.status !== 201) {
        throw new Error('Failed');
      }
      return res.json();
    }).then(resData => {
      if(resData.data) {
        resolve(resData.data.getUserByName._id);
      }
    }).catch(err => {
      console.log(err);
    });
 });