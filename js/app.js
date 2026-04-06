// ============================================
// LOKALN - Main Application Logic
// ============================================

// ---- State ----
let currentCategory = 'semua';
let searchQuery = '';
let wishlist = JSON.parse(localStorage.getItem('lokaln_wishlist') || '[]');
let isWishlistView = false;

// ---- Page Detection ----
const currentPage = (() => {
  const path = window.location.pathname;
  if (path.includes('product-detail')) return 'detail';
  if (path.includes('products')) return 'products';
  if (path.includes('stories')) return 'stories';
  if (path.includes('about')) return 'about';
  return 'home';
})();

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  // Hide loader
  setTimeout(() => {
    const loader = document.getElementById('pageLoader');
    if (loader) loader.classList.add('hidden');
  }, 400);

  // Update wishlist count in nav
  updateWishlistCount();

  // Scroll animations
  initScrollAnimations();

  // Navbar scroll effect (only for home page)
  if (currentPage === 'home') {
    initNavbarScroll();
  }

  // Page-specific init
  switch (currentPage) {
    case 'home':
      renderHomeCategories();
      renderHomeProducts();
      renderStoriesPreview();
      break;
    case 'products':
      initProductsPage();
      break;
    case 'detail':
      initDetailPage();
      break;
    case 'stories':
      renderStoriesGrid();
      break;
  }
});

// ---- Navbar Scroll ----
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ---- Mobile Menu ----
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('active');
  document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
}

// ---- Scroll Animations ----
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ---- Toast ----
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMessage');
  toastMsg.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ---- Wishlist ----
function toggleWishlist(productId, event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  const index = wishlist.indexOf(productId);
  if (index > -1) {
    wishlist.splice(index, 1);
    showToast('Dihapus dari wishlist');
  } else {
    wishlist.push(productId);
    showToast('Ditambahkan ke wishlist');
  }

  localStorage.setItem('lokaln_wishlist', JSON.stringify(wishlist));
  updateWishlistCount();

  // Update button state
  const btn = document.querySelector(`[data-wishlist-id="${productId}"]`);
  if (btn) {
    btn.classList.toggle('active');
    const icon = btn.querySelector('i');
    if (icon) {
      icon.className = wishlist.includes(productId) ? 'fas fa-heart' : 'far fa-heart';
    }
  }

  // Re-render if in wishlist view
  if (isWishlistView) {
    renderProducts(getFilteredProducts());
  }
}

function updateWishlistCount() {
  const countEl = document.getElementById('wishlistCount');
  if (countEl) {
    countEl.textContent = wishlist.length;
    countEl.classList.toggle('show', wishlist.length > 0);
  }
}

function isInWishlist(productId) {
  return wishlist.includes(productId);
}

// ---- Fallback Image ----
// Buat folder images/ di project kamu, lalu simpan 3 file ini:
// - images/no-image.jpg   → gambar default produk
// - images/no-seller.jpg  → foto default penjual
// - images/no-story.jpg   → gambar default cerita UMKM
const FALLBACK_IMG        = 'images/no-image.jpg';
const FALLBACK_SELLER_IMG = 'images/no-seller.jpg';
const FALLBACK_STORY_IMG  = 'images/no-story.jpg';

// ---- Product Card HTML ----
function createProductCard(product) {
  const inWishlist = isInWishlist(product.id);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  return `
    <div class="product-card fade-in" onclick="goToProduct(${product.id})" id="product-card-${product.id}">
      <div class="product-card-img">
        <img src="${product.image}" alt="${product.name}" loading="lazy"
             onerror="this.onerror=null; this.src='${FALLBACK_IMG}'">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        <button class="product-wishlist-btn ${inWishlist ? 'active' : ''}" 
                data-wishlist-id="${product.id}"
                onclick="toggleWishlist(${product.id}, event)" 
                title="${inWishlist ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}">
          <i class="${inWishlist ? 'fas' : 'far'} fa-heart"></i>
        </button>
      </div>
      <div class="product-card-body">
        <div class="product-card-location">
          <i class="fas fa-map-marker-alt"></i> ${product.location}
        </div>
        <h3>${product.name}</h3>
        <div class="product-card-rating">
          <div class="stars">${generateStars(product.rating)}</div>
          <span class="rating-text">${product.rating} (${product.reviewCount})</span>
        </div>
        <div class="product-card-footer">
          <div class="product-price">
            <span class="current">${formatRupiah(product.price)}</span>
            <span class="original">${formatRupiah(product.originalPrice)}</span>
          </div>
          <span class="view-btn">Detail →</span>
        </div>
      </div>
    </div>
  `;
}

