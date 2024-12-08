import { Restaurants } from '../../utils/restaurants'
import { RestaurantCardTemplate } from '../templates/restaurant-card'
import '../../../styles/resto.scss'
import { Jumbotron } from '../templates/jumbotron'

// TODO : Buat Top Repo Page
export default class TopRestaurantPage {
  render() {
    this._setTitle()
    return `
        ${Jumbotron.create()}
        <section id="main" class="container" tabindex="0">
            <h2>Top Rate Restaurant</h2>
            <p>Daftar Restaurant Dengan Urutan Rating Dari yang Paling Tinggi</p>
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
    document.title = 'Top Rate Restaurant'
  }

  async afterRender() {
    this.loadingIndicator = document.querySelector('.loader')

    this._showLoading()
    const repositoriesData =
      await Restaurants.getTopRestaurantsByRating()
    repositoriesData.forEach((repo) => {
      const repoCard = RestaurantCardTemplate.create(repo)
      document.querySelector('.lists').appendChild(repoCard)
    })
    this._hideLoading()
  }
}