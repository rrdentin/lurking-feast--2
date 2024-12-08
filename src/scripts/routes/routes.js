import TopRateRestaurantPage from "../views/pages/TopRateRestaurantPage";
import RestaurantPage from "../views/pages/RestaurantPage";
import ContactUsPage from "../views/pages/ContactUsPage";
import RestaurantDetailPage from '../views/pages/RestaurantDetailPage'; // Corrected path

// TODO : Siapkan Routes
const routes = {
  "/": new RestaurantPage(),
  "/top-rate": new TopRateRestaurantPage(),
  "/contact-us": new ContactUsPage(),
  '/detail/:id': RestaurantDetailPage, // Corrected path for detail page with dynamic segment
};

export default routes;