function goToProduct(id) {
  window.location.href = `product-detail.html?id=${id}`;
}

// ============================================
// HOME PAGE
// ============================================

function renderHomeCategories() {
  const container = document.getElementById('homeCategories');
  if (!container) return;

  container.innerHTML = categories.map(cat => `
    <button class="category-btn ${cat.id === currentCategory ? 'active' : ''}" 
            onclick="filterHomeProducts('${cat.id}')">
      ${cat.name}
    </button>
  `).join('');
}

function renderHomeProducts() {
  const container = document.getElementById('homeProductGrid');
  if (!container) return;

  let filtered = currentCategory === 'semua' 
    ? products 
    : products.filter(p => p.category === currentCategory);

  // Show max 8 on homepage
  filtered = filtered.slice(0, 8);

  container.innerHTML = filtered.map(createProductCard).join('');

  // Re-init scroll animations for new cards
  setTimeout(() => initScrollAnimations(), 50);
}

function filterHomeProducts(category) {
  currentCategory = category;
  renderHomeCategories();
  renderHomeProducts();
}

function renderStoriesPreview() {
  const container = document.getElementById('storiesPreview');
  if (!container) return;

  container.innerHTML = umkmStories.slice(0, 4).map(story => `
    <a href="stories.html" class="story-preview-card">
      <div class="story-preview-img">
        <img src="${story.image}" alt="${story.title}" loading="lazy"
             onerror="this.onerror=null; this.src='${FALLBACK_STORY_IMG}'">
      </div>
      <div class="story-preview-content">
        <h4>${story.title}</h4>
        <p>${story.excerpt}</p>
        <span class="read-more">Baca selengkapnya →</span>
      </div>
    </a>
  `).join('');
}

// ============================================
// PRODUCTS PAGE
// ============================================

function initProductsPage() {
  // Check URL params
  const params = new URLSearchParams(window.location.search);
  const catParam = params.get('cat');
  const wishlistParam = params.get('wishlist');

  if (catParam) {
    currentCategory = catParam;
  }

  if (wishlistParam === 'true') {
    isWishlistView = true;
    updateWishlistViewUI();
  }

  renderCategoryFilters();
  renderProducts(getFilteredProducts());
}

function renderCategoryFilters() {
  const container = document.getElementById('categoryFilters');
  if (!container) return;

  const wishlistBtn = `
    <button class="category-btn ${isWishlistView ? 'active' : ''}" onclick="toggleWishlistView()">
      <span class="cat-icon"></span> Wishlist (${wishlist.length})
    </button>
  `;

  const categoryBtns = categories.map(cat => `
    <button class="category-btn ${!isWishlistView && cat.id === currentCategory ? 'active' : ''}" 
            onclick="filterProducts('${cat.id}')">
      <span class="cat-icon">${cat.icon}</span> ${cat.name}
    </button>
  `).join('');

  container.innerHTML = categoryBtns + wishlistBtn;
}

