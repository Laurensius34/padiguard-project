const ResultCard = {
  render(state, lang) {
    const res = state.analysisResult;
    const isUrgent = res.status === "Segera Ditangani";

    return `
      <div id="diagnostic-pdf-target" class="border-t pt-8 space-y-6 animate-slide-up rounded-2xl transition-all duration-300 ${state.isDarkMode ? "border-slate-800 bg-slate-900/40" : "border-zinc-200/60 bg-white/40 backdrop-blur-sm"}">
        
        <div class="flex items-center justify-between gap-4">
            <h3 class="text-xs font-black tracking-widest text-emerald-600 dark:text-emerald-400 uppercase flex items-center gap-2">
                <span class="p-1 rounded bg-emerald-600/10 dark:bg-emerald-400/10">
                    <i data-lucide="shield-alert" class="w-4 h-4"></i>
                </span>
                <span>${lang.resultTitle}</span>
            </h3>
            
            <span class="text-xs px-3 py-1.5 rounded-full font-bold shadow-sm border ${
              isUrgent
                ? "bg-red-50 text-red-600 border-red-100 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/30"
                : "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/30"
            }">
                ⚠️ ${res.status}
            </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
            <div class="p-4 rounded-xl border ${state.isDarkMode ? "bg-slate-950/60 border-slate-800/60" : "bg-zinc-100/50 border-zinc-200/40"}">
                <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">Jenis Hama/Penyakit</span>
                <span class="text-lg font-black ${state.isDarkMode ? "text-slate-100" : "text-slate-900"}">${res.nama_hama}</span>
            </div>
            
            <div class="p-4 rounded-xl border ${state.isDarkMode ? "bg-slate-950/60 border-slate-800/60" : "bg-zinc-100/50 border-zinc-200/40"}">
                <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">${lang.confidence}</span>
                <div class="flex items-center gap-3 mt-2">
                    <div class="w-full bg-zinc-200 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden shadow-inner">
                        <div class="bg-gradient-to-r from-emerald-500 to-green-400 h-2.5 rounded-full transition-all duration-500" style="width: ${res.tingkat_keyakinan}%"></div>
                    </div>
                    <span class="text-sm font-black text-emerald-600 dark:text-emerald-400">${res.tingkat_keyakinan}%</span>
                </div>
            </div>
        </div>

        <div class="space-y-4 text-sm font-medium">
            <div class="space-y-1.5">
                <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">Diagnosis Gejala</span>
                <p class="leading-relaxed border p-4 rounded-xl shadow-inner ${state.isDarkMode ? "text-slate-300 bg-slate-950/40 border-slate-800/60" : "text-slate-700 bg-zinc-50/60 border-zinc-200/30"}">
                    ${res.deskripsi}
                </p>
            </div>

            <div class="space-y-1.5">
                <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">${lang.treatment}</span>
                <p class="leading-relaxed border p-4 rounded-xl shadow-inner ${state.isDarkMode ? "text-slate-300 bg-slate-950/40 border-slate-800/60" : "text-slate-700 bg-zinc-50/60 border-zinc-200/30"}">
                    ${res.rekomendasi}
                </p>
            </div>

            <div class="space-y-1.5">
                <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">${lang.medicine}</span>
                <div class="p-4 rounded-xl border flex items-center gap-3 font-bold ${state.isDarkMode ? "bg-emerald-950/20 border-emerald-900/30 text-emerald-400" : "bg-emerald-50/60 border-emerald-100 text-emerald-800"}">
                    <div class="p-2 rounded-lg bg-emerald-500/10 shadow-inner">
                        <i data-lucide="beaker" class="w-4 h-4 flex-shrink-0"></i>
                    </div>
                    <span class="text-sm">${res.jenis_obat}</span>
                </div>
            </div>
        </div>

        <div id="wrapper-aksi-pdf" class="pt-4 border-t flex justify-end ${state.isDarkMode ? "border-slate-800" : "border-zinc-200/60"}">
            <button type="button" onclick="ResultCard.downloadPDF()" class="group border text-xs font-bold px-5 py-2.5 rounded-xl transition-all duration-300 shadow-sm flex items-center gap-2 transform hover:-translate-y-0.5 ${state.isDarkMode ? "border-slate-700 text-slate-300 bg-slate-800 hover:bg-slate-700" : "border-zinc-200 text-slate-700 bg-white hover:bg-zinc-50"}">
                <i data-lucide="printer" class="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500 transition-colors"></i> 
                <span>Cetak / Simpan PDF</span>
            </button>
        </div>

      </div>
    `;
  },

  downloadPDF() {
    const originalElement = document.getElementById("diagnostic-pdf-target");
    if (!originalElement) return;

    // 1. Buat kloningan elemen laporan
    const clonedElement = originalElement.cloneNode(true);

    // 2. Singkirkan tombol cetak agar lembar PDF bersih
    const actionWrapper = clonedElement.querySelector("#wrapper-aksi-pdf");
    if (actionWrapper) actionWrapper.remove();

    // 3. Buat Iframe tersembunyi di dalam dokumen untuk proses cetak mandiri
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;

    // 4. Suntikkan CDN Tailwind & Core CSS ke dalam Iframe agar tampilan PDF tetap estetik
    doc.write(`
      <html>
        <head>
          <title>Laporan Diagnosis PadiGuard</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { font-family: system-ui, sans-serif; padding: 40px; background: white; color: #0f172a; }
            @media print {
              body { padding: 0; }
              @page { margin: 15mm; }
            }
          </style>
        </head>
        <body>
          <div class="max-w-3xl mx-auto">
            <div class="mb-6 pb-4 border-b-2 border-emerald-600 flex justify-between items-center">
              <h1 class="text-xl font-black text-slate-900">
              <img src="../img/logo-padiguard.png" alt="PadiGuard Logo" class="w-10 h-10 rounded-full inline-block mr-2">
              PADI<span class="text-emerald-600">GUARD</span> REPORT</h1>
              <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">Sistem Pakar Komoditas Padi</p>
            </div>
            ${clonedElement.innerHTML}
          </div>
        </body>
      </html>
    `);
    doc.close();

    // 5. Picu perintah cetak browser bawaan setelah aset CSS Tailwind terisi sempurna
    iframe.contentWindow.focus();
    setTimeout(() => {
      iframe.contentWindow.print();
      // Bersihkan sisa objek iframe dari memori DOM setelah dialog cetak ditutup
      document.body.removeChild(iframe);
    }, 750);
  },
};

window.ResultCard = ResultCard;
