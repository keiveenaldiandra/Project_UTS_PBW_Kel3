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
    {
    id: 3,
    name: "Tas Anyaman Rotan",
    price: 699999,
    originalPrice: 850000,
    category: "kerajinan",
    rating: 4.7,
    reviewCount: 18,
    image: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/114/MTA-183258798/brd-132309_keris-gallery-tas-rotan-anyam-tabung-dengan-tali-kulit-panjang_full01-aa44c42a.webp",
    badge: "Handmade",
    location: "Kalimantan Selatan",
    seller: "Dayak Craft",
    sellerImage: "https://i.pravatar.cc/100?img=5",
    description: "Tas anyaman rotan asli Kalimantan, dibuat dengan teknik anyaman tradisional suku Dayak. Rotan pilihan berkualitas tinggi, dianyam rapi dengan detail ornamen etnik. Cocok untuk fashion statement sehari-hari.",
    story: "Komunitas pengrajin rotan di Kalimantan Selatan ini dipimpin oleh Ibu Mariani. Mereka melestarikan teknik anyaman tradisional suku Dayak yang hampir punah. Setiap tas membutuhkan waktu 3-5 hari untuk diselesaikan. 'Kami ingin dunia tahu bahwa kerajinan Dayak itu indah dan bernilai tinggi,' ujar Ibu Mariani.",
    reviews: [
      { name: "Fiona Lee", rating: 5, comment: "Anyamannya rapi dan kuat. Sudah pakai 6 bulan masih bagus!", date: "2025-11-28" },
      { name: "Galih Permana", rating: 4, comment: "Unik banget, banyak yang bertanya di mana belinya.", date: "2025-10-15" }
    ]
  },
  {
    id: 4,
    name: "Sambal Roa Manado",
    price: 45000,
    originalPrice: 50000,
    category: "makanan",
    rating: 4.6,
    reviewCount: 42,
    image: "https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480/img/recipe/ras/Assets/5e2fe612ba085b2c13ed00d6ddc30c97/Derivates/aabf6e8b03890f4f247868626fdf04868bfeb4f4.jpg",
    badge: "Pedas Nampol",
    location: "Manado, Sulawesi Utara",
    seller: "Mama Linda",
    sellerImage: "https://i.pravatar.cc/100?img=9",
    description: "Sambal roa khas Manado dengan ikan roa asli yang diasap tradisional. Pedasnya pas, gurihnya mantap! Cocok untuk pendamping nasi, mie, atau camilan. Tanpa pengawet, tahan 3 bulan dalam kulkas.",
    story: "Mama Linda sudah membuat sambal roa sejak 25 tahun lalu, resep warisan dari neneknya. Awalnya hanya untuk konsumsi keluarga, tapi karena banyak tetangga yang memesan, akhirnya dijual secara luas. 'Rahasia sambal saya ada di ikan roa yang diasap sendiri dengan kayu kelapa,' ungkap Mama Linda sambil tersenyum.",
    reviews: [
      { name: "Hendra Kusuma", rating: 5, comment: "Pedasnya nendang! Nasi sepiring habis dalam hitungan menit.", date: "2025-12-10" },
      { name: "Indah Lestari", rating: 4, comment: "Enak banget, ikan roa-nya berasa. Bakal repeat order!", date: "2025-11-05" }
    ]
  },
  {
    id: 5,
    name: "Madu Hutan Sumbawa",
    price: 150000,
    originalPrice: 185000,
    category: "makanan",
    rating: 4.9,
    reviewCount: 31,
    image: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//101/MTA-1968094/madu-sumbawa_madu-hitam-asli-sumbawa-100--murni_full02.jpg",
    badge: "Organik",
    location: "Sumbawa, NTB",
    seller: "Pak Hamzah",
    sellerImage: "https://i.pravatar.cc/100?img=11",
    description: "Madu hutan murni dari lebah liar hutan Sumbawa. Dikumpulkan secara tradisional oleh pemburu madu lokal. 100% alami tanpa campuran gula atau bahan lainnya. Kaya antioksidan dan enzim alami.",
    story: "Pak Hamzah adalah pemburu madu generasi keempat di hutan Sumbawa. Setiap musim, beliau memanjat pohon setinggi 30 meter untuk mengambil madu dari sarang lebah liar. 'Ini bukan pekerjaan biasa, ini warisan leluhur,' katanya. Pak Hamzah juga aktif menjaga kelestarian hutan agar lebah tetap memiliki habitat alami.",
    reviews: [
      { name: "Pak Joko", rating: 5, comment: "Madu asli, kental dan rasanya beda dari madu biasa.", date: "2025-12-18" },
      { name: "Kartika Sari", rating: 5, comment: "Untuk kesehatan keluarga, saya selalu pakai madu ini.", date: "2025-11-22" }
    ]
  },
  {
    id: 6,
    name: "Ukiran Kayu Jepara",
    price: 1200000,
    originalPrice: 1500000,
    category: "kerajinan",
    rating: 4.8,
    reviewCount: 12,
    image: "https://tempatwisatajeparablog.wordpress.com/wp-content/uploads/2017/01/kaligrafi1.jpg",
    badge: "Premium",
    location: "Jepara, Jawa Tengah",
    seller: "Mas Joko Ukir",
    sellerImage: "https://i.pravatar.cc/100?img=12",
    description: "Hiasan dinding ukiran kayu jati asli Jepara dengan motif flora Nusantara. Diukir tangan oleh maestro ukir berpengalaman. Finishing natural yang menonjolkan keindahan serat kayu jati. Dimensi 60x40 cm.",
    story: "Mas Joko belajar mengukir sejak usia 12 tahun di bengkel ukir keluarganya. Kini di usia 40 tahun, ia dikenal sebagai salah satu maestro ukir terbaik di Jepara. 'Setiap ukiran punya jiwa. Saya tidak sekadar memahat kayu, tapi menghidupkan cerita di dalamnya,' ujar Mas Joko. Karyanya telah dipamerkan di berbagai galeri seni Internasional.",
    reviews: [
      { name: "Lina Marlina", rating: 5, comment: "Detailnya luar biasa! Jadi centerpiece ruang tamu saya.", date: "2025-12-05" },
      { name: "Michael Tan", rating: 5, comment: "Worth the price. Karya seni sejati dari Jepara.", date: "2025-11-10" }
    ]
  },
  {
    id: 7,
    name: "Tenun Ikat Flores",
    price: 699999,
    originalPrice: 899999,
    category: "fashion",
    rating: 4.7,
    reviewCount: 15,
    image: "https://mloymite.wordpress.com/wp-content/uploads/2014/07/ragam_hias_tenun_ntt.jpg",
    badge: "Eksklusif",
    location: "Ende, Flores, NTT",
    seller: "Mama Maria Tenun",
    sellerImage: "https://i.pravatar.cc/100?img=16",
    description: "Kain tenun ikat tradisional dari Flores dengan pewarna alami dari tumbuhan lokal. Motif tradisional yang sarat makna filosofis. Proses pembuatan memakan waktu 2-3 bulan per lembar.",
    story: "Mama Maria adalah penenun dari desa Wolotopo, Ende. Baginya, menenun bukan sekadar membuat kain, tapi menyampaikan pesan dari nenek moyang. Setiap motif punya arti: ada yang melambangkan kesuburan, persatuan, dan rasa syukur kepada alam. 'Saat menenun, saya berdoa. Kain ini membawa berkat bagi yang memakainya,' kata Mama Maria.",
    reviews: [
      { name: "Novi Anggraini", rating: 5, comment: "Kain tenunnya indah sekali. Warna alaminya sangat unik.", date: "2025-12-08" },
      { name: "Oscar Putra", rating: 4, comment: "Kualitas premium, motifnya sangat bermakna.", date: "2025-11-18" }
    ]
  },