function getFilteredProducts() {
  let filtered = products;

  if (isWishlistView) {
    filtered = products.filter(p => wishlist.includes(p.id));
  } else if (currentCategory !== 'semua') {
    filtered = filtered.filter(p => p.category === currentCategory);
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.seller.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  return filtered;
}

function renderProducts(productsToRender) {
  const grid = document.getElementById('productGrid');
  const noResults = document.getElementById('noResults');
  const wishlistEmpty = document.getElementById('wishlistEmpty');

  if (!grid) return;

  if (productsToRender.length === 0) {
    grid.style.display = 'none';
    if (isWishlistView && wishlist.length === 0) {
      if (noResults) noResults.style.display = 'none';
      if (wishlistEmpty) wishlistEmpty.style.display = 'block';
    } else {
      if (noResults) noResults.style.display = 'block';
      if (wishlistEmpty) wishlistEmpty.style.display = 'none';
    }
    return;
  }

  grid.style.display = 'grid';
  if (noResults) noResults.style.display = 'none';
  if (wishlistEmpty) wishlistEmpty.style.display = 'none';

  grid.innerHTML = productsToRender.map(createProductCard).join('');
  setTimeout(() => initScrollAnimations(), 50);
}

function filterProducts(category) {
  isWishlistView = false;
  currentCategory = category;
  updateWishlistViewUI();
  renderCategoryFilters();
  renderProducts(getFilteredProducts());
}

function handleSearch() {
  const input = document.getElementById('searchInput');
  searchQuery = input ? input.value : '';
  renderProducts(getFilteredProducts());
}

function toggleWishlistView() {
  isWishlistView = !isWishlistView;
  if (isWishlistView) {
    currentCategory = 'semua';
  }
  updateWishlistViewUI();
  renderCategoryFilters();
  renderProducts(getFilteredProducts());
}

function updateWishlistViewUI() {
  const title = document.getElementById('productsTitle');
  const subtitle = document.getElementById('productsSubtitle');
  if (title) {
    title.textContent = isWishlistView ? 'Wishlist Anda' : 'Semua Produk UMKM';
  }
  if (subtitle) {
    subtitle.textContent = isWishlistView
      ? `Anda memiliki ${wishlist.length} produk favorit`
      : 'Temukan produk unik berkualitas dari pengrajin dan produsen lokal terbaik Indonesia';
  }
}

// ============================================
// PRODUCT DETAIL PAGE
// ============================================

function initDetailPage() {
  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get('id'));
  const product = products.find(p => p.id === productId);

  if (!product) {
    window.location.href = 'products.html';
    return;
  }

  // Update page title
  document.title = `${product.name} — LokalN`;

  renderProductDetail(product);
  renderProductStory(product);
  renderProductReviews(product);
  renderRelatedProducts(product);
}

