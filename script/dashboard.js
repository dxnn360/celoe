const gridViewBtn = document.getElementById("gridViewBtn");
const listViewBtn = document.getElementById("listViewBtn");
const gridView = document.getElementById("gridView");
const listView = document.getElementById("listView");

gridViewBtn.addEventListener("click", () => {
  gridView.classList.remove("hidden");
  listView.classList.add("hidden");
  gridViewBtn.classList.add(
    "bg-[#FBD1D3]",
    "text-[#ED1B24]",
    "border-[#F4767B]"
  );
  gridViewBtn.classList.remove(
    "bg-white",
    "text-[#626262]",
    "border-[#B0B0B0]"
  );
  listViewBtn.classList.add("bg-white", "text-[#626262]", "border-[#B0B0B0]");
  listViewBtn.classList.remove(
    "bg-[#FBD1D3]",
    "text-[#ED1B24]",
    "border-[#F4767B]"
  );
});

listViewBtn.addEventListener("click", () => {
  gridView.classList.add("hidden");
  listView.classList.remove("hidden");
  listViewBtn.classList.add(
    "bg-[#FBD1D3]",
    "text-[#ED1B24]",
    "border-[#F4767B]"
  );
  listViewBtn.classList.remove(
    "bg-white",
    "text-[#626262]",
    "border-[#B0B0B0]"
  );
  gridViewBtn.classList.add("bg-white", "text-[#626262]", "border-[#B0B0B0]");
  gridViewBtn.classList.remove(
    "bg-[#FBD1D3]",
    "text-[#ED1B24]",
    "border-[#F4767B]"
  );
});

// Tab Functionality
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

    // Show/hide relevant content
    const tabName = button.getAttribute("data-tab");
    tabContents.forEach((content) => {
      if (tabName === "all" || content.classList.contains(tabName)) {
        content.style.display = "";
      } else {
        content.style.display = "none";
      }
    });
  });
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
