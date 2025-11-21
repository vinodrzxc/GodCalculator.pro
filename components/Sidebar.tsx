import React from 'react';
import { TOOLS } from '../tools';
import { Home } from 'lucide-react';

interface SidebarProps {
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeId, onSelect, className = '' }) => {
  return (
    <aside className={`flex flex-col h-full ${className}`} 
           style={{ backgroundColor: 'var(--bg-surface)', borderRight: '1px solid var(--border)' }}>
      <div className="p-6 border-b shrink-0" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-4 px-1">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg border-t border-white/20 ring-1 ring-black/20"
               style={{ background: 'var(--primary)' }}>
            <span className="font-bold text-white text-2xl drop-shadow-md">G</span>
          </div>
          <div>
            <h1 className="font-bold text-2xl tracking-tight leading-none" style={{ color: 'var(--text-main)' }}>GodCalculator.pro</h1>
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: 'var(--text-sec)' }}>Pro Version</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin">
        <div>
          <p className="px-4 py-2 text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-sec)' }}>Main</p>
          <button
            onClick={() => onSelect('home')}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-200 group`}
            style={{ 
                backgroundColor: activeId === 'home' ? 'var(--primary)' : 'transparent',
                color: activeId === 'home' ? '#fff' : 'var(--text-sec)'
            }}
          >
            <div className={`
              w-10 h-10 rounded-lg flex items-center justify-center shrink-0
              shadow-sm border-t border-white/30 border-b border-black/20
              group-hover:scale-110 transition-transform duration-300
            `} style={{ background: activeId === 'home' ? 'rgba(255,255,255,0.2)' : 'var(--secondary)' }}>
              <Home className="w-6 h-6 drop-shadow-sm" style={{ color: activeId === 'home' ? '#fff' : 'var(--text-main)' }} />
            </div>
            <span className="truncate text-lg font-semibold" style={{ color: activeId === 'home' ? '#fff' : 'var(--text-main)' }}>General Calculator</span>
          </button>
        </div>

        <div>
          <p className="px-4 py-2 text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-sec)' }}>Tools</p>
          <div className="space-y-2.5">
            {TOOLS.map((tool) => {
              const isActive = activeId === tool.id;
              const colorName = tool.iconColor?.split('-')[1] || 'indigo';
              
              return (
                <button
                  key={tool.id}
                  onClick={() => onSelect(tool.id)}
                  className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-200 group`}
                  style={{ 
                      backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                  }}
                >
                  <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center shrink-0
                    shadow-sm border-t border-white/30 border-b border-black/20
                    group-hover:scale-110 transition-transform duration-300
                  `} style={{ background: isActive ? 'rgba(255,255,255,0.2)' : `var(--secondary)` }}>
                    {/* Fallback to specific colors if active, else theme */}
                    <tool.icon className="w-5 h-5 drop-shadow-sm" style={{ color: isActive ? '#fff' : `var(--text-main)` }} />
                  </div>
                  <span className="truncate text-[16px] font-medium" style={{ color: isActive ? '#fff' : 'var(--text-main)' }}>{tool.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;