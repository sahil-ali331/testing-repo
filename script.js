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
    "CHOCOLATE SILK PIE": "<strong>ingredients:</strong> Oreo Crust , Dark Chocolate , Heavy Cream , Butter , Sugar , Vanilla Extract",

    "Bakerz Bite Pro Chef Apron": "<strong>Details:</strong> Made from 100% heavy-duty cotton canvas, featuring adjustable neck straps, deep utility pockets, and embroidered logo.",
    "Bakerz Bite Eco Canvas Tote": "<strong>Details:</strong> Eco-friendly, washable organic canvas tote bag with reinforced handles, designed for daily bakery goods.",
    "Bakerz Bite Classic Cotton Tee": "<strong>Details:</strong> Ultra-soft 180 GSM combed cotton t-shirt with breathable print and classic crew neck fit.",
    "Bakerz Bite Signature Ceramic Mug": "<strong>Details:</strong> 350ml durable ceramic mug, microwave and dishwasher safe, featuring ergonomic handle and glossy logo.",
    "Bakerz Bite Cozy Knit Beanie": "<strong>Details:</strong> Stretchable soft acrylic wool blend knit cap with stitched logo badge for maximum comfort.",
    "Bakerz Bite Die-Cut Vinyl Sticker": "<strong>Details:</strong> Premium waterproof vinyl sticker, scratch-resistant and UV protected. Perfect for laptops, bottles, and notebooks."
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

// Global Event Delegation (Dynamic JSON cards ke liye)
document.addEventListener('click', function (e) {
    const card = e.target.closest('.product-card');

    // Agar kisi Card par click hua hai
    if (card) {
        // Agar click quantity buttons ya add-cart button par hai to popup na khule
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

        // Recipe / Details match karna
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

    // Modal Close karne ke liye logic
    const modal = document.getElementById('productModal');
    if (modal && (e.target.id === 'modalCloseBtn' || e.target.classList.contains('close-btn') || e.target === modal)) {
        modal.classList.remove('active');
    }
});

// json workkkkk



// 1. JSON se dynamic HTML card banane ka function
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

// 2. products.json fetch karke HTML mein inject karne ka main function
async function loadProductsFromJSON() {
    try {
        const response = await fetch('products.json');
        const data = await response.json();

        // Har category ke container mein uske cards render karna
        for (const category in data) {
            const container = document.getElementById(`${category}-products`);
            if (container) {
                container.innerHTML = data[category].map(item => createProductCardHTML(item)).join('');
            }
        }

        // Cards load hone ke baad modal events attach karna
        setupProductModalEvents();
    } catch (error) {
        console.error("JSON fetch karne mein error aaya:", error);
    }
}

// 3. Dynamic Cards par click karke Modal kholne ka event setup
function setupProductModalEvents() {
    const modal = document.getElementById('productModal');
    const closeBtn = document.getElementById('modalCloseBtn');

    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function (e) {
            // Agar quantity button ya add to cart par click ho toh modal na khule
            if (e.target.closest('.quantity') || e.target.closest('.add-cart-btn')) {
                return;
            }

            const img = card.querySelector('.product-card-img')?.src || '';
            const title = card.querySelector('h3')?.innerText.trim() || '';
            const price = card.querySelector('.price')?.innerText.trim() || '';
            const desc = card.querySelector('.description')?.innerText.trim() || '';

            document.getElementById('modalImg').src = img;
            document.getElementById('modalTitle').innerText = title;
            document.getElementById('modalPrice').innerText = price;
            document.getElementById('modalDesc').innerText = desc;
            document.getElementById('modalQtyVal').innerText = '1';

            const modalRecipe = document.getElementById('modalRecipe');
            if (typeof recipeDatabase !== 'undefined' && recipeDatabase[title]) {
                modalRecipe.innerHTML = recipeDatabase[title];
            } else {
                modalRecipe.innerHTML = "<strong>Details:</strong> Handcrafted with premium ingredients and baked fresh daily.";
            }

            modal.classList.add('active');
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }
}

// Page load hone par JSON fetching start karein
document.addEventListener('DOMContentLoaded', () => {
    loadProductsFromJSON();
});


// filter section

 function scrollToSection(sectionId, buttonElement) {
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  buttonElement.classList.add('active');
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    const navbarHeight = 85; 
    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}





