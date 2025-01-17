import { Box, styled } from '@mui/material'

export const Content = styled(Box)(({ theme }) => ({
  padding: '0 100px 44px',
  position: 'relative',

  [theme.breakpoints.down('md')]: {
    padding: '8vw',
  },
}))

export const LoadingContainer = styled(Box)(() => ({
  padding: '100px 34px',
  position: 'relative',

  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '25px',

  '@media (min-width: 900px)': {
    gridTemplateColumns: '1fr 1fr',
    padding: '100px',
  },

  '@media (min-width: 1400px)': {
    gridTemplateColumns: '1fr 1fr 1fr',
    padding: '100px',
  },

  '@media (min-width: 1850px)': {
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    padding: '100px',
  },
}))
