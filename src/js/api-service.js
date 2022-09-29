import axios from 'axios';

export default class PicturesApiService {
  #API_KEY = '30248125-8d7a8950c071e03410d9c853e';
  #BASE_URL = 'https://pixabay.com/api/';

  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.picturesPerPage = 40;
    this.remainPages = 0;
  }

  async fetchPhoto() {
    const params = {
      key: this.#API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: this.picturesPerPage,
    };

    try {
      const response = await axios.get(this.#BASE_URL, { params });
      return response.data;

    } catch (error) {
      console.error(error);
      console.log(error.response.status);
    }
  }

  countRemainPages(totalPictures) {
    this.remainPages =
      Math.ceil(totalPictures / this.picturesPerPage) - this.page;
  }

  incrementPage() {
    this.page += 1;
  }
  
  resetPageAndCounter() {
    this.page = 1;
    this.remainPages = 0;
  }
}