import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';
import { Container, GlobalStyles, LoadMoreButton } from './GlobalStyle';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from 'api';
import { BarLoader } from 'react-spinners';
import { useEffect, useState } from 'react';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(null);

  const perPage = 12;
  const totalPages = Math.ceil(totalHits / perPage);

  useEffect(() => {
    if (query === '') return;

    async function getImages() {
      const currentQuery = query.slice(query.indexOf('/') + 1, query.length);

      try {
        setLoading(true);

        const fetch = await fetchImages(currentQuery, page);
        const images = fetch.hits;

        if (!images.length) {
          throw new Error();
        }

        page === 1
          ? setImages(images)
          : setImages(prevState => [...prevState, ...images]);

        setTotalHits(fetch.totalHits);
      } catch {
        toast.error('Oops! No images for this query');
      } finally {
        setLoading(false);
      }
    }

    getImages();
  }, [query, page]);

  const changeQuery = newQuery => {
    setQuery(`${nanoid(10)}/${newQuery}`);
    setImages([]);
    setPage(1);
    setTotalHits(null);
  };

  const loadMoreHandler = () => setPage(prevState => prevState + 1);

  return (
    <Container>
      <SearchBar changeQuery={changeQuery} />
      <ImageGallery images={images} />

      {totalHits !== null && totalPages !== page && !loading && (
        <LoadMoreButton type="button" onClick={loadMoreHandler}>
          Load More
        </LoadMoreButton>
      )}

      {loading && <BarLoader color="#3f51b5" width="100%" />}
      <Toaster />
      <GlobalStyles />
    </Container>
  );
};
