

const menuIcon = document.querySelector(".icone-menu");
const menu = document.querySelector(".menu");

menuIcon.addEventListener("click", () => {
  menu.classList.toggle("open");
});

const closeMenuLink = document.querySelector(".fecha-menu");

closeMenuLink.addEventListener("click", () => {
  const menu = document.querySelector(".menu");
  menu.classList.remove("open");
});

const menuItems = document.querySelectorAll(".menu ul li a:not(.fechar-menu)");

menuItems.forEach(item => {
  item.addEventListener("click", () => {
    alert("Essa funcionalidade não está disponível no momento.");
  });
});
