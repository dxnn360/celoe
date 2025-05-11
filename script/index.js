//Animasi Bagian Statistik Kampus.
class StatsDesign {
    constructor() {
        // Wait for DOM to be ready
        document.addEventListener('DOMContentLoaded', () => {
            this.stats = document.querySelector(".gradient-bg");
            if (!this.stats) {
                console.error("Stats element not found");
                return;
            }
            this.counterAnimation = this.counterAnimation.bind(this);
            this.numbersLoadedDuringScroll = false;
            this.initializeEventListeners();
            this.handleScroll();
        });
    }

    initializeEventListeners() {
        window.addEventListener("load", this.handleScroll.bind(this));
        window.addEventListener("scroll", this.handleScroll.bind(this));
    }

    handleScroll() {
        let rect = this.stats.getBoundingClientRect();
        let isVisible = rect.top < 0.8 * window.innerHeight && rect.bottom > 0.2 * window.innerHeight;

        if (isVisible && !this.numbersLoadedDuringScroll) {
            this.counterAnimation();
            this.numbersLoadedDuringScroll = true;
            window.removeEventListener("scroll", this.handleScroll);
        }
    }

    counterAnimation() {
        this.stats.querySelectorAll(".gradient-text").forEach(element => {
            this.startCounterAnimation(element);
        });
    }

    startCounterAnimation(element) {
        let text = element.textContent;
        let prefix = "";
        let suffix = "";
        let numberStr = "";
        let i;

        // Extract prefix (non-numeric characters at start)
        for (i = 0; i < text.length && isNaN(text[i]); i++) {
            prefix += text[i];
        }

        // Extract suffix (non-numeric characters at end)
        for (i = text.length - 1; i >= 0 && isNaN(text[i]); i--) {
            suffix = text[i] + suffix;
        }

        // Extract numeric part
        numberStr = text.slice(prefix.length, text.length - suffix.length);
        let target = parseInt(numberStr);
        let increment = target / 100;
        let current = 0;

        let timer = setInterval(() => {
            current += increment;
            element.textContent = prefix + Math.round(current) + suffix;

            if (current >= target) {
                clearInterval(timer);
                element.textContent = prefix + target + suffix;
            }
        }, 10);
    }
}

let statsDesign = new StatsDesign();


// JS bagian bahasa
function setLanguage(language, code) {
  document.getElementById("selected-language").textContent = language;
  console.log(`Language changed to: ${language} (${code})`);
}



// JS Carousel di paling atas
let currentSlide = 1;

function showSlide(slide) {
  for (let i = 1; i <= 2; i++) {
    document.getElementById(`slide${i}`).classList.add("opacity-0");
    document.getElementById(`slide${i}`).classList.remove("opacity-100");
  }
  document.getElementById(`slide${slide}`).classList.remove("opacity-0");
  document.getElementById(`slide${slide}`).classList.add("opacity-100");
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

//Navigation bar
 document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

document.getElementById('close-mobile-menu').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Language selector function
function setLanguage(language, code) {
    document.getElementById("selected-language").textContent = language + ' (' + code + ')';
}


// Animasi bagian kampus yang berputar
document.addEventListener("DOMContentLoaded", function () {
  
    class TestimonialSlider {
    constructor() {
      this.container = document.getElementById("testimonial-slider");
      this.slides = this.container.querySelectorAll(".card-slider .slide");
      this.indicators = this.container.querySelectorAll(
        ".indicators .indicator-btn"
      );
      this.itemDots = this.container.querySelectorAll(".itemDot");
      this.currentIndex = 0;

      this.init();
    }

    init() {
      // Set up event listeners
      this.slides.forEach((slide) => {
        slide.addEventListener("click", () =>
          this.goToSlide(parseInt(slide.dataset.index))
        );
      });

      this.indicators.forEach((indicator) => {
        indicator.addEventListener("click", () =>
          this.goToSlide(parseInt(indicator.dataset.index))
        );
      });

      // Initialize first slide
      this.updateSlider();
    }

    goToSlide(newIndex) {
      this.currentIndex = newIndex;
      this.updateSlider();
    }

    updateSlider() {
      // Update slides
      this.slides.forEach((slide, index) => {
        if (index === this.currentIndex) {
          slide.classList.add("active");
          slide.classList.add("shadow-lg", "shadow-purple-200");
        } else {
          slide.classList.remove("active");
          slide.classList.remove("shadow-lg", "shadow-purple-200");
        }
      });

      // Update indicators
      this.indicators.forEach((indicator, index) => {
        if (index === this.currentIndex) {
          indicator.classList.add("bg-indigo-900");
          indicator.classList.remove("bg-gray-300");
        } else {
          indicator.classList.remove("bg-indigo-900");
          indicator.classList.add("bg-gray-300");
        }
      });

      // Update images
      this.itemDots.forEach((dot, index) => {
        if (index === this.currentIndex) {
          dot.classList.add("active");
          dot.style.width = "373px";
          dot.style.height = "240px";
          dot
            .querySelector("img")
            .classList.add("object-contain", "filter", "drop-shadow-lg");
          dot.querySelector("img").classList.remove("object-cover");
        } else {
          dot.classList.remove("active");
          dot.style.width = "220px";
          dot.style.height = "124px";
          dot.querySelector("img").classList.add("object-cover");
          dot
            .querySelector("img")
            .classList.remove("object-contain", "filter", "drop-shadow-lg");
        }

        // Update positions based on current index
        this.updateDotPosition(dot, index);
      });
    }

    updateDotPosition(dot, index) {
      const totalSlides = this.slides.length;
      const angle = (360 / totalSlides) * (index - this.currentIndex);
      const radius = 200; // Adjust this value to change the circle size

      // Calculate new position
      const x = radius * Math.cos((angle * Math.PI) / 180);
      const y = radius * Math.sin((angle * Math.PI) / 180);

      if (index === this.currentIndex) {
        // Center the active slide
        dot.style.transform = "translate(50%, -50%)";
        dot.style.right = "0";
        dot.style.top = "50%";
      } else {
        // Position other slides around the circle
        dot.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        dot.style.left = "50%";
        dot.style.top = "50%";
      }

      // Add transition for smooth movement
      dot.style.transition = "all 0.5s ease";
    }
  }

  // Initialize the slider
  new TestimonialSlider();
});
