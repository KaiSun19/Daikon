import { Box, Button, ButtonGroup, Card, CardContent, Divider, IconButton, LinearProgress, MobileStepper, Stack, Typography} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDaikonContext } from '../../../Context'
import { addQuery } from '../../../firebaseHelpers';
import { useTheme } from '@mui/material/styles';
import {KeyboardArrowLeft, KeyboardArrowRight} from '@mui/icons-material'

function ShowPrompts() {

  const basePrompts = [' ', ' ', ' ', ' ', ' ']
  const {goToPreviousStage, goToNextStage, apiLoading, prompts} = useDaikonContext();
  const theme = useTheme();

  const [currentPrompt, setCurrentPrompt] = useState(0)

  const [promptsCounter, setPromptsCounter] = useState(100)

  useEffect(() => {
    if(promptsCounter > 0){
        setTimeout(() => setPromptsCounter(promptsCounter - 1), 1000);
    }
    else{
        goToNextStage();
    }
}, [promptsCounter]);

  const handleNextPrompt = ()=>{
    setCurrentPrompt(currentPrompt + 1)
  }

  const handleBackPrompt = ()=>{
    setCurrentPrompt(currentPrompt - 1)
  }


  return (
      <>
        <center>
          {
            prompts.toString() !== basePrompts.toString() ? 
              (
              <>
              <Typography variant = 'h3' className='page-subtitle'>Please read these 5 prompts.</Typography>
                <Typography variant = 'h5' sx = {{marginBottom : '3%'}}>
                  They should be loosely related to your problem. Try not to focus too much on their meaning fully.  
                </Typography>
              </>
            )
            :
              (<Typography variant = 'h3' className='page-subtitle'>Please wait until time is up</Typography>)
          }
            <Typography variant = 'subtitle1' sx = {{margin: '2% 0 2% 0'}} >You have {promptsCounter} seconds left </Typography>
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
                (
                  prompts.toString() !== basePrompts.toString() ? 

                  <Card elevation={3} sx = {{backgroundColor : 'white'}}>
                    <CardContent>
                      <Typography variant = 'body1'>
                          {prompts[currentPrompt]}
                      </Typography>
                    </CardContent>
                  </Card>
                  :
                  <Card elevation={3} sx = {{backgroundColor : 'white'}}>
                  <CardContent>
                    <Typography variant = 'body1'>
                        No prompts available
                    </Typography>
                  </CardContent>
                </Card>
                )
            }


              <LinearProgress variant="determinate" value = {currentPrompt * 20 + 20} color = 'secondary'/>

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
                  disabled = {currentPrompt == 4 ? true : false}
                  onClick = {handleNextPrompt}
                >
                  <KeyboardArrowRight sx = {{width : '30px', height: '30px'}}/>
                </IconButton>
              </ButtonGroup>

              {/* <ButtonGroup variant="outlined" aria-label="outlined button group" sx = {{width : '100%', margin : '0'}}> */}
                  <Button variant="outlined" onClick = {goToPreviousStage} sx = {{width :'100%', backgroundColor: 'dark'}}>Back</Button>
                  {/* <Button variant="outlined" color = {'primary'} onClick = {goToNextStage} sx = {{width :'50%'}} disabled = {currentPrompt == 4 ? false : true}>Next</Button> */}
              {/* </ButtonGroup> */}
            </Box>
        </center>
      </>
  )
}

export default ShowPrompts