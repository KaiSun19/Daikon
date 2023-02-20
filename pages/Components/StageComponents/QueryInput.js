import { Box, Button, ButtonGroup, Divider, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDaikonContext } from '../../../Context'
import { addQuery } from '../../../firebaseHelpers';

function QueryInput() {

    var axios = require('axios');

    const {mobile,UIStages, query,setQuery,setStage, goToNextStage, generateQuery, getPrompts} = useDaikonContext();

    const [queryOkay, setQueryOkay] = useState(false);

    useEffect(()=>{
        if(query.length> 20){
            setQueryOkay(true)
        }
    },[query])

    useEffect(()=>{
        const queryText = document.querySelector('#query-box');
        queryText.classList.add('fadeIn-upQuick');
        setTimeout(()=>{
            queryText.classList.remove('fadeIn-upQuick');
        }, 1000)

    })

  return (
    <>
        <center>
            <Typography variant = 'h3' className='page-subtitle'>
                Generate a problem to solve. 
            </Typography>
        </center>
        <center>
            <Box sx = {{width : '75%'}} component = 'form' className=''>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} sx = {{minHeight : '300px'}}>
                <Typography variant = 'h4' id = 'query-box'>{query}</Typography>

            </Stack> 
                <ButtonGroup variant="outlined" aria-label="outlined button group" sx = {{width : '100%', margin : '0'}}>
                    <Button variant="outlined" color = {'primary'} onClick = {()=>{generateQuery();getPrompts()}} sx = {{width :'50%'}}>Generate</Button>
                    <Button variant="outlined" color = {'primary'} onClick = {goToNextStage} sx = {{width :'50%'}} disabled = {queryOkay ? false : true}  >Next</Button>
                </ButtonGroup>
            </Box>
        </center>
    </>
  )
}

export default QueryInput