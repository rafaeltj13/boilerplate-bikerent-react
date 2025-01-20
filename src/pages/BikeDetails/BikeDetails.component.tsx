import { Box, Breadcrumbs, Divider, Link, Typography } from '@mui/material'
import BikeImageSelector from 'components/BikeImageSelector'
import BikeSpecs from 'components/BikeSpecs'
import BikeType from 'components/BikeType'
import BookingAddressMap from 'components/BookingAddressMap'
import Header from 'components/Header'
import Bike from 'models/Bike'
import {
  BookingButton,
  BreadcrumbContainer,
  BreadcrumbHome,
  BreadcrumbSeparator,
  Content,
  DetailsContainer,
  FavoriteIcon,
  InfoIcon,
  LikeButton,
  OverviewContainer,
  PriceRow,
  ThankYouContainer,
} from './BikeDetails.styles'
import BikeRentCalendar from 'components/BikeRentCalendar'
import { DateRange } from 'react-day-picker'
import BikePlaceholder from 'assets/bike-placeholder.png'

interface BikeDetailsProps {
  bike?: Bike
  isBikeRented?: boolean
  subtotal: number
  total: number
  servicesFee: number
  dateFrom: string
  dateTo: string
  error?: string
  postBikeRental?: () => void
  onSelectRange(dateRange?: DateRange): void
  checkRentAmount(): void
}

const BikeDetails = ({
  bike,
  isBikeRented,
  total,
  subtotal,
  servicesFee,
  error,
  dateFrom,
  dateTo,
  onSelectRange,
  postBikeRental,
}: BikeDetailsProps) => {
  const rateByDay = bike?.rate || 0
  const rateByWeek = rateByDay * 7

  const onSubmit = () => {
    postBikeRental?.()
  }

  return (
    <div data-testid='bike-details-page'>
      <Header />

      <BreadcrumbContainer data-testid='bike-details-breadcrumbs'>
        <Breadcrumbs separator={<BreadcrumbSeparator />}>
          <Link underline='hover' display='flex' alignItems='center' color='white' href='/'>
            <BreadcrumbHome />
          </Link>

          <Typography fontWeight={800} letterSpacing={1} color='white'>
            {bike?.name}
          </Typography>
        </Breadcrumbs>
      </BreadcrumbContainer>

      <Content>
        <DetailsContainer variant='outlined' data-testid='bike-details-container'>
          {!!bike?.imageUrls && <BikeImageSelector imageUrls={bike.imageUrls} />}

          <BikeSpecs bodySize={bike?.bodySize} maxLoad={bike?.maxLoad} ratings={bike?.ratings} />

          <Divider />

          <Box marginY={2.25}>
            <Box display='flex' alignItems='center' justifyContent='space-between'>
              <div>
                <Typography
                  variant='h1'
                  fontSize={38}
                  fontWeight={800}
                  marginBottom={0.5}
                  data-testid='bike-name-details'
                >
                  {bike?.name}
                </Typography>

                <BikeType type={bike?.type} />
              </div>

              <LikeButton>
                <FavoriteIcon />
              </LikeButton>
            </Box>

            <Typography marginTop={1.5} fontSize={14}>
              {bike?.description}
            </Typography>
          </Box>

          <Divider />

          <Box marginY={2.25} data-testid='bike-prices-details'>
            <PriceRow>
              <Typography>Day</Typography>
              <Typography fontWeight={800} fontSize={24} letterSpacing={1}>
                {rateByDay} €
              </Typography>
            </PriceRow>

            <PriceRow>
              <Typography>Week</Typography>
              <Typography fontWeight={800} fontSize={24} letterSpacing={1}>
                {rateByWeek} €
              </Typography>
            </PriceRow>
          </Box>

          <Divider />

          <Box marginTop={3.25}>
            <Typography variant='h1' fontSize={24} fontWeight={800}>
              Full adress after booking
            </Typography>

            <BookingAddressMap />
          </Box>
        </DetailsContainer>

        <OverviewContainer variant='outlined' data-testid='bike-overview-container'>
          {!isBikeRented ? (
            <>
              <BikeRentCalendar onSelectRange={onSelectRange} />
              <Typography variant='h2' fontSize={16} marginBottom={1.25}>
                Booking Overview
              </Typography>

              <Divider />

              <PriceRow marginTop={1.75} data-testid='bike-overview-single-price'>
                <Box display='flex' alignItems='center'>
                  <Typography marginRight={1}>Subtotal</Typography>
                  <InfoIcon fontSize='small' />
                </Box>

                <Typography>{subtotal.toFixed(2)} €</Typography>
              </PriceRow>

              <PriceRow marginTop={1.5} data-testid='bike-overview-single-price'>
                <Box display='flex' alignItems='center'>
                  <Typography marginRight={1}>Service Fee</Typography>
                  <InfoIcon fontSize='small' />
                </Box>

                <Typography>{servicesFee.toFixed(2)} €</Typography>
              </PriceRow>

              <PriceRow marginTop={1.75} data-testid='bike-overview-total'>
                <Typography fontWeight={800} fontSize={16}>
                  Total
                </Typography>
                <Typography variant='h2' fontSize={24} letterSpacing={1}>
                  {total.toFixed(2)} €
                </Typography>
              </PriceRow>

              <BookingButton
                fullWidth
                disableElevation
                variant='contained'
                data-testid='bike-booking-button'
                onClick={onSubmit}
                disabled={!!error || !dateFrom}
              >
                {error ? error : !dateFrom && !dateTo ? 'Select date and time' : 'Add to booking'}
              </BookingButton>
            </>
          ) : (
            <ThankYouContainer>
              <Typography variant='h2' fontSize={24} marginBottom={4} fontWeight={800}>
                Thank you!
              </Typography>
              <Typography variant='h6' fontSize={16} marginBottom={4} fontWeight={600}>
                Your bike is booked.
              </Typography>
              <img
                src={bike?.imageUrls[0]}
                width='185px'
                height='105px'
                alt={'bike-rental-card'}
                placeholder={BikePlaceholder}
              />
              <Typography variant='h6' fontSize={18} marginTop={4} fontWeight={700}>
                {bike?.name}
              </Typography>
              <BikeType type={bike?.type} />
            </ThankYouContainer>
          )}
        </OverviewContainer>
      </Content>
    </div>
  )
}

export default BikeDetails
