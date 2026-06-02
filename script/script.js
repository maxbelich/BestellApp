function init() {
  renderMain();
}

function renderMain() {
  const mainContentRef = document.getElementById("main_content");

  mainContentRef.innerHTML = getMainTemplate();

  loadBasket();
  renderHeader();
  renderHero();
  renderMenu();
  renderBasket();
  renderFooter();
}

function renderHeader() {
  const headerRef = document.getElementById("header");

  headerRef.innerHTML = getHeaderTemplate();
}

function renderHero() {
  const heroRef = document.getElementById("hero");

  heroRef.innerHTML = getHeroTemplate();
}

function renderFooter() {
  let footerRef = document.getElementById("footer");
  footerRef.innerHTML = getFooterTemplate();
}

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

function renderProductsByCategory(categoryIndex) {
  let menuContentRef = document.getElementById("menu_content");
  for (let productIndex = 0; productIndex < products.length; productIndex++) {
    if (products[productIndex].category === categories[categoryIndex].key) {
      menuContentRef.innerHTML += getProductCardTemplate(productIndex);
    }
  }
}

function renderBasket() {
  let basketContentRef = document.getElementById("basket_content");
  basketContentRef.innerHTML = getBasketTemplate();
  renderBasketItems();
}

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
  } else {
    basket[basketIndex].amount++;
  }

  saveBasket();
  renderBasket();
  renderMenu();
}

function renderBasketItems() {
  let basketItemsRef = document.getElementById("basket_items");
  basketItemsRef.innerHTML = "";
  if (basket.length === 0) {
    basketItemsRef.innerHTML = getEmptyBasketTemplate();
    return;
  }
  for (let index = 0; index < basket.length; index++) {
    basketItemsRef.innerHTML += getBasketItemTemplate(index);
  }
}

function increaseAmount(index) {
  basket[index].amount++;

  saveBasket();
  renderBasket();
  renderMenu();
}

function decreaseAmount(index) {
  basket[index].amount--;

  if (basket[index].amount <= 0) {
    basket.splice(index, 1);
  }

  saveBasket();
  renderBasket();
  renderMenu();
}

function removeItem(index) {
  basket.splice(index, 1);

  saveBasket();
  renderBasket();
  renderMenu();
}

function calculateSubtotal() {
  let subtotal = 0;
  for (let index = 0; index < basket.length; index++) {
    subtotal += basket[index].price * basket[index].amount;
  }
  return subtotal;
}

function getDeliveryFee() {
  if (basket.length === 0) {
    return 4.99;
  }

  if (calculateSubtotal() >= 50) {
    return 0;
  }

  return 4.99;
}

function calculateTotal() {
  return calculateSubtotal() + getDeliveryFee();
}

function saveBasket() {
  localStorage.setItem("basket", JSON.stringify(basket));
}

function loadBasket() {
  let storedBasket = localStorage.getItem("basket");

  if (storedBasket) {
    basket = JSON.parse(storedBasket);
  }
}

function confirmOrder() {
  let orderDialogRef = document.getElementById("order_dialog");
  orderDialogRef.innerHTML = getOrderDialogTemplate();
  orderDialogRef.showModal();
  basket = [];
  saveBasket();
  renderBasket();
  renderMenu();
  setTimeout(closeOrderDialog, 2000);
}

function closeOrderDialog() {
  let orderDialogRef = document.getElementById("order_dialog");
  orderDialogRef.close();
}

function getProductAmountInBasket(index) {
  let basketIndex = basket.findIndex(
    (item) => item.name === products[index].name,
  );
  if (basketIndex === -1) {
    return 0;
  }
  return basket[basketIndex].amount;
}