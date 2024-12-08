import { RestoRestAPI } from "../../data/GithubRestAPI";
import UrlParser from "../../routes/url-parser";
import { createRestaurantDetailTemplate } from '../templates/restaurant-detail-template';

export default class RestaurantDetailPage {
  async render() {
    return `
      <section id="main" class="container">
        <div class="loader" aria-label="Loading restaurant details..."></div>
        <div id="restaurant-detail"></div>
      </section>
    `;
  }

  async afterRender() {
    try {
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const main = document.getElementById('restaurant-detail');

      if (!url || !url.id) {
        console.error('No restaurant ID found in URL');
        main.innerHTML = `<p>Invalid restaurant URL</p>`;
        return;
      }

      console.log(`Rendering restaurant detail for ID: ${url.id}`);

      const loader = document.querySelector('.loader'); // Initialize loader
      this._showLoading(loader);

      const restaurantDetails = await RestoRestAPI.getRestoById(url.id);

      if (!restaurantDetails) {
        main.innerHTML = `<p>Restaurant details not found.</p>`;
        return;
      }

      main.innerHTML = createRestaurantDetailTemplate(restaurantDetails);
    } catch (error) {
      console.error(error);
      const main = document.getElementById('restaurant-detail');
      main.innerHTML = `<p>Error loading restaurant details. Please try again later.</p>`;
    } finally {
      const loader = document.querySelector('.loader'); // Re-initialize loader in the finally block
      this._hideLoading(loader);
    }
  }

  static parseActiveUrlWithoutCombiner() {
    const url = window.location.hash;
    const idRegex = /detail\/([^/]+)/;
    const match = idRegex.exec(url);

    if (match && match.length > 1) {
      return { id: match[1] };
    }

    return {};
  }

  _showLoading(loader) {
    loader.style.display = 'block';
  }

  _hideLoading(loader) {
    loader.style.display = 'none';
  }
}