function renderProductDetail(product) {
  const container = document.getElementById('productDetailGrid');
  if (!container) return;

  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  const inWishlist = isInWishlist(product.id);

  container.innerHTML = `
    <div class="product-detail-gallery" style="position: relative;">
      <button onclick="history.back()" style="position: absolute; top: 15px; left: 15px; z-index: 10; background: rgba(255, 255, 255, 0.9); border: none; padding: 8px 16px; border-radius: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.15); cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 6px; color: var(--color-dark); transition: all 0.3s ease;" onmouseover="this.style.background='white'; this.style.transform='translateX(-3px)';" onmouseout="this.style.background='rgba(255, 255, 255, 0.9)'; this.style.transform='translateX(0)';">
        <i class="fas fa-arrow-left"></i> Kembali
      </button>
      <img src="${product.image}" alt="${product.name}"
           onerror="this.onerror=null; this.src='${FALLBACK_IMG}'">
    </div>
    <div class="product-detail-info">
      <div class="breadcrumb">
        <a href="index.html">Beranda</a> <i class="fas fa-chevron-right" style="font-size:0.6rem"></i>
        <a href="products.html">Produk</a> <i class="fas fa-chevron-right" style="font-size:0.6rem"></i>
        <span>${product.name}</span>
      </div>
      <h1>${product.name}</h1>
      <div class="product-detail-meta">
        <div class="meta-item">
          <div class="stars">${generateStars(product.rating)}</div>
          <span>${product.rating} (${product.reviewCount} ulasan)</span>
        </div>
        <div class="meta-item">
          <i class="fas fa-map-marker-alt"></i>
          <span>${product.location}</span>
        </div>
      </div>
      <div class="detail-price-box">
        <span class="current-price">${formatRupiah(product.price)}</span>
        <span class="original-price">${formatRupiah(product.originalPrice)}</span>
        <span class="discount">-${discount}%</span>
      </div>
      <p class="product-description">${product.description}</p>
      <div class="detail-actions">
        <button class="btn btn-primary" onclick="openCheckoutModal(${product.id})">
          <i class="fas fa-shopping-cart"></i> Beli Sekarang
        </button>
        <button class="btn ${inWishlist ? 'btn-primary' : 'btn-outline'}" 
                style="${inWishlist ? '' : 'border-color: var(--color-primary); color: var(--color-primary);'}"
                data-wishlist-id="${product.id}"
                onclick="toggleWishlist(${product.id}, event); initDetailPage();">
          <i class="${inWishlist ? 'fas' : 'far'} fa-heart"></i> 
          ${inWishlist ? 'Dalam Wishlist' : 'Tambah Wishlist'}
        </button>
      </div>
      <div class="seller-card">
        <img src="${product.sellerImage}" alt="${product.seller}"
             onerror="this.onerror=null; this.src='${FALLBACK_SELLER_IMG}'">
        <div class="seller-info">
          <h4>${product.seller}</h4>
          <p><i class="fas fa-map-marker-alt"></i> ${product.location}</p>
        </div>
      </div>
    </div>
  `;
}

function renderProductStory(product) {
  const container = document.getElementById('productStory');
  if (!container) return;

  container.innerHTML = `
    <div class="story-card-large">
      <h3>"${product.name}" — Cerita dari ${product.seller}</h3>
      <p>${product.story}</p>
      <div class="seller-tag">
        <img src="${product.sellerImage}" alt="${product.seller}"
             onerror="this.onerror=null; this.src='${FALLBACK_SELLER_IMG}'">
        <span>${product.seller} — ${product.location}</span>
      </div>
    </div>
  `;
}

function renderProductReviews(product) {
  const container = document.getElementById('reviewsList');
  if (!container) return;

  container.innerHTML = product.reviews.map(review => `
    <div class="review-card">
      <div class="review-header">
        <div class="review-author">
          <div class="review-avatar">${review.name.charAt(0)}</div>
          <div class="review-author-info">
            <h4>${review.name}</h4>
            <span class="date">${timeAgo(review.date)}</span>
          </div>
        </div>
        <div class="review-stars">${generateStars(review.rating)}</div>
      </div>
      <p>${review.comment}</p>
    </div>
  `).join('');
}

function renderRelatedProducts(product) {
  const container = document.getElementById('relatedProducts');
  if (!container) return;

  const related = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  if (related.length === 0) {
    document.getElementById('relatedSection').style.display = 'none';
    return;
  }

  container.innerHTML = related.map(createProductCard).join('');
  setTimeout(() => initScrollAnimations(), 50);
}

// ============================================
// STORIES PAGE
// ============================================

function renderStoriesGrid() {
  const container = document.getElementById('storiesGrid');
  if (!container) return;

  container.innerHTML = umkmStories.map(story => `
    <div class="story-card fade-in" onclick="openStoryModal(${story.id})">
      <div class="story-card-image">
        <img src="${story.image}" alt="${story.title}" loading="lazy"
             onerror="this.onerror=null; this.src='${FALLBACK_STORY_IMG}'">
      </div>
      <div class="story-card-content">
        <div class="story-card-meta">
          <span class="tag">${story.category}</span>
          <span class="read-time"><i class="far fa-clock"></i> ${story.readTime}</span>
        </div>
        <h3>${story.title}</h3>
        <p>${story.excerpt}</p>
        <span class="read-more">Baca selengkapnya <i class="fas fa-arrow-right"></i></span>
      </div>
    </div>
  `).join('');

  setTimeout(() => initScrollAnimations(), 50);
}

