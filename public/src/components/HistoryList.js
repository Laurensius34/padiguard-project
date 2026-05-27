const HistoryList = {
    render(state, lang) {
        if (!state.history || state.history.length === 0) {
            return `
        <div class="mt-12 text-center py-8 opacity-60">
            <p class="text-sm text-slate-400">${lang.noHistory}</p>
        </div>
      `;
        }

        return `
      <div class="mt-12 space-y-4">
        <div class="flex items-center justify-between">
            <h3 class="text-md font-bold tracking-tight text-slate-500 uppercase flex items-center gap-1">
                <i data-lucide="history" class="w-4 h-4"></i> ${lang.historyTitle} (${state.history.length})
            </h3>
            <button onclick="HistoryList.clearHistory()" class="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors">Hapus Semua</button>
        </div>

        <div class="space-y-3 max-h-96 overflow-y-auto pr-1">
            ${state.history
                .map(
                    (item, index) => `
                <div onclick="HistoryList.selectHistory(${index})" 
                     class="p-4 rounded-xl border transition-all duration-300 flex items-start justify-between gap-4 cursor-pointer transform hover:-translate-y-0.5 shadow-sm hover:shadow-md ${state.analysisResult && state.analysisResult.timestamp === item.timestamp
                            ? "border-emerald-500 bg-emerald-500/[0.02] dark:bg-emerald-500/[0.04]"
                            : "border-slate-100 dark:border-slate-700/60 bg-white dark:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-600"
                        }">
                    
                    <div class="space-y-1 min-w-0 flex-grow">
                        <div class="flex items-center gap-2 flex-wrap">
                            <h4 class="font-bold text-sm text-slate-800 dark:text-slate-100">${item.nama_hama}</h4>
                            <span class="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${item.mode === "AI Online"
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                            : "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                        }">${item.mode || 'Sistem Pakar'}</span>
                        </div>
                        <p class="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                            <i data-lucide="calendar" class="w-3 h-3"></i> ${item.timestamp}
                        </p>
                        <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-1 font-medium">${item.deskripsi}</p>
                    </div>

                    <div class="text-right flex-shrink-0">
                        <span class="text-xs font-black text-emerald-600 dark:text-emerald-400 block">${item.tingkat_keyakinan}%</span>
                        <span class="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">Akurasi</span>
                    </div>

                </div>
            `,
                )
                .join("")}
        </div>
      </div>
    `;
    },

    selectHistory(index) {
        const selectedData = StateManager.state.history[index];
        if (!selectedData) return;

        // 1. Masukkan data riwayat lama ke dalam state aktif dashboard
        StateManager.state.analysisResult = selectedData;

        // 2. Render ulang aplikasi agar ResultCard muncul menampilkan data ini
        StateManager.renderApp();

        // 3. Tampilkan toast info beralih riwayat
        StateManager.showToast(`Memuat data diagnosa: ${selectedData.nama_hama}`, "success");

        // 4. Lakukan smooth scroll otomatis mengarah ke elemen dashboard diagnosis agar user bisa langsung membaca/mencetak PDF
        setTimeout(() => {
            const targetElement = document.getElementById("diagnostic-pdf-target");
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }, 150);
    },

    clearHistory() {
        if (confirm("Apakah Anda yakin ingin menghapus seluruh riwayat deteksi?")) {
            localStorage.removeItem("padiguard_history");
            StateManager.state.history = [];

            // Jika riwayat dihapus, reset juga dashboard tampilan aktifnya jika sedang terbuka
            StateManager.state.analysisResult = null;

            StateManager.renderApp();
            StateManager.showToast("Seluruh riwayat konsultasi berhasil dibersihkan.", "info");
        }
    },
};

// Daftarkan ke global window
window.HistoryList = HistoryList;