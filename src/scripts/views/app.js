import routes from "../routes/routes";
import SidebarInitiator from "../utils/sidebar-initiator";
import NotFoundPage from "./pages/NotFoundPage";

class App {
  constructor({ showButton, closeButton, sidebar, overlay, content }) {
    this._showButton = showButton;
    this._closeButton = closeButton;
    this._sidebar = sidebar;
    this._overlay = overlay;
    this._content = content;
    this._initialAppShell();
  }

  _initialAppShell() {
    SidebarInitiator.init({
      showButton: this._showButton,
      closeButton: this._closeButton,
      sidebar: this._sidebar,
      overlay: this._overlay,
    });
  }

  async renderPage() {
    console.log('Rendering page:', window.location.hash.slice(1));
console.log('Matched route key:', Object.keys(routes).find(key => window.location.hash.slice(1).match(new RegExp(`^${key.replace(/:\w+/, '\\w+')}$`))));
console.log('Matched page:', routes[window.location.hash.slice(1)] || 'NotFound');
    let page = routes[window.location.hash.slice(1) || "/"];
    
    if (!page){
        page = NotFoundPage
    }
    this._content.innerHTML = await page.render();
    await page.afterRender();
    
  } 
}

export default App;