
import React, { useState, useEffect, useRef } from 'react';
import { CalculatorMode, HistoryItem, Theme } from './types';
import { TOOLS } from './tools';
import { MAX_HISTORY_ITEMS, PRESET_THEMES, APP_NAME } from './constants';
import { 
  History as HistoryIcon, Palette, X, Check, Plus, 
  Beaker, Trash2, RotateCcw, BrainCircuit, Sparkles, 
  ChevronDown, Calculator as CalculatorIcon, ArrowLeft,
  Grid, Search, LayoutGrid, List, GripVertical
} from 'lucide-react';
import Calculator from './components/Calculator';
import AISolver from './components/AISolver';
import History from './components/History';
import Button from './components/Button';
import ToolCalculator from './components/ToolCalculator';
import InfoModal from './components/InfoModal';

// Reusable Ad Placeholder Component
const AdPlaceholder: React.FC<{ className?: string, label?: string }> = ({ className = '', label = 'Ad Space' }) => (
  <div className={`relative flex flex-col items-center justify-center border rounded-xl p-4 overflow-hidden shrink-0 transition-colors duration-300 ${className}`}
       style={{ 
         backgroundColor: 'rgba(var(--rgb-bg-surface), 0.03)', 
         borderColor: 'var(--border)' 
       }}>
     {/* Decorative Pattern */}
     <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
     <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 z-10" style={{ color: 'var(--text-sec)' }}>{label}</span>
  </div>
);