function openStoryModal(storyId) {
  const story = umkmStories.find(s => s.id === storyId);
  if (!story) return;

  const modalImg = document.getElementById('storyModalImage');
  modalImg.src = story.image;
  modalImg.alt = story.title;
  modalImg.onerror = function() {
    this.onerror = null;
    this.src = FALLBACK_STORY_IMG;
  };

  document.getElementById('storyModalCategory').textContent = story.category;
  document.getElementById('storyModalTitle').textContent = story.title;
  document.getElementById('storyModalAuthor').textContent = story.author;
  document.getElementById('storyModalDate').textContent = new Date(story.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
  document.getElementById('storyModalReadTime').textContent = story.readTime;
  document.getElementById('storyModalContent').textContent = story.content;

  const modal = document.getElementById('storyModal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeStoryModal() {
  const modal = document.getElementById('storyModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('story-modal-overlay')) {
    closeStoryModal();
  }
  if (e.target.classList.contains('modal-overlay')) {
    closeCheckoutModal();
  }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeStoryModal();
    closeCheckoutModal();
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu && mobileMenu.classList.contains('active')) {
      toggleMobileMenu();
    }
  }
});

/* ---- Checkout Logic ---- */
let currentCheckoutProduct = null;
let currentCheckoutQty = 1;
let currentCheckoutTotal = 0;

function openCheckoutModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  currentCheckoutProduct = product;
  currentCheckoutQty = 1;
  
  // Populate form info
  const nameEl = document.getElementById('checkoutProductName');
  if (nameEl) nameEl.textContent = product.name;
  
  const priceEl = document.getElementById('checkoutProductPrice');
  if (priceEl) priceEl.textContent = formatRupiah(product.price);
  
  const imgEl = document.getElementById('checkoutProductImage');
  if (imgEl) imgEl.src = product.image;
  
  const qtyEl = document.getElementById('checkoutQty');
  if (qtyEl) qtyEl.value = 1;
  
  // Reset methods default
  const shippingRadios = document.getElementsByName('shippingMethod');
  if (shippingRadios.length > 0) shippingRadios[0].checked = true;
  
  calculateCheckoutTotal();
  
  // Reset Steps
  const step1 = document.getElementById('checkoutStep1');
  const step2 = document.getElementById('checkoutStep2');
  const step3 = document.getElementById('checkoutStep3');
  
  if (step1) step1.style.display = 'block';
  if (step2) step2.style.display = 'none';
  if (step3) step3.style.display = 'none';
  
  // Show Modal
  const modal = document.getElementById('checkoutModal');
  if (modal) modal.classList.add('active');
}

function updateCheckoutQty(change) {
  const input = document.getElementById('checkoutQty');
  if (!input) return;
  
  let newVal = parseInt(input.value) + change;
  if (newVal < 1) newVal = 1;
  if (newVal > 99) newVal = 99;
  
  input.value = newVal;
  calculateCheckoutTotal();
}

