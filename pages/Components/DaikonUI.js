import { Box, Button, Chip, Divider, Stack, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDaikonContext } from '../../Context'
import Navbar from './Navbar'
import FinishPage from './StageComponents/FinishPage';
import IdeasInput1 from './StageComponents/IdeasInput1';
import IdeasInput2 from './StageComponents/IdeasInputs2';
import QueryInput from './StageComponents/QueryInput';
import RateIdeas from './StageComponents/RateIdeas';
import ShowPrompts from './StageComponents/ShowPrompts';

function DaikonUI() {


    const {mobile, UIStages,stage,currentStep} = useDaikonContext();

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
                return(<RateIdeas/>)
            case UIStages[5]:
                return(<FinishPage />)    
        }
    }


  return (
    <>
        <Navbar />
        <Box sx = {{padding: '2%', display: 'flex', justifyContent : 'center', flexDirection : 'column'}}>
            <center>
                <Stepper activeStep={currentStep} sx = {{marginBottom : '4%'}}>
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