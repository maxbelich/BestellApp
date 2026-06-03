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
}

/** add product to basket or increase amount */
function addToBasket(index) {
  let amountBefore = getProductAmountInBasket(index);

  let basketIndex = basket.findIndex((item) => {
    return item.name === products[index].name;
  });

  if (basketIndex === -1) {
    basket.push({
      name: products[index].name,
      price: products[index].price,
      amount: 1,
    });
  } else {
    basket[basketIndex].amount++;
  }

  saveAndRenderBasket();
  updateAddButtonAfterAdd(index, amountBefore);
}

/** increase amount of one basket item */
function increaseAmount(index) {
  let productIndex = getProductIndexFromBasketItem(index);

  basket[index].amount++;

  lastAddedProductIndex = null;
  saveAndRenderBasket();
  renderAddButton(productIndex);
}

/** decrease amount of one basket item and removes if amount is zero */
function decreaseAmount(index) {
  let productIndex = getProductIndexFromBasketItem(index);

  basket[index].amount--;

  if (basket[index].amount <= 0) {
    basket.splice(index, 1);
  }

  lastAddedProductIndex = null;

  saveAndRenderBasket();
  renderAddButton(productIndex);
}

/** remove one item from basket */
function removeItem(index) {
  let productIndex = getProductIndexFromBasketItem(index);

  basket.splice(index, 1);

  lastAddedProductIndex = null;

  saveAndRenderBasket();
  renderAddButton(productIndex);
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
  closeMobileBasket();

  basket = [];
  lastAddedProductIndex = null;

  saveAndRenderBasket();
  renderAllAddButtons();
  openOrderDialog();

  setTimeout(closeOrderDialog, 3000);
}

/** open order confirm dialog */
function openOrderDialog() {
  let orderDialogRef = document.getElementById("order_dialog");
  orderDialogRef.innerHTML = getOrderDialogTemplate();
  orderDialogRef.showModal();
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

/** save basket and update basket UI */
function saveAndRenderBasket() {
  saveBasket();
  renderBasket();
  renderMobileCartCounter();
}

/** render add button and start animation */
function renderAddButton(index, shouldAnimate = false) {
  let addButtonContainer = document.getElementById(
    `add_btn_container_${index}`,
  );

  if (addButtonContainer === null) {
    return;
  }

  addButtonContainer.innerHTML = getAddButtonTemplate(index, shouldAnimate);
}

/** update add button after product added to basket */
function updateAddButtonAfterAdd(index, amountBefore) {
  if (amountBefore === 0) {
    renderAddButton(index, true);

    setTimeout(() => {
      renderAddButton(index);
    }, 400);
  } else {
    renderAddButton(index);
  }
}

/** render all add buttons after basket reset */
function renderAllAddButtons() {
  for (let index = 0; index < products.length; index++) {
    renderAddButton(index);
  }
}

/** render only mobile cart counter */
function renderMobileCartCounter() {
  let counterContainerRef = document.getElementById(
    "mobile_cart_counter_container",
  );

  if (counterContainerRef === null) {
    return;
  }

  counterContainerRef.innerHTML = getMobileCartCounterTemplate();
}

/** ind product index using one basket item */
function getProductIndexFromBasketItem(index) {
  return products.findIndex((product) => {
    return product.name === basket[index].name;
  });
}

/** close mobilie basket dialog when viewport changes to dekstop */
function closeMobileBasketOnDesktop() {
  let mobileBasketDialog = document.getElementById("mobile_basket_dialog");

  if (window.innerWidth > 900 && mobileBasketDialog.open) {
    mobileBasketDialog.close();
  }
}

/** listen to viewport */
window.addEventListener("resize", closeMobileBasketOnDesktop);