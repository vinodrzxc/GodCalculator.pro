
import React from 'react';

interface DisplayProps {
  input: string;
  result: string;
  historyPreview?: string;
  memory?: number;
  angleMode?: 'DEG' | 'RAD';
}

const Display: React.FC<DisplayProps> = ({ input, result, historyPreview, memory = 0, angleMode }) => {
  const mainText = result ? result : (input || '0');
  const subText = (result && input !== result) ? input : '';

  return (
    <div className="w-full rounded-xl p-4 mb-2 shadow-inner border flex flex-col items-end justify-end min-h-[110px] relative overflow-hidden group"
         style={{ 
             backgroundColor: 'rgba(0,0,0,0.2)', 
             borderColor: 'var(--border)' 
         }}>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[length:20px_20px]" />
      
      <div className="z-10 w-full text-right h-full flex flex-col">
        <div className="flex justify-between items-start mb-1">
           <div className="flex items-center gap-2">
             {angleMode && (
               <span className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded border"
                     style={{ color: 'var(--text-sec)', borderColor: 'var(--border)', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                 {angleMode}
               </span>
             )}
             {memory !== 0 && (
               <span className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded border"
                     style={{ color: 'var(--primary)', borderColor: 'var(--primary)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                 MEM
               </span>
             )}
           </div>
           <div className="text-[11px] font-mono overflow-hidden text-ellipsis whitespace-nowrap max-w-[60%] opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: 'var(--text-sec)' }}>
             {historyPreview}
           </div>
        </div>
        
        <div className="mt-auto">
          <div className="text-lg font-medium break-all opacity-70 mb-1 min-h-[1.5rem] font-mono tracking-tight"
               style={{ color: 'var(--text-sec)' }}>
            {subText}
          </div>
          <div className="text-5xl sm:text-6xl font-bold tracking-tight break-all leading-none drop-shadow-sm"
               style={{ color: 'var(--text-main)' }}>
            {mainText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display;
