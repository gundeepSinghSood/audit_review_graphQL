import {API_DOMAIN} from '../../../env.json'; 
import Router from "next/router";
import cookies from 'js-cookie';

 export const submitHandler = (event, inputEmail, inputPassworrd, isLogin, setErrorState) => {
    event.preventDefault();
    const email = inputEmail.current.value;
    const password = inputPassworrd.current.value

    if (email.trim().length === 0 || password.trim().length === 0) {
      setErrorState(true)
      return;
    }
    
    let requestBody = {
      query: `
        query {
          login(username: "${email}", password: "${password}") {
            userId
          }
        }
      `
    };
    
    if (!isLogin) {
      requestBody = {
        query:`
          mutation {
            createUser(userInput: {username: "${email}", password: "${password}"}) {
              _id
              username
            }
          }
        `
      }
    }
    
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
      const { data } = resData;
      if(data && (data.login.userId || data.createUser.username)) {
       cookies.set("token", data.login.userId, { expires: 1 }); 
       console.log(data.login.userId)
       Router.push("/addProject");
      }
    }).catch(err => {
      console.log(err)
      setErrorState(true)
    })
  }