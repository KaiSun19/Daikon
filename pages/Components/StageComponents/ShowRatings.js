import { Box, Button, ButtonGroup, Card, CardContent, Divider, IconButton, LinearProgress, MobileStepper, Paper, Slider, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDaikonContext } from '../../../Context'


function ShowRatings() {

  const {goToPreviousStage, goToNextStage,ratingsList} = useDaikonContext();

  function createData(Index, Score) {
    return {Index, Score};
  }
  
  const [rows, setRows] = useState([])

  useEffect(()=>{
    if(ratingsList.length > 0){
      let receivedRows = []
      for(let i = 0; i < ratingsList.length ; i ++){
        receivedRows.push(createData(i, ratingsList[i]))
      }
      setRows(receivedRows)
    }
  },[ratingsList])
  
  return (
    <>
        <center>
            <Typography variant = 'h3' className='page-subtitle'>
                Here are the results. 
            </Typography>
            <Typography variant = 'h5'  sx = {{marginBottom : '3%'}}>
               1 is more creative 0 is less.
            </Typography>
        </center>
        <center>
            <Box sx = {{width : '75%'}} component = 'form' className=''>
              <TableContainer component={Paper} sx = {{maxWidth : '580px'}}>
                <Table aria-label="ratings table">
                  <TableHead>
                    <TableRow>
                      <TableCell align = 'center'><b>Idea No.</b></TableCell>
                      <TableCell align = 'center'><b>Creativity Score</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={`${row.Index}${row.Score}`}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="right">{row.Index}</TableCell>
                        <TableCell align="right">{row.Score}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <ButtonGroup variant="outlined" aria-label="outlined button group" sx = {{width : '100%', margin : '1% 0 0 0 '}}>
                  <Button variant="outlined" color = {'primary'} onClick = {goToPreviousStage} sx = {{width :'50%'}}>Back</Button>
                <Button variant="outlined" color = {'primary'}  onClick = {goToNextStage}sx = {{width :'50%'}}>Finish</Button>
              </ButtonGroup>
            </Box>
        </center>
    </>
  )
}

export default ShowRatings