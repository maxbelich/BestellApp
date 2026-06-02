function getMainTemplate() {
  return `
    <header id="header"></header>
    <section id="hero"></section>
    <section class="app_layout">
      <section id="menu_content"></section>
      <aside id="basket_content"></aside>
    </section>
    <footer id="footer"></footer>
    <dialog id="order_dialog"></dialog>
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
        <div class="restaurant_headline">
  <h1>
    <span class="burger_text">Burger</span>House
  </h1>

  <div class="rating_badge">
    <img
      src="./assets/icons/star.svg"
      alt="rating star"
      class="rating_star"
    >

    <span class="rating_value">4,1</span>

    <span class="rating_count">(317)</span>
  </div>
</div>
        <p>
          The best of Burgers, Pizza, and Greens, all in one great place.
        </p>
      </div>

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

        <button
  onclick="addToBasket(${index})"
  class="add_btn
  ${getProductAmountInBasket(index) > 0 ? "added_btn" : ""}
  ${lastAddedProductIndex === index ? "added_btn_animation" : ""}"
>
  ${
    getProductAmountInBasket(index) > 0
      ? `Added ${getProductAmountInBasket(index)}`
      : "Add to basket"
  }
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
      <div id="basket_items"></div>
      ${basket.length > 0 ? getBasketSummaryTemplate() : ""}
    </div>
  `;
}

function getBasketItemTemplate(index) {
  return `
    <div class="basket_item">
      <div class="basket_item_info">
        <span class="basket_item_name">${basket[index].amount} x ${basket[index].name}</span>
        <span class="basket_item_price">${(basket[index].price * basket[index].amount).toFixed(2).replace(".", ",")}€</span>
      </div>
      <div class="basket_controls">

  <div class="basket_control_left">
    ${
      basket[index].amount === 1
        ? `
          <img
            onclick="removeItem(${index})"
            src="./assets/icons/delete.svg"
            class="basket_icon"
            alt=""
          >
        `
        : `
          <button onclick="decreaseAmount(${index})">-</button>
        `
    }
  </div>

  <span>${basket[index].amount}</span>

  <button onclick="increaseAmount(${index})">+</button>

</div>
 ${
   basket[index].amount > 1
     ? `
            <img
              onclick="removeItem(${index})"
              src="./assets/icons/delete.svg"
              class="basket_delete"
              alt=""
            >
          `
     : ""
 }
    </div>
  `;
}

function getBasketSummaryTemplate() {
  return `
    <div class="basket_summary">
      <div class="basket_summary_row">
        <span>Subtotal</span>
        <span>${calculateSubtotal().toFixed(2).replace(".", ",")}€</span>
      </div>
      <div class="basket_summary_row">
  <span>Delivery fee</span>
  <span class="${getDeliveryFee() === 0 ? "free_delivery" : ""}">
    ${
      getDeliveryFee() === 0
        ? "FREE"
        : `${getDeliveryFee().toFixed(2).replace(".", ",")}€`
    }
  </span>
</div>
      <div class="basket_divider"></div>
      <div class="basket_summary_row basket_total">
        <span>Total</span>
        <span>${calculateTotal().toFixed(2).replace(".", ",")}€</span>
      </div>
      <button onclick="confirmOrder()" class="buy_btn">
  Buy now (${calculateTotal().toFixed(2).replace(".", ",")}€)
</button>
    </div>
  `;
}

function getEmptyBasketTemplate() {
  return `
    <div class="empty_basket">
      <img src="./assets/icons/shopping_cart.svg" alt="" class="empty_basket_icon">
      <p>Your basket is empty.</p>
      <span>Add some delicious food!</span>
    </div>
  `;
}

function getFooterTemplate() {
  return `
    <div class="footer_content">
      <span>© 2025 BurgerHouse</span>
      <a href="#">Imprint</a>
      <a href="#">Cookie Preferences</a>
    </div>
  `;
}

function getOrderDialogTemplate() {
  return `
    <div class="order_dialog_content">
      <button onclick="closeOrderDialog()" class="dialog_close_btn">×</button>
      <img src="./assets/icons/confirmed_truck.svg" alt="" class="order_dialog_icon">
      <h2>Order confirmed!</h2>
      <p>Your food is on the way!</p>
    </div>
  `;
}