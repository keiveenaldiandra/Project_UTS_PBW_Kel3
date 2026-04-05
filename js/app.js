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
