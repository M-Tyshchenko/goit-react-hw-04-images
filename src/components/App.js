import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';
import { Container, GlobalStyles, LoadMoreButton } from './GlobalStyle';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from 'api';
import { BarLoader } from 'react-spinners';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    perPage: 12,
    loading: false,
    totalHits: null,
  };

  // async componentDidMount() {
  //   const { query, page } = this.state;

  //   try {
  //     this.setState({ loading: true });

  //     const fetch = await fetchImages(query, page);
  //     const images = fetch.hits;

  //     this.setState({ images, loading: false, totalHits: fetch.totalHits });
  //   } catch {
  //     toast.error('Error while loading data. Try again later.');
  //   } finally {
  //     this.setState({ loading: false });
  //   }
  // }

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    const currentQuery = query.slice(query.indexOf('/') + 1, query.length);

    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ loading: true });

        const fetch = await fetchImages(currentQuery, page);
        const images = fetch.hits;

        if (!images.length) {
          throw new Error();
        }

        if (page > prevState.page) {
          this.setState(prevState => ({
            images: [...prevState.images, ...images],

            totalHits: fetch.totalHits,
          }));

          return;
        }

        this.setState({ images, totalHits: fetch.totalHits });
      } catch {
        toast.error('Oops! No images for this query');
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  changeQuery = newQuery => {
    this.setState({
      query: `${nanoid(10)}/${newQuery}`,
      images: [],
      page: 1,
      totalHits: null,
    });
  };

  loadMoreHandler = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { page, perPage, images, loading, totalHits } = this.state;
    const totalPages = Math.ceil(totalHits / perPage);

    return (
      <Container>
        <SearchBar changeQuery={this.changeQuery} />
        <ImageGallery images={images} />

        {totalHits !== null && totalPages !== page && (
          <LoadMoreButton type="button" onClick={this.loadMoreHandler}>
            Load More
          </LoadMoreButton>
        )}

        {loading && <BarLoader color="#3f51b5" width="100%" />}
        <Toaster />
        <GlobalStyles />
      </Container>
    );
  }
}
