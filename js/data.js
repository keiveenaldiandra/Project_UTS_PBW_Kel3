// ============================================
// DATA PRODUK UMKM LOKALN MARKETPLACE
// ============================================

const products = [
  {
    id: 1,
    name: "Batik Tulis Mega Mendung",
    price: 999999,
    originalPrice: 1200000,
    category: "fashion",
    rating: 4.8,
    reviewCount: 24,
    image: "https://engrasia.com/cdn/shop/products/5a98a06a-cf05-4f29-a684-7a824bba86b5.jpg?v=1571439195&width=800",
    badge: "Best Seller",
    location: "Cirebon, Jawa Barat",
    seller: "Siti Rahayu",
    sellerImage: "https://i.pravatar.cc/100?img=1",
    description: "Batik tulis asli Cirebon dengan motif Mega Mendung yang khas. Setiap helai kain dibuat secara handmade oleh pengrajin lokal dengan teknik tradisional turun temurun. Bahan katun premium, nyaman dipakai sehari-hari maupun acara formal.",
    story: "Bu Siti memulai usaha batik tulis sejak usia 20 tahun, belajar langsung dari sang ibu yang juga pembatik legendaris di kampungnya. Selama 30 tahun berkarya, beliau telah menghasilkan ribuan lembar batik dengan motif khas Cirebon. 'Setiap goresan canting adalah doa,' ujar Bu Siti. Kini beliau membina 15 pembatik muda agar seni batik tulis tidak punah.",
    reviews: [
      { name: "Ani Widodo", rating: 5, comment: "Kualitas batiknya mantap! Motifnya sangat detail dan warnanya tidak luntur.", date: "2025-12-15" },
      { name: "Budi Santoso", rating: 5, comment: "Sudah 2x beli, selalu puas dengan kualitasnya.", date: "2025-11-20" },
      { name: "Clara Dewi", rating: 4, comment: "Bagus, pengiriman lumayan cepat.", date: "2025-10-05" }
    ]
  },
  {
    id: 2,
    name: "Kopi Gayo Premium",
    price: 123000,
    originalPrice: 149000,
    category: "minuman",
    rating: 4.9,
    reviewCount: 56,
    image: "https://d8g5mz6srwlcs.cloudfront.net/original/66c837bb96b37850191467.jpg",
    badge: "Terlaris",
    location: "Takengon, Aceh",
    seller: "Pak Ahmad Cibero",
    sellerImage: "https://i.pravatar.cc/100?img=3",
    description: "Kopi arabika Gayo grade specialty, dipetik tangan dari ketinggian 1400 mdpl. Diproses dengan metode full wash untuk menghasilkan cita rasa fruity, floral, dan body yang medium-full. Roasting level medium.",
    story: "Pak Ahmad adalah petani kopi generasi ketiga di dataran tinggi Gayo. Ayah dan kakeknya telah menanam kopi di tanah vulkanik yang subur ini selama puluhan tahun. 'Kopi bukan sekadar tanaman, tapi warisan keluarga,' katanya. Kini Pak Ahmad memimpin koperasi 200 petani kopi organik yang produknya sudah diekspor ke Eropa dan Jepang.",
    reviews: [
      { name: "Rizky Pratama", rating: 5, comment: "Aroma kopinya harum sekali, rasa fruity-nya terasa jelas!", date: "2025-12-20" },
      { name: "Diana Sari", rating: 5, comment: "Kopi terbaik yang pernah saya coba. Worth every penny!", date: "2025-12-01" },
      { name: "Erik Wijaya", rating: 5, comment: "Packaging rapi, kopi fresh. Recommended!", date: "2025-11-15" }
    ]
  },
