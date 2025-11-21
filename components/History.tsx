import React from 'react';
import { HistoryItem, CalculatorMode } from '../types';
import { Trash2, Clock, Calculator, BrainCircuit } from 'lucide-react';
import Button from './Button';

interface HistoryProps {
  isOpen: boolean;
  history: HistoryItem[];
  onClear: () => void;
  onSelect: (item: HistoryItem) => void;
  onClose: () => void;
}

const History: React.FC<HistoryProps> = ({ isOpen, history, onClear, onSelect, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-y-0 left-0 z-50 w-full sm:w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-semibold">
          <Clock className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
          <h3>History</h3>
        </div>
        <div className="flex gap-2">
          <Button variant="danger" onClick={onClear} className="p-2 rounded-lg text-xs">
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" onClick={onClose} className="p-2 rounded-lg">
            ✕
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
        {history.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 text-sm">
            <p>No calculations yet.</p>
          </div>
        ) : (
          history.map((item) => (
            <div 
              key={item.id}
              onClick={() => onSelect(item)}
              className="group bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/50 hover:border-indigo-500/50 rounded-xl p-3 cursor-pointer transition-all shadow-sm hover:shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1">
                  {item.mode === CalculatorMode.AI_SOLVER ? (
                    <><BrainCircuit className="w-3 h-3" /> AI</>
                  ) : (
                    <><Calculator className="w-3 h-3" /> Calc</>
                  )}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-600">
                  {new Date(item.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div className="text-slate-500 dark:text-slate-400 text-sm font-mono truncate mb-1" title={item.expression}>
                {item.expression}
              </div>
              <div className="text-indigo-600 dark:text-indigo-300 text-lg font-semibold text-right truncate">
                = {item.result}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;