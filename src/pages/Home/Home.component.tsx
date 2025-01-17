import Header from 'components/Header'
import BikeList from 'components/BikeList'
import Bike from 'models/Bike'
import { Content, LoadingContainer } from './Home.styles'
import ConfigErrorMessage from 'components/ConfigErrorMessage'
import { Skeleton } from '@mui/material'

interface HomeProps {
  bikes: Bike[]
  appIsNotConfigured: boolean
  isLoading?: boolean
}

const Home = ({ bikes, appIsNotConfigured, isLoading = false }: HomeProps) => {
  return (
    <div data-testid='home-page'>
      <Header />
      {isLoading ? (
        <LoadingContainer>
          {Array.from({ length: 12 }).map((_, index) => (
            <Skeleton key={index} width='100%' height={320} variant='rounded' animation='wave' />
          ))}
        </LoadingContainer>
      ) : (
        <Content>
          <BikeList bikes={bikes} />
          {appIsNotConfigured && <ConfigErrorMessage />}
        </Content>
      )}
    </div>
  )
}

export default Home
