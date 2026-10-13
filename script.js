// ==================== 1. TESTIMONIALS & FEEDBACK CAROUSEL DATA ====================
const defaultTestimonials = [
    {
        name: "Sarah Khan",
        tag: "Verified Buyer • Custom Cakes",
        rating: 5,
        subject: "Best Cake in Karachi!",
        message: "The custom Belgian chocolate fudge cake for my birthday was unreal! Super moist, rich, and perfectly sweet. Everyone at the party asked for your location!",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
    },
    {
        name: "Ahmed Raza",
        tag: "Bread Enthusiast",
        rating: 5,
        subject: "Artisanal Sourdough Perfection",
        message: "You can literally taste the quality in their artisanal sourdough bread. Perfectly crispy crust on the outside, incredibly soft and airy inside.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    {
        name: "Mariam Tariq",
        tag: "Regular Customer",
        rating: 5,
        subject: "Heavenly Macarons & Cookies",
        message: "From their French macarons to chocolate chip cookies, everything looks like food art and tastes even better. Bakerz Bite is my go-to spot!",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
        name: "Zainab Ali",
        tag: "Verified Buyer • Pastries",
        rating: 5,
        subject: "Melt-in-mouth Croissants",
        message: "Their butter croissants are golden, flaky, and buttery perfection. Tastes just like a authentic Parisian bakery in the morning!",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
    },
    {
        name: "Bilal Sheikh",
        tag: "Event Organizer",
        rating: 5,
        subject: "Flawless Catering Delivery",
        message: "Ordered 50+ dessert boxes for our corporate event. The packaging, freshness, and delivery timing were 10/10. Highly recommended!",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
    },
    {
        name: "Hania Asif",
        tag: "Sweet Tooth Lover",
        rating: 5,
        subject: "Red Velvet Bliss!",
        message: "The Red Velvet Cream Cheese Cookies are addicting! Always fresh and soft. Bakerz Bite never disappoints.",
        avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80"
    }
];

// Helper to sanitize HTML input
function escapeHTML(str) {
    return (str || '').replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

// Function to render testimonials (User feedbacks FIRST, Dummy Data END)
window.renderTestimonials = function() {
    const container = document.getElementById('testimonialContainer');
    if (!container) return;

    let storedFeedbacks = [];
    try {
        storedFeedbacks = JSON.parse(localStorage.getItem('bakerz_feedbacks')) || [];
    } catch (err) {
        console.error("LocalStorage read error:", err);
    }

    const userFeedbacks = storedFeedbacks.slice().reverse().map(item => ({
        id: item.id,
        name: item.name,
        tag: `Verified Buyer • ${item.date || 'Recent'}`,
        rating: parseInt(item.rating) || 5,
        subject: item.subject || 'Customer Feedback',
        message: item.message,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=d4af37&color=23140c&bold=true&size=128`,
        isUser: true
    }));

    const combinedTestimonials = [...userFeedbacks, ...defaultTestimonials];

    container.innerHTML = combinedTestimonials.map(item => {
        const starCount = item.rating;
        const stars = '★'.repeat(starCount) + '☆'.repeat(5 - starCount);
        const avatarUrl = item.avatar;

        return `
            <div class="testimonial-card">
                <div class="testimonial-card-top">
                    <div class="stars">${stars}</div>
                    ${item.isUser ? `<button type="button" class="testimonial-delete-btn" onclick="deleteFeedback(${item.id})" title="Delete Feedback">&times;</button>` : ''}
                </div>

                <h3 class="testimonial-title">"${escapeHTML(item.subject)}"</h3>
                <p class="testimonial-text">"${escapeHTML(item.message)}"</p>

                <div class="author-container">
                    <img src="${avatarUrl}" alt="${escapeHTML(item.name)}" class="author-img" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=d4af37&color=23140c&bold=true'">
                    <div class="author-info">
                        <span class="author-name">${escapeHTML(item.name)}</span>
                        <span class="author-tag">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="#d4af37"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                            ${escapeHTML(item.tag)}
                        </span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
};

// Global Delete Function for User Feedbacks
window.deleteFeedback = function(id) {
    if (confirm("Are you sure you want to delete this feedback response?")) {
        try {
            let feedbacks = JSON.parse(localStorage.getItem('bakerz_feedbacks')) || [];
            feedbacks = feedbacks.filter(item => item.id !== id);
            localStorage.setItem('bakerz_feedbacks', JSON.stringify(feedbacks));
            window.renderTestimonials();
        } catch (err) {
            console.error("LocalStorage delete error:", err);
        }
    }
};

// ==================== 2. MAIN INITIALIZATION & CONTACT FORM ====================
document.addEventListener("DOMContentLoaded", () => {
    // Render Testimonials
    window.renderTestimonials();

    // Carousel Navigation Controls
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    const carouselContainer = document.getElementById('testimonialContainer');

    if (prevBtn && carouselContainer) {
        prevBtn.addEventListener('click', () => {
            carouselContainer.scrollBy({ left: -360, behavior: 'smooth' });
        });
    }

    if (nextBtn && carouselContainer) {
        nextBtn.addEventListener('click', () => {
            carouselContainer.scrollBy({ left: 360, behavior: 'smooth' });
        });
    }

    // Contact Form Submission
    const contactForm = document.getElementById('bbcntContactForm');
    const popupOverlay = document.getElementById('bbcntSuccessPopup');
    const closeBtn = document.getElementById('bbcntClosePopup');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const nameInput = document.getElementById('bbcntName');
            const emailInput = document.getElementById('bbcntEmail');
            const subjectInput = document.getElementById('bbcntSubject');
            const messageInput = document.getElementById('bbcntMessage');
            const ratingInput = contactForm.querySelector('input[name="rating"]:checked');

            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const subject = subjectInput ? subjectInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';
            const rating = ratingInput ? ratingInput.value : '0';

            // Validation 1: Name (Only letters & spaces allowed)
            const nameRegex = /^[A-Za-z\s]+$/;
            if (!nameRegex.test(name)) {
                alert("Please enter a valid name. Numbers and special characters are not allowed!");
                if (nameInput) nameInput.focus();
                return;
            }

            // Validation 2: Email (Valid email format)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Please enter a valid email address (e.g., user@example.com)!");
                if (emailInput) emailInput.focus();
                return;
            }

            // Validation 3: Star Rating
            if (rating === '0') {
                alert("Please select a star rating before submitting!");
                return;
            }

            // Create response object
            const newFeedback = {
                id: Date.now(),
                name: name,
                email: email,
                subject: subject,
                rating: rating,
                message: message,
                date: new Date().toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric', year: 'numeric'
                })
            };

            // Save to LocalStorage
            try {
                let feedbacksList = JSON.parse(localStorage.getItem('bakerz_feedbacks')) || [];
                feedbacksList.push(newFeedback);
                localStorage.setItem('bakerz_feedbacks', JSON.stringify(feedbacksList));
            } catch (err) {
                console.error("LocalStorage save error:", err);
            }

            // Re-render testimonials & show popup
            window.renderTestimonials();
            if (popupOverlay) popupOverlay.classList.add('bbcnt-popup-active');
            contactForm.reset();

            // Scroll carousel to top/first item
            if (carouselContainer) {
                carouselContainer.scrollTo({ left: 0, behavior: 'smooth' });
            }
        });
    }

    if (closeBtn && popupOverlay) {
        closeBtn.addEventListener('click', () => popupOverlay.classList.remove('bbcnt-popup-active'));
    }

    if (popupOverlay) {
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) popupOverlay.classList.remove('bbcnt-popup-active');
        });
    }
});

