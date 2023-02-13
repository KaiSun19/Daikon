import { Box, Button, ButtonGroup, Card, CardContent, Divider, IconButton, LinearProgress, MobileStepper, Stack, Typography} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDaikonContext } from '../../../Context'
import { addQuery } from '../../../firebaseHelpers';
import { BlackTextField } from '../../../StyledComponents/StyledComponents';
import { useTheme } from '@mui/material/styles';
import {KeyboardArrowLeft, KeyboardArrowRight} from '@mui/icons-material'

function ShowPrompts() {

  const keyword_extractor = require("keyword-extractor");

  const {mockPrompts, goToPreviousStage, goToNextStage} = useDaikonContext();
  const theme = useTheme();

  const [currentPrompt, setCurrentPrompt] = useState(0)
  const [prompt,setPrompt] = useState(mockPrompts[0])

  const handleNextPrompt = ()=>{
    setCurrentPrompt(currentPrompt + 1)
  }

  const handleBackPrompt = ()=>{
    setCurrentPrompt(currentPrompt - 1)
  }

  useEffect(()=>{
    setPrompt(mockPrompts[currentPrompt])
  },[currentPrompt])

  return (
      <>
        <center>
            <Typography variant = 'h3' className='page-subtitle'>
                Please read these 3 prompts. 
            </Typography>
            <Typography variant = 'h5' sx = {{marginBottom : '3%'}}>
                They should be loosely related to your problem. 
            </Typography>
        </center>
        <center>
            <Box sx = {{width : '75%'}} component = 'form' className=''>

              <Card elevation={3} sx = {{backgroundColor : 'white'}}>
                <CardContent>
                  <Typography variant = 'body1'>
                      {prompt}
                  </Typography>
                </CardContent>
              </Card>

              <LinearProgress variant="determinate" value = {currentPrompt * 33 + 33.3} color = 'secondary'/>

              <ButtonGroup variant="outlined" aria-label="outlined button group" sx = {{width : '100%', margin : '0'}}>
                <IconButton 
                  aria-label="go-back"  
                  color="secondary" 
                  sx = {{width : '50%'}} 
                  disabled = {currentPrompt == 0 ? true : false}
                  onClick = {handleBackPrompt}>
                  <KeyboardArrowLeft sx = {{width : '30px', height: '30px'}} />
                </IconButton>

                <IconButton 
                  aria-label="go-forward"  
                  color="secondary" 
                  sx = {{width : '50%'}} 
                  disabled = {currentPrompt == 2 ? true : false}
                  onClick = {handleNextPrompt}
                >
                  <KeyboardArrowRight sx = {{width : '30px', height: '30px'}}/>
                </IconButton>
              </ButtonGroup>

              <ButtonGroup variant="outlined" aria-label="outlined button group" sx = {{width : '100%', margin : '0'}}>
                  <Button variant="outlined" color = {'primary'} onClick = {goToPreviousStage} sx = {{width :'50%'}}>Back</Button>
                  <Button variant="outlined" color = {'primary'} onClick = {goToNextStage} sx = {{width :'50%'}} disabled = {currentPrompt == 2 ? false : true}>Next</Button>
              </ButtonGroup>
            </Box>
        </center>
      </>
  )
}

export default ShowPrompts