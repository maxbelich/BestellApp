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

  menuContentRef.innerHTML = `
    ${getCategoryTemplate()}
    ${getProductCardTemplate()}
  `;
}