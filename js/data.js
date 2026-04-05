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
  {
    id: 8,
    name: "Keripik Tempe Malang",
    price: 35000,
    originalPrice: 40000,
    category: "makanan",
    rating: 4.5,
    reviewCount: 67,
    image: "https://www.finnafood.com/blog/wp-content/uploads/2024/08/keripik-tempe-malang.jpg",
    badge: "Favorit",
    location: "Malang, Jawa Timur",
    seller: "Mbak Rina Sari",
    sellerImage: "https://i.pravatar.cc/100?img=20",
    description: "Keripik tempe renyah khas Malang dengan bumbu rempah pilihan. Tersedia varian original, balado, dan keju. Tanpa MSG, menggunakan tempe segar pilihan. Kemasan ziplock 200gr.",
    story: "Mbak Rina memulai bisnis keripik tempe dari dapur rumahnya 5 tahun lalu setelah ter-PHK. Dengan modal Rp500 ribu, ia mulai memasak dan menitipkan ke warung-warung. Kini produknya sudah merambah marketplace nasional dan mempekerjakan 20 ibu rumah tangga di kampungnya. 'Tempe itu protein rakyat, saya ingin mengangkat nilainya,' kata Mbak Rina.",
    reviews: [
      { name: "Putri Ayu", rating: 5, comment: "Renyah banget, bumbu meresap sempurna!", date: "2025-12-12" },
      { name: "Qori Mahendra", rating: 4, comment: "Enak, cocok buat camilan. Varian balado favorit saya.", date: "2025-11-25" }
    ]
  },
  {
    id: 9,
    name: "Sabun Natural Bali",
    price: 65000,
    originalPrice: 80000,
    category: "kecantikan",
    rating: 4.6,
    reviewCount: 38,
    image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=600&h=400&fit=crop",
    badge: "Natural",
    location: "Ubud, Bali",
    seller: "Made Ayu Naturals",
    sellerImage: "https://i.pravatar.cc/100?img=25",
    description: "Set sabun natural handmade dari Bali. Terbuat dari bahan-bahan organik: minyak kelapa virgin, essential oil, dan bunga-bunga tropis Bali. Tanpa SLS, paraben, dan bahan kimia keras. Isi 3 pcs.",
    story: "Made Ayu terinspirasi dari tradisi kecantikan Bali kuno yang menggunakan bahan-bahan alami. Setelah belajar saponification di workshop internasional, ia menciptakan lini sabun natural yang menggabungkan wisdom Bali dengan teknik modern. 'Kulit kita layak mendapat yang terbaik dari alam,' filosofi Made Ayu.",
    reviews: [
      { name: "Ratna Sari", rating: 5, comment: "Wanginya natural dan tahan lama. Kulit jadi halus!", date: "2025-12-14" },
      { name: "Sarah Chen", rating: 4, comment: "Love the packaging and the quality. Very gentle.", date: "2025-11-30" }
    ]
  },
  {
    id: 10,
    name: "Gula Aren Organik",
    price: 55000,
    originalPrice: 70000,
    category: "makanan",
    rating: 4.7,
    reviewCount: 29,
    image: "https://img.lazcdn.com/g/ff/kf/S4c59384345844194bb12ee38fffc863a5.jpg_720x720q80.jpg",
    badge: "Organik",
    location: "Pangandaran, Jawa Barat",
    seller: "Pak Dede Aren",
    sellerImage: "https://i.pravatar.cc/100?img=30",
    description: "Gula aren murni dari nira pohon aren Pangandaran. Diolah secara tradisional tanpa bahan kimia. Rendah indeks glikemik, cocok sebagai pengganti gula pasir. Kemasan 500gr.",
    story: "Pak Dede setiap pagi pukul 4 subuh memanjat pohon aren untuk mengambil nira segar. Proses memasak nira menjadi gula aren memakan waktu 6-8 jam dengan api kayu bakar. 'Gula aren itu seperti emas coklat. Prosesnya panjang tapi hasilnya manis untuk semua,' kata Pak Dede yang telah 20 tahun menjadi penderes aren.",
    reviews: [
      { name: "Tania Putri", rating: 5, comment: "Gula aren terbaik! Wanginya harum, manisnya pas.", date: "2025-12-16" },
      { name: "Umar Bakri", rating: 4, comment: "Sudah switch dari gula pasir ke gula aren ini. Lebih sehat!", date: "2025-11-08" }
    ]
  },
  {
    id: 11,
    name: "Wayang Kulit Mini",
    price: 180000,
    originalPrice: 250000,
    category: "kerajinan",
    rating: 4.9,
    reviewCount: 9,
    image: "https://cf.shopee.co.id/file/id-11134207-7rbk3-m6zhpde0b8to68",
    badge: "Limited",
    location: "Solo, Jawa Tengah",
    seller: "Ki Dalang Suroto",
    sellerImage: "https://i.pravatar.cc/100?img=33",
    description: "Wayang kulit mini dekoratif, dibuat dari kulit kerbau asli dengan pewarnaan tradisional. Tinggi 30cm, lengkap dengan gapit bambu. Tokoh: Arjuna. Cocok untuk koleksi atau hiasan.",
    story: "Ki Dalang Suroto bukan hanya dalang wayang kulit, tapi juga pengrajin wayang terbaik di Solo. Beliau membuat versi mini agar generasi muda bisa mengenal wayang tanpa harus ke pertunjukan. 'Wayang itu ensiklopedia kehidupan Jawa. Saya ingin anak muda setidaknya punya satu di kamarnya,' harap Ki Dalang.",
    reviews: [
      { name: "Vina Kusuma", rating: 5, comment: "Detail ukirannya luar biasa halus. Karya seni!", date: "2025-12-02" },
      { name: "Wawan Setiawan", rating: 5, comment: "Beli untuk oleh-oleh, penerimanya sangat senang.", date: "2025-11-12" }
    ]
  },
  {
    id: 12,
    name: "Teh Herbal Jawa",
    price: 42000,
    originalPrice: 50000,
    category: "makanan",
    rating: 4.5,
    reviewCount: 33,
    image: "https://static.uc.ac.id/fikom/2022/03/pic-1-scaled.jpg",
    badge: "Sehat",
    location: "Tawangmangu, Jawa Tengah",
    seller: "Bu Herbal Jawi",
    sellerImage: "https://i.pravatar.cc/100?img=38",
    description: "Teh herbal premium campuran jahe merah, temulawak, sereh, dan kayu manis. Tanpa kafein, cocok diminum hangat maupun dingin. Khasiat: meningkatkan imunitas dan melancarkan pencernaan. Isi 20 sachet.",
    story: "Bu Yanti, sang pemilik usaha Herbal Jawi, adalah seorang herbalis yang belajar dari kitab-kitab jamu kuno peninggalan keluarganya. Ia meracik teh herbal dengan formula yang telah teruji selama generasi. 'Alam sudah menyediakan obat untuk segala penyakit. Tugas kita hanya meramunya dengan benar,' kata Bu Yanti.",
    reviews: [
      { name: "Xenia Putri", rating: 5, comment: "Segar dan menyehatkan. Jadi rutinitas pagi saya.", date: "2025-12-09" },
      { name: "Yoga Firmansyah", rating: 4, comment: "Rasanya enak, tidak pahit. Recommended!", date: "2025-11-20" }
    ]
  }
];
// Kategori
const categories = [
  { id: "semua", name: "Semua Produk", icon: "" },
  { id: "makanan", name: "Makanan & Minuman", icon: "" },
  { id: "kerajinan", name: "Kerajinan Tangan", icon: "" },
  { id: "fashion", name: "Fashion & Tekstil", icon: "" },
  { id: "kecantikan", name: "Kecantikan", icon: "" }
];
// Cerita UMKM untuk halaman Stories
const umkmStories = [
  {
    id: 1,
    title: "Dari Canting Hingga Dunia: Perjalanan Batik Bu Siti",
    excerpt: "Kisah inspiratif seorang ibu yang mempertahankan warisan batik tulis Cirebon selama 30 tahun.",
    content: `Bu Siti Rahayu memulai perjalanan batiknya di usia yang sangat muda. Setiap sore setelah pulang sekolah, ia duduk di samping ibunya, memperhatikan dengan seksama bagaimana canting dicelupkan ke dalam malam panas dan digoreskan ke atas kain putih.

"Ibu selalu bilang, membatik itu seperti menulis surat cinta kepada budaya kita," kenang Bu Siti.

Tahun 1995, Bu Siti resmi membuka usaha batik sendiri dengan nama "Batik Mega Siti." Awalnya hanya bermodalkan 5 lembar kain dan satu set canting usang milik ibunya. Pesanan pertamanya datang dari seorang turis Jepang yang terpesona melihat Bu Siti membatik di halaman rumahnya.

Perjalanan tidak selalu mulus. Krisis ekonomi 1998 hampir membuat usahanya gulung tikar. Namun, Bu Siti tetap bertahan. "Saya tidak bisa berhenti membatik. Ini bukan sekadar pekerjaan, ini identitas saya," tegasnya.

Kini, Batik Mega Siti mempekerjakan 15 pembatik muda dari desa sekitar. Bu Siti juga rutin mengajar batik di sekolah-sekolah, memastikan seni warisan UNESCO ini terus hidup di tangan generasi baru.

"Setiap helai batik yang saya buat membawa harapan — harapan bahwa anak cucu kita masih akan mengenal dan mencintai batik."`,
    image: "https://engrasia.com/cdn/shop/products/5a98a06a-cf05-4f29-a684-7a824bba86b5.jpg?v=1571439195&width=800",
    author: "Tim LokalN",
    date: "2025-12-01",
    category: "Kerajinan",
    readTime: "5 menit"
  },
  {
    id: 2,
    title: "Kopi Gayo: Dari Puncak Gunung ke Cangkir Dunia",
    excerpt: "Bagaimana petani kopi di dataran tinggi Gayo mengubah biji kopi menjadi emas hitam berkelas dunia.",
    content: `Di ketinggian 1.400 meter di atas permukaan laut, di antara kabut pagi yang dingin dan tanah vulkanik yang subur, tumbuh salah satu kopi terbaik di dunia — Kopi Arabika Gayo.

Pak Ahmad, 55 tahun, adalah petani kopi generasi ketiga di Takengon, Aceh. Setiap pagi sebelum fajar, ia sudah berada di kebun kopinya, memeriksa buah-buah kopi yang perlahan berubah merah.

"Kakek saya menanam pohon kopi pertama di lahan ini tahun 1960-an. Sekarang saya yang merawatnya, dan nanti anak saya yang akan melanjutkan," kata Pak Ahmad.

Proses dari pohon ke cangkir tidaklah sederhana. Buah kopi dipetik satu per satu secara selektif — hanya yang benar-benar merah matang. Kemudian dicuci, difermentasi, dikeringkan di bawah matahari, dan disortir manual.

Tahun 2018, kopi dari koperasi Pak Ahmad meraih skor 87 di penilaian Specialty Coffee Association — sebuah pencapaian yang membuka pintu ekspor ke Eropa dan Jepang.

"Dulu orang bilang jadi petani kopi itu miskin. Sekarang saya buktikan, petani kopi bisa hidup sejahtera dan dihormati," ujar Pak Ahmad dengan bangga.`,
    image: "https://d8g5mz6srwlcs.cloudfront.net/original/66c837bb96b37850191467.jpg",
    author: "Tim LokalN",
    date: "2025-11-15",
    category: "Makanan & Minuman",
    readTime: "6 menit"
  },
  {
    id: 3,
    title: "Anyaman Rotan: Warisan Dayak yang Mendunia",
    excerpt: "Komunitas pengrajin rotan di Kalimantan yang melestarikan tradisi anyaman suku Dayak.",
    content: `Di sebuah desa kecil di pedalaman Kalimantan Selatan, suara gesekan rotan terdengar berirama. Ibu Mariani, 48 tahun, duduk di beranda rumahnya, jari-jarinya dengan lincah menganyam helai demi helai rotan menjadi sebuah tas yang indah.

"Saya belajar menganyam dari nenek saya. Dulu, anyaman rotan digunakan untuk keperluan sehari-hari — bakul nasi, tikar, dan tempat penyimpanan. Sekarang, kami mengubahnya menjadi produk fashion," cerita Ibu Mariani.

Perjalanan transformasi ini dimulai tahun 2019, ketika seorang desainer muda dari Jakarta mengunjungi desanya. Ia melihat potensi luar biasa dari kerajinan anyaman Dayak dan mengajak komunitas Ibu Mariani berkolaborasi.

Hasilnya menakjubkan. Tas anyaman rotan mereka kini dijual di butik-butik Jakarta dan bahkan pernah tampil di sebuah fashion show internasional. Harga yang dulunya hanya puluhan ribu, kini bisa mencapai ratusan ribu rupiah.

Komunitas Ibu Mariani kini beranggotakan 30 perempuan Dayak. Mereka tidak hanya menganyam, tapi juga mengajarkan teknik ini kepada gadis-gadis muda di desa.

"Kami ingin dunia tahu bahwa tangan-tangan perempuan Dayak bisa menciptakan keindahan yang tak ternilai."`,
    image: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/114/MTA-183258798/brd-132309_keris-gallery-tas-rotan-anyam-tabung-dengan-tali-kulit-panjang_full01-aa44c42a.webp",
    author: "Tim LokalN",
    date: "2025-10-20",
    category: "Kerajinan",
    readTime: "5 menit"
  },
  {
    id: 4,
    title: "Madu Hutan Sumbawa: Manisnya Perjuangan Sang Pemburu",
    excerpt: "Kisah Pak Hamzah yang memanjat pohon 30 meter demi madu hutan murni terbaik Indonesia.",
    content: `Pukul 3 dini hari, saat sebagian besar orang masih terlelap, Pak Hamzah sudah bersiap memasuki hutan belantara Sumbawa. Bekal air, tali, dan wadah bambu menggantung di pundaknya. Hari ini, ia akan berburu madu.

Pak Hamzah, 50 tahun, adalah pemburu madu generasi keempat. Keahlian ini diwariskan melalui ritual khusus dari ayah ke anak. "Tidak semua orang bisa menjadi pemburu madu. Ada ilmu dan doa khusus yang harus dikuasai," jelasnya.

Pohon-pohon sialang tempat lebah bersarang bisa mencapai ketinggian 40 meter. Pak Hamzah memanjatnya tanpa pengaman modern — hanya tali rotan dan keberanian. Di puncak, ia menyalakan obor dari sabut kelapa untuk mengusir lebah, lalu dengan hati-hati mengambil sarang madu.

"Kami tidak mengambil semua. Selalu disisakan untuk lebah membangun kembali. Itu aturan hutan," kata Pak Hamzah tentang prinsip sustainability yang telah dipraktikkan leluhurnya jauh sebelum istilah itu populer.

Madu hutan Sumbawa dikenal memiliki kualitas istimewa karena lebah mengambil nektar dari beragam bunga hutan tropis. Rasanya kompleks — manis, sedikit asam, dengan aroma bunga yang khas.

Sekarang, dengan bantuan marketplace online, madu Pak Hamzah bisa menjangkau konsumen di seluruh Indonesia. Penghasilan meningkat, tapi Pak Hamzah tetap setia pada cara tradisional.

"Hutan ini memberi kami madu, kayu, air, dan udara. Sudah sepantasnya kami menjaganya."`,
    image: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//101/MTA-1968094/madu-sumbawa_madu-hitam-asli-sumbawa-100--murni_full02.jpg",
    author: "Tim LokalN",
    date: "2025-09-10",
    category: "Makanan & Minuman",
    readTime: "7 menit"
  }
];
