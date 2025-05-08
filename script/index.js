function setLanguage(language, code) {
    document.getElementById('selected-language').textContent = language;
    console.log(`Language changed to: ${language} (${code})`);
}

let currentSlide = 1;

function showSlide(slide) {
    for (let i = 1; i <= 2; i++) {
        document.getElementById(`slide${i}`).classList.add('opacity-0');
        document.getElementById(`slide${i}`).classList.remove('opacity-100');
    }
    document.getElementById(`slide${slide}`).classList.remove('opacity-0');
    document.getElementById(`slide${slide}`).classList.add('opacity-100');
    currentSlide = slide;
}

function nextSlide() {
    const next = currentSlide === 2 ? 1 : currentSlide + 1;
    showSlide(next);
}

function prevSlide() {
    const prev = currentSlide === 1 ? 2 : currentSlide - 1;
    showSlide(prev);
}

setInterval(() => {
    nextSlide();
}, 5000);

function playVideo() {
    const container = document.querySelector('.video-container');
    if (container) {
        container.innerHTML = `
<iframe width="560" height="315"
  src="https://www.youtube.com/embed/LQAHPqdeLpk?autoplay=1&modestbranding=1&rel=0"
  frameborder="0"
  allow="autoplay; encrypted-media"
  allowfullscreen
  class="rounded-lg w-full aspect-video">
</iframe>
`;
    }
}
