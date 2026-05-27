const Features = {
  render(state, lang) {
    return `
            <section class="relative min-h-screen flex items-center overflow-hidden py-24 ${state.isDarkMode ? "bg-slate-950 text-slate-100" : "bg-gradient-to-b from-zinc-100/80 via-emerald-50/10 to-zinc-50"}">
    
    <!-- Ornamen Latar Belakang Lembut (Anti-Silau) -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-100/10 dark:bg-emerald-900/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <!-- KOLOM KIRI: Narasi Tujuan Utama Sistem (5 Kolom) -->
            <div class="lg:col-span-5 space-y-6 text-center lg:text-left">
                <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-600/10 dark:bg-emerald-950/60 border border-emerald-600/15 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold tracking-wide">
                    <span>🎯 Tujuan PadiGuard</span>
                </div>
                
                <h2 class="text-3xl sm:text-4xl font-black tracking-tight ${state.isDarkMode ? "text-white" : "text-slate-900"} leading-[1.2]">
                    Langkah Tepat, <br>
                    <span class="bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 bg-clip-text text-transparent">Hasil Panen Selamat</span>
                </h2>
                
                <p class="text-base font-medium leading-relaxed ${state.isDarkMode ? "text-slate-400" : "text-slate-600/90"}">
                    Sistem ini diciptakan khusus untuk memotong ketidakpastian di lapangan. Dengan identifikasi jenis penyakit yang **jelas, instan, dan akurat**, petani tidak lagi menebak-nebak dan dapat langsung mengambil tindakan penanganan yang tepat sasaran sebelum kerusakan meluas.
                </p>

                <!-- Mini Stat/Highlight Indicator -->
                <div class="pt-4 grid grid-cols-2 gap-4 border-t ${state.isDarkMode ? "border-slate-800" : "border-slate-200/60"}">
                    <div>
                        <p class="text-2xl font-black text-emerald-600 dark:text-emerald-400">100%</p>
                        <p class="text-xs font-semibold ${state.isDarkMode ? "text-slate-500" : "text-slate-500"}">Spesifikasi Penyakit Jelas</p>
                    </div>
                    <div>
                        <p class="text-2xl font-black text-emerald-600 dark:text-emerald-400">0%</p>
                        <p class="text-xs font-semibold ${state.isDarkMode ? "text-slate-500" : "text-slate-500"}">Resiko Salah Penanganan</p>
                    </div>
                </div>
            </div>

            <!-- KOLOM KANAN: Grid 4 Fitur Unggulan (7 Kolom) -->
            <div class="lg:col-span-7 w-full">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    <!-- Card 1: Bisa Offline -->
                    <div class="p-6 rounded-2xl border transition-all duration-300 shadow-xl hover:shadow-xl hover:-translate-y-0.5 ${state.isDarkMode ? "bg-slate-900/60 border-slate-800 shadow-slate-950/20" : "bg-white/70 border-zinc-200/50 shadow-zinc-400/40 hover:shadow-emerald-400/40 backdrop-blur-sm"}">
                        <div class="w-12 h-12 rounded-xl bg-emerald-600/10 dark:bg-emerald-950 border border-emerald-600/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-5 shadow-inner">
                            <i data-lucide="wifi-off" class="w-5 h-5"></i>
                        </div>
                        <h3 class="font-black text-lg mb-2 ${state.isDarkMode ? "text-slate-200" : "text-slate-900"}">Bisa Offline</h3>
                        <p class="text-sm font-medium leading-relaxed ${state.isDarkMode ? "text-slate-400" : "text-slate-600"}">
                            Tetap berfungsi mendeteksi hama di tengah sawah terpencil tanpa internet melalui cadangan sistem pakar internal.
                        </p>
                    </div>

                    <!-- Card 2: AI Detection -->
                    <div class="p-6 rounded-2xl border transition-all duration-300 shadow-xl hover:shadow-xl hover:-translate-y-0.5 ${state.isDarkMode ? "bg-slate-900/60 border-slate-800 shadow-slate-950/20" : "bg-white/70 border-zinc-200/50 shadow-zinc-400/40 hover:shadow-emerald-400/40 backdrop-blur-sm"}">
                        <div class="w-12 h-12 rounded-xl bg-emerald-600/10 dark:bg-emerald-950 border border-emerald-600/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-5 shadow-inner">
                            <i data-lucide="brain" class="w-5 h-5"></i>
                        </div>
                        <h3 class="font-black text-lg mb-2 ${state.isDarkMode ? "text-slate-200" : "text-slate-900"}">AI Detection</h3>
                        <p class="text-sm font-medium leading-relaxed ${state.isDarkMode ? "text-slate-400" : "text-slate-600"}">
                            Didukung Gemini Flash API untuk akurasi rekomendasi ilmiah level tinggi secara online saat jaringan tersedia.
                        </p>
                    </div>

                    <!-- Card 3: Mudah Digunakan -->
                    <div class="p-6 rounded-2xl border transition-all duration-300 shadow-xl hover:shadow-xl hover:-translate-y-0.5 ${state.isDarkMode ? "bg-slate-900/60 border-slate-800 shadow-slate-950/20" : "bg-white/70 border-zinc-200/50 shadow-zinc-400/40 hover:shadow-emerald-400/40 backdrop-blur-sm"}">
                        <div class="w-12 h-12 rounded-xl bg-emerald-600/10 dark:bg-emerald-950 border border-emerald-600/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-5 shadow-inner">
                            <i data-lucide="smartphone" class="w-5 h-5"></i>
                        </div>
                        <h3 class="font-black text-lg mb-2 ${state.isDarkMode ? "text-slate-200" : "text-slate-900"}">Mudah Digunakan</h3>
                        <p class="text-sm font-medium leading-relaxed ${state.isDarkMode ? "text-slate-400" : "text-slate-600"}">
                            Antarmuka visual dirancang sangat ramah pengguna agar dapat dipahami dan dieksekusi dengan cepat oleh petani.
                        </p>
                    </div>

                    <!-- Card 4: Cepat & Ringan -->
                    <div class="p-6 rounded-2xl border transition-all duration-300 shadow-xl hover:shadow-xl hover:-translate-y-0.5 ${state.isDarkMode ? "bg-slate-900/60 border-slate-800 shadow-slate-950/20" : "bg-white/70 border-zinc-200/50 shadow-zinc-400/40 hover:shadow-emerald-400/40 backdrop-blur-sm"}">
                        <div class="w-12 h-12 rounded-xl bg-emerald-600/10 dark:bg-emerald-950 border border-emerald-600/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-5 shadow-inner">
                            <i data-lucide="zap" class="w-5 h-5"></i>
                        </div>
                        <h3 class="font-black text-lg mb-2 ${state.isDarkMode ? "text-slate-200" : "text-slate-900"}">Cepat & Ringan</h3>
                        <p class="text-sm font-medium leading-relaxed ${state.isDarkMode ? "text-slate-400" : "text-slate-600"}">
                            Sistem teroptimasi bekerja mulus tanpa membebani performa komponen internal smartphone berspesifikasi rendah.
                        </p>
                    </div>

                </div>
            </div>

        </div>
    </div>
</section>
        `;
  },
};
