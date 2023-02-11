import { Box, Button, ButtonGroup, Divider, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDaikonContext } from '../../../Context'
import { addQuery } from '../../../firebaseHelpers';
import { BlackTextField } from '../StyledComponents/StyledComponents'

function IdeasInput2() {

    const {mobile, goToPreviousStage, secondIdeas,setSecondIdeas, goToNextStage} = useDaikonContext();
    
    const [ideas1,setIdeas1] = useState(secondIdeas[0]);
    const [ideas2,setIdeas2] = useState(secondIdeas[1]);
    const [ideas3,setIdeas3] = useState(secondIdeas[2]);
    const [ideasOkay, setIdeasOkay] = useState(false)

    const handleIdeas1Change = (e)=>{
        setIdeas1(e.target.value)
    }

    const handleIdeas2Change = (e)=>{
        setIdeas2(e.target.value)
    }

    const handleIdeas3Change = (e)=>{
        setIdeas3(e.target.value)
    }

    const addIdeas = () =>{
      const ideasList = [ideas1, ideas2, ideas3];
      setSecondIdeas(ideasList)
  }

    useEffect(()=>{
        if(ideas1 && ideas2 && ideas3){
            setIdeasOkay(true)
        }
    },[ideas1,ideas2,ideas3])

  return (
<>
        <center>
            <Typography variant = 'h3' className='page-subtitle'>
                Now after reading the prompts. 
            </Typography>
            <Typography variant = 'h5'  sx = {{marginBottom : '3%'}}>
               Please give 3 new ideas
            </Typography>
        </center>
        <center>
            <Box sx = {{width : '75%'}} component = 'form' className=''>
                {
                    mobile ? (
                        <>
                        <BlackTextField onChange = {handleIdeas1Change} 
                            sx = {{width : '100%',margin: '1% 0% 1% 0%'}} 
                            value = {ideas1}
                            placeholder = 'Anything counts...'
                        />
                        <BlackTextField onChange = {handleIdeas2Change} 
                            sx = {{width : '100%',margin: '1% 0% 1% 0%'}} 
                            value = {ideas2}
                            placeholder = 'Anything counts...'
                        />
                        <BlackTextField onChange = {handleIdeas3Change} 
                            sx = {{width : '100%',margin: '1% 0% 1% 0%'}} 
                            value = {ideas3}
                            placeholder = 'Anything counts...'
                        />        
                        </>
                    )
                    :
                    (
                        <>
                        <BlackTextField onChange = {handleIdeas1Change}
                            className = 'ideas-Input' 
                            sx = {{width : '100%'}} 
                            value = {ideas1}
                            placeholder = 'Anything counts...'
                        />
                        <BlackTextField onChange = {handleIdeas2Change}
                            className = 'ideas-Input'   
                            sx = {{width : '100%'}} 
                            value = {ideas2}
                            placeholder = 'Anything counts...'
                        />
                        <BlackTextField onChange = {handleIdeas3Change}   
                            className = 'ideas-Input' 
                            sx = {{width : '100%'}} 
                            value = {ideas3}
                            placeholder = 'Anything counts...'
                        />        
                        </>

                    )
                }
                <ButtonGroup variant="outlined" aria-label="outlined button group" sx = {{width : '100%', margin : '1% 0% 1% 0%'}}>
                    <Button variant="outlined" color = {'primary'} onClick = {goToPreviousStage} sx = {{width :'50%'}}>Back</Button>
                    <Button variant="outlined" color = {'primary'} onClick = {()=>{addIdeas();goToNextStage()}} sx = {{width :'50%'}}  disabled = {ideasOkay ? false : true}>Next</Button>
                </ButtonGroup>
            </Box>
        </center>
    </>
  )
}

export default IdeasInput2