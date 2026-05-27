const Hero = {
  render(state, lang) {
    return `
           <section class="relative min-h-screen flex items-center overflow-hidden py-20 lg:py-0 ${state.isDarkMode ? "bg-slate-950" : "bg-gradient-to-br from-zinc-50 via-emerald-50/20 to-zinc-100/80"}">
            <div class="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-emerald-200/10 dark:bg-emerald-900/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
            <div class="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-green-200/15 dark:bg-green-900/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        
            <div class="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-600/10 dark:bg-emerald-950/60 border border-emerald-600/15 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold tracking-wide">
                <span class="flex h-2 w-2 rounded-full bg-emerald-500"></span>
                <span>Smart Agriculture Solution</span>
            </div>
            
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight ${state.isDarkMode ? "text-slate-100" : "text-slate-900"} leading-[1.15]">
                Deteksi Hama Padi <br class="hidden sm:inline">
                <span class="bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 bg-clip-text text-transparent">
                    Lebih Cepat & Akurat
                </span>
            </h1>
            
            <p class="text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed ${state.isDarkMode ? "text-slate-400" : "text-slate-600"}">
                ${lang.onlineDesc}. Unggah foto daun padi Anda dan peroleh penanganan instan untuk mengamankan produktivitas panen sawah Anda.
            </p>
            
            <div class="pt-4 flex justify-center lg:justify-start">
                <button onclick="document.getElementById('dashboard-deteksi').scrollIntoView({behavior: 'smooth'})" class="group shadow-xl shadow-emerald-600/10 dark:shadow-emerald-900/20 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2.5">
                    <span>${lang.ctaStart}</span>
                    <i data-lucide="arrow-right" class="w-4 h-4 transition-transform group-hover:translate-x-1"></i>
                </button>
            </div>
        </div>

        <!-- KOLOM KANAN: Foto Sawah/Padi Estetik & Simetris (6 Kolom) -->
        <div class="lg:col-span-6 relative w-full flex justify-center items-center h-[350px] sm:h-[450px] lg:h-[550px]">
            <!-- Bingkai Efek Glow Belakang Foto -->
            <div class="absolute inset-4 bg-gradient-to-tr from-emerald-500/20 to-green-400/20 rounded-[2.5rem] blur-2xl -z-10"></div>
            
            <!-- Kontainer Foto Utama -->
            <div class="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl p-2 ${state.isDarkMode ? "bg-slate-900/50 border border-slate-800" : "bg-white/60 border border-slate-200/50"}">
                <div class="w-full h-full rounded-[1.5rem] overflow-hidden relative group">
                    
                    <!-- PENTING: Ganti URL src di bawah ini dengan path foto padi/sawah milikmu -->
                    <img 
                        src="https://images.unsplash.com/photo-1728895604559-a4e16081504e?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                        alt="Sawah Padi" 
                        class="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out grayscale-[15%] group-hover:grayscale-0"
                    />
                    
                    <!-- Overlay Gradasi Halus agar foto menyatu dengan UI -->
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
                    
                    <!-- Badge Info Mengambang Minimalis di Atas Foto -->
                    <div class="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-white/10 dark:bg-slate-950/40 border border-white/20 dark:border-slate-800/50 p-4 rounded-xl flex items-center justify-between">
                        <div class="space-y-0.5">
                            <p class="text-xs font-semibold text-white/70 uppercase tracking-wider">Kondisi Lapangan</p>
                            <p class="text-sm font-bold text-white">Sistem Siap Memindai Daun</p>
                        </div>
                        <div class="h-9 w-9 rounded-lg bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                            <i data-lucide="shield-check" class="w-5 h-5"></i>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
</section>
        `;
  },
};
