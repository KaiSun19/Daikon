import { Box, Button, ButtonGroup, Card, CardContent, Divider, IconButton, LinearProgress, MobileStepper, Slider, Stack, Typography} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDaikonContext } from '../../../Context'
import { addQuery } from '../../../firebaseHelpers';
import { useTheme } from '@mui/material/styles';
import {KeyboardArrowLeft, KeyboardArrowRight} from '@mui/icons-material'


function RateIdeas() {

  const {mockIdeas,goToPreviousStage, goToNextStage, ideaRatings, setIdeaRatings} = useDaikonContext();

  const marks = [{value: 1,label: '1',},{value: 2,label: '2',},{value: 3,label: '3',},{value: 4,label: '4',},
                  {value: 5,label: '5',},{value: 6,label: '6',},{value: 7,label: '7',},{value: 8,label: '8',},
                  {value: 9,label: '9'},{value: 10,label: '10',}];
  
  const [currentIdea, setCurrentIdea] = useState(0)

  const handleValueChange = (e) =>{

    const changedRatings = ideaRatings.map((rating,index)=>{
      if(index=== currentIdea){
        rating = e.target.value;
        return rating;
      }
      else{
        return rating;
      }
    })
    
    setIdeaRatings(changedRatings)
  }

  const handleNextIdea = ()=>{
    setCurrentIdea(currentIdea + 1)
  }

  const handleBackIdea = ()=>{
    setCurrentIdea(currentIdea - 1)
  }

  function valuetext(value) {
    return `${value}`;
  }

  useEffect(()=>{
    console.log(ideaRatings)
  },[ideaRatings])

  
  return (
    <>
        <center>
            <Typography variant = 'h3' className='page-subtitle'>
                Please rate these 5 ideas on their creativity. 
            </Typography>
            <Typography variant = 'h5'  sx = {{marginBottom : '3%'}}>
               10 is most creative .0 is least creative.
            </Typography>
        </center>
        <center>
            <Box sx = {{width : '75%'}} component = 'form' className=''>
              <center>
              <LinearProgress variant="determinate" value = {(currentIdea * 20) + 20} color = 'secondary' sx = {{margin: '3% 0% 3% 0%'}}/>
              </center>
              <Stack direction="column" justifyContent="center" alignItems="center" spacing={1}>
                    <Card elevation={3} sx = {{backgroundColor : 'white'}}>
                      <CardContent>
                        <Typography variant = 'body1'>
                            {mockIdeas[currentIdea]}
                        </Typography>
                      </CardContent>
                    </Card>
                    <Slider aria-label="Ideas Rating Slider" defaultValue={5} valueLabelDisplay="auto" step={1} marks={marks}
                      id = {`idea-slider-${currentIdea}`} 
                      min={1} max={10} getAriaValueText={valuetext} value = {ideaRatings[currentIdea]} onChange = {handleValueChange}
                      color = 'secondary'
                    />
              </Stack>

              <ButtonGroup variant="outlined" aria-label="outlined button group" sx = {{width : '100%', margin : '0'}}>
                <IconButton 
                  aria-label="go-back"  
                  color="secondary" 
                  sx = {{width : '50%'}} 
                  disabled = {currentIdea == 0 ? true : false}
                  onClick = {handleBackIdea}>
                  <KeyboardArrowLeft sx = {{width : '30px', height: '30px'}} />
                </IconButton>

                <IconButton 
                  aria-label="go-forward"  
                  color="secondary" 
                  sx = {{width : '50%'}} 
                  disabled = {currentIdea == 4 ? true : false}
                  onClick = {handleNextIdea}
                >
                  <KeyboardArrowRight sx = {{width : '30px', height: '30px'}}/>
                </IconButton>
              </ButtonGroup>

              <ButtonGroup variant="outlined" aria-label="outlined button group" sx = {{width : '100%', margin : '0'}}>
                  <Button variant="outlined" color = {'primary'} onClick = {goToPreviousStage} sx = {{width :'50%'}}>Back</Button>
                <Button variant="outlined" color = {'primary'}  onClick = {goToNextStage}sx = {{width :'50%'}} disabled = {currentIdea === 4 ? false : true} >Finish</Button>
              </ButtonGroup>
            </Box>
        </center>
    </>
  )
}

export default RateIdeas