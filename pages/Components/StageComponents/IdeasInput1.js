import { Box, Button, ButtonGroup, Divider, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDaikonContext } from '../../../Context'
import { addIdeasDB } from '../../../firebaseHelpers';
import { BlackTextField } from '../../../StyledComponents/StyledComponents';

function IdeasInput1() {

    const {mobile, goToPreviousStage, goToNextStage, firstIdeas, setFirstIdeas, checkText} = useDaikonContext();
    
    const [ideas1,setIdeas1] = useState(firstIdeas[0]);
    const [ideas2,setIdeas2] = useState(firstIdeas[1]);
    const [ideas3,setIdeas3] = useState(firstIdeas[2]);
    const [ideas4,setIdeas4] = useState(firstIdeas[3]);
    const [ideas5,setIdeas5] = useState(firstIdeas[4]);
    const [ideasOK, setIdeasOK] = useState([" ", " ", " ", " ", " "])

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

    

    const addIdeas = () =>{
        const ideasList = [ideas1, ideas2, ideas3, ideas4, ideas5];
        setFirstIdeas(ideasList)
    }

    useEffect(()=>{
        if(ideas1.split(' ').length > 9 && ideas2.split(' ').length > 9  && ideas3.split(' ').length > 9   && ideas4.split(' ').length > 9   && ideas5.split(' ').length > 9 ){
            setIdeasOkay(true)
        }
    }, [ideas1, ideas2, ideas3, ideas4, ideas5])


    useEffect(()=>{
        const inputs = document.querySelectorAll('.ideasInput');
        Array.from(inputs).map(input =>{
            input.classList.add('fadeIn-upQuick');
        })
    })



  return (
<>
        <center>
            <Typography variant = 'h3' className='page-subtitle'>
                Please give 5 ideas to your problem. Min words is 10. Ignore how feasible they might be. 
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
                            id = 'ideasInput-1'
                            className='ideasInput'
                        />
                        <BlackTextField onChange = {handleIdeas2Change} 
                            sx = {{width : '100%',margin: '1% 0% 1% 0%'}} 
                            value = {ideas2}
                            placeholder = 'Anything counts...'
                            id = 'ideasInput-2'
                             className='ideasInput'
                        />
                        <BlackTextField onChange = {handleIdeas3Change} 
                            sx = {{width : '100%',margin: '1% 0% 1% 0%'}} 
                            value = {ideas3}
                            placeholder = 'Anything counts...'
                            id = 'ideasInput-3'
                             className='ideasInput'
                        />
                        <BlackTextField onChange = {handleIdeas4Change} 
                            sx = {{width : '100%',margin: '1% 0% 1% 0%'}} 
                            value = {ideas4}
                            placeholder = 'Anything counts...'
                            id = 'ideasInput-4'
                             className='ideasInput'
                        />
                        <BlackTextField onChange = {handleIdeas5Change} 
                            sx = {{width : '100%',margin: '1% 0% 1% 0%'}} 
                            value = {ideas5}
                            placeholder = 'Anything counts...'
                            id = 'ideasInput-5'
                             className='ideasInput'
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
                            id = 'ideasInput-1'
                             className='ideasInput'
                        />
                        <BlackTextField onChange = {handleIdeas2Change} 
                            sx = {{width : '100%',margin: '1% 0% 1% 0%'}} 
                            value = {ideas2}
                            placeholder = 'Anything counts...'
                            id = 'ideasInput-2'
                             className='ideasInput'
                        />
                        <BlackTextField onChange = {handleIdeas3Change} 
                            sx = {{width : '100%',margin: '1% 0% 1% 0%'}} 
                            value = {ideas3}
                            placeholder = 'Anything counts...'
                            id = 'ideasInput-3'
                             className='ideasInput'
                        />
                        <BlackTextField onChange = {handleIdeas4Change} 
                            sx = {{width : '100%',margin: '1% 0% 1% 0%'}} 
                            value = {ideas4}
                            placeholder = 'Anything counts...'
                            id = 'ideasInput-4'
                             className='ideasInput'
                        />
                        <BlackTextField onChange = {handleIdeas5Change} 
                            sx = {{width : '100%',margin: '1% 0% 1% 0%'}} 
                            value = {ideas5}
                            placeholder = 'Anything counts...'
                            id = 'ideasInput-5'
                             className='ideasInput'
                        />        
                        </>

                    )
                }
                <ButtonGroup variant="outlined" aria-label="outlined button group" sx = {{width : '100%', margin : '1% 0% 1% 0%'}}>
                    <Button variant="outlined" color = {'primary'} onClick = {goToPreviousStage} sx = {{width :'50%'}}>Back</Button>
                    <Button variant="outlined" color = {'primary'} onClick = {()=>{goToNextStage();addIdeas()}} sx = {{width :'50%'}} disabled = {ideasOkay ? false : true}  >Next</Button>
                </ButtonGroup>
            </Box>
        </center>
    </>
  )
}

export default IdeasInput1