// ==================== 3. FAQS ACCORDION ====================
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

// ==================== 4. VISITOR COUNTER ====================
document.addEventListener("DOMContentLoaded", () => {
    try {
        let visits = localStorage.getItem("bakerz_visitor_count");
        if (visits === null) {
            visits = 1;
        } else {
            visits = parseInt(visits) + 1;
        }
        localStorage.setItem("bakerz_visitor_count", visits);
        const counterEl = document.getElementById("visitor-count");
        if (counterEl) {
            counterEl.textContent = visits;
        }
    } catch (e) {
        console.error("Visitor count error:", e);
    }
});

// ==================== 5. GEOLOCATION TICKER ====================
document.addEventListener("DOMContentLoaded", () => {
    let locationData = "Detecting location...";

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude.toFixed(4);
                const lon = position.coords.longitude.toFixed(4);
                locationData = `Lat: ${lat}, Lon: ${lon}`;

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
            () => {
                locationData = "Location Access Denied";
                updateTicker();
            }
        );
    } else {
        locationData = "Geolocation Not Supported";
        updateTicker();
    }

    function updateTicker() {
        const now = new Date();
        const dateStr = now.toLocaleDateString("en-US", {
            weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
        });
        const timeStr = now.toLocaleTimeString("en-US", {
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        });

        const tickerText = `📍 Location: ${locationData} | 📅 Date: ${dateStr} | 🕒 Time: ${timeStr} | 🧁 Welcome to Bakerz Bite — Where smiles are served daily!`;

        const tickerEl = document.getElementById("continuous-ticker");
        if (tickerEl) {
            tickerEl.textContent = tickerText;
        }
    }

    setInterval(updateTicker, 1000);
    updateTicker();
});

