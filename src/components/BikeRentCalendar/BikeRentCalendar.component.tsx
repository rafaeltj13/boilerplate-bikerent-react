import { Typography } from '@mui/material'
import { BikeRentCalendarContainer } from './BikeRentCalendar.styles'
import { useEffect, useState } from 'react'

import { DateRange, DayPicker, getDefaultClassNames } from 'react-day-picker'
import 'react-day-picker/style.css'

type BikeRentCalendarProps = {
  onSelectRange: (dateRange?: DateRange) => void
}

const BikeRentCalendar = ({ onSelectRange }: BikeRentCalendarProps) => {
  const [selected, setSelected] = useState<DateRange | undefined>(undefined)
  const defaultClassNames = getDefaultClassNames()

  useEffect(() => {
    onSelectRange(selected)
  }, [selected])

  /* eslint-disable */
  return (
    <BikeRentCalendarContainer>
      <Typography variant='h2' fontSize={24} marginBottom={2} marginLeft={3} fontWeight={800}>
        Select date and time
      </Typography>
      <div>
        <DayPicker
          style={
            {
              margin: 'auto',
              '--rdp-range_start-date-background-color': '#fff',
              '--rdp-range_start-color': '#1F49D1',
              '--rdp-range_middle-color': '#fff',
              '--rdp-range_end-date-background-color': '#fff',
              '--rdp-range_end-color': '#1F49D1',
              '--rdp-selected-border': 'none',
              '--rdp-range_start-background': 'transparent',
              '--rdp-range_end-background': 'transparent',
            } as React.CSSProperties
          }
          disabled={{ before: new Date() }}
          captionLayout='dropdown-years'
          mode='range'
          selected={selected}
          onSelect={setSelected}
          showOutsideDays
          classNames={{
            root: `${defaultClassNames.root} bg-[#1F49D1] rounded-[40px] px-6 pb-10 pt-[26px]`,
            chevron: `${defaultClassNames.chevron} fill-white p-[2px]`,
            button_next: `!border !border-white p-[14px] rounded-2xl`,
            button_previous: `!border !border-white p-[14px] rounded-2xl mr-2`,
            weekday: `${defaultClassNames.weekday} text-white`,
            month: `${defaultClassNames.month} text-white`,
            selected: `${defaultClassNames.selected} text-white bg-white/75`,
            day_button: `${defaultClassNames.day_button} text-white rounded-full font-normal !text-base`,
            range_start: `${defaultClassNames.range_start} rounded-l-full`,
            range_end: `${defaultClassNames.range_end} rounded-r-full`,
            month_caption: `${defaultClassNames.month_caption} mb-10`,
            caption_label: `${defaultClassNames.caption_label} !text-[16px] !opacity-50`,
            dropdowns: `text-[34px] flex flex-col`,
            nav: `${defaultClassNames.nav} h-[100px] w-[150px]`,
            months: `w-full`,
          }}
        />
      </div>
      <style>
        {`
          .rdp-day[data-today] .rdp-day_button {
            border: 1px solid white;
            border-radius: 9999px;
          }
        `}
      </style>
    </BikeRentCalendarContainer>
  )
  /* eslint-enable */
}

export default BikeRentCalendar
