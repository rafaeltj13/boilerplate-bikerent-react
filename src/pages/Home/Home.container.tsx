import Bike from 'models/Bike'
import { useEffect, useState } from 'react'
import apiClient from 'services/api'
import Home from './Home.component'
import { BOILERPLATE_CANDIDATE_TOKEN } from 'config'

const HomeContainer = () => {
  const [bikes, setBikes] = useState<Bike[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getAllBikes = async () => {
      setIsLoading(true)
      const response = await apiClient.get('/bikes/available')
      setBikes(response.data)
      setIsLoading(false)
    }

    getAllBikes()
  }, [])

  return (
    <Home appIsNotConfigured={!BOILERPLATE_CANDIDATE_TOKEN} bikes={bikes} isLoading={isLoading} />
  )
}

export default HomeContainer
