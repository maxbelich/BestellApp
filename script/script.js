function init() {
  renderMain();
}

function renderMain() {
  const mainContentRef = document.getElementById("main_content");

  mainContentRef.innerHTML = getMainTemplate();

  renderHeader();
  renderHero();
  renderMenu();
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