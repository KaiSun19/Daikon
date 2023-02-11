import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDaikonContext } from '../../Context'
import Navbar from './Navbar'
;import Link from 'next/link';
import { addQuery } from '../../firebaseHelpers';

function Welcome() {

    const {welcomeQuotes,mobile} = useDaikonContext();

    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0) 

    // useEffect to change quote every 10 seconds

    useEffect(() => {
        const interval = setInterval(()=> {setCurrentQuoteIndex(Math.floor(Math.random() * (6 - 0) + 0))}, 5000)
        return () => clearInterval(interval);
      }, []);

    // useEffect to cause animation for supersizeText every state change 

    useEffect(()=>{
        const supersizeText = document.querySelector('.supersizeText');
        const supersizeTextCite = document.querySelector('#supersizeText-cite');

        supersizeText.classList.add('fadeIn-up');
        supersizeTextCite.classList.add('fadeIn');

        setTimeout(()=>{
            supersizeText.classList.remove('fadeIn-up');
            supersizeTextCite.classList.remove('fadeIn');
        }, 4900)

    })
    
  return (
    <>
        <Navbar />
        <Box className = 'welcome-quote-container'>
            <div key = {`supersizeText-${currentQuoteIndex}`}>
                <Typography variant='h1' className='supersizeText' >
                    {welcomeQuotes[currentQuoteIndex].Quote}
                </Typography>
            </div>
            <div id = 'supersizeText-cite'>
                <Typography variant ={mobile ? 'h5' : 'h2'} sx = {{marginTop : '2%'}}>
                    <i >
                        - {welcomeQuotes[currentQuoteIndex].Author}
                    </i>
                </Typography>
            </div>
        </Box>
    </>
  )
}

export default Welcome