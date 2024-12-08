import { RestoRestAPI } from "../../data/GithubRestAPI";

export const createRestaurantDetailTemplate = (restaurant) => {
  if (!restaurant) {
    return `<p tabindex="0">Restaurant details not available</p>`;
  }

  return `
    <article>
      <h2 tabindex="0">${restaurant.name}</h2>
      <img class="restaurant-image" 
           src="${RestoRestAPI.getImageUrl(restaurant.pictureId)}" 
           alt="Image of ${restaurant.name}" 
           tabindex="0">
      <p tabindex="0"><b>City:</b> ${restaurant.city}</p>
      <p tabindex="0"><b>Address:</b> ${restaurant.address || 'Address not available'}</p>
      <p tabindex="0"><b>Rating:</b> ${restaurant.rating}</p>
      <p tabindex="0">${restaurant.description}</p>
    </article>
    
    <section>
      <h3 tabindex="0">Customer Reviews</h3>
      <div id="reviewsContainer">
        ${restaurant.customerReviews && restaurant.customerReviews.length > 0
          ? restaurant.customerReviews.map((review) => `
              <div class="review">
                <p tabindex="0"><b>${review.name}:</b> ${review.review}</p>
              </div>
            `).join('')
          : '<p tabindex="0">No reviews available</p>'
        }
      </div>
    </section>
    
    <section>
      <h3 tabindex="0">Add a Review</h3>
      <form id="reviewForm" aria-labelledby="add-review">
        <input type="text" id="reviewerName" placeholder="Your name" required aria-label="Your name">
        <textarea id="reviewText" placeholder="Your review" required aria-label="Your review"></textarea>
        <button type="submit" aria-label="Submit review">Submit</button>
      </form>
    </section>
  `;
};
