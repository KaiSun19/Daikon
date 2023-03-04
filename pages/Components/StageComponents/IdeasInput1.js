import { Box, Button, ButtonGroup, Divider, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDaikonContext } from '../../../Context'
import { addIdeasDB } from '../../../firebaseHelpers';
import { BlackTextField } from '../../../StyledComponents/StyledComponents';

function IdeasInput1() {

    const {mobile, goToPreviousStage, goToNextStage, firstIdeas, setFirstIdeas}= useDaikonContext();
    
    const [ideas1,setIdeas1] = useState(" ");
    const [ideasCounter, setIdeasCounter] = useState(60)

    const handleIdeas1Change = (e)=>{
        setIdeas1(e.target.value)
    }

    const addIdeas = () =>{
        setFirstIdeas(firstIdeas)
    }

    // useEffect(()=>{
    //     if(ideas1.split(' ').length > 9 && ideas2.split(' ').length > 9  && ideas3.split(' ').length > 9   && ideas4.split(' ').length > 9   && ideas5.split(' ').length > 9 ){
    //         setIdeasOkay(true)
    //     }
    // }, [ideas1, ideas2, ideas3, ideas4, ideas5])

    useEffect(() => {
        if(ideasCounter > 0){
            setTimeout(() => setIdeasCounter(ideasCounter - 1), 1000);
        }
        else{
            addIdeas();
            goToNextStage();
            console.log(firstIdeas)
        }
    }, [ideasCounter]);


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
        setIdeas1(' ')
    }

    const enterIdeasInput = (e) =>{
        e.preventDefault();
        setFirstIdeas(ideas =>{
            return(
                [...ideas,ideas1]
            )
        })
        setIdeas1(' ')
    }



  return (
<>
        <center>
            <Typography variant = 'h3' className='page-subtitle'>
                Please give as many ideas to your problem as possible. Ignore how feasible they might be. 
            </Typography>
            <Typography variant = 'subtitle1' sx = {{margin: '2% 0 2% 0'}} >You have {ideasCounter} seconds left </Typography>
        </center>
        <center>
            <Box sx = {{width : '75%'}} component = 'form' className='' onSubmit = {enterIdeasInput}>
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