import React, { useEffect, useRef, useState } from 'react';
import Router from "next/router";
import { submitHandler } from './SignUp.api';
import { logout } from '../../../utils/auth';
import { useStyles } from './SignUp.style';
import { Face, Fingerprint , LockOutlined } from '@material-ui/icons'
// import { Button, Card, Container, Paper, Grid, Typography, CardContent, TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, makeStyles } from '@material-ui/core';
    

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const SignUp = props => {
  const [errorState, setErrorState] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const inputEmail = useRef('');
  const inputPassworrd = useRef('');
  
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();
  
 
  
  const inputOnChnage = () => {
    const email = inputEmail.current.value;
    const password = inputPassworrd.current.value
    if (email.trim().length !== 0 || password.trim().length !== 0) {
      setErrorState(false)
    }
  }
  
  const switchModeHandler = () => {
    setIsLogin(!isLogin)
    setErrorState(false)
  }

  return ( 
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isLogin ? 'Login' : 'Sign up'}
        </Typography>
        <form className={classes.form} noValidate autoComplete="off" onSubmit={(e) => submitHandler(e, inputEmail, inputPassworrd, isLogin, setErrorState)}>
          <TextField
            error={errorState}
            inputRef={inputEmail} 
            id="outlined-full-width"
            label="Email Address"
            id="email"
            name="email"
            autoComplete="email"
            placeholder="test@test.com"
            helperText={errorState ? "erorr message" : ''}
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={inputOnChnage}
            autoFocus
          />
          <TextField
            inputRef={inputPassworrd} 
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="off"
            helperText={errorState ? "erorr message" : ''}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
          <Grid container>
            <Grid item xs />
            <Grid item>
              <Link href="#" variant="body2" onClick={switchModeHandler}>
                {` ${!isLogin ? 'Have an account! Login' : "Don't have an account? Sign up"}`}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
 }
 
export default SignUp;