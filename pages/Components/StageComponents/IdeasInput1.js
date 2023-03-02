import { Box, Button, ButtonGroup, Divider, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDaikonContext } from '../../../Context'
import { addIdeasDB } from '../../../firebaseHelpers';
import { BlackTextField } from '../../../StyledComponents/StyledComponents';

function IdeasInput1() {

    const {mobile, goToPreviousStage, goToNextStage, firstIdeas, setFirstIdeas} = useDaikonContext();
    
    const [ideas1,setIdeas1] = useState(" ");

    const handleIdeas1Change = (e)=>{
        setIdeas1(e.target.value)
    }

    // useEffect(()=>{
    //     if(ideas1.split(' ').length > 9 && ideas2.split(' ').length > 9  && ideas3.split(' ').length > 9   && ideas4.split(' ').length > 9   && ideas5.split(' ').length > 9 ){
    //         setIdeasOkay(true)
    //     }
    // }, [ideas1, ideas2, ideas3, ideas4, ideas5])


    useEffect(()=>{
        const inputs = document.querySelectorAll('.ideasInput');
        Array.from(inputs).map(input =>{
            input.classList.add('fadeIn-upQuick');
        })
    },[])

    const addIdeasInput = () =>{
        setFirstIdeas(ideas =>{
            return(
                [...ideas,ideas1]
            )
        })
    }

    useEffect(()=>{
        setIdeas1(" ")
        console.log(firstIdeas)
    },[firstIdeas])



  return (
<>
        <center>
            <Typography variant = 'h3' className='page-subtitle'>
                Please give as many ideas to your problem as possible. Min words is 10. Ignore how feasible they might be. 
            </Typography>
        </center>
        <center>
            <Box sx = {{width : '75%'}} component = 'form' className=''>
                <>
                <BlackTextField onChange = {handleIdeas1Change} 
                                    sx = {{width : '100%', margin: '1% 0% 1% 0%'}} 
                                    value = {ideas1}
                                    placeholder = 'Anything counts...'
                                    id = 'ideasInput-1'
                                    className='ideasInput'
                                />     
                </>
                <ButtonGroup variant="outlined" aria-label="outlined button group" sx = {{width : '100%', margin : '1% 0% 1% 0%'}}>
                    <Button variant="outlined" color = {'primary'} onClick = {goToPreviousStage} sx = {{width :'50%'}}>Back</Button>
                    <Button variant="outlined" color = {'primary'} onClick = {addIdeasInput} sx = {{width :'50%'}}>Add Idea</Button>
                    {/* <Button variant="outlined" color = {'primary'} onClick = {()=>{goToNextStage();addIdeas()}} sx = {{width :'50%'}} disabled = {ideasOkay ? false : true}  >Next</Button> */}
                </ButtonGroup>
            </Box>
        </center>
    </>
  )
}

export default IdeasInput1