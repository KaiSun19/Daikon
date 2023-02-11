import { Box, TextField, Typography, styled } from '@mui/material'

export const BlackTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
      },
      '&:hover fieldset': {
        borderColor: '#303030',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black',
      },
    },
  });