function calculateCheckoutTotal() {
  if (!currentCheckoutProduct) return;
  
  const qtyInput = document.getElementById('checkoutQty');
  currentCheckoutQty = qtyInput ? parseInt(qtyInput.value) : 1;
  
  let method = 'diantar';
  const shippingRadios = document.getElementsByName('shippingMethod');
  for (let radio of shippingRadios) {
    if (radio.checked) {
      method = radio.value;
      break;
    }
  }
  
  const subtotal = currentCheckoutProduct.price * currentCheckoutQty;
  let shippingFee = 0;
  
  if (method === 'diantar') {
    shippingFee = subtotal * 0.10; // 10% fee
    const shippingRow = document.getElementById('shippingFeeRow');
    if (shippingRow) shippingRow.style.display = 'flex';
  } else {
    shippingFee = 0;
    const shippingRow = document.getElementById('shippingFeeRow');
    if (shippingRow) shippingRow.style.display = 'none';
  }
  
  currentCheckoutTotal = subtotal + shippingFee;
  
  const subtotalEl = document.getElementById('checkoutSubtotal');
  if (subtotalEl) subtotalEl.textContent = formatRupiah(subtotal);
  
  const shippingFeeEl = document.getElementById('checkoutShippingFee');
  if (shippingFeeEl) shippingFeeEl.textContent = formatRupiah(shippingFee);
  
  const totalEl = document.getElementById('checkoutTotalPrice');
  if (totalEl) totalEl.textContent = formatRupiah(currentCheckoutTotal);
  
  const qrisTotalEl = document.getElementById('qrisTotalPrice');
  if (qrisTotalEl) qrisTotalEl.textContent = formatRupiah(currentCheckoutTotal);
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  if (modal) modal.classList.remove('active');
}

let latestOrderData = null;

function processToPayment(e) {
  e.preventDefault();
  
  const nameInput = document.getElementById('buyerName');
  if (!nameInput || !nameInput.value) return;
  document.getElementById('successBuyerName').textContent = nameInput.value;
  
  let shippingMethod = 'diantar';
  const radios = document.getElementsByName('shippingMethod');
  for (let r of radios) {
    if (r.checked) shippingMethod = r.value;
  }
  
  const ds = new Date();
  const year = ds.getFullYear().toString().substr(-2);
  const month = (ds.getMonth()+1).toString().padStart(2, '0');
  const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
  const orderId = `LKN-${year}${month}-${randomStr}`;
  
  latestOrderData = {
    id: orderId,
    date: ds.toISOString(),
    productId: currentCheckoutProduct.id,
    productName: currentCheckoutProduct.name,
    productImage: currentCheckoutProduct.image,
    price: currentCheckoutProduct.price,
    qty: currentCheckoutQty,
    total: currentCheckoutTotal,
    method: shippingMethod,
    address: document.getElementById('buyerAddress').value || '',
    buyerName: nameInput.value,
    status: 'Diproses'
  };
  
  document.querySelector('.order-id').textContent = orderId;
  
  // Go to step 2 (QRIS)
  document.getElementById('checkoutStep1').style.display = 'none';
  document.getElementById('checkoutStep2').style.display = 'block';
}

function processPayment() {
  showToast('Memproses pembayaran...');
  
  let orders = [];
  try {
    const saved = JSON.parse(localStorage.getItem('lokaln_orders'));
    if (Array.isArray(saved)) orders = saved;
  } catch (e) { }
  
  orders.unshift(latestOrderData);
  localStorage.setItem('lokaln_orders', JSON.stringify(orders));
  
  // Simulate API wait
  setTimeout(() => {
    document.getElementById('checkoutStep2').style.display = 'none';
    document.getElementById('checkoutStep3').style.display = 'block';
  }, 1000);
}

/* ---- History Page Logic ---- */
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('historyContainer')) {
    renderOrderHistory();
  }
});

