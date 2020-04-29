import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, Container, Paper, Grid, Typography, CardContent, TextField, FormControl } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '50px'
  },
}));

const BasicInfo = props => {
  const {updateBasicInfo} = props;
  const classes = useStyles();
  return(
    <Container>
      <div className={classes.root}>
      {/* <Typography color="textSecondary" gutterBottom variant="h4" className="red-color">
          Basic Info
        </Typography> */}
        <Typography color="textSecondary" gutterBottom variant="h6" className="red-color">
          Reviewer Details
        </Typography>
        <div>
          <TextField
            id="outlined-full-width"
            label="Reviewer Name"
            margin="normal"
            variant="outlined"
            autoComplete='off'
            required
            error={props.formValidation.basicInfoError ? props.formValidation.basicInfoError.reviewerName: false}
            onChange={(e) => updateBasicInfo('reviewerName', e.target.value)}
          />
          <TextField
            id="outlined-full-width"
            label="Reviewer Email"
            margin="normal"
            variant="outlined"
            autoComplete='off'
            required
            error={props.formValidation.basicInfoError ? props.formValidation.basicInfoError.reviewerEmail:false}
            onChange={(e) => updateBasicInfo('reviewerEmail', e.target.value)}
          />
        </div>
        <TextField
          id="outlined-full-width"
          label="Project Name"
          fullWidth
          margin="normal"
          variant="outlined"
          autoComplete='off'
          required
          error={props.formValidation.basicInfoError ? props.formValidation.basicInfoError.projectName: false}
          onChange={(e) => updateBasicInfo('projectName', e.target.value)}
        />
        <TextField
          id="outlined-full-width"
          label="Client Name"
          fullWidth
          margin="normal"
          variant="outlined"
          autoComplete='off'
          required
          error={props.formValidation.basicInfoError ?props.formValidation.basicInfoError.clientName:false}
          onChange={(e) => updateBasicInfo('clientName', e.target.value)}
        />
        <TextField
          id="outlined-full-width"
          label="Phone Number"
          fullWidth
          margin="normal"
          variant="outlined"
          autoComplete='off'
          onChange={(e) => updateBasicInfo('phoneNumber', e.target.value)}
        />
        </div>
    </Container>
  )
};


export default BasicInfo;