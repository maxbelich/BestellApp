function getMainTemplate() {
  return `
    <header id="header"></header>
    <section id="hero"></section>
    <section class="app_layout">
      <section id="menu_content"></section>
      <aside id="basket_content"></aside>
    </section>
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
        <h1>
  <span class="burger_text">Burger</span>House
</h1>

        <p>
          The best of Burgers, Pizza, and Greens, all in one great place.
        </p>
      </div>

    </div>
  `;
}

function getCategoryTemplate() {
  return `
    <div class="category_bar">
      <img 
        src="./assets/icons/burger_logo.svg" 
        alt=""
        class="category_icon"
      >

      <h2>Burger</h2>
    </div>
  `;
}

function getProductCardTemplate(index) {
  return `
    <div class="product_card">
      <img 
        src="./assets/imgs/${products[index].img}" 
        alt=""
        class="product_img"
      >

      <div class="product_info">
        <h3>${products[index].name}</h3>

        <p>${products[index].description}</p>
      </div>

      <div class="product_action">
        <span class="product_price">
          ${products[index].price.toFixed(2).replace(".", ",")}€
        </span>

        <button class="add_btn">
          Add to basket
        </button>
      </div>
    </div>
  `;
}

function getCategoryTemplate(categoryIndex) {
  return `
    <div class="category_bar">
      <img src="./assets/icons/${categories[categoryIndex].icon}" alt="" class="category_icon">
      <h2>${categories[categoryIndex].name}</h2>
    </div>
  `;
}

function getBasketTemplate() {
  return `
    <div class="basket_box">
      <h2>Your Basket</h2>

      <div class="basket_items">
        <p>Your basket is empty.</p>
      </div>
    </div>
  `;
}