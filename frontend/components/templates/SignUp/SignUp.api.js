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
            username
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
      const { data } = resData;
      if(data && (data.login.userId || data.createUser.username)) {
       cookies.set("token", data.login.userId, { expires: 1 });
       localStorage.setItem('username', data.login.username);
       Router.push("/dashboard");
      }
    }).catch(err => {
      console.log(err)
      setErrorState(true)
    })
  }