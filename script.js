// MENU SEARCH / FILTER / SORT
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");
const sortSelect = document.getElementById("sortSelect");
const cards = document.querySelectorAll(".menu-card");

function applyFilters() {
  const query = searchInput?.value.toLowerCase() || "";
  const filterValue = filterSelect?.value || "all";
  const cardsArray = Array.from(cards);

  cardsArray.forEach(card => {
    const title = card.querySelector(".menu-card-title").textContent.toLowerCase();
    const desc = card.querySelector(".menu-card-desc").textContent.toLowerCase();
    const price = card.querySelector(".menu-card-price").textContent.toLowerCase();

    const matchesSearch = title.includes(query) || desc.includes(query) || price.includes(query);
    const matchesFilter = filterValue === "all" || title.includes(filterValue);

    card.style.display = matchesSearch && matchesFilter ? "block" : "none";
  });

  const grid = document.querySelector(".menu-grid");
  const visibleCards = cardsArray.filter(card => card.style.display === "block");

  visibleCards.sort((a, b) => {
    const priceA = parseFloat(a.querySelector(".menu-card-price").textContent.replace("R", ""));
    const priceB = parseFloat(b.querySelector(".menu-card-price").textContent.replace("R", ""));

    if (sortSelect?.value === "low-to-high") return priceA - priceB;
    if (sortSelect?.value === "high-to-low") return priceB - priceA;
    return 0;
  });

  visibleCards.forEach(card => grid.appendChild(card));
}

searchInput?.addEventListener("input", applyFilters);
filterSelect?.addEventListener("change", applyFilters);
sortSelect?.addEventListener("change", applyFilters);

// RESPONSIVE NAVBAR
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle?.addEventListener("click", () => {
  navLinks?.classList.toggle("active");
});

navLinks?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});


// Contact Form Animation + Submission
const contactForm = document.querySelector('.contact-form');
const form = contactForm;

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      form.style.animationPlayState = 'running';
      observer.unobserve(form); // run once
    }
  });
}, {
  threshold: 0.4
});

if (form) {
  observer.observe(form);
}

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  window.location.href = 'thankyou.html';
});
