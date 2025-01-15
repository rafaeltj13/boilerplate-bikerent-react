import { Typography } from '@mui/material'
import { BikeRentCalendarContainer } from './BikeRentCalendar.styles'

const BikeRentCalendar = () => {
  return (
    <BikeRentCalendarContainer>
      <Typography variant='h2' fontSize={24} marginBottom={2} fontWeight={800}>
        Select date and time
      </Typography>
    </BikeRentCalendarContainer>
  )
}

export default BikeRentCalendar
