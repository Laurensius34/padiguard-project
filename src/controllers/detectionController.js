import ai from "../config/gemini.js";

export const analyzeLeafImage = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "File gambar daun wajib diunggah." });
    }

    const imagePart = {
      inlineData: {
        data: req.file.buffer.toString("base64"),
        mimeType: req.file.mimetype,
      },
    };

    const prompt = `
Anda adalah Sistem Pakar Agronomi dan AI Vision khusus untuk komoditas tanaman padi (Oryza sativa). Tugas Anda adalah menganalisis gambar tanaman/daun padi yang diunggah oleh petani secara saksama, lalu memberikan diagnosis presisi tinggi.

TAHAPAN ANALISIS WAJIB (Lakukan penalaran internal terlebih dahulu sebelum menentukan hasil):
1. Pengamatan Visual Makroskopis: Amati bentuk kelainan (bercak berbentuk belah ketupat, bulat oval, atau garis hawar memanjang), warna pusat lesi, warna tepi lesi (apakah ada halo kuning), dan lokasi kemunculan (apakah di permukaan daun, pelepah, atau pangkal batang).
2. Diferensiasi Gejala (Pembedaan): Bandingkan gejala yang mirip. Misalnya, bedakan antara Blast (belah ketupat, pusat abu-abu) dengan Bercak Coklat (oval bulat penuh, bercak solid) atau Hawar Daun Bakteri (pola V-shape mengering dari pinggir daun) agar tidak terjadi salah deteksi.
3. Penentuan Diagnosis: Tentukan jenis penyakit, hama, atau defisiensi unsur hara yang paling akurat berdasarkan bukti visual tersebut. Anda TIDAK TERBATAS pada Wereng Coklat, Blast, Bercak Coklat, Hawar Daun, atau Sundep saja. Jika ditemukan penyakit lain (seperti Tungro, Busuk Batang, Palsu Smut, atau Defisiensi Kalium/Nitrogen), sebutkan secara spesifik beserta nama ilmiahnya.

STRUKTUR OUTPUT:
Anda WAJIB memberikan output respon HANYA dalam format JSON yang valid, bersih, tanpa pembungkus markdown (JANGAN gunakan \`\`\`json ... \`\`\`), dan mengikuti skema struktur berikut:

{
  "nama_hama": "Nama Penyakit/Hama Umum (Nama Ilmiah dalam kurung italic jika ada). Contoh: Tungro (Rice Tungro Virus)",
  "tingkat_keyakinan": "Angka persentase keyakinan analisis Anda berdasarkan kejelasan visual, rentang 0-100 tanpa simbol %. Contoh: 92",
  "deskripsi": "Penjelasan gejala fisik yang terlihat di foto menggunakan bahasa yang sederhana, taktis, dan mudah dipahami oleh petani tradisional.",
  "rekomendasi": "Langkah penanganan konkret secara agrikultural, meliputi tindakan kultur teknis (pengairan/pemupukan), mekanis, atau biologis.",
  "jenis_obat": "Rekomendasi bahan aktif pestisida/fungisida/bakterisida yang spesifik, atau sebutkan tindakan organik/mekanis jika tidak memerlukan kimia.",
  "status": "Hanya pilih salah satu dari dua opsi ini: 'Segera Ditangani' (jika mengancam gagal panen/menular cepat) atau 'Aman Dipantau' (jika gejala ringan/defisiensi hara awal)"
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [prompt, imagePart],
    });

    const responseText = response.text.trim();

    // Membersihkan jika Gemini secara tidak sengaja membungkusnya dalam markdown
    const cleanJsonString = responseText
      .replace(/^```json\s*/i, "")
      .replace(/\s*```$/, "");
    const resultData = JSON.parse(cleanJsonString);

    return res.status(200).json({ success: true, data: resultData });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({
      success: false,
      message:
        "Gagal menganalisis gambar secara online via AI. Sistem menyarankan beralih ke Mode Offline.",
    });
  }
};