const App: React.FC = () => {
  // Default view is now the dashboard grid
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [dashboardView, setDashboardView] = useState<'grid' | 'list'>('grid');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  
  // AI Chat State
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  
  // Theme State
  const [activeTheme, setActiveTheme] = useState<Theme>(PRESET_THEMES[0]);
  const [customThemes, setCustomThemes] = useState<Theme[]>([]);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [editingTheme, setEditingTheme] = useState<Theme | null>(null);

  // Info/Legal Modal State
  const [activeInfoModal, setActiveInfoModal] = useState<'privacy' | 'terms' | 'contact' | null>(null);

  // Search State for Dashboard
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dashboard Items State (for Reordering)
  const [dashboardItems, setDashboardItems] = useState<any[]>([]);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  // Load saved data
  useEffect(() => {
    const savedHist = localStorage.getItem('omnicalc-history');
    if (savedHist) setHistory(JSON.parse(savedHist));

    const savedCustom = localStorage.getItem('omnicalc-custom-themes');
    if (savedCustom) setCustomThemes(JSON.parse(savedCustom));

    const savedActiveId = localStorage.getItem('omnicalc-active-theme-id');
    if (savedActiveId) {
      const allThemes = [...PRESET_THEMES, ...(savedCustom ? JSON.parse(savedCustom) : [])];
      const found = allThemes.find(t => t.id === savedActiveId);
      if (found) setActiveTheme(found);
    }
    
    const savedView = localStorage.getItem('omnicalc-view-mode');
    if (savedView === 'list' || savedView === 'grid') setDashboardView(savedView);

    // Initialize Dashboard Items with saved order
    const generalCalcItem = {
        id: 'standard',
        name: 'General Calculator',
        icon: CalculatorIcon,
        description: 'Basic math operations',
        iconColor: 'text-indigo-500',
        iconBg: 'bg-indigo-100',
    };
    const defaultItems = [generalCalcItem, ...TOOLS];

    const savedOrder = localStorage.getItem('omnicalc-dashboard-order');
    if (savedOrder) {
        try {
            const orderIds = JSON.parse(savedOrder) as string[];
            // Sort defaultItems based on orderIds
            // New items (not in saved order) are appended at the end
            const sorted = [...defaultItems].sort((a, b) => {
                const indexA = orderIds.indexOf(a.id);
                const indexB = orderIds.indexOf(b.id);
                if (indexA === -1 && indexB === -1) return 0;
                if (indexA === -1) return 1;
                if (indexB === -1) return -1;
                return indexA - indexB;
            });
            setDashboardItems(sorted);
        } catch (e) {
            setDashboardItems(defaultItems);
        }
    } else {
        setDashboardItems(defaultItems);
    }
  }, []);

  // Inject CSS Variables based on Active Theme
  useEffect(() => {
    const root = document.documentElement;
    const c = activeTheme.colors;

    root.style.setProperty('--bg-app', c.bgApp);
    root.style.setProperty('--bg-surface', c.bgSurface);
    root.style.setProperty('--text-main', c.textMain);
    root.style.setProperty('--text-sec', c.textSec);
    root.style.setProperty('--primary', c.primary);
    root.style.setProperty('--secondary', c.secondary);
    root.style.setProperty('--accent', c.accent);
    root.style.setProperty('--border', c.border);
    
    // Helper for RGB values (for opacity usage)
    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '0,0,0';
    };
    root.style.setProperty('--rgb-bg-app', hexToRgb(c.bgApp));
    root.style.setProperty('--rgb-bg-surface', hexToRgb(c.bgSurface));

    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', c.bgApp);
    localStorage.setItem('omnicalc-active-theme-id', activeTheme.id);
  }, [activeTheme]);

  const handleViewChange = (mode: 'grid' | 'list') => {
      setDashboardView(mode);
      localStorage.setItem('omnicalc-view-mode', mode);
  };

  const handleSaveCustomTheme = () => {
    if (!editingTheme) return;
    const isExisting = customThemes.some(t => t.id === editingTheme.id);
    let updatedCustom;

    if (isExisting) {
        updatedCustom = customThemes.map(t => t.id === editingTheme.id ? editingTheme : t);
    } else {
        const newTheme = { ...editingTheme, id: `custom-${Date.now()}`, type: 'custom' as const };
        updatedCustom = [...customThemes, newTheme];
        setActiveTheme(newTheme); 
    }

    setCustomThemes(updatedCustom);
    localStorage.setItem('omnicalc-custom-themes', JSON.stringify(updatedCustom));
    if (isExisting && activeTheme.id === editingTheme.id) setActiveTheme(editingTheme);
    setEditingTheme(null);
  };

  const handleDeleteTheme = (themeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this theme?')) {
        const updated = customThemes.filter(t => t.id !== themeId);
        setCustomThemes(updated);
        localStorage.setItem('omnicalc-custom-themes', JSON.stringify(updated));
        if (activeTheme.id === themeId) setActiveTheme(PRESET_THEMES[0]);
        if (editingTheme?.id === themeId) setEditingTheme(null);
    }
  };

  const handleResetThemeEditor = () => {
    setEditingTheme({ ...editingTheme!, colors: { ...activeTheme.colors } });
  };

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleGlobalKeys = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTyping = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT';

      if (e.key === 'Escape') {
        if (isHistoryOpen) setIsHistoryOpen(false);
        if (isThemeModalOpen) setIsThemeModalOpen(false);
        if (isAiChatOpen) setIsAiChatOpen(false);
        if (activeInfoModal) setActiveInfoModal(null);
        if (activeView !== 'dashboard' && !isTyping) setActiveView('dashboard');
        return;
      }

      if (e.altKey && !isTyping) {
        switch(e.key.toLowerCase()) {
          case 'h': e.preventDefault(); setIsHistoryOpen(prev => !prev); break;
          case 't': e.preventDefault(); setIsThemeModalOpen(true); break;
          case '1': e.preventDefault(); setActiveView('standard'); break;
          case '3': e.preventDefault(); setIsAiChatOpen(prev => !prev); break; 
        }
      }
    };
    window.addEventListener('keydown', handleGlobalKeys);
    return () => window.removeEventListener('keydown', handleGlobalKeys);
  }, [isHistoryOpen, isThemeModalOpen, isAiChatOpen, activeInfoModal, activeView]);

  // --- DRAG AND DROP HANDLERS ---
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    if (searchQuery) return; // Disable drag when filtering
    dragItem.current = index;
    e.dataTransfer.effectAllowed = "move";
    // Reduce opacity to indicate drag
    e.currentTarget.style.opacity = '0.4';
    e.currentTarget.style.transform = 'scale(0.95)';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault(); // Essential to allow dropping
    e.dataTransfer.dropEffect = "move";
    dragOverItem.current = index;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.opacity = '1';
    e.currentTarget.style.transform = 'scale(1)';
    
    const start = dragItem.current;
    const end = dragOverItem.current;

    if (start !== null && end !== null && start !== end) {
      const newItems = [...dashboardItems];
      const [reorderedItem] = newItems.splice(start, 1);
      newItems.splice(end, 0, reorderedItem);
      
      setDashboardItems(newItems);
      
      // Persist order
      const orderIds = newItems.map(i => i.id);
      localStorage.setItem('omnicalc-dashboard-order', JSON.stringify(orderIds));
    }
    
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = '1';
    e.currentTarget.style.transform = 'scale(1)';
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const addToHistory = (item: HistoryItem) => {
    setHistory(prev => {
      const newHistory = [item, ...prev].slice(0, MAX_HISTORY_ITEMS);
      localStorage.setItem('omnicalc-history', JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const addToolResultToHistory = (resultText: string) => {
    addToHistory({
      id: Date.now().toString(),
      expression: activeView === 'standard' ? 'General' : activeTool?.name || 'Tool',
      result: resultText,
      timestamp: Date.now(),
      mode: 'TOOL'
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('omnicalc-history');
  };

  const handleHistorySelect = (item: HistoryItem) => {
     navigator.clipboard.writeText(item.result);
     setIsHistoryOpen(false);
  };

  const activeTool = TOOLS.find(t => t.id === activeView);
  
  // Dynamically adjust container width: 
  // Scientific is wider on desktop. Standard/Tools are compact.
  const isScientificView = activeView === 'scientific-calc';
  const containerWidthClass = isScientificView 
    ? 'max-w-[360px] xs:max-w-[380px] sm:max-w-sm md:max-w-4xl' 
    : 'max-w-[360px] xs:max-w-[380px] sm:max-w-sm';

  // Filter for search
  const filteredTools = dashboardItems.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 w-full h-[100dvh] flex flex-col overflow-hidden font-sans text-[var(--text-main)] bg-[var(--bg-app)] transition-colors duration-300">
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white/20 bg-[var(--bg-app)]">
           
         {/* 3-Column Layout: Left Ad | Content | Right Ad */}
         <div className="flex w-full min-h-full justify-center xl:gap-6 p-3 sm:p-6">
            
            {/* LEFT AD SPACE (Desktop Only) */}
            <aside className="hidden xl:flex w-[160px] flex-col shrink-0 gap-4 sticky top-6 h-fit">
                <AdPlaceholder className="h-[600px] w-full" label="Ad Space Left" />
            </aside>

            {/* CENTER CONTENT */}
            <div className="flex-1 flex flex-col items-center w-full max-w-5xl">
                
                {/* DASHBOARD VIEW */}
                {activeView === 'dashboard' && (
                    <div className="w-full animate-in fade-in duration-300">
                        <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl border-t border-white/20 ring-1 ring-black/20"
                                    style={{ background: 'var(--primary)' }}>
                                    <span className="font-bold text-white text-2xl drop-shadow-md">G</span>
                                </div>
                                <div>
                                    <h1 className="font-bold text-3xl tracking-tight" style={{ color: 'var(--text-main)' }}>{APP_NAME}</h1>
                                    <p className="text-sm opacity-70" style={{ color: 'var(--text-sec)' }}>Select a tool to begin</p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                                <div className="relative flex-1 w-full md:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                                    <input 
                                        type="text" 
                                        placeholder="Search tools..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                                        style={{ borderColor: 'var(--border)', color: 'var(--text-main)' }}
                                    />
                                </div>
                                <div className="flex items-center gap-2 self-end sm:self-auto">
                                    <div className="flex items-center gap-1 p-1 rounded-xl border" 
                                         style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
                                        <button 
                                            onClick={() => handleViewChange('grid')}
                                            className={`p-1.5 rounded-lg transition-all ${dashboardView === 'grid' ? 'shadow-sm' : 'opacity-50 hover:opacity-100'}`}
                                            style={{ 
                                                backgroundColor: dashboardView === 'grid' ? 'var(--bg-app)' : 'transparent',
                                                color: dashboardView === 'grid' ? 'var(--primary)' : 'var(--text-sec)'
                                            }}
                                        >
                                            <LayoutGrid className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={() => handleViewChange('list')}
                                            className={`p-1.5 rounded-lg transition-all ${dashboardView === 'list' ? 'shadow-sm' : 'opacity-50 hover:opacity-100'}`}
                                            style={{ 
                                                backgroundColor: dashboardView === 'list' ? 'var(--bg-app)' : 'transparent',
                                                color: dashboardView === 'list' ? 'var(--primary)' : 'var(--text-sec)'
                                            }}
                                        >
                                            <List className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <Button variant="secondary" onClick={() => setIsThemeModalOpen(true)} className="p-2.5 rounded-xl border" title="Theme">
                                        <Palette className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        </header>

                        <div className={dashboardView === 'grid' 
                            ? "grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4"
                            : "flex flex-col gap-3 max-w-3xl mx-auto w-full"
                        }>
                            {filteredTools.map((tool, index) => {
                                const colorName = tool.iconColor?.split('-')[1] || 'indigo';
                                return (
                                    <div
                                        key={tool.id}
                                        draggable={!searchQuery} // Disable drag when searching to avoid index mismatches
                                        onDragStart={(e) => handleDragStart(e, index)}
                                        onDragOver={(e) => handleDragOver(e, index)}
                                        onDrop={handleDrop}
                                        onDragEnd={handleDragEnd}
                                        onClick={() => setActiveView(tool.id)}
                                        className={`${
                                            dashboardView === 'grid'
                                            ? "flex flex-col items-center text-center p-4 rounded-2xl border transition-all duration-200 hover:scale-105 hover:-translate-y-1 group shadow-sm hover:shadow-xl relative overflow-hidden cursor-pointer"
                                            : "flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 hover:translate-x-1 group shadow-sm hover:shadow-md text-left w-full cursor-pointer"
                                        } ${!searchQuery ? 'cursor-move' : ''}`}
                                        style={{ 
                                            backgroundColor: 'var(--bg-surface)', 
                                            borderColor: 'var(--border)' 
                                        }}
                                    >
                                        <div className={`
                                            rounded-xl flex items-center justify-center shrink-0
                                            shadow-inner border-t border-white/30 border-b border-black/10
                                            group-hover:shadow-lg transition-all duration-300
                                            ${dashboardView === 'grid' ? 'w-12 h-12 mb-3' : 'w-10 h-10'}
                                        `} style={{ 
                                            background: activeTheme.type === 'preset' && activeTheme.id !== 'classic-dark' 
                                                ? tool.iconBg?.replace('bg-', 'var(--colors-') || 'var(--secondary)' 
                                                : 'var(--secondary)'
                                        }}>
                                            <tool.icon className={`
                                                ${dashboardView === 'grid' ? 'w-6 h-6' : 'w-5 h-5'}
                                                ${tool.iconColor}
                                            `} style={{ 
                                                color: activeTheme.type === 'custom' ? 'var(--primary)' : undefined 
                                            }} />
                                        </div>
                                        
                                        <div className={dashboardView === 'list' ? 'flex-1' : ''}>
                                            <span className={`font-bold leading-tight ${dashboardView === 'grid' ? 'text-xs line-clamp-2' : 'text-sm block'}`} 
                                                  style={{ color: 'var(--text-main)' }}>
                                                {tool.name}
                                            </span>
                                            {dashboardView === 'list' && (
                                                <span className="text-xs opacity-60 block mt-0.5 line-clamp-1" style={{ color: 'var(--text-sec)' }}>
                                                    {tool.description || 'Calculate quickly'}
                                                </span>
                                            )}
                                        </div>

                                        {/* Drag Handle Indicator (Visible on Hover) */}
                                        {!searchQuery && (
                                           <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-30">
                                              <GripVertical className="w-4 h-4" />
                                           </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* CALCULATOR / TOOL VIEW */}
                {activeView !== 'dashboard' && (
                    <div className={`flex flex-col w-full shrink-0 transition-all duration-300 ${containerWidthClass} animate-in slide-in-from-bottom-4 fade-in`}>
                    
                    <div className="w-full backdrop-blur-xl rounded-2xl shadow-2xl border overflow-hidden flex flex-col h-auto min-h-[550px] relative transition-all duration-300"
                        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
                        
                        <History 
                        isOpen={isHistoryOpen} 
                        onClose={() => setIsHistoryOpen(false)}
                        history={history}
                        onClear={clearHistory}
                        onSelect={handleHistorySelect}
                        />

                        {/* Tool Header */}
                        <header className="flex h-14 border-b items-center justify-between px-4 shrink-0 relative z-20"
                                style={{ borderColor: 'var(--border)', backgroundColor: 'rgba(var(--rgb-bg-app), 0.05)' }}>
                            <div className="flex items-center gap-3">
                                <Button 
                                    variant="ghost" 
                                    onClick={() => setActiveView('dashboard')} 
                                    className="p-2 rounded-full hover:bg-black/5"
                                    style={{ color: 'var(--text-sec)' }}
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </Button>
                                <div className="flex items-center gap-2">
                                    {activeView === 'standard' ? (
                                        <CalculatorIcon className="w-5 h-5 text-indigo-500" />
                                    ) : activeTool ? (
                                        <activeTool.icon className={`w-5 h-5 ${activeTool.iconColor}`} />
                                    ) : null}
                                    <h2 className="font-bold text-sm sm:text-base" style={{ color: 'var(--text-main)' }}>
                                        {activeView === 'standard' ? 'General Calculator' : activeTool?.name}
                                    </h2>
                                </div>
                            </div>

                            <div className="flex items-center gap-1">
                                <Button variant="ghost" onClick={() => setIsThemeModalOpen(true)} className="p-2 rounded-full" style={{ color: 'var(--text-sec)' }}>
                                    <Palette className="w-5 h-5" />
                                </Button>
                                <Button variant="ghost" onClick={() => setIsHistoryOpen(!isHistoryOpen)} className="p-2 rounded-full" style={{ color: 'var(--text-sec)' }}>
                                    <HistoryIcon className={`w-5 h-5 ${isHistoryOpen ? 'text-[var(--primary)]' : ''}`} />
                                </Button>
                            </div>
                        </header>

                        {/* Tool Content */}
                        <div className="flex-1 flex flex-col relative z-0 bg-transparent">
                        {activeView === 'standard' ? (
                            <div className="flex-1 p-3 sm:p-4 h-full">
                                <Calculator mode={CalculatorMode.STANDARD} onHistoryUpdate={addToHistory} />
                            </div>
                        ) : activeView === 'scientific-calc' ? (
                            <div className="flex-1 p-3 sm:p-4 h-full">
                                <Calculator mode={CalculatorMode.SCIENTIFIC} onHistoryUpdate={addToHistory} />
                            </div>
                        ) : activeTool ? (
                            <div className="flex-1 h-full">
                                <ToolCalculator tool={activeTool} onAddToHistory={addToolResultToHistory} />
                            </div>
                        ) : null}
                        </div>

                    </div>
                    </div>
                )}

                {/* BOTTOM AD SPACE */}
                <div className="w-full mt-8 mb-4 max-w-4xl">
                    <AdPlaceholder className="h-24 w-full" label="Ad Space Bottom" />
                </div>

                {/* FOOTER */}
                <footer className="w-full text-center py-8 border-t mt-auto" style={{ borderColor: 'var(--border)' }}>
                    <div className="flex flex-col items-center justify-center gap-4">
                        <p className="text-xs font-semibold tracking-wide" style={{ color: 'var(--text-main)' }}>
                            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium opacity-80" style={{ color: 'var(--text-sec)' }}>
                            <button onClick={() => setActiveInfoModal('privacy')} className="hover:underline hover:opacity-100 transition-opacity">Privacy Policy</button>
                            <button onClick={() => setActiveInfoModal('terms')} className="hover:underline hover:opacity-100 transition-opacity">Terms of Service</button>
                            <button onClick={() => setActiveInfoModal('contact')} className="hover:underline hover:opacity-100 transition-opacity">Contact Us</button>
                        </div>
                        <p className="text-[10px] opacity-40 mt-2 max-w-lg mx-auto px-4 leading-relaxed" style={{ color: 'var(--text-sec)' }}>
                            Disclaimer: This tool is for informational purposes only. Calculations, especially financial and health-related, should not be considered as professional advice. Please consult a qualified expert before making decisions.
                        </p>
                    </div>
                </footer>

            </div>

            {/* RIGHT AD SPACE (Desktop Only) */}
            <aside className="hidden xl:flex w-[160px] flex-col shrink-0 gap-4 sticky top-6 h-fit">
                <AdPlaceholder className="h-[600px] w-full" label="Ad Space Right" />
            </aside>

         </div>

      </main>

      {/* FLOATING AI CHAT BUTTON */}
      <button 
        onClick={() => setIsAiChatOpen(!isAiChatOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 group active:scale-95"
        style={{ 
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            border: '2px solid rgba(255,255,255,0.2)'
        }}
      >
         {isAiChatOpen ? (
           <ChevronDown className="w-8 h-8 text-white" />
         ) : (
           <>
            <BrainCircuit className="w-7 h-7 text-white absolute opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
            <Sparkles className="w-7 h-7 text-white absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
           </>
         )}
      </button>

      {/* FLOATING AI CHAT WINDOW */}
      {isAiChatOpen && (
        <div className="fixed bottom-24 right-4 z-40 w-[90vw] max-w-[380px] h-[60vh] min-h-[450px] rounded-2xl shadow-2xl border flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 zoom-in-95 backdrop-blur-xl"
             style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
           <div className="p-3 border-b flex items-center justify-between shrink-0" style={{ borderColor: 'var(--border)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
              <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shadow-sm">
                    <Sparkles className="w-4 h-4 text-white" />
                 </div>
                 <div>
                    <h3 className="font-bold text-sm leading-none" style={{ color: 'var(--text-main)' }}>AI Math Help</h3>
                    <span className="text-[10px] opacity-70" style={{ color: 'var(--text-sec)' }}>Ask anything...</span>
                 </div>
              </div>
              <button onClick={() => setIsAiChatOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                 <X className="w-5 h-5" style={{ color: 'var(--text-sec)' }} />
              </button>
           </div>
           <div className="flex-1 overflow-hidden bg-transparent relative">
              <AISolver onAddToHistory={addToHistory} />
           </div>
        </div>
      )}

      {/* INFO / LEGAL MODAL */}
      {activeInfoModal && (
        <InfoModal type={activeInfoModal} onClose={() => setActiveInfoModal(null)} />
      )}

      {/* THEME MODAL */}
      {isThemeModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
            <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-700 flex flex-col max-h-[80vh]">
                <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <Palette className="w-5 h-5 text-indigo-400" /> Theme Settings
                    </h2>
                    <button onClick={() => setIsThemeModalOpen(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-slate-700">
                    {!editingTheme ? (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Presets</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {PRESET_THEMES.map(theme => (
                                        <button 
                                            key={theme.id}
                                            onClick={() => setActiveTheme(theme)}
                                            className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden group ${activeTheme.id === theme.id ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-slate-700 hover:border-slate-500'}`}
                                            style={{ background: theme.colors.bgSurface }}
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-4 h-4 rounded-full shadow-sm" style={{ background: theme.colors.primary }}></div>
                                                <span className="text-sm font-bold truncate w-full" style={{ color: theme.colors.textMain }}>{theme.name}</span>
                                            </div>
                                            <div className="h-2 w-full rounded-full opacity-50 flex overflow-hidden">
                                                <div className="w-1/3 h-full" style={{ background: theme.colors.bgApp }}></div>
                                                <div className="w-1/3 h-full" style={{ background: theme.colors.secondary }}></div>
                                                <div className="w-1/3 h-full" style={{ background: theme.colors.accent }}></div>
                                            </div>
                                            {activeTheme.id === theme.id && <div className="absolute top-2 right-2 text-indigo-500"><Check className="w-4 h-4" /></div>}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Custom Themes</h3>
                                    <button 
                                        onClick={() => setEditingTheme({
                                            id: '', name: 'New Theme', type: 'custom',
                                            colors: { ...activeTheme.colors } 
                                        })}
                                        className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-2 py-1 rounded flex items-center gap-1"
                                    >
                                        <Plus className="w-3 h-3" /> Create
                                    </button>
                                </div>
                                {customThemes.length === 0 ? (
                                    <p className="text-sm text-slate-500 italic">No custom themes yet.</p>
                                ) : (
                                    <div className="grid grid-cols-2 gap-3">
                                        {customThemes.map(theme => (
                                            <div key={theme.id} className="relative group">
                                                <button 
                                                    onClick={() => setActiveTheme(theme)}
                                                    className={`w-full p-3 rounded-xl border text-left transition-all relative overflow-hidden ${activeTheme.id === theme.id ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-slate-700 hover:border-slate-500'}`}
                                                    style={{ background: theme.colors.bgSurface }}
                                                >
                                                    <span className="text-sm font-bold truncate block mb-2 pr-12" style={{ color: theme.colors.textMain }}>{theme.name}</span>
                                                    <div className="h-2 w-full rounded-full flex overflow-hidden">
                                                        <div className="w-1/4 h-full" style={{ background: theme.colors.bgApp }}></div>
                                                        <div className="w-1/4 h-full" style={{ background: theme.colors.primary }}></div>
                                                        <div className="w-1/4 h-full" style={{ background: theme.colors.secondary }}></div>
                                                        <div className="w-1/4 h-full" style={{ background: theme.colors.accent }}></div>
                                                    </div>
                                                </button>
                                                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); setEditingTheme(theme); }}
                                                        className="text-slate-400 hover:text-white bg-black/50 rounded p-1"
                                                        title="Edit"
                                                    >
                                                        <Palette className="w-3 h-3" />
                                                    </button>
                                                    <button 
                                                        onClick={(e) => handleDeleteTheme(theme.id, e)}
                                                        className="text-rose-400 hover:text-rose-200 bg-black/50 rounded p-1"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4 animate-in slide-in-from-right-4 relative">
                            <div className="flex flex-col gap-1">
                                <div className="flex justify-between items-center">
                                    <label className="text-xs text-slate-400 font-bold uppercase">Theme Name</label>
                                    <button onClick={handleResetThemeEditor} className="text-xs flex items-center gap-1 text-orange-400 hover:text-orange-300" title="Reset to original colors">
                                        <RotateCcw className="w-3 h-3" /> Reset
                                    </button>
                                </div>
                                <input 
                                    type="text" 
                                    value={editingTheme.name} 
                                    onChange={(e) => setEditingTheme({...editingTheme, name: e.target.value})}
                                    className="bg-slate-800 border border-slate-700 rounded p-2 text-white focus:border-indigo-500 outline-none"
                                />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                {Object.entries(editingTheme.colors).map(([key, val]) => (
                                    <div key={key} className="flex flex-col gap-1">
                                        <label className="text-xs text-slate-400 font-bold uppercase">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                                        <div className="flex gap-2">
                                            <input 
                                                type="color" 
                                                value={val} 
                                                onChange={(e) => setEditingTheme({
                                                    ...editingTheme, 
                                                    colors: { ...editingTheme.colors, [key]: e.target.value }
                                                })}
                                                className="h-8 w-8 rounded cursor-pointer bg-transparent p-0 border-0"
                                            />
                                            <input 
                                                type="text" 
                                                value={val} 
                                                onChange={(e) => setEditingTheme({
                                                    ...editingTheme, 
                                                    colors: { ...editingTheme.colors, [key]: e.target.value }
                                                })}
                                                className="flex-1 bg-slate-800 border border-slate-700 rounded px-2 text-xs text-white font-mono uppercase"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-2 pt-4 border-t border-slate-800 mt-4">
                                <button onClick={handleSaveCustomTheme} className="flex-1 bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg font-bold">Save Theme</button>
                                <button onClick={() => setEditingTheme(null)} className="px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg">Cancel</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default App;
