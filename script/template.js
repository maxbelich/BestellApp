function getMainTemplate() {
  return `
    <nav id="header"></nav>
    <section id="hero"></section>
  `;
}

function getHeaderTemplate() {
  return `
    <div class="header_content">
      <img 
        src="./assets/icons/logo.svg" 
        alt="Logo"
        class="header_logo"
      >

      <button class="header_menu_btn" aria-label="Open Dropdown">
        <img 
          src="./assets/icons/dropdown.svg" 
          alt="Dropdown icon"
          class="header_menu_icon"
        >
      </button>
    </div>
  `;
}

function getHeroTemplate() {
  return `
    <div class="hero_content">

      <img 
        src="./assets/imgs/hero_bg.jpg" 
        alt=""
        class="hero_img"
      >

      <div class="hero_logo_wrapper">
        <img 
          src="./assets/imgs/hero_pic.png" 
          alt=""
          class="hero_logo"
        >
      </div>

      <div class="restaurant_info">
        <h1>BurgerHouse</h1>

        <p>
          The best of Burgers, Pizza, and Greens, all in one great place.
        </p>
      </div>

    </div>
  `;
}