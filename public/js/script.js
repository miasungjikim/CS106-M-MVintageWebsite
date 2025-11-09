// SEARCH POPUP
const searchBtn = document.getElementById("searchBtn");
const searchPopup = document.getElementById("searchPopup");
const closeSearch = document.getElementById("closeSearch");

searchBtn.addEventListener("click", () => {
  searchPopup.style.display = "flex";
  document.getElementById("searchInput").focus();
});
closeSearch.addEventListener("click", () => {
  searchPopup.style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target === searchPopup) searchPopup.style.display = "none";
});

// USER PROFILE
document.getElementById("profileBtn").addEventListener("click", () => {
  window.location.href = "signin.html"; // change link to your actual sign-in page
});

// CART COUNTER
let cartCount = 0;
const cartCountDisplay = document.getElementById("cartCount");
const addCartButtons = document.querySelectorAll(".add-cart");

addCartButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    cartCount++;
    cartCountDisplay.textContent = cartCount;
  });
});
