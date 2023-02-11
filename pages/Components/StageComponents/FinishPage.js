import { Box, Button, ButtonGroup, Divider, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDaikonContext } from '../../../Context'
import { addQuery } from '../../../firebaseHelpers';
import { BlackTextField } from '../StyledComponents/StyledComponents'

function FinishPage() {

    const {feedback, setFeedback, setStage, UIStages} = useDaikonContext();

    const handleFeedbackChange = (e) =>{
        setFeedback(e.target.value)
    }

    const submitFeedback = () =>{
        setStage(UIStages[0])
    }

  return (
    <>
        <center>
            <Typography variant = 'h3' className='page-subtitle'>
                Thank you for taking part. 
            </Typography>
            <Typography variant = 'h5'  sx = {{marginBottom : '3%'}}>
               Please give us feedback if you want. 
            </Typography>
        </center>
        <center>
            <Box sx = {{width : '75%'}} component = 'form' className=''>

                <BlackTextField onChange = {handleFeedbackChange}
                    className = 'ideas-Input' 
                    sx = {{width : '100%'}} 
                    value = {feedback}
                    placeholder = 'Anything helps...'
                />
                <Box sx={{padding : '2%'}}>
                    <Button variant="outlined" color = {'primary'} onClick = {submitFeedback} sx = {{width :'100%'}}>Submit</Button>
                </Box>
            </Box>
        </center>
    </>
  )
}

export default FinishPage