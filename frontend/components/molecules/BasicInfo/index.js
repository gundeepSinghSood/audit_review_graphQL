import React from "react";
import { Button, Card, Container, Paper, Grid, Typography, CardContent, TextField } from '@material-ui/core';

const BasicInfo = props => {
  const {updateBasicInfo} = props;
  return(
    <Container>
      <Typography color="textSecondary" gutterBottom variant="h4">
          Basic Info
        </Typography>
        <Typography color="textSecondary" gutterBottom variant="p">
          Reviewer Details
        </Typography>
        <div>
          <TextField
            id="outlined-full-width"
            label="Reviewer Name"
            margin="normal"
            variant="outlined"
            onChange={(e) => updateBasicInfo('reviewerName', e.target.value)}
          />
          <TextField
            id="outlined-full-width"
            label="Reviewer Email"
            margin="normal"
            variant="outlined"
            onChange={(e) => updateBasicInfo('reviewerEmail', e.target.value)}
          />
        </div>
        <TextField
          id="outlined-full-width"
          label="Project Name"
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={(e) => updateBasicInfo('projectName', e.target.value)}
        />
        <TextField
          id="outlined-full-width"
          label="Client Name"
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={(e) => updateBasicInfo('clientName', e.target.value)}
        />
        <TextField
          id="outlined-full-width"
          label="Phone Number"
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={(e) => updateBasicInfo('phoneNumber', e.target.value)}
        />
    </Container>
  )
};


export default BasicInfo;