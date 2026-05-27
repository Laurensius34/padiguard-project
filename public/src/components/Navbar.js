const Navbar = {
  render(state, lang) {
    return `
            <nav class="sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
              state.isDarkMode
                ? "bg-slate-950/80 border-slate-900 shadow-lg shadow-slate-950/20"
                : "bg-white/80 border-zinc-200/60 shadow-sm shadow-zinc-200/30"
            }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
            
            <div class="flex items-center gap-2.5 cursor-pointer group select-none" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
                <div class="text-2xl transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                    🌾
                </div>
                <span class="text-lg font-black tracking-tight bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent transform transition-all duration-300 group-hover:brightness-110">
                    ${lang.brand || "PadiGuard"}
                </span>
            </div>

            <div class="hidden sm:flex items-center gap-5">
                <div class="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border shadow-inner transition-all duration-300 ${
                  state.isOnline
                    ? "bg-emerald-500/[0.04] text-emerald-600 dark:text-emerald-400 border-emerald-500/20 shadow-emerald-500/5"
                    : "bg-amber-500/[0.04] text-amber-600 dark:text-amber-400 border-amber-500/20 shadow-amber-500/5"
                }">
                    <span class="relative flex h-2 w-2">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${state.isOnline ? "bg-emerald-400" : "bg-amber-400"}"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 ${state.isOnline ? "bg-emerald-500" : "bg-amber-500"}"></span>
                    </span>
                    <span class="tracking-wide uppercase text-[10px]">${state.isOnline ? lang.onlineMode : lang.offlineMode}</span>
                </div>
                
                <div class="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${state.isDarkMode ? "text-slate-400" : "text-zinc-500"}">
                    <span class="text-amber-500 animate-pulse">⚡</span>
                    <span>Total Sesi:</span>
                    <span class="${state.isDarkMode ? "text-slate-200" : "text-slate-900"} font-black">${state.totalStats}</span>
                </div>
            </div>

            <div class="flex items-center gap-2.5">
                <button onclick="StateManager.toggleLanguage()" 
                        class="h-9 px-3 rounded-xl border text-xs font-black tracking-widest uppercase transition-all duration-300 shadow-sm hover:-translate-y-0.5 active:translate-y-0 ${
                          state.isDarkMode
                            ? "border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800 hover:border-slate-700"
                            : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300"
                        }">
                    ${state.currentLang}
                </button>
                
                <button onclick="StateManager.toggleDarkMode()" 
                        class="h-9 w-9 rounded-xl border transition-all duration-300 shadow-sm flex items-center justify-center hover:-translate-y-0.5 active:translate-y-0 group/btn ${
                          state.isDarkMode
                            ? "border-slate-800 bg-slate-900 text-amber-400 hover:bg-slate-800 hover:border-slate-700"
                            : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300"
                        }">
                    <i data-lucide="${state.isDarkMode ? "sun" : "moon"}" class="w-4 h-4 transform transition-transform duration-500 group-hover/btn:rotate-45"></i>
                </button>
            </div>

        </div>
    </div>
</nav>
        `;
  },
};
