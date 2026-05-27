const OfflineExpertSystem = {
  // Kumpulan Aturan Logika Berbasis Pengetahuan Pakar
rules: [
    {
      id: 1,
      keywords: [
        "bercak belah ketupat",
        "pusat abu-abu",
        "tepi coklat kemerahan",
        "ujung runcing",
        "leher malai busuk",
        "pyricularia",
        "blast"
      ],
      data: {
        nama_hama: "Blast (Pyricularia oryzae)",
        tingkat_keyakinan: "80",
        deskripsi:
          "Terdeteksi bercak khas berbentuk belah ketupat simetris dengan pusat berwarna abu-abu/putih dan tepi coklat kemerahan. Pada stadium lanjut, menyerang leher malai hingga patah/busuk.",
        rekomendasi:
          "Semprotkan fungisida sistemik berbahan aktif Isoprothiolane atau Trisiklazol. Kurangi aplikasi pupuk Nitrogen dosis tinggi dan hindari kelembaban mikro berlebih pada sawah.",
        jenis_obat: "Isoprothiolane / Trisiklazol",
        status: "Segera Ditangani",
      },
    },
    {
      id: 2,
      keywords: [
        "kuning merata",
        "daun menguning dari ujung",
        "serangga pangkal batang",
        "koloni coklat kecil",
        "hopperburn",
        "wereng coklat"
      ],
      data: {
        nama_hama: "Wereng Coklat (Nilaparvata lugens)",
        tingkat_keyakinan: "85",
        deskripsi:
          "Daun mengalami klorosis menguning rata dimulai dari ujung daun meluas ke bawah, disertai koloni serangga kecil berbentuk kepik coklat yang mengumpul di pangkal batang padi di atas permukaan air.",
        rekomendasi:
          "Keringkan sela-sela petakan sawah secara berselang (intermittent irrigation). Aplikasikan insektisida sistemik berbahan aktif Pimetrozin atau Imidakloprid langsung ke pangkal batang.",
        jenis_obat: "Insektisida Pimetrozin / Imidakloprid",
        status: "Segera Ditangani",
      },
    },
    {
      id: 3,
      keywords: [
        "bercak oval bulat",
        "bercak coklat gelap",
        "halo kuning",
        "tepi lingkaran penuh",
        "permukaan daun tua",
        "helminthosporium"
      ],
      data: {
        nama_hama: "Bercak Coklat (Helminthosporium oryzae)",
        tingkat_keyakinan: "75",
        deskripsi:
          "Terdapat luka atau lesi berbentuk bulat telur (oval) hingga sferis berwarna coklat gelap merata, dikelilingi lingkaran kuning tipis (halo) di sepanjang permukaan helai daun tua.",
        rekomendasi:
          "Perbaiki status hara tanah dengan menambah dosis aplikasi pupuk Kalium (KCl). Aplikasikan fungisida protektif berbahan aktif Mancozeb secara berkala.",
        jenis_obat: "Fungisida Mancozeb / Kobalt Sulfat",
        status: "Aman Dipantau",
      },
    },
    {
      id: 4,
      keywords: [
        "garis basah pinggir",
        "pola v-shape",
        "hawar bergelombang",
        "daun kering layu keabu-abuan",
        "kresek",
        "xanthomonas"
      ],
      data: {
        nama_hama: "Hawar Daun Bakteri (Xanthomonas oryzae)",
        tingkat_keyakinan: "82",
        deskripsi:
          "Gejala hawar (kresek) dimulai dari tepi/pinggiran daun berupa garis hijau kemerahan/basah, meluas ke arah tulang daun membentuk pola V-shape dengan tepi bergelombang kering keabu-abuan.",
        rekomendasi:
          "Kurangi debit genangan air di sawah. Potong dan musnahkan tanaman yang rusak parah. Semprotkan bakterisida organik atau antibiotik pertanian berbahan aktif Streptomisin.",
        jenis_obat: "Bakterisida Streptomisin Sulfat / Tembaga Hidroksida",
        status: "Segera Ditangani",
      },
    },
    {
      id: 5,
      keywords: [
        "lubang gerek",
        "pucuk layu kering",
        "dead heart",
        "sundep",
        "beluk malai hampa",
        "scirpophaga"
      ],
      data: {
        nama_hama: "Penggerek Batang / Sundep (Scirpophaga innotata)",
        tingkat_keyakinan: "88",
        deskripsi:
          "Ditemukan lubang gerek kecil pada struktur pelepah atau batang bawah. Menyebabkan pucuk tengah layu mati yang mudah dicabut pada fase vegetatif (sundep) atau malai hampa memutih pada fase generatif (beluk).",
        rekomendasi:
          "Taburkan insektisida granular berbahan aktif Karbofuran sesuai dosis rekomendasi di permukaan tanah petakan sawah. Manfaatkan agen hayati tawon parasitoid Trichogramma.",
        jenis_obat: "Insektisida Granular Karbofuran",
        status: "Segera Ditangani",
      },
    },
  ],

  analyze(textDescription) {
    if (!textDescription) return null;
    const normalizedText = textDescription.toLowerCase();

    let bestMatch = null;
    let maxHits = 0;

    for (const rule of this.rules) {
      let currentHits = 0;
      for (const keyword of rule.keywords) {
        if (normalizedText.includes(keyword)) {
          currentHits++;
        }
      }
      if (currentHits > maxHits) {
        maxHits = currentHits;
        bestMatch = rule.data;
      }
    }

    return (
      bestMatch || {
        nama_hama: "Penyakit Tidak Dikenali (Database Offline)",
        tingkat_keyakinan: "0",
        deskripsi:
          "Kombinasi gejala yang Anda masukkan tidak cocok dengan aturan internal kami.",
        rekomendasi:
          "Sistem menyarankan Anda segera beralih ke Mode Online agar foto daun padi diproses secara menyeluruh menggunakan kecerdasan buatan Gemini AI Flash.",
        jenis_obat: "N/A",
        status: "Aman Dipantau",
      }
    );
  },
};