function renderOrderHistory() {
  const container = document.getElementById('historyContainer');
  if (!container) return;
  
  let orders = [];
  try {
    const saved = JSON.parse(localStorage.getItem('lokaln_orders'));
    if (Array.isArray(saved)) orders = saved;
  } catch (e) {
    console.warn("Resetting corrupt orders memory");
  }
  
  if (orders.length === 0) {
    container.innerHTML = `
      <div class="empty-history" style="animation: float 3s ease-in-out infinite;">
        <i class="fas fa-shopping-bag"></i>
        <h2>Belum ada riwayat pembelian</h2>
        <p>Anda belum pernah melakukan pesanan. Mari dukung UMKM sekarang!</p>
        <a href="products.html" class="btn btn-primary" style="margin-top: 20px;">Belanja Sekarang</a>
      </div>
    `;
    return;
  }
  
  container.innerHTML = orders.filter(Boolean).map(order => {
    let shippingInfo = '';
    const method = order.method || 'diantar';
    const status = order.status || 'Diproses';
    const address = order.address || '';
    const orderId = order.id || '-';
    
    if (method === 'diantar') {
      shippingInfo = `
        <div class="history-shipping" style="background: rgba(49, 130, 206, 0.08); border: 1px solid rgba(49, 130, 206, 0.2);">
          <i class="fas fa-truck" style="color: #3182ce; font-size: 1.5rem;"></i>
          <div>
            <strong>Dikirim ke alamat:</strong><br>
            <span style="color: var(--color-text-light); font-size: 0.9rem;">${address}</span><br>
            <div style="background: #ebf8ff; color: #2b6cb0; padding: 6px 12px; border-radius: 6px; display: inline-flex; align-items: center; gap: 6px; margin-top: 8px; font-weight: 600; font-size: 0.85rem;">
              <i class="fas fa-clock"></i> Estimasi Pengiriman: 2-3 Hari Kerja
            </div>
          </div>
        </div>
      `;
    } else {
      // Find the location of the product
      const product = products.find(p => p.id === order.productId);
      const location = product ? product.location : 'Lokasi Toko/UMKM';
      shippingInfo = `
        <div class="history-shipping" style="background: rgba(40, 167, 69, 0.08); border: 1px solid rgba(40, 167, 69, 0.2);">
          <i class="fas fa-store" style="color: #28a745; font-size: 1.5rem;"></i>
          <div>
            <strong>Ambil di Tempat (Pickup):</strong><br>
            <div style="background: white; border: 2px dashed #28a745; padding: 12px 16px; border-radius: 8px; margin: 10px 0; display: inline-block; text-align: center;">
              <div style="font-size: 0.8rem; color: var(--color-text-muted); margin-bottom: 4px;">KODE KHUSUS LOKALN</div>
              <span style="font-size: 1.35rem; font-weight: 800; color: #28a745; font-family: monospace; letter-spacing: 1px;">${orderId}</span>
            </div><br>
            <em style="color: var(--color-text-muted); font-size: 0.85rem;"><i class="fas fa-info-circle"></i> Bawa kode ini ke toko untuk mengambil pesanan Anda.</em><br>
            <br><strong>📍 Lokasi Pengambilan:</strong> ${location}
          </div>
        </div>
      `;
    }
    
    let orderDate;
    try {
      orderDate = new Date(order.date || new Date()).toLocaleDateString('id-ID', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });
    } catch(e) {
      orderDate = 'Tanggal tidak tersedia';
    }
    
    return `
      <div class="history-card">
        <div class="history-header">
          <div>
            <span class="history-id"><i class="fas fa-receipt"></i> ${orderId}</span>
            <span class="history-date" style="margin-left: 12px;"><i class="far fa-calendar-alt"></i> ${orderDate}</span>
          </div>
          <span class="history-status status-${status.toLowerCase()}">${status}</span>
        </div>
        <div class="history-body">
          <img src="${order.productImage || FALLBACK_IMG}" alt="${order.productName || 'Produk'}">
          <div class="history-details flex-1">
            <h4 class="history-title">${order.productName || 'Produk UMKM'}</h4>
            <p class="history-info">${order.qty || 1} Produk x ${formatRupiah(order.price || 0)}</p>
            <p class="history-total">Total Belanja: ${formatRupiah(order.total || 0)}</p>
          </div>
          <div class="history-actions" style="margin-left: 10px;">
            <button class="btn btn-outline" style="padding: 6px 12px; font-size: 0.8rem;" onclick="window.location.href='product-detail.html?id=${order.productId || ''}'">Beli Lagi</button>
          </div>
        </div>
        ${shippingInfo}
      </div>
    `;
  }).join('');
  
  setTimeout(() => initScrollAnimations(), 50);
}
