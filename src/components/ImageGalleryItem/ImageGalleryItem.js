import { useState } from 'react';
import { Image, ImageListItem, ModalImage } from './ImageGalleryItem.styled';

import Modal from 'react-modal';

Modal.setAppElement('#root');

export const ImageGalleryItem = ({imageData}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  
  const closeModal = () => setIsModalOpen(false);

   return (
      <ImageListItem>
        <Image
          onClick={openModal}
          src={imageData.webformatURL}
          alt={imageData.tags}
          loading="lazy"
        />

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={{
            overlay: {
              position: 'fixed',
              top: '0',
              left: '0',
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              zIndex: '1200',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },

            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
            },
          }}
        >
          <ModalImage
            src={imageData.largeImageURL}
            alt={imageData.tags}
            loading="lazy"
          />
       </Modal>
       
      </ImageListItem>
    );
  };

 

