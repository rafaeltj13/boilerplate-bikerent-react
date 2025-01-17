import { Box, styled } from '@mui/material'

export const Content = styled(Box)(({ theme }) => ({
  padding: '0 100px 44px',
  position: 'relative',

  [theme.breakpoints.down('md')]: {
    padding: '8vw',
  },
}))

export const LoadingContainer = styled(Box)(({ theme }) => ({
  padding: '100px 44px',
  position: 'relative',

  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '25px',

  [theme.breakpoints.up('md')]: {
    padding: '100px 8vw',
    gridTemplateColumns: '1fr 1fr 1fr',
  },

  [theme.breakpoints.up('xl')]: {
    gridTemplateColumns: '1fr 1fr 1fr',
    padding: '100px 4vw',
  },

  '@media (min-width: 1850px)': {
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
  },
}))
