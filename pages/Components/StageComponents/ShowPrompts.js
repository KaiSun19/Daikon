import { Box, Button, ButtonGroup, Card, CardContent, Divider, IconButton, LinearProgress, MobileStepper, Stack, Typography} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDaikonContext } from '../../../Context'
import { addQuery } from '../../../firebaseHelpers';
import { useTheme } from '@mui/material/styles';
import {KeyboardArrowLeft, KeyboardArrowRight} from '@mui/icons-material'

function ShowPrompts() {

  const {goToPreviousStage, goToNextStage, apiLoading, prompts} = useDaikonContext();
  const theme = useTheme();

  const [currentPrompt, setCurrentPrompt] = useState(0)

  const handleNextPrompt = ()=>{
    setCurrentPrompt(currentPrompt + 1)
  }

  const handleBackPrompt = ()=>{
    setCurrentPrompt(currentPrompt - 1)
  }

  return (
      <>
        <center>
            <Typography variant = 'h3' className='page-subtitle'>
                Please read these 2 prompts. 
            </Typography>
            <Typography variant = 'h5' sx = {{marginBottom : '3%'}}>
                They should be loosely related to your problem. 
            </Typography>
        </center>
        <center>
            <Box sx = {{width : '75%'}} component = 'form' className=''>

            {
              apiLoading ? 

                <Card elevation = {0} sx  = {{margin : '5% 0 5% 0', backgroundColor: 'white'}}>
                  <div id = 'loading-spinner'>

                  </div>
                </Card>
              :
                <Card elevation={3} sx = {{backgroundColor : 'white'}}>
                  <CardContent>
                    <Typography variant = 'body1'>
                        {prompts[0][currentPrompt]}
                    </Typography>
                  </CardContent>
                </Card>
            }


              <LinearProgress variant="determinate" value = {currentPrompt * 50 + 50} color = 'secondary'/>

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
                  disabled = {currentPrompt == 1 ? true : false}
                  onClick = {handleNextPrompt}
                >
                  <KeyboardArrowRight sx = {{width : '30px', height: '30px'}}/>
                </IconButton>
              </ButtonGroup>

              <ButtonGroup variant="outlined" aria-label="outlined button group" sx = {{width : '100%', margin : '0'}}>
                  <Button variant="outlined" color = {'primary'} onClick = {goToPreviousStage} sx = {{width :'50%'}}>Back</Button>
                  <Button variant="outlined" color = {'primary'} onClick = {goToNextStage} sx = {{width :'50%'}} disabled = {currentPrompt == 1 ? false : true}>Next</Button>
              </ButtonGroup>
            </Box>
        </center>
      </>
  )
}

export default ShowPrompts