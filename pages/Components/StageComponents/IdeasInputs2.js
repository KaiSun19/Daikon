import { Box, Button, ButtonGroup, Divider, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDaikonContext } from '../../../Context'
import { addIdeasDB} from '../../../firebaseHelpers';
import { BlackTextField } from '../../../StyledComponents/StyledComponents';

function IdeasInput2() {

    const {mobile, goToPreviousStage, secondIdeas,setSecondIdeas, goToNextStage, currentID, firstIdeas, getRatings, query} = useDaikonContext();
    
    const [ideas1,setIdeas1] = useState(secondIdeas[0]);
    const [ideas2,setIdeas2] = useState(secondIdeas[1]);
    const [ideas3,setIdeas3] = useState(secondIdeas[2]);
    const [ideas4,setIdeas4] = useState(secondIdeas[3]);
    const [ideas5,setIdeas5] = useState(secondIdeas[4]);
    
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

    const handleIdeas4Change = (e)=>{
        setIdeas4(e.target.value)
    }

    const handleIdeas5Change = (e)=>{
        setIdeas5(e.target.value)
    }

    const addIdeas = async () =>{
        const ideasList = [ideas1, ideas2, ideas3, ideas4, ideas5];
        setSecondIdeas(ideasList)
        getRatings(query,firstIdeas,secondIdeas)
        await addIdeasDB(currentID, firstIdeas, ideasList)
  }

  useEffect(()=>{
    if(ideas1.split(' ').length > 9 && ideas2.split(' ').length > 9  && ideas3.split(' ').length > 9   && ideas4.split(' ').length > 9   && ideas5.split(' ').length > 9 ){
        setIdeasOkay(true)
    }
    }, [ideas1, ideas2, ideas3, ideas4, ideas5])

  return (
<>
        <center>
            <Typography variant = 'h3' className='page-subtitle'>
                Now after reading the prompts. 
            </Typography>
            <Typography variant = 'h5'  sx = {{marginBottom : '3%'}}>
               Please give 5 new ideas
            </Typography>
        </center>
        <center>
            <Box sx = {{width : '75%'}} component = 'form' className=''>
                {
                    mobile ? (
                        <>
                        <BlackTextField onChange = {handleIdeas1Change} 
                            sx = {{width : '100%', margin: '1% 0% 1% 0%'}} 
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
                        <BlackTextField onChange = {handleIdeas4Change} 
                            sx = {{width : '100%',margin: '1% 0% 1% 0%'}} 
                            value = {ideas4}
                            placeholder = 'Anything counts...'
                        />
                        <BlackTextField onChange = {handleIdeas5Change} 
                            sx = {{width : '100%',margin: '1% 0% 1% 0%'}} 
                            value = {ideas5}
                            placeholder = 'Anything counts...'
                        />          
                        </>
                    )
                    :
                    (
                        <>
                        <BlackTextField onChange = {handleIdeas1Change} 
                            sx = {{width : '100%', margin: '1% 0% 1% 0%'}} 
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
                        <BlackTextField onChange = {handleIdeas4Change} 
                            sx = {{width : '100%',margin: '1% 0% 1% 0%'}} 
                            value = {ideas4}
                            placeholder = 'Anything counts...'
                        />
                        <BlackTextField onChange = {handleIdeas5Change} 
                            sx = {{width : '100%',margin: '1% 0% 1% 0%'}} 
                            value = {ideas5}
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