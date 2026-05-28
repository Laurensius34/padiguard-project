const DetectionDashboard = {
  render(state, lang) {
    return `
            <section id="dashboard-deteksi" class="relative min-h-screen flex flex-col justify-center py-24 w-full  ${state.isDarkMode ? "bg-slate-950" : "bg-gradient-to-br from-zinc-50 via-emerald-50/20 to-zinc-100/80"}">
    
    <div class="max-w-4xl mx-auto px-4 sm:px-6 w-full relative z-10">
        
        <div class="mb-8 p-4 rounded-2xl border transition-all duration-300 ${
          state.isOnline
            ? "bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-500/20 dark:border-emerald-500/10 shadow-sm shadow-emerald-500/5"
            : "bg-amber-50/40 dark:bg-amber-950/20 border-amber-500/20 dark:border-amber-500/10 shadow-sm shadow-amber-500/5"
        }">
            <div class="flex items-start gap-4">
                <div class="p-2.5 rounded-xl ${state.isOnline ? "bg-emerald-600 text-white shadow-emerald-500/20" : "bg-amber-600 text-white shadow-amber-500/20"} shadow-md">
                    <i data-lucide="${state.isOnline ? "globe" : "wifi-off"}" class="w-5 h-5"></i>
                </div>
                <div class="space-y-0.5">
                    <h4 class="font-black text-sm ${state.isDarkMode ? "text-slate-200" : "text-slate-900"} flex items-center gap-2">
                        <span>${state.isOnline ? lang.onlineMode : lang.offlineMode} Aktif</span>
                        <span class="h-2 w-2 rounded-full ${state.isOnline ? "bg-emerald-500 animate-pulse" : "bg-amber-500 animate-pulse"}"></span>
                    </h4>
                    <p class="text-xs font-medium leading-relaxed ${state.isDarkMode ? "text-slate-400" : "text-slate-600"}">
                        ${state.isOnline ? lang.onlineDesc : lang.offlineDesc}
                    </p>
                </div>
            </div>
        </div>

        <div class="rounded-3xl border shadow-2xl overflow-hidden transition-all shadow-2xl duration-300 ${state.isDarkMode ? "bg-slate-900 border-emerald-800/80 shadow-slate-950/50 " : "bg-white/80 border-zinc-200/60 shadow-zinc-400/50 hover:shadow-emerald-400/50 backdrop-blur-md"}">
            <div class="p-6 sm:p-10 space-y-6">
                
                <div id="drop-zone" 
                     class="border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center group ${
                       state.previewUrl
                         ? "border-emerald-500 bg-emerald-500/[0.02]"
                         : "border-zinc-300/80 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-400 bg-zinc-50/50 dark:bg-slate-950/30"
                     }"
                     onclick="document.getElementById('file-input').click()">
                    
                    <input type="file" id="file-input" class="hidden" accept="image/png, image/jpeg" onchange="DetectionDashboard.handleFileSelect(event)">
                    
                    ${
                      state.previewUrl
                        ? `
                        <div class="relative max-w-sm rounded-xl overflow-hidden shadow-xl group/img border border-zinc-200 dark:border-slate-800">
                            <img src="${state.previewUrl}" class="w-full h-56 object-cover object-center transform transition-transform duration-500 group-hover/img:scale-105" alt="Preview Daun">
                            <div class="absolute inset-0 bg-slate-950/50 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-all duration-300 backdrop-blur-[2px]">
                                <p class="text-white text-xs font-bold flex items-center gap-2 bg-slate-900/80 px-4 py-2 rounded-full border border-white/10 shadow-lg">
                                    <i data-lucide="refresh-cw" class="w-3.5 h-3.5 animate-[spin_4s_linear_infinite]"></i> 
                                    Ubah Gambar
                                </p>
                            </div>
                        </div>
                    `
                        : `
                        <div class="w-16 h-16 rounded-full bg-emerald-600/10 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 shadow-inner border border-emerald-600/10 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                            <i data-lucide="camera" class="w-6 h-6"></i>
                        </div>
                        <p class="font-black text-sm sm:text-base mb-1.5 ${state.isDarkMode ? "text-slate-200" : "text-slate-900"}">${lang.uploadTitle}</p>
                        <p class="text-xs font-semibold text-slate-400 dark:text-slate-500">${lang.uploadLimit}</p>
                    `
                    }
                </div>

                ${
                  !state.isOnline
                    ? `
                    <div class="space-y-2.5 animate-fade-in">
                        <label class="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-2">
                            <i data-lucide="text-cursor-input" class="w-4 h-4 text-emerald-500"></i> 
                            Deskripsi Gejala Fisik Daun Padi <span class="text-red-500 font-black">(Wajib di Mode Offline)</span>
                        </label>
                        <textarea id="offline-desc-input" rows="4" class="w-full text-sm font-medium p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 shadow-inner ${state.isDarkMode ? "border-slate-800 bg-slate-950/60 text-slate-200 placeholder-slate-600 focus:bg-slate-950" : "border-zinc-200 bg-zinc-50/50 text-slate-900 placeholder-slate-400 focus:bg-white"}" placeholder="Contoh: Terdapat bercak berwarna coklat kemerahan berbentuk belah ketupat pada bagian tengah daun padi..."></textarea>
                    </div>
                `
                    : ""
                }

                <div class="flex justify-center pt-2">
                    <button onclick="DetectionDashboard.processDetection()" 
                            class="w-full sm:w-auto min-w-[240px] bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-emerald-600/10 disabled:opacity-40 disabled:hover:from-emerald-600 disabled:hover:to-green-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5 disabled:hover:translate-y-0 flex items-center justify-center gap-2.5"
                            ${!state.selectedImage || state.isAnalyzing ? "disabled" : ""}>
                        ${
                          state.isAnalyzing
                            ? `
                            <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Memproses Analisis...</span>
                        `
                            : `
                            <i data-lucide="activity" class="w-4 h-4"></i>
                            <span>${lang.detectBtn}</span>
                        `
                        }
                    </button>
                </div>

                ${
                  state.isAnalyzing
                    ? `
                    <div class="border-t border-zinc-200/60 dark:border-slate-800 pt-6 space-y-4 animate-fade-in">
                        <div class="flex items-center gap-3 bg-emerald-600/10 dark:bg-emerald-950/40 border border-emerald-600/15 p-3 rounded-xl text-emerald-700 dark:text-emerald-400 w-full sm:w-fit">
                            <span class="relative flex h-2 w-2">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span class="text-xs font-bold tracking-wide uppercase">${lang.scanning}</span>
                        </div>
                        <div class="space-y-3">
                            <div class="h-6 bg-zinc-200 dark:bg-slate-800 rounded-md w-1/3 animate-pulse"></div>
                            <div class="h-4 bg-zinc-200 dark:bg-slate-800 rounded-md w-full animate-pulse"></div>
                            <div class="h-4 bg-zinc-200 dark:bg-slate-800 rounded-md w-5/6 animate-pulse"></div>
                        </div>
                    </div>
                `
                    : ""
                }

                ${state.analysisResult ? ResultCard.render(state, lang) : ""}

            </div>
        </div>

        ${HistoryList.render(state, lang)}
    </div>
</section>
        `;
  },

  handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      StateManager.showToast(
        "File harus berformat gambar PNG/JPEG!",
        "warning",
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      StateManager.setState("selectedImage", file);
      StateManager.setState("previewUrl", e.target.result);
    };
    reader.readAsDataURL(file);
  },

  async processDetection() {
    const { isOnline, selectedImage } = StateManager.state;

    if (!selectedImage) {
      StateManager.showToast(
        "Silakan pilih atau ambil foto daun terlebih dahulu.",
        "warning",
      );
      return;
    }

    StateManager.setState("isAnalyzing", true);
    StateManager.setState("analysisResult", null);

    try {
      let finalResult = null;

      if (isOnline) {
        // Jalankan Deteksi Online via Server API + Gemini Flash API AI Driver
        finalResult = await OnlineAIService.uploadAndDetect(selectedImage);
      } else {
        // Jalankan Sistem Pakar Berbasis Aturan jika Offline
        const textDescInput = document.getElementById("offline-desc-input");
        const userTextDescription = textDescInput
          ? textDescInput.value.trim()
          : "";

        if (!userTextDescription) {
          throw new Error(
            "Untuk mode offline, deskripsi ciri/gejala fisik pada kotak teks wajib diisi.",
          );
        }

        finalResult = OfflineExpertSystem.analyze(userTextDescription);
      }

      // Sukses Melakukan Deteksi, Simpan ke Riwayat & Update Global State
      StateManager.state.totalStats += 1;
      localStorage.setItem(
        "padiguard_total_stats",
        StateManager.state.totalStats,
      );

      const recordHistoryItem = {
        id: Date.now(),
        timestamp: new Date().toLocaleString(
          StateManager.state.currentLang === "id" ? "id-ID" : "en-US",
        ),
        mode: isOnline ? "Online (AI)" : "Offline (Local Expert)",
        ...finalResult,
      };

      StateManager.state.history.unshift(recordHistoryItem);
      localStorage.setItem(
        "padiguard_history",
        JSON.stringify(StateManager.state.history),
      );

      StateManager.setState("analysisResult", finalResult);
      StateManager.showToast(
        "Diagnosis tanaman padi berhasil diselesaikan!",
        "success",
      );
    } catch (error) {
      console.error(error);
      StateManager.showToast(
        error.message || "Gagal memproses diagnosis.",
        "warning",
      );

      // Fallback Otomatis Jika Online Bermasalah/Timeout
      if (isOnline) {
        StateManager.showToast(
          "Mengalihkan paksa ke basis sistem pakar offline local...",
          "info",
        );
        StateManager.setState("isOnline", false);
      }
    } finally {
      StateManager.setState("isAnalyzing", false);
    }
  },
};
