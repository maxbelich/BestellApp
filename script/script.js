function init() {
  renderMain();
}

function renderMain() {
  let mainContentRef = document.getElementById("main_content");

  mainContentRef.innerHTML = getMainTemplate();

  renderMenu();
  renderBasket();
}
