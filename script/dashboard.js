document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const gridViewBtn = document.getElementById("gridViewBtn");
  const listViewBtn = document.getElementById("listViewBtn");
  const gridView = document.getElementById("gridView");
  const listView = document.getElementById("listView");
  const searchInput = document.getElementById("searchCourseOverview");
  const sortButton = document.querySelector(".relative button");
  const tabButtons = document.querySelectorAll(".tab-button");

  // State variables
  let currentView = 'grid';
  let currentSort = 'default'; // 'default', 'asc', 'desc'
  let currentTab = 'all';
  let currentSearch = '';

  // Initialize
  setupEventListeners();
  updateView();

  function setupEventListeners() {
      // View toggle
      gridViewBtn.addEventListener('click', () => {
          currentView = 'grid';
          updateView();
      });

      listViewBtn.addEventListener('click', () => {
          currentView = 'list';
          updateView();
      });

      // Search
      searchInput.addEventListener('input', (e) => {
          currentSearch = e.target.value.toLowerCase();
          filterCourses();
      });

      // Sort
      sortButton.addEventListener('click', () => {
          if (currentSort === 'default') currentSort = 'asc';
          else if (currentSort === 'asc') currentSort = 'desc';
          else currentSort = 'default';
          updateSortButton();
          filterCourses();
      });

      // Tabs
      tabButtons.forEach(button => {
          button.addEventListener('click', () => {
              currentTab = button.getAttribute('data-tab');
              updateTabs();
              filterCourses();
          });
      });
  }

  function updateView() {
      if (currentView === 'grid') {
          gridView.classList.remove('hidden');
          listView.classList.add('hidden');
          gridViewBtn.classList.add('bg-[#FBD1D3]', 'text-[#ED1B24]', 'border-[#F4767B]');
          gridViewBtn.classList.remove('bg-white', 'text-[#626262]', 'border-[#B0B0B0]');
          listViewBtn.classList.add('bg-white', 'text-[#626262]', 'border-[#B0B0B0]');
          listViewBtn.classList.remove('bg-[#FBD1D3]', 'text-[#ED1B24]', 'border-[#F4767B]');
      } else {
          gridView.classList.add('hidden');
          listView.classList.remove('hidden');
          listViewBtn.classList.add('bg-[#FBD1D3]', 'text-[#ED1B24]', 'border-[#F4767B]');
          listViewBtn.classList.remove('bg-white', 'text-[#626262]', 'border-[#B0B0B0]');
          gridViewBtn.classList.add('bg-white', 'text-[#626262]', 'border-[#B0B0B0]');
          gridViewBtn.classList.remove('bg-[#FBD1D3]', 'text-[#ED1B24]', 'border-[#F4767B]');
      }
      filterCourses();
  }

  function updateSortButton() {
      const icon = sortButton.querySelector('svg');
      sortButton.innerHTML = currentSort === 'asc' ? 'Sort by course name (A-Z)' :
          currentSort === 'desc' ? 'Sort by course name (Z-A)' :
              'Sort by course name';
      sortButton.appendChild(icon);
      icon.classList.toggle('rotate-180', currentSort === 'desc');
  }

  function updateTabs() {
      tabButtons.forEach(button => {
          if (button.getAttribute('data-tab') === currentTab) {
              button.classList.add('text-[#A12520]', 'border-b-2', 'border-[#A12520]');
              button.classList.remove('text-[#626262]');
          } else {
              button.classList.remove('text-[#A12520]', 'border-b-2', 'border-[#A12520]');
              button.classList.add('text-[#626262]');
          }
      });
  }

  function filterCourses() {
      const cards = document.querySelectorAll('.tab-content');
      const activeView = currentView === 'grid' ? gridView : listView;

      // Filter and sort
      const filteredCards = Array.from(cards)
          .filter(card => {
              // Tab filter
              const tabMatch = currentTab === 'all' || card.classList.contains(currentTab);

              // Search filter
              const title = card.querySelector('h3').textContent.toLowerCase();
              const searchMatch = currentSearch === '' || title.includes(currentSearch);

              return tabMatch && searchMatch;
          })
          .sort((a, b) => {
              if (currentSort === 'default') return 0;

              const titleA = a.querySelector('h3').textContent.toLowerCase();
              const titleB = b.querySelector('h3').textContent.toLowerCase();

              return currentSort === 'asc'
                  ? titleA.localeCompare(titleB)
                  : titleB.localeCompare(titleA);
          });

      // Hide all cards first
      cards.forEach(card => card.style.display = 'none');

      // Show filtered cards with correct display style
      filteredCards.forEach(card => {
          card.style.display = currentView === 'grid' ? 'block' : 'flex';

          // Ensure cards are in correct container
          if (currentView === 'grid' && card.parentNode !== gridView) {
              gridView.appendChild(card);
          } else if (currentView === 'list' && card.parentNode !== listView) {
              listView.appendChild(card);
          }
      });
  }

  // Initialize first tab as active
  if (tabButtons.length > 0) {
      tabButtons[0].click();
  }
});

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
