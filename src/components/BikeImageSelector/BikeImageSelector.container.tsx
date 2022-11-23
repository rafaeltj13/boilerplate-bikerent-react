import { useState } from 'react'
import BikeImageSelector from './BikeImageSelector.component'

interface BikeImageSelectorProps {
  imageUrls: string[]
}

const BikeImageSelectorContainer = ({ imageUrls }: BikeImageSelectorProps) => {
  const [selectedImageUrl, setSelectedImageUrl] = useState(imageUrls[0])
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const handleSelectImage = (imageUrl: string, index: number) => {
    setSelectedImageUrl(imageUrl)
    setSelectedImageIndex(index)
  }

  const handleImageHasLoaded = () => {
    setIsImageLoaded(true)
  }

  return (
    <BikeImageSelector
      selectedImageUrl={selectedImageUrl}
      selectedImageIndex={selectedImageIndex}
      isImageLoaded={isImageLoaded}
      handleImageHasLoaded={handleImageHasLoaded}
      imageUrls={imageUrls}
      handleSelectImage={handleSelectImage}
    />
  )
}

export default BikeImageSelectorContainer
