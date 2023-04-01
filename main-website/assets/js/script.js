const HOME_URL = "./pages/home.html";
const NOT_FOUND_URL = "./pages/nofound.html";
const mainContent = document.querySelector("main");
const navLinks = document.querySelectorAll("nav a");

const loadContent = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const content = await response.text();
    mainContent.innerHTML = content;
  } catch (error) {
    console.error(`Error: ${error}`);
    if (error.message.includes("404")) {
      await loadContent(NOT_FOUND_URL);
    } else {
      mainContent.innerHTML = `<p>Unknown Error!</p>`;
    }
  }
};

const handleLinkClick = async (event) => {
  event.preventDefault();
  const link = event.target.closest("a");
  if (!link) return;
  await loadContent(link.href);
};

const init = async () => {
  try {
    await loadContent(HOME_URL);
    mainContent.addEventListener("click", handleLinkClick);
    navLinks.forEach((link) => link.addEventListener("click", handleLinkClick));
  } catch (error) {
    console.error(`Error: ${error}`);
    mainContent.innerHTML = `Unknown Error!`;
  }
};

window.addEventListener("DOMContentLoaded", init);