// ==================== 6. RECIPE DATABASE & UTILITIES ====================
const recipeDatabase = {
    "Butter Croissant": "<strong>ingredients:</strong> Flour , Butter , Milk , Sugar , Salt , Yeast , Egg",
    "CLASSIC Fruit & Custard Croissants": "<strong>ingredients:</strong> Milk , Egg Yolks , Sugar , Cornstarch , Vanilla Extract , Fresh Fruits , Aprikot Jam / Glaze",
    "CLASSIC CROSSIANT": "<strong>ingredients:</strong> Flour , Butter , Milk , Sugar , Salt , Yeast",
    "CHOCOLATE CROSSIANT": "<strong>ingredients:</strong> Flour , Butter , Chocolate , Milk , Sugar , Salt , Yeast , Egg",
    "ALMOND CROSSIANT": "<strong>ingredients:</strong> Almond Flour , Butter , Sugar , Egg , Sliced Almonds , Vanilla Extract , Icing Sugar",
    "CHEESE CROISSANT": "<strong>ingredients:</strong> Flour , Butter , Cheese , Milk , Sugar , Salt , Yeast , Egg",

    "PINEAPPLE PASTRY": "<strong>ingredients:</strong> Sponge Cake , Pineapple , Pineapple Syrup , Whipping Cream , Sugar , Cherry",
    "Mille-Feuille": "<strong>ingredients:</strong> Puff Pastry , Pastry Cream , Icing Sugar , Chocolate Ganache",
    "Fruit & Ganache Tarts": "<strong>ingredients:</strong> Tart Shell , Chocolate Ganache , Fresh Fruits , Apricot Jam / Glaze ",
    "CHOCOLATE FUDGE PASTRY": "<strong>ingredients:</strong> Chocolate Sponge , Homemade Fudge Frosting , Dark Chocolate Shavings",
    "BLACK FOREST PASTRY": "<strong>ingredients:</strong> Dark Cocoa Cake , Cherry Syrup , Whipped Cream , Sour Cherries",
    "THREE MILK PASTRY": "<strong>ingredients:</strong> Sponge Cake , Evaporated Milk , Condensed Milk , Heavy Cream",

    "CHOCOLATE CHIP COOKIES": "<strong>ingredients:</strong> Butter Cookie Dough , Milk Chocolate Chips , Sea Salt Flakes",
    "Molten Center Stuffed": "<strong>ingredients:</strong> Brown Butter Cookie Dough , Nutella / Cookie Butter",
    "Red Velvet Cream Cheese Cookie": "<strong>ingredients:</strong> Red Cocoa Cookie Dough , Cream Cheese Core",
    "LAYERS COOKIE": "<strong>ingredients:</strong> Double Chocolate Cookie Dough , Chocolate Chunks , Cocoa",
    "CATBURY COOKIE": "<strong>ingredients:</strong> Cookie Dough , Cadbury Dairy Milk Chocolate",
    "CHOCOLATTO": "<strong>ingredients:</strong> Dark Cocoa Biscuit , Chocolate Hazelnut Cream",

    "CHEESECAKE": "<strong>ingredients:</strong> Cream Cheese Filling , Graham Cracker Crust",
    "Handcrafted Truffles": "<strong>ingredients:</strong> Dark Chocolate Ganache , Cocoa Powder , Roasted Pistachios , Coconut Flakes",
    "Filled Bonbons": "<strong>ingredients:</strong> Dark Chocolate Shells , Salted Caramel / Passion Fruit Curd",
    "MACARON": "<strong>ingredients:</strong> Almond Flour , French Meringue Shells , Dark Chocolate Ganache",
    "CHURRO": "<strong>ingredients:</strong> Choux Pastry , Cinnamon Sugar , Hot Chocolate Dip",
    "ECLAIR": "<strong>ingredients:</strong> Choux Pastry , Vanilla Pastry Cream , Belgian Dark Chocolate Glaze",

    "APPLE PIE": "<strong>ingredients:</strong> Pie Crust , Apples , Sugar , Cinnamon , Butter , Lemon Juice",
    "PUMPKIN PIE": "<strong>ingredients:</strong> Pie Crust , Pumpkin Puree , Evaporated Milk , Eggs , Brown Sugar , Cinnamon , Nutmeg",
    "PECAN PIE": "<strong>ingredients:</strong> Pie Crust , Pecans , Eggs , Corn Syrup , Brown Sugar , Butter , Vanilla Extract",
    "KEY LIME PIE": "<strong>ingredients:</strong> Graham Cracker Crust , Key Lime Juice , Condensed Milk , Egg Yolks , Whipped Cream",
    "CHERRY PIE": "<strong>ingredients:</strong> Pie Crust , Sour Cherries , Sugar , Cornstarch , Butter , Lemon Juice",
    "CHOCOLATE SILK PIE": "<strong>ingredients:</strong> Oreo Crust , Dark Chocolate , Heavy Cream , Butter , Sugar , Vanilla Extract"
};

function increase(btn) {
    let span = btn.parentElement.querySelector('span');
    let qty = parseInt(span.innerText) || 1;
    span.innerText = qty + 1;
}

