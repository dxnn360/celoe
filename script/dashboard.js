/**
 * COURSE VIEW TOGGLE FUNCTIONALITY
 * Handles switching between grid and list views
 */
const gridViewBtn = document.getElementById("gridViewBtn");
const listViewBtn = document.getElementById("listViewBtn");
const gridView = document.getElementById("gridView");
const listView = document.getElementById("listView");

// Switch to Grid View
gridViewBtn.addEventListener("click", () => {
  // Toggle view visibility
  gridView.classList.remove("hidden");
  listView.classList.add("hidden");
  
  // Update button styles
  gridViewBtn.classList.add("bg-[#FBD1D3]", "text-[#ED1B24]", "border-[#F4767B]");
  gridViewBtn.classList.remove("bg-white", "text-[#626262]", "border-[#B0B0B0]");
  
  listViewBtn.classList.add("bg-white", "text-[#626262]", "border-[#B0B0B0]");
  listViewBtn.classList.remove("bg-[#FBD1D3]", "text-[#ED1B24]", "border-[#F4767B]");
});

// Switch to List View
listViewBtn.addEventListener("click", () => {
  // Toggle view visibility
  gridView.classList.add("hidden");
  listView.classList.remove("hidden");
  
  // Update button styles
  listViewBtn.classList.add("bg-[#FBD1D3]", "text-[#ED1B24]", "border-[#F4767B]");
  listViewBtn.classList.remove("bg-white", "text-[#626262]", "border-[#B0B0B0]");
  
  gridViewBtn.classList.add("bg-white", "text-[#626262]", "border-[#B0B0B0]");
  gridViewBtn.classList.remove("bg-[#FBD1D3]", "text-[#ED1B24]", "border-[#F4767B]");
});

/**
 * TAB FUNCTIONALITY
 * Handles course filtering by tabs (All, In Progress, Future, etc.)
 */
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Update active tab styling
    tabButtons.forEach((btn) => {
      btn.classList.remove("text-[#A12520]", "border-b-2", "border-[#A12520]");
      btn.classList.add("text-[#626262]");
    });
    
    button.classList.add("text-[#A12520]", "border-b-2", "border-[#A12520]");
    button.classList.remove("text-[#626262]");

    // Filter content based on selected tab
    const tabName = button.getAttribute("data-tab");
    tabContents.forEach((content) => {
      if (tabName === "all" || content.classList.contains(tabName)) {
        content.style.display = ""; // Show matching content
      } else {
        content.style.display = "none"; // Hide non-matching content
      }
    });
  });
});

/**
 * SEARCH FUNCTIONALITY - WORKS FOR BOTH GRID AND LIST VIEWS
 * Filters courses based on search input in both view modes
 */
function setupSearch() {
  const searchInput = document.getElementById('searchCourse');
  
  if (!searchInput) return;

  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.trim().toLowerCase();
    const cards = document.getElementsByClassName('tab-content');
    
    cards.forEach(card => {
      // Find the course title element - works for both grid and list views
      const titleElement = card.querySelector('h3');
      if (!titleElement) return;
      
      const cardTitle = titleElement.textContent.toLowerCase();
      const isMatch = cardTitle.includes(searchTerm);
      
      // Show/hide based on search match - works for both views
      if (gridView.classList.contains('hidden')) {
        // List view specific handling
        card.style.display = isMatch ? 'flex' : 'none';
      } else {
        // Grid view specific handling
        card.style.display = isMatch ? 'block' : 'none';
      }
    });
  });
}

/**
 * MOBILE MENU FUNCTIONALITY
 * Handles mobile menu toggle
 */
function setupMobileMenu() {
  const popup = document.getElementById("popup-modal");
  const closeButton = document.getElementById("close-popup");
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const leftMenu = document.getElementById("leftMenu");
  const closeMenu = document.getElementById("closeMenu");

  // Close popup modal
  if (closeButton && popup) {
    closeButton.addEventListener("click", () => popup.classList.add("hidden"));
  }

  // Toggle mobile menu
  if (hamburgerBtn && leftMenu) {
    hamburgerBtn.addEventListener("click", () => leftMenu.classList.toggle("hidden"));
  }

  // Close mobile menu
  if (closeMenu && leftMenu) {
    closeMenu.addEventListener("click", () => leftMenu.classList.add("hidden"));
  }
}

/**
 * INITIALIZATION
 * Runs when DOM is fully loaded
 */
document.addEventListener("DOMContentLoaded", function() {
  // Set default tab to 'All'
  const defaultTab = document.querySelector('.tab-button[data-tab="all"]');
  if (defaultTab) defaultTab.click();
  
  // Initialize all functionality
  setupSearch();
  setupMobileMenu();
  
  // Mobile tab selection (if exists)
  const mobileTabSelect = document.getElementById('mobileTabSelect');
  if (mobileTabSelect) {
    mobileTabSelect.addEventListener('change', function() {
      const tabName = this.value;
      const correspondingButton = document.querySelector(`.tab-button[data-tab="${tabName}"]`);
      if (correspondingButton) correspondingButton.click();
    });
  }
});