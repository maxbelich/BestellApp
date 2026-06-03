/** start the website */
function init() {
  renderMain();
}

/** render whole layout */
function renderMain() {
  const mainContentRef = document.getElementById("main_content");

  mainContentRef.innerHTML = getMainTemplate();

  loadBasket();
  renderHeader();
  renderHero();
  renderMenu();
  renderBasket();
  renderFooter();
  renderMobileBottomNav();
}

/** render header section */
function renderHeader() {
  const headerRef = document.getElementById("header");

  headerRef.innerHTML = getHeaderTemplate();
}

/** render hero section */
function renderHero() {
  const heroRef = document.getElementById("hero");

  heroRef.innerHTML = getHeroTemplate();
}

/** render footer section */
function renderFooter() {
  let footerRef = document.getElementById("footer");
  footerRef.innerHTML = getFooterTemplate();
}

/** render all categorys and their products */
function renderMenu() {
  let menuContentRef = document.getElementById("menu_content");
  menuContentRef.innerHTML = "";
  for (
    let categoryIndex = 0;
    categoryIndex < categories.length;
    categoryIndex++
  ) {
    menuContentRef.innerHTML += getCategoryTemplate(categoryIndex);
    renderProductsByCategory(categoryIndex);
  }
}

/** render all products to selected category */
function renderProductsByCategory(categoryIndex) {
  let menuContentRef = document.getElementById("menu_content");
  for (let productIndex = 0; productIndex < products.length; productIndex++) {
    if (products[productIndex].category === categories[categoryIndex].key) {
      menuContentRef.innerHTML += getProductCardTemplate(productIndex);
    }
  }
}

/** render basket and updates all mobile basket elements */
function renderBasket() {
  let basketContentRef = document.getElementById("basket_content");
  basketContentRef.innerHTML = getBasketTemplate();

  updateMobileBasketDialog();
  renderMobileBottomNav();
}

/** add product to basket or increase amount */
function addToBasket(index) {
  let basketIndex = basket.findIndex(
    (item) => item.name === products[index].name,
  );

  if (basketIndex === -1) {
    basket.push({
      name: products[index].name,
      price: products[index].price,
      amount: 1,
    });

    lastAddedProductIndex = index;
  } else {
    basket[basketIndex].amount++;

    lastAddedProductIndex = null;
  }

  saveBasket();
  renderBasket();
  renderMenu();
}

/** increase amount of one basket item */
function increaseAmount(index) {
  basket[index].amount++;

  lastAddedProductIndex = null;
  saveBasket();
  renderBasket();
  renderMenu();
}

/** decrease amount of one basket item and removes if amount is zero */
function decreaseAmount(index) {
  basket[index].amount--;

  if (basket[index].amount <= 0) {
    basket.splice(index, 1);
  }

  lastAddedProductIndex = null;
  saveBasket();
  renderBasket();
  renderMenu();
}

/** remove one item from basket */
function removeItem(index) {
  basket.splice(index, 1);

  lastAddedProductIndex = null;
  saveBasket();
  renderBasket();
  renderMenu();
}

/** calculate subtotal of all basket items */
function calculateSubtotal() {
  let subtotal = 0;
  for (let index = 0; index < basket.length; index++) {
    subtotal += basket[index].price * basket[index].amount;
  }
  return subtotal;
}

/** gives delivery fee */
function getDeliveryFee() {
  if (basket.length === 0) {
    return 4.99;
  }

  if (calculateSubtotal() >= 50) {
    return 0;
  }

  return 4.99;
}

/** calculate total */
function calculateTotal() {
  return calculateSubtotal() + getDeliveryFee();
}

/** saves current basket */
function saveBasket() {
  localStorage.setItem("basket", JSON.stringify(basket));
}

/** loads saved basket */
function loadBasket() {
  let storedBasket = localStorage.getItem("basket");

  if (storedBasket) {
    basket = JSON.parse(storedBasket);
  }
}

/** confirm order and clear basket */
function confirmOrder() {
  let orderDialogRef = document.getElementById("order_dialog");
  orderDialogRef.innerHTML = getOrderDialogTemplate();
  orderDialogRef.showModal();
  basket = [];

  lastAddedProductIndex = null;
  saveBasket();
  renderBasket();
  renderMenu();
  setTimeout(closeOrderDialog, 2000);
}

/** close confirm dialog */
function closeOrderDialog() {
  let orderDialogRef = document.getElementById("order_dialog");
  orderDialogRef.close();
}

/** show how often one item is in basket */
function getProductAmountInBasket(index) {
  let basketIndex = basket.findIndex(
    (item) => item.name === products[index].name,
  );
  if (basketIndex === -1) {
    return 0;
  }
  return basket[basketIndex].amount;
}

/** open mobile basket */
function openMobileBasket() {
  let mobileBasketDialogRef = document.getElementById("mobile_basket_dialog");
  mobileBasketDialogRef.innerHTML = getMobileBasketDialogTemplate();
  mobileBasketDialogRef.showModal();
}

/** close mobile basket */
function closeMobileBasket() {
  let mobileBasketDialogRef = document.getElementById("mobile_basket_dialog");
  mobileBasketDialogRef.close();
}

/** update mobile basket */
function updateMobileBasketDialog() {
  let mobileBasketDialogRef = document.getElementById("mobile_basket_dialog");

  if (mobileBasketDialogRef.open) {
    mobileBasketDialogRef.innerHTML = getMobileBasketDialogTemplate();
  }
}

/** render mobile nav-bar */
function renderMobileBottomNav() {
  let mobileBottomNavRef = document.getElementById("mobile_bottom_nav");
  mobileBottomNavRef.innerHTML = getMobileBottomNavTemplate();
}

/** gives total amount of items in basket */
function getBasketAmount() {
  let amount = 0;
  for (let index = 0; index < basket.length; index++) {
    amount += basket[index].amount;
  }
  return amount;
}