function decrease(btn) {
    let span = btn.parentElement.querySelector('span');
    let qty = parseInt(span.innerText) || 1;
    if (qty > 1) {
        span.innerText = qty - 1;
    }
}

function addCart() {
    alert("Item added to cart!");
}

function changeModalQty(change) {
    const qtySpan = document.getElementById('modalQtyVal');
    let currentQty = parseInt(qtySpan.innerText) || 1;
    currentQty += change;
    if (currentQty < 1) currentQty = 1;
    qtySpan.innerText = currentQty;
}

function addCartFromModal() {
    const title = document.getElementById('modalTitle')?.innerText || '';
    const qty = document.getElementById('modalQtyVal')?.innerText || '1';
    alert(`${qty} x ${title} added to cart!`);
}

// ==================== 7. MODAL EVENTS ====================
document.addEventListener('click', function (e) {
    const card = e.target.closest('.product-card');

    if (card) {
        if (e.target.closest('.quantity') || e.target.closest('.add-cart-btn')) {
            return;
        }

        const modal = document.getElementById('productModal');
        const modalImg = document.getElementById('modalImg');
        const modalTitle = document.getElementById('modalTitle');
        const modalPrice = document.getElementById('modalPrice');
        const modalDesc = document.getElementById('modalDesc');
        const modalRecipe = document.getElementById('modalRecipe');
        const modalQtyVal = document.getElementById('modalQtyVal');

        const img = card.querySelector('.product-card-img')?.src || '';
        const title = card.querySelector('h3')?.innerText.trim() || '';
        const price = card.querySelector('.price')?.innerText.trim() || '';
        const desc = card.querySelector('.description')?.innerText.trim() || '';

        if (modalImg) modalImg.src = img;
        if (modalTitle) modalTitle.innerText = title;
        if (modalPrice) modalPrice.innerText = price;
        if (modalDesc) modalDesc.innerText = desc;
        if (modalQtyVal) modalQtyVal.innerText = '1';

        if (modalRecipe) {
            if (recipeDatabase[title]) {
                modalRecipe.innerHTML = recipeDatabase[title];
            } else {
                modalRecipe.innerHTML = "<strong>Details:</strong> Handcrafted with premium ingredients and baked fresh daily.";
            }
            modalRecipe.style.display = 'block';
        }

        if (modal) modal.classList.add('active');
    }

    const modal = document.getElementById('productModal');
    if (modal && (e.target.id === 'modalCloseBtn' || e.target.classList.contains('close-btn') || e.target === modal)) {
        modal.classList.remove('active');
    }
});

// ==================== 8. JSON PRODUCTS LOADER ====================
function createProductCardHTML(product) {
    return `
        <div class="product-card">
            <img class="product-card-img" src="${product.image}">
            <div class="card-content">
                <h3>${product.name}</h3>
                <p class="description">${product.description}</p>
                <div class="bottom">
                    <div>
                        <div class="price">${product.price}</div>
                        <div class="quantity">
                            <button onclick="decrease(this)">-</button>
                            <span>1</span>
                            <button onclick="increase(this)">+</button>
                        </div>
                    </div>
                    <button class="add-cart-btn" onclick="addCart()">
                        🛒 Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

async function loadProductsFromJSON() {
    try {
        const response = await fetch('products.json');
        if (!response.ok) return;
        const data = await response.json();

        for (const category in data) {
            const container = document.getElementById(`${category}-products`);
            if (container) {
                container.innerHTML = data[category].map(item => createProductCardHTML(item)).join('');
            }
        }
    } catch (error) {
        console.error("JSON fetch error:", error);
    }
}

// ==================== 9. FILTER SCROLLING ====================
window.scrollToSection = function(sectionId, buttonElement) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    if (buttonElement) buttonElement.classList.add('active');

    const allProducts = document.querySelectorAll('.products');

    allProducts.forEach(productDiv => {
        if (productDiv.id === 'merch-products' || productDiv.id === 'merch') {
            return; 
        }

        const container = productDiv.closest('.container') || productDiv;

        if (sectionId === 'all' || productDiv.id === sectionId) {
            container.style.display = 'block';
        } else {
            container.style.display = 'none';
        }
    });

    const navbarHeight = 180;

    if (sectionId === 'all') {
        const firstContainer = document.querySelector('.products:not(#merch-products)')?.closest('.container');
        if (firstContainer) {
            const targetPosition = firstContainer.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    } else {
        const targetEl = document.getElementById(sectionId);
        if (targetEl) {
            const targetContainer = targetEl.closest('.container') || targetEl;
            const targetPosition = targetContainer.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    loadProductsFromJSON();

    const activeBtn = document.querySelector('.filter-btn.active');
    if (activeBtn) {
        scrollToSection('all', activeBtn);
    }
});