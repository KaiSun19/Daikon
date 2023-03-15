import { Box, Button, ButtonGroup, Checkbox, FormControlLabel, FormGroup, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDaikonContext } from '../../../Context';

function Intro() {
    
    const {goToNextStage,mobile} = useDaikonContext();

    const [checkboxes, setCheckboxes] = useState([false, false, false,false,false])
    const [ticked,setTicked] = useState(false);

    const formPoints = ["I confirm I am 18 years old or older.","I understand the purpose of the research and what is required from me ",
                        "I understand that my participation is voluntary. I am free to withdraw at any time without giving a reason.",
                        "I understand that all personal information will remain confidential. My data gathered in this study will be stored anonymously.",
                        "I understand that my information may be subject to review by responsible individuals from the University."]

    useEffect(()=>{

    },[])

    const handleCheck = (e,index) =>{
        const newArray = Array.from(checkboxes)
        newArray[index] = e.target.checked;
        setCheckboxes(newArray)
    }

    useEffect(()=>{
        const isFalse = checkboxes.includes(false);
        if(!isFalse){
            setTicked(true)
        }
        else if(isFalse){
            setTicked(false)
        }
    },[checkboxes])

  return (
    <>
    <center>
        <Typography variant = 'h3' className='page-subtitle'>
            Here is what you need to do. 
        </Typography>
        <Typography variant = 'body1' sx = {{margin : '1%'}}>
            <b>1.</b> The purpose of this experiment is to see if being exposed to loosely related information to a problem will help the creative thinking process.  
        </Typography>
        <Typography variant = 'body1' sx = {{margin : '1%'}}>
            <b>2.</b> You will be given a problem that needs a new technology to be solved. You dont have to understand exactly what the problem means. 
        </Typography>
        <Typography variant = 'body1' sx = {{margin : '1%'}}>
            <b>3.</b> You will then be asked to give as many ideas as possible to solve the problem. You have 1 minute. 
        </Typography>
        <Typography variant = 'body1' sx = {{margin : '1%'}}>
            <b>4.</b> Then you will be shown either 5 pieces of information that are loosely related or be asked to wait for a minute . 
        </Typography>
        <Typography variant = 'body1' sx = {{margin : '1%'}}>
            <b>5.</b> You will then be asked to repeat step 2. 
        </Typography>
    </center>
    <center>
        <Box sx = {{width : mobile ? '100%' : '75%'}} component = 'form' className=''>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={0} sx = {{minHeight : '300px'}}>
            <FormGroup sx = {{border : '1px solid #bdbdbd', borderRadius : '10px'}}>
                <center>
                    <Typography variant = 'h5' sx = {{margin : '1%'}}>
                        Please tick the boxes to proceed
                    </Typography>
                </center>
                {
                    formPoints.map((point,index) => {
                        return(
                            <FormControlLabel control={<Checkbox  />} key = {`checkbox-${index}`} label={point} onChange = {(e)=>{handleCheck(e,index)}}/>
                        )
                    })
                }
            </FormGroup>
        </Stack> 
            <ButtonGroup variant="outlined" aria-label="outlined button group" sx = {{width : '100%', margin : '0'}}>
                <Button variant="outlined" color = {'primary'} onClick = {goToNextStage} sx = {{width : '100%'}} disabled = {ticked ? false : true}  >Next</Button>
            </ButtonGroup>
        </Box>
    </center>
</>
)
}

export default Intro