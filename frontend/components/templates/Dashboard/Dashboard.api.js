import {API_DOMAIN} from '../../../env.json'; 



export const toBeReviwedByUser = (loginUserName) => new Promise(async resolve => {
  
  const user = await getReviwerIDs(loginUserName)
  let reviewIds = [];
  user.toBeReviewed.map(item => {
    reviewIds = [...reviewIds, item._id]
  })
  console.log(reviewIds)
  
  let requestBody = {
    query: `
      query {
        getToBeReviwedByUser(_id: "${reviewIds}") {  
          creator {
            username
          }
          basicInput {
            projectName
          }
        }
      }
    `
  };
  
  console.log(requestBody)
    
  fetch(`${API_DOMAIN}`, {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if(res.status !== 200 && res.status !== 201) {
      throw new Error('Failed');
    }
    return res.json();
  })
  .then(resData => {
    const { data } = resData;
    console.log(data);
    if (data.getToBeReviwedByUser) {
      resolve(data.getToBeReviwedByUser);
    }
  })
  .catch(err => {
    console.log(err)
  })
})


 const getReviwerIDs = (reviwerName) => new Promise(resolve => {
   const requestBody = {
     query:`
      query {
          getUserByName(username: "${reviwerName}") {
            toBeReviewed {
              _id
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
      if(resData.data) {
        resolve(resData.data.getUserByName);
      }
    }).catch(err => {
      console.log(err);
    });
 });