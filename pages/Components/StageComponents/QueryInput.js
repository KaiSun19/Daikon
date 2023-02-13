import { Box, Button, ButtonGroup, Divider, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDaikonContext } from '../../../Context'
import { addQuery } from '../../../firebaseHelpers';

function QueryInput() {

    var axios = require('axios');

    const {mobile,UIStages, query,setQuery,setStage, goToNextStage, generateQuery} = useDaikonContext();

    const [queryOkay, setQueryOkay] = useState(false);

    const getPrompts = () =>{
        setStage(UIStages[5])
        var data = JSON.stringify({
            "text": query
        });

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://getsynonyms-m3jn7lm4ka-uc.a.run.app/predict',
            mode: 'no-cors',
            headers: { 
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                    const synonyms = Object.values(JSON.parse(JSON.stringify(response.data)))
                    console.log(synonyms);
                    setExpandedQuery(synonyms[0])
                    setStage(UIStages[1])
                })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(()=>{
        if(query.length> 20){
            setQueryOkay(true)
        }
    },[query])

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
                <Typography variant = 'h4'>{query}</Typography>

            </Stack> 
                <ButtonGroup variant="outlined" aria-label="outlined button group" sx = {{width : '100%', margin : '0'}}>
                    <Button variant="outlined" color = {'primary'} onClick = {generateQuery} sx = {{width :'50%'}}>Generate</Button>
                    <Button variant="outlined" color = {'primary'} onClick = {goToNextStage} sx = {{width :'50%'}} disabled = {queryOkay ? false : true}  >Next</Button>
                </ButtonGroup>
            </Box>
        </center>
    </>
  )
}

export default QueryInput