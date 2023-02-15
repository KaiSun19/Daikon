import { Box, Button, ButtonGroup, Card, CardContent, Divider, IconButton, LinearProgress, MobileStepper, Paper, Slider, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDaikonContext } from '../../../Context'
import { addQuery } from '../../../firebaseHelpers';
import { useTheme } from '@mui/material/styles';
import {KeyboardArrowLeft, KeyboardArrowRight} from '@mui/icons-material'


function ShowRatings() {

  const {goToPreviousStage, goToNextStage,ratingsList} = useDaikonContext();

  function createData(Index, Score) {
    return {Index, Score};
  }
  
  const rows = [
    createData(0, ratingsList[0]),
    createData(1, ratingsList[1]),
    createData(2, ratingsList[2]),
    createData(3, ratingsList[3]),
    createData(4, ratingsList[4]),
    createData(5, ratingsList[5]),
    createData(6, ratingsList[6]),
    createData(7, ratingsList[7]),
    createData(8, ratingsList[8]),
    createData(9, ratingsList[9]),
  ];
  
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