const StateManager = {
  state: {
    isOnline: true,
    currentLang: localStorage.getItem("lang") || "id",
    isDarkMode: localStorage.getItem("darkMode") === "true",
    selectedImage: null,
    previewUrl: null,
    isAnalyzing: false,
    analysisResult: null,
    history: JSON.parse(localStorage.getItem("padiguard_history")) || [],
    toast: null,
    totalStats: parseInt(localStorage.getItem("padiguard_total_stats")) || 0,
  },

  setState(key, value) {
    this.state[key] = value;
    this.renderApp();
  },

  updateNetwork(status) {
    this.state.isOnline = status;
    this.showToast(
      status
        ? "Terhubung ke Internet! Mode AI Aktif."
        : "Koneksi Terputus. Otomatis beralih ke Sistem Pakar Offline.",
      status ? "success" : "warning",
    );
    this.renderApp();
  },

  checkNetworkStatus() {
    this.state.isOnline = navigator.onLine;
  },

  toggleLanguage() {
    const nextLang = this.state.currentLang === "id" ? "en" : "id";
    localStorage.setItem("lang", nextLang);
    this.state.currentLang = nextLang;
    this.renderApp();
  },

  toggleDarkMode() {
    const activeMode = !this.state.isDarkMode;
    localStorage.setItem("darkMode", activeMode);
    this.state.isDarkMode = activeMode;

    const body = document.querySelector(".dynamic-theme");
    if (body) {
      if (activeMode) {
        body.classList.add("bg-slate-900", "text-slate-100", "dark");
        body.classList.remove("bg-slate-50", "text-slate-800");
      } else {
        body.classList.add("bg-slate-50", "text-slate-800");
        body.classList.remove("bg-slate-900", "text-slate-100", "dark");
      }
    }
    this.renderApp();
  },

  showToast(message, type = "info") {
    this.state.toast = { message, type };
    this.renderApp();
    setTimeout(() => {
      const toastEl = document.getElementById("toast-notification");
      if (toastEl) toastEl.classList.add("opacity-0", "translate-y-2");
      setTimeout(() => {
        this.state.toast = null;
        this.renderApp(); // Render ulang untuk membersihkan DOM toast dari memori
      }, 300);
    }, 4000);
  },

  renderApp() {
    const root = document.getElementById("app");
    if (!root) return;

    const lang = LanguagePack[this.state.currentLang];

    // Menggunakan pembungkus luar agar seluruh tinggi halaman terikat warna tema yang konsisten
    root.innerHTML = `
        <div class="min-h-screen flex flex-col w-full transition-all duration-300 ${this.state.isDarkMode ? "bg-slate-950 text-slate-100" : "bg-gradient-to-br from-zinc-50 via-emerald-50/10 to-zinc-100 text-slate-800"}">
            
            ${Navbar.render(this.state, lang)}
            
            <main class="flex-grow w-full relative z-10">
                ${Hero.render(this.state, lang)}
                ${Features.render(this.state, lang)}
                ${DetectionDashboard.render(this.state, lang)}
            </main>
            
            ${this.state.toast
        ? `
                <div id="toast-notification" class="fixed bottom-6 right-6 z-50 transform transition-all duration-300 ease-out flex items-center p-4 rounded-xl shadow-xl border ${this.state.toast.type === "success"
          ? "bg-emerald-500 text-white border-emerald-400"
          : this.state.toast.type === "warning"
            ? "bg-amber-500 text-white border-amber-400"
            : "bg-slate-800 text-white border-slate-700"
        }">
                    <i data-lucide="${this.state.toast.type === "success" ? "check-circle" : "alert-triangle"}" class="w-5 h-5 mr-3"></i>
                    <span class="font-medium text-sm">${this.state.toast.message}</span>
                </div>
            `
        : ""
      }

            <footer class="w-full mt-24 border-t transition-all duration-300 ${this.state.isDarkMode ? "bg-slate-950 border-slate-900 text-slate-400" : "bg-zinc-50 border-zinc-200/80 text-zinc-600"}">
                
                <!-- Konten Utama Footer -->
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
                    
                    <!-- Kolom Brand -->
                    <div class="space-y-4">
                        <div class="flex items-center gap-2">
                            <span class="text-xl">
                            <img src="../img/logo-padiguard.png" alt="PadiGuard Logo" class="w-10 h-10 rounded-full border-2 border-emerald-500 shadow-md shadow-emerald-500/20">
                            </span>
                            <h3 class="text-lg font-black tracking-tight ${this.state.isDarkMode ? "text-white" : "text-slate-900"}">
                                Padi<span class="text-emerald-600 dark:text-emerald-400">Guard</span>
                            </h3>
                        </div>
                        <p class="text-sm font-medium leading-relaxed ${this.state.isDarkMode ? "text-slate-400" : "text-zinc-500"}">
                            ${lang.tagline}
                        </p>
                    </div>

                    <!-- Kolom Panduan Penggunaan -->
                    <div class="space-y-4">
                        <h4 class="text-xs font-black uppercase tracking-widest ${this.state.isDarkMode ? "text-slate-200" : "text-slate-900"} flex items-center gap-2">
                            <i data-lucide="book-open" class="w-4 h-4 text-emerald-500"></i>
                            <span>Panduan Penggunaan</span>
                        </h4>
                        <ul class="text-xs font-semibold space-y-3 ${this.state.isDarkMode ? "text-slate-400" : "text-zinc-600"}">
                            <li class="flex items-start gap-2.5">
                                <span class="text-emerald-500 dark:text-emerald-400 font-bold">1.</span>
                                <span>Pastikan objek foto daun padi terlihat jelas dan fokus.</span>
                            </li>
                            <li class="flex items-start gap-2.5">
                                <span class="text-emerald-500 dark:text-emerald-400 font-bold">2.</span>
                                <span>Gunakan pencahayaan alami yang cukup (tidak backlight).</span>
                            </li>
                            <li class="flex items-start gap-2.5">
                                <span class="text-emerald-500 dark:text-emerald-400 font-bold">3.</span>
                                <span>Jaga jarak kamera smartphone berkisar 10-15 cm dari daun.</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Kolom Informasi Kontak -->
                    <div class="space-y-4">
                        <h4 class="text-xs font-black uppercase tracking-widest ${this.state.isDarkMode ? "text-slate-200" : "text-slate-900"} flex items-center gap-2">
                            <i data-lucide="help-circle" class="w-4 h-4 text-emerald-500"></i>
                            <span>Hubungi Kami</span>
                        </h4>
                        <div class="text-xs font-semibold space-y-3 ${this.state.isDarkMode ? "text-slate-400" : "text-zinc-600"}">
                            <a href="mailto:support@padiguard.id" class="flex items-center gap-2.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors w-fit">
                                <i data-lucide="mail" class="w-4 h-4 text-slate-400"></i>
                                <span>support@padiguard.id</span>
                            </a>
                            <div class="flex items-start gap-2.5 leading-relaxed">
                                <i data-lucide="map-pin" class="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5"></i>
                                <span>Universitas Bali Internasional (UNBI),<br>Bali, Indonesia</span>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- Garis Pembatas & Hak Cipta -->
                <div class="border-t py-6 transition-all duration-300 ${this.state.isDarkMode ? "border-slate-900/60 bg-slate-950 text-slate-500" : "border-zinc-200/40 bg-zinc-100/40 text-zinc-400"}">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] font-bold tracking-wide uppercase">
                        <div>
                            &copy; 2026 PadiGuard. All Rights Reserved.
                        </div>
                        <div class="flex items-center gap-1 text-slate-400 dark:text-slate-500">
                            <span>Created for</span>
                            <span class="text-emerald-600 dark:text-emerald-400">Sustainable Agriculture Technology</span>
                        </div>
                    </div>
                </div>

            </footer>
        </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }
  },
};
