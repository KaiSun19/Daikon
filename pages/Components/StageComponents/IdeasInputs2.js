import { Box, Button, ButtonGroup, Divider, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDaikonContext } from '../../../Context'
import { addIdeasDB, addSimilarityDB} from '../../../firebaseHelpers';
import { BlackTextField } from '../../../StyledComponents/StyledComponents';

function IdeasInput2() {

    const {mobile, goToPreviousStage, secondIdeas,setSecondIdeas, goToNextStage, currentID, firstIdeas, getRatings, query, similarity} = useDaikonContext();
    
    const [ideas1,setIdeas1] = useState(" ");
    const [ideasCounter, setIdeasCounter] = useState(60)


    const addIdeasInput = () =>{
        setSecondIdeas(ideas =>{
            return(
                [...ideas,ideas1]
            )
        })
        setIdeas1(' ')
    }

    const enterIdeasInput = (e) =>{
        e.preventDefault();
        setSecondIdeas(ideas =>{
            return(
                [...ideas,ideas1]
            )
        })
        setIdeas1(' ')
    }

    const addIdeas = async () =>{
        getRatings(query,firstIdeas,secondIdeas)
        await addIdeasDB(currentID, firstIdeas, secondIdeas)
        await addSimilarityDB(currentID,similarity)
    }

    const handleIdeas1Change = (e)=>{
        setIdeas1(e.target.value)
    }

    useEffect(()=>{
        const inputs = document.querySelectorAll('.ideasInput');
        Array.from(inputs).map(input =>{
            input.classList.add('fadeIn-upQuick');
        })
    })

    useEffect(() => {
        if(ideasCounter > 0){
            setTimeout(() => setIdeasCounter(ideasCounter - 1), 1000);
        }
        else{
            addIdeas();
            goToNextStage();
        }
    }, [ideasCounter]);

  return (
<>
        <center>
            <Typography variant = 'h3' className='page-subtitle'>
                Now after reading the prompts. 
            </Typography>
            <Typography variant = 'h5'  sx = {{marginBottom : '3%'}}>
               Please give some new ideas. Again, do not worry about feasibility. 
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
                </ButtonGroup>
            </Box>
        </center>
    </>
  )
}

export default IdeasInput2