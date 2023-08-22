import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImagesList } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => {
  return (
    <ImagesList>
      {images.map(image => (
        <ImageGalleryItem key={image.id} imageData={image} />
      ))}
    </ImagesList>
  );
};
