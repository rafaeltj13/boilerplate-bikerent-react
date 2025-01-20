import { BOILERPLATE_USER_ID } from 'config'
import Bike from 'models/Bike'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import apiClient from 'services/api'
import BikeDetails from './BikeDetails.component'
import { DateRange } from 'react-day-picker'
import dayjs from 'dayjs'
import { getServicesFee } from './BikeDetails.utils'

type StateReceived = {
  bike: Bike
}

const BikeDetailsContainer = () => {
  const { state } = useLocation()

  const [currentBikeData, setCurrentBikeData] = useState<Bike>()

  const [isBikeRented, setIsBikeRented] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const [subtotal, setSubtotal] = useState<number>(0)
  const [servicesFee, setServicesFee] = useState<number>(getServicesFee(0) || 0)
  const [total, setTotal] = useState<number>(0 + servicesFee)

  const [dateFrom, setDateFrom] = useState<string>('')
  const [dateTo, setDateTo] = useState<string>('')

  const getBikeRentals = async ({ bike }: { bike: Bike }) => {
    try {
      await apiClient.post('/bikes/return', {
        userId: parseInt(BOILERPLATE_USER_ID),
        bikeId: bike?.id,
      })
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong')
    }
  }

  const postBikeRental = async () => {
    try {
      await apiClient.post('/bikes/rent', {
        bikeId: currentBikeData?.id,
        userId: parseInt(BOILERPLATE_USER_ID),
        dateTo,
        dateFrom,
      })
      setIsBikeRented(true)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong')
    }
  }

  const checkRentAmount = async () => {
    try {
      const { data }: { data: { rentAmount: number; fee: number; totalAmount: number } } =
        await apiClient.post('/bikes/amount', {
          bikeId: currentBikeData?.id,
          userId: parseInt(BOILERPLATE_USER_ID),
          dateFrom,
          dateTo,
        })

      if (data.fee) setServicesFee(data.fee)
      if (data.rentAmount) setSubtotal(data.rentAmount)
      if (data.totalAmount) setTotal(data.totalAmount)

      setError('')
    } catch {
      setError('This date period is not available')
    }
  }

  const onSelectRange = async (dateRange?: DateRange) => {
    if (dateRange) {
      setDateFrom(dayjs(dateRange.from).format('YYYY-MM-DD'))
      setDateTo(dayjs(dateRange.to).format('YYYY-MM-DD'))
    } else {
      setDateFrom('')
      setDateTo('')
    }
  }

  useEffect(() => {
    checkRentAmount()
  }, [dateFrom, dateTo])

  useEffect(() => {
    setIsBikeRented(false)
    setError('')

    if (state) {
      const { bike } = state as StateReceived
      setCurrentBikeData(bike)

      getBikeRentals({ bike })
    }
  }, [state])

  return (
    <BikeDetails
      bike={currentBikeData}
      isBikeRented={isBikeRented}
      subtotal={subtotal}
      total={total}
      servicesFee={servicesFee}
      error={error}
      dateTo={dateTo}
      dateFrom={dateFrom}
      postBikeRental={postBikeRental}
      onSelectRange={onSelectRange}
      checkRentAmount={checkRentAmount}
    />
  )
}

export default BikeDetailsContainer
