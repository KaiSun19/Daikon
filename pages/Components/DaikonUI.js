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
import Intro from './StageComponents/Intro';

function DaikonUI() {


    const {mobile, UIStages,stage,currentStep, query} = useDaikonContext();

    const stageComponent = () =>{
        switch(stage){
            case UIStages[0]:
                return(<Intro />)
            case UIStages[1]:
                return(<QueryInput />)
            case UIStages[2]:
                return(<IdeasInput1 />)
            case UIStages[3]:
                return(<ShowPrompts />)
            case UIStages[4]:
                return(<IdeasInput2/>)
            case UIStages[5]:
                return(<ShowRatings/>)
            case UIStages[6]:
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
                {currentStep > 0 ? <Typography variant = 'h6' sx = {{margin: '2% 0 2% 0'}}><b>{query}</b></Typography>: <></>} 
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