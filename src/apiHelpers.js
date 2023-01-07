import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

const fetchImages = async (imageName, pageNumber) => {
  const { data } = await axios.get(
    `/?q=${imageName}&page=${pageNumber}&key=30604472-f2fc6ecb7ae367c0d678b061b&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data.hits;
};

export default fetchImages;
