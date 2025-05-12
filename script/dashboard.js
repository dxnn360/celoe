document.addEventListener('DOMContentLoaded', function() {
  // View Toggle Functionality
  const gridViewBtn = document.getElementById("gridViewBtn");
  const listViewBtn = document.getElementById("listViewBtn");
  const gridView = document.getElementById("gridView");
  const listView = document.getElementById("listView");
  let currentView = 'grid'; // Track current view state

  // Tab Functionality
  const tabButtons = document.querySelectorAll(".tab-button");
  let currentTab = 'all';

  // Search and Sort Functionality
  const searchInput = document.getElementById('searchCourse');
  const sortButton = document.getElementById('sortButton');
  const sortIcon = document.getElementById('sortIcon');
  let currentSort = 'default'; // 'default', 'name-asc', 'name-desc'

  // Initialize
  toggleView(currentView);
  setupTabs();
  setupSearchAndSort();

  function toggleView(viewType) {
      currentView = viewType;
      if (viewType === 'grid') {
          gridView.classList.remove("hidden");
          listView.classList.add("hidden");
          gridViewBtn.classList.add("bg-[#FBD1D3]", "text-[#ED1B24]", "border-[#F4767B]");
          gridViewBtn.classList.remove("bg-white", "text-[#626262]", "border-[#B0B0B0]");
          listViewBtn.classList.add("bg-white", "text-[#626262]", "border-[#B0B0B0]");
          listViewBtn.classList.remove("bg-[#FBD1D3]", "text-[#ED1B24]", "border-[#F4767B]");
      } else {
          gridView.classList.add("hidden");
          listView.classList.remove("hidden");
          listViewBtn.classList.add("bg-[#FBD1D3]", "text-[#ED1B24]", "border-[#F4767B]");
          listViewBtn.classList.remove("bg-white", "text-[#626262]", "border-[#B0B0B0]");
          gridViewBtn.classList.add("bg-white", "text-[#626262]", "border-[#B0B0B0]");
          gridViewBtn.classList.remove("bg-[#FBD1D3]", "text-[#ED1B24]", "border-[#F4767B]");
      }
      filterAndSortCourses();
  }

  function setupTabs() {
      tabButtons.forEach((button) => {
          button.addEventListener("click", () => {
              // Update active tab styling
              tabButtons.forEach((btn) => {
                  btn.classList.remove("text-[#A12520]", "border-b-2", "border-[#A12520]");
                  btn.classList.add("text-[#626262]");
              });
              button.classList.add("text-[#A12520]", "border-b-2", "border-[#A12520]");
              button.classList.remove("text-[#626262]");

              // Update current tab
              currentTab = button.getAttribute('data-tab');
              filterAndSortCourses();
          });
      });
  }

  function setupSearchAndSort() {
      // Search functionality
      searchInput.addEventListener('input', function() {
          filterAndSortCourses();
      });

      // Sort functionality
      sortButton.addEventListener('click', function() {
          // Toggle sort options
          if (currentSort === 'default') {
              currentSort = 'name-asc';
          } else if (currentSort === 'name-asc') {
              currentSort = 'name-desc';
          } else {
              currentSort = 'default';
          }
          updateSortButton();
          filterAndSortCourses();
      });
  }

  function updateSortButton() {
      switch(currentSort) {
          case 'name-asc':
              sortButton.innerHTML = 'Sort by course name (A-Z)';
              sortButton.appendChild(sortIcon);
              sortIcon.classList.remove('rotate-180');
              break;
          case 'name-desc':
              sortButton.innerHTML = 'Sort by course name (Z-A)';
              sortButton.appendChild(sortIcon);
              sortIcon.classList.add('rotate-180');
              break;
          default:
              sortButton.innerHTML = 'Sort by course name';
              sortButton.appendChild(sortIcon);
              sortIcon.classList.remove('rotate-180');
      }
  }

  function filterAndSortCourses() {
      const searchTerm = searchInput.value.trim().toLowerCase();
      const cards = document.querySelectorAll('.tab-content');

      // Filter cards based on tab and search term
      const filteredCards = Array.from(cards).filter(card => {
          // Filter by tab
          const tabMatch = currentTab === 'all' || card.classList.contains(currentTab);
          
          // Filter by search term
          const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
          const searchMatch = searchTerm === '' || title.includes(searchTerm);
          
          return tabMatch && searchMatch;
      });

      // Sort cards
      const sortedCards = [...filteredCards].sort((a, b) => {
          const titleA = a.querySelector('h3')?.textContent.toLowerCase() || '';
          const titleB = b.querySelector('h3')?.textContent.toLowerCase() || '';
          
          switch(currentSort) {
              case 'name-asc':
                  return titleA.localeCompare(titleB);
              case 'name-desc':
                  return titleB.localeCompare(titleA);
              default:
                  return 0;
          }
      });

      // Hide all cards first
      cards.forEach(card => {
          card.style.display = 'none';
      });

      // Show filtered and sorted cards with appropriate display style
      sortedCards.forEach(card => {
          card.style.display = currentView === 'grid' ? 'block' : 'flex';
      });

      // If in grid view, we need to re-append to maintain grid order
      if (currentView === 'grid') {
          const gridContainer = document.getElementById('gridView');
          sortedCards.forEach(card => {
              if (card.parentNode === gridContainer) {
                  gridContainer.appendChild(card);
              }
          });
      }
  }

  // Set first tab as active by default
  if (tabButtons.length > 0) {
      tabButtons[0].click();
  }
});

// Popup functionality
document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("popup-modal");
  const closeButton = document.getElementById("close-popup");

  closeButton.addEventListener("click", function () {
    popup.classList.add("hidden");
  });

  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const leftMenu = document.getElementById("leftMenu");

  if (hamburgerBtn && leftMenu) {
    hamburgerBtn.addEventListener("click", function () {
      leftMenu.classList.toggle("hidden");
    });
  }

  let closeMenu = document.getElementById("closeMenu");
  if (closeMenu) {
    closeMenu.addEventListener("click", function () {
      leftMenu.classList.add("hidden");
    });
  }
});
