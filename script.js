// contact us section start
const contactForm = document.getElementById('bbcntContactForm');
const popupOverlay = document.getElementById('bbcntSuccessPopup');
const closeBtn = document.getElementById('bbcntClosePopup');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    popupOverlay.classList.add('bbcnt-popup-active');
    contactForm.reset();
});

closeBtn.addEventListener('click', function () {
    popupOverlay.classList.remove('bbcnt-popup-active');
});

popupOverlay.addEventListener('click', function (e) {
    if (e.target === popupOverlay) {
        popupOverlay.classList.remove('bbcnt-popup-active');
    }
});
// contact us section end

// FAQs section start

document.querySelectorAll('.bb-faq-trigger-btn').forEach(button => {
    button.addEventListener('click', () => {
        const currentItem = button.parentElement;

        document.querySelectorAll('.bb-faq-accordion-item').forEach(item => {
            if (item !== currentItem) {
                item.classList.remove('bb-faq-active');
            }
        });

        currentItem.classList.toggle('bb-faq-active');
    });
});

// FAQs section end

// 

document.addEventListener("DOMContentLoaded", () => {
    let visits = localStorage.getItem("bakerz_visitor_count");
    if (visits === null) {
        visits = 1;
    } else {
        visits = parseInt(visits) + 1;
    }
    localStorage.setItem("bakerz_visitor_count", visits);
    document.getElementById("visitor-count").textContent = visits;
});

// visit count end

// geolocation start

document.addEventListener("DOMContentLoaded", () => {
    let locationData = "Detecting location...";

    // 1. Geolocation Access (Latitude, Longitude & City)
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude.toFixed(4);
                const lon = position.coords.longitude.toFixed(4);
                locationData = `Lat: ${lat}, Lon: ${lon}`;

                // City name ke liye OpenStreetMap Reverse Geocoding
                fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
                    .then(res => res.json())
                    .then(data => {
                        const city = data.address.city || data.address.town || data.address.village;
                        if (city) {
                            locationData = `${city} (${lat}, ${lon})`;
                        }
                        updateTicker();
                    })
                    .catch(() => updateTicker());
            },
            (error) => {
                locationData = "Location Access Denied";
                updateTicker();
            }
        );
    } else {
        locationData = "Geolocation Not Supported";
        updateTicker();
    }

    // 2. Continuous Date, Time & Location Text Updater
    function updateTicker() {
        const now = new Date();
        const dateStr = now.toLocaleDateString("en-US", {
            weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
        });
        const timeStr = now.toLocaleTimeString("en-US", {
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        });

        const tickerText = `📍 Location: ${locationData} | 📅 Date: ${dateStr} | 🕒 Time: ${timeStr} | 🧁 Welcome to Bakerz Bite — Where smiles are served daily!`;

        document.getElementById("continuous-ticker").textContent = tickerText;
    }

    // Har 1 second mein time update hoga
    setInterval(updateTicker, 1000);
    updateTicker();
});

// geolocation end






<script>
  function scrollToSection(sectionId, buttonElement) {
    // 1. Active class toggle (Gold highlight badalna)
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    buttonElement.classList.add('active');

    // 2. Smooth scroll target section tak
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      const navbarOffset = 85; // Fixed/Sticky header height
      const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }
</script>