import { BOILERPLATE_USER_ID } from 'config'
import Bike from 'models/Bike'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import apiClient from 'services/api'
import BikeDetails from './BikeDetails.component'

type StateReceived = {
  bike: Bike
}

const BikeDetailsContainer = () => {
  const { state } = useLocation()

  const [currentBikeData, setCurrentBikeData] = useState<Bike>()

  const [isBikeRented, setIsBikeRented] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const getBikeRentals = async ({ bike }: { bike: Bike }) => {
    try {
      await apiClient.post('/bikes/return', {
        userId: parseInt(BOILERPLATE_USER_ID),
        bikeId: bike?.id,
      })
      setIsBikeRented(true)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong')
    }
  }

  const postBikeRental = async ({ dateFrom, dateTo }: { dateFrom: string; dateTo: string }) => {
    try {
      await apiClient.post('/bikes/rent', {
        bikeId: currentBikeData?.id,
        userId: parseInt(BOILERPLATE_USER_ID),
        dateTo,
        dateFrom,
      })
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong')
    }
  }

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
      postBikeRental={postBikeRental}
      isBikeRented={isBikeRented}
      error={error}
    />
  )
}

export default BikeDetailsContainer
