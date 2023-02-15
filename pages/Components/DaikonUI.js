import { Box, Button, Chip, Divider, Stack, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDaikonContext } from '../../Context'
import FinishPage from './StageComponents/FinishPage';
import Navbar from './Navbar'
import IdeasInput1 from './StageComponents/IdeasInput1';
import IdeasInput2 from './StageComponents/IdeasInputs2';
import QueryInput from './StageComponents/QueryInput';
import ShowPrompts from './StageComponents/ShowPrompts';
import ShowRatings from './StageComponents/ShowRatings';

function DaikonUI() {


    const {mobile, UIStages,stage,currentStep, query} = useDaikonContext();

    const stageComponent = () =>{
        switch(stage){
            case UIStages[0]:
                return(<QueryInput />)
            case UIStages[1]:
                return(<IdeasInput1 />)
            case UIStages[2]:
                return(<ShowPrompts />)
            case UIStages[3]:
                return(<IdeasInput2/>)
            case UIStages[4]:
                return(<ShowRatings/>)
            case UIStages[5]:
                return(<FinishPage />)    
        }
    }


  return (
    <>
        <Navbar />
        <Box sx = {{padding: '2%', display: 'flex', justifyContent : 'center', flexDirection : 'column'}}>
            <center>
                <Stepper activeStep={currentStep} sx = {{marginBottom : '2%'}}>
                    {UIStages.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps} color = 'secondary' >
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                    })}
                </Stepper>
                <Typography variant = 'body1' sx = {{margin: '2% 0 2% 0'}}><i>{query}</i></Typography>
            </center>
            <Box className='daikonQuery_container'>
                {
                    stageComponent()
                }           
            </Box>
        </Box>
    </>
  )
}

export default DaikonUI