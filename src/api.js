import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const apiKey = '13806699-094791483596adb8f8eca5126';

export const fetchImages = async (query, page) => {
  const response = await axios.get(`/?`, {
    params: {
      key: apiKey,
      q: query,
      page,
      per_page: 12,
    },
  });
  console.log(response.data);
  return response.data;
};
