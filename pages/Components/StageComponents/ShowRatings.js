import { Box, Button, ButtonGroup, Card, CardContent, Divider, IconButton, LinearProgress, MobileStepper, Paper, Slider, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDaikonContext } from '../../../Context'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import ScoresBarChart from '../../../StyledComponents/ScoresBarChart';


Chart.register(CategoryScale);

function ShowRatings() {

  const [rows, setRows] = useState([])
  const [chartData, setChartData] = useState({});

  const {goToPreviousStage, goToNextStage,ratingsList,mobile, apiLoading, userRank} = useDaikonContext();

  function createData(Index, Score) {
    return {Index, Score};
  }
  
  useEffect(()=>{
    if(ratingsList.length > 0){
      let receivedRows = []
      for(let i = 0; i < ratingsList.length ; i ++){
        receivedRows.push(createData(i, ratingsList[i]))
      }
      setRows(receivedRows)
    }
  },[ratingsList])

  useEffect(()=>{
    if(rows.length > 0){
      setChartData(
        {
          labels: rows.map((row) => row.Index), 
          datasets: [
            {
              label: "Average Scores",
              data: rows.map((row) => row.Score),
              backgroundColor: [
                "#ffff",
              ],
              borderColor: "black",
              borderWidth: 2
            }
          ]
        }
      )}
  },[rows])

  useEffect(()=>{
    const inputs = document.querySelectorAll('#ranking-text');
    Array.from(inputs).map(input =>{
        input.classList.add('fadeIn-upQuick');
    })
},[])



  return (
    <>
        <center>
            <Typography variant = {mobile ? 'h5' : 'h3'} className='page-subtitle'>
                Here are the results. 
            </Typography>
            <Typography variant = {mobile ? 'h5' : 'h3'}  sx = {{marginBottom : '3%'}}>
               1 is more creative 0 is less.
            </Typography>
            <Typography variant = {mobile ? 'h5' : 'h3'}  sx = {{margin : '1%'}}>
               You are the <b id = 'ranking-text'>{userRank}th</b> most creative user.
            </Typography>
        </center>
        <center>
            <Box sx = {{width : '100%'}} component = 'form' className=''>
            {
              apiLoading ? 

                <Card elevation = {0} sx  = {{margin : '5% 0 5% 0', backgroundColor: 'white'}}>
                  <div id = 'loading-spinner'>

                  </div>
                </Card>
              :
              <Stack direction = {mobile ? 'column' : 'row'} spacing = {1} justifyContent="center" className = 'ratings-container'>

              {Object.keys(chartData).length > 0 && (
                                <ScoresBarChart chartData={chartData} />
                )}

                <TableContainer component={Paper} sx = {{maxWidth : '580px', backgroundColor: 'white', boxShadow: "none", border: '1px solid #bdbdbd'}}>
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

              </Stack>
            }

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