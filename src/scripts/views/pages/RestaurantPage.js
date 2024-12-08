import { RestoRestAPI } from '../../data/GithubRestAPI'
import { RestaurantCardTemplate } from '../templates/restaurant-card'
import '../../../styles/resto.scss'
import { Jumbotron } from '../templates/jumbotron'

// TODO : Buat Top Repo Page
export default class RestaurantPage {
  render() {
    this._setTitle()
    return `
        ${Jumbotron.create()}
        <section id="main" class="container" tabindex="0">
            <h2 tabindex="0">Restaurant</h2>
            <p tabindex="0">Daftar Restaurant</p>
            <div class="loader" aria-label="Sedang Memuat Data"></div>
            <div class="lists">
            </div>
        </section>

    `
  }

  _hideLoading() {
    this.loadingIndicator.style.display = 'none'
  }

  _showLoading() {
    this.loadingIndicator.style.display = 'block'
  }

  _setTitle() {
    document.title = 'Lurker Feast'
  }
  renderSearchBar() {
    return `
      <div class="search-bar">
        <input type="text" id="searchInput" placeholder="Search restaurants..." aria-label="Search restaurants">
        <button id="searchButton" aria-label="Search">Search</button>
      </div>
    `;
  }
  
  render() {
    this._setTitle();
    return `
      ${Jumbotron.create()}
      ${this.renderSearchBar()}
      <section id="main" class="container" tabindex="0">
          <h2 tabindex="0">Restaurant</h2>
          <div class="loader" aria-label="Loading data"></div>
          <div class="lists"></div>
      </section>
    `;
  }
  async afterRender() {
    this.loadingIndicator = document.querySelector('.loader');
  
    this._showLoading();
    try {
      const repositoriesData = await RestoRestAPI.getRestoList();
      if (!Array.isArray(repositoriesData)) {
        console.error('Unexpected data format:', repositoriesData);
        throw new Error('Invalid data format. Expected an array.');
      }
      repositoriesData.forEach((repo) => {
        const repoCard = RestaurantCardTemplate.create(repo);
        document.querySelector('.lists').appendChild(repoCard);
      });
    } catch (error) {
      document.querySelector('.lists').innerHTML = `
        <p tabindex="0">Failed to load restaurants. Please try again later.</p>
      `;
    } finally {
      this._hideLoading();
    }
  }

  async handleSearch() {
    const searchInput = document.querySelector('#searchInput');
    const searchButton = document.querySelector('#searchButton');
    searchButton.addEventListener('click', async () => {
      try {
        this._showLoading();
        const query = searchInput.value.trim();
        if (!query) {
          alert('Please enter a search term.');
          return;
        }
        const searchResults = await RestoRestAPI.searchResto(query);
        const restaurantList = searchResults.restaurants || [];
        const listsContainer = document.querySelector('.lists');
        listsContainer.innerHTML = ''; // Clear previous results
        restaurantList.forEach((restaurant) => {
          const restaurantCard = RestaurantCardTemplate.create(restaurant);
          listsContainer.appendChild(restaurantCard);
        });
      } catch (error) {
        document.querySelector('.lists').innerHTML = `
          <p tabindex="0">Failed to fetch search results. Please try again later.</p>
        `;
      } finally {
        this._hideLoading();
      }
    });
  }
  
  async afterRender() {
    this.loadingIndicator = document.querySelector('.loader');
    this._showLoading();
    await this.handleSearch(); // Initialize the search bar
    const repositoriesData = await RestoRestAPI.getRestoList();
    repositoriesData.forEach((repo) => {
      const repoCard = RestaurantCardTemplate.create(repo);
      document.querySelector('.lists').appendChild(repoCard);
    });
    this._hideLoading();
  }
}