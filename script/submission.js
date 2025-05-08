function toggleAccordion(id, button) {
    const element = document.getElementById(id);
    const icon = button.querySelector('svg');
    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    if (isExpanded) {
        // Close accordion
        element.style.height = `${element.scrollHeight}px`;
        // Trigger reflow
        void element.offsetHeight;
        element.style.height = '0px';
    } else {
        // Open accordion
        element.style.height = `${element.scrollHeight}px`;
        // After transition completes, set to auto
        setTimeout(() => {
            if (element.style.height !== '0px') {
                element.style.height = 'auto';
            }
        }, 300);
    }

    // Toggle icon and aria-expanded
    icon.classList.toggle('rotate-180');
    button.setAttribute('aria-expanded', !isExpanded);
}

// Modal functions
function openUploadModal() {
    document.getElementById('uploadModal').classList.remove('hidden');
}

function closeUploadModal() {
    document.getElementById('uploadModal').classList.add('hidden');
    resetUploadModal();
}

function resetUploadModal() {
    document.getElementById('uploadArea').classList.remove('hidden');
    document.getElementById('fileDetails').classList.add('hidden');
    document.getElementById('fileInput').value = '';
}

// File handling
function handleFileSelect() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        document.getElementById('fileName').textContent = file.name;
        document.getElementById('saveAs').value = file.name;
        document.getElementById('uploadArea').classList.add('hidden');
        document.getElementById('fileDetails').classList.remove('hidden');
    }
}

// Upload function
function uploadFile() {
    // Update status indicators
    document.getElementById('todoStatus').innerHTML = `
<i class="fa fa-check text-[#145523] text-sm font-bold mr-1"></i>
Done : <span class="text-[#145523] font-normal ml-1"> Make a submission</span>
`;
    document.getElementById('todoStatus').classList.remove('bg-[#E5EAF4]', 'text-black');
    document.getElementById('todoStatus').classList.add('bg-[#CEE7D6]', 'text-[#145523]');

    document.getElementById('submissionStatus').textContent = 'Submitted for grading';
    document.getElementById('submissionStatus').classList.add('text-[#145523]', 'font-medium', 'bg-[#D0EFCF]');

    document.getElementById('timeRemaining').textContent = '12 hours 16 minutes';
    document.getElementById('timeRemaining').classList.add('text-[#145523]', 'font-medium', 'bg-[#D0EFCF]');

    const fileName = document.getElementById('saveAs').value || document.getElementById('fileName').textContent;
    document.getElementById('lastModified').textContent = fileName;
    document.getElementById('lastModified').classList.add('text-[#ED1B24]', 'font-medium');
    document.getElementById('lastModified').innerHTML = `
        <img src="/images/submission/pdf.svg" class="inline-block w-4 h-4 mr-2" alt="PDF Icon">
        ${fileName}
    `;

    // Replace "Add Submission" button with Edit and Remove buttons
    const actionButtons = document.getElementById('actionButtons');
    actionButtons.innerHTML = `
<button onclick="removeSubmission()" class="bg-white font-extrabold border border-[#A12520] text-sm mt-2 text-[#A12520] px-3 py-1 rounded-sm hover:bg-gray-600 transition duration-300 mr-4">
    Remove Submission
</button>
<button onclick="editSubmission()" class="bg-[#A12520] font-extrabold text-sm mt-2 text-white px-3 py-1 rounded-sm hover:bg-[#8B1E1C] transition duration-300">
    Edit Submission
</button>
`;

    closeUploadModal();
    alert('File uploaded successfully!');
}

// Remove Submission function
function removeSubmission() {
    // Reset all status indicators
    document.getElementById('todoStatus').innerHTML = `To Do :<span class="font-normal ml-1"> Make a submission</span>`;
    document.getElementById('todoStatus').classList.remove('bg-[#CEE7D6]', 'text-[#145523]');
    document.getElementById('todoStatus').classList.add('bg-[#E5EAF4]', 'text-black');

    document.getElementById('submissionStatus').textContent = 'No submission yet';
    document.getElementById('submissionStatus').classList.remove('text-[#145523]', 'font-medium', 'bg-green-300');

    document.getElementById('timeRemaining').textContent = '4 days 16 hours';
    document.getElementById('timeRemaining').classList.remove('text-[#145523]', 'font-medium', 'bg-green-300');

    document.getElementById('lastModified').textContent = '-';
    document.getElementById('lastModified').classList.remove('text-[#145523]', 'font-medium');

    // Restore original "Add Submission" button
    const actionButtons = document.getElementById('actionButtons');
    actionButtons.innerHTML = `
<button onclick="openUploadModal()" class="bg-[#A12520] font-extrabold text-sm mt-2 text-white px-4 py-2 rounded-sm hover:bg-[#8B1E1C] transition duration-300">
    Add Submission
</button>
`;
}

// Edit Submission function
function editSubmission() {
    openUploadModal();
    // Here you would typically pre-fill the form with the existing submission data
    // For demo purposes, we'll just open the modal
}
// Drag and drop functionality
const uploadArea = document.getElementById('uploadArea');

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    uploadArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    uploadArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    uploadArea.addEventListener(eventName, unhighlight, false);
});

function highlight() {
    uploadArea.classList.add('border-[#A12520]', 'bg-gray-50');
}

function unhighlight() {
    uploadArea.classList.remove('border-[#A12520]', 'bg-gray-50');
}

uploadArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    document.getElementById('fileInput').files = files;
    handleFileSelect();
}

// Handle transition end to prevent glitches
document.querySelectorAll('[id^="collapse"]').forEach(panel => {
    panel.addEventListener('transitionend', function () {
        if (this.style.height !== '0px' && this.style.height !== 'auto') {
            this.style.height = 'auto';
        }
    });
});

// Popup functionality
document.addEventListener('DOMContentLoaded', function () {
    const popup = document.getElementById('popup-modal');
    const closeButton = document.getElementById('close-popup');

    if (closeButton) {
        closeButton.addEventListener('click', function () {
            popup.classList.add('hidden');
        });
    }

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