function init() {
  renderMain();
}

function renderMain() {
  const mainContentRef = document.getElementById("main_content");

  mainContentRef.innerHTML = getMainTemplate();

  renderHeader();
  renderHero();
  renderMenu();
  renderBasket();
}

function renderHeader() {
  const headerRef = document.getElementById("header");

  headerRef.innerHTML = getHeaderTemplate();
}

function renderHero() {
  const heroRef = document.getElementById("hero");

  heroRef.innerHTML = getHeroTemplate();
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

  renderBasket();
}

function renderBasketItems() {
  let basketItemsRef = document.getElementById("basket_items");
  basketItemsRef.innerHTML = "";
  for (let index = 0; index < basket.length; index++) {
    basketItemsRef.innerHTML += getBasketItemTemplate(index);
  }
}