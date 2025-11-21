
import React, { useState, useEffect } from 'react';
import { Tool } from '../types';
import Button from './Button';
import { Calculator, RotateCcw, Info } from 'lucide-react';

interface ToolCalculatorProps {
  tool: Tool;
  onAddToHistory: (result: string) => void;
}

const ToolCalculator: React.FC<ToolCalculatorProps> = ({ tool, onAddToHistory }) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    setValues({});
    setResult('');
    const defaults: Record<string, string> = {};
    tool.inputs.forEach(input => {
      if (input.defaultValue) defaults[input.name] = input.defaultValue;
    });
    setValues(defaults);
  }, [tool]);

  const handleChange = (name: string, val: string) => {
    setValues(prev => ({ ...prev, [name]: val }));
  };

  const handleCalculate = () => {
    const res = tool.calculate(values);
    if (typeof res === 'string') {
      setResult(res);
      if (res && !res.includes('Error') && !res.includes('Enter')) {
        onAddToHistory(`${tool.name}: ${res.replace(/\n/g, ', ')}`);
      }
    }
  };

  const handleReset = () => {
    setValues({});
    setResult('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleCalculate();
  };

  return (
    <div className="w-full h-full flex flex-col rounded-xl overflow-hidden transition-colors duration-300"
         style={{ backgroundColor: 'var(--bg-surface)' }}>
      
      <div className="p-3 border-b flex items-center gap-3" 
           style={{ borderColor: 'var(--border)', backgroundColor: 'rgba(var(--rgb-bg-app), 0.1)' }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm border-t border-white/30 border-b border-black/20"
             style={{ background: 'var(--primary)' }}>
           <tool.icon className="w-5 h-5 text-white drop-shadow-sm" />
        </div>
        <div>
          <h2 className="text-sm font-bold" style={{ color: 'var(--text-main)' }}>{tool.name}</h2>
          <p className="text-[10px]" style={{ color: 'var(--text-sec)' }}>{tool.description}</p>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-lg mx-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tool.inputs.map((input) => (
              <div key={input.name} className={(input.colSpan === 2 || input.type === 'select') ? 'sm:col-span-2' : ''}>
                <label className="block text-[10px] font-semibold uppercase tracking-wide mb-1 opacity-90"
                       style={{ color: 'var(--text-sec)' }}>
                  {input.label}
                </label>
                {input.type === 'select' ? (
                  <select
                    value={values[input.name] || ''}
                    onChange={(e) => handleChange(input.name, e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full border rounded-lg px-2 py-1.5 text-sm focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                    style={{ 
                        backgroundColor: 'var(--secondary)', 
                        borderColor: 'var(--border)',
                        color: 'var(--text-main)' 
                    }}
                  >
                    {input.options?.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={input.type}
                    value={values[input.name] || ''}
                    onChange={(e) => handleChange(input.name, e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={input.placeholder}
                    className="w-full border rounded-lg px-2 py-1.5 text-sm focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder-opacity-50"
                    style={{ 
                        backgroundColor: 'var(--secondary)', 
                        borderColor: 'var(--border)',
                        color: 'var(--text-main)' 
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-2">
            <Button 
              onClick={handleCalculate} 
              variant="rose"
              className="flex-1 py-2 text-xs"
            >
              <Calculator className="w-3.5 h-3.5 mr-1.5" /> Calculate
            </Button>
            <Button onClick={handleReset} variant="secondary" className="px-2.5">
              <RotateCcw className="w-3.5 h-3.5" />
            </Button>
          </div>

          {result && (
            <div className="mt-4 p-3 rounded-lg border animate-in fade-in slide-in-from-bottom-2 shadow-sm"
                 style={{ backgroundColor: 'var(--secondary)', borderColor: 'var(--border)' }}>
              <h3 className="text-[10px] font-bold uppercase tracking-wider mb-0.5 opacity-90" style={{ color: 'var(--text-sec)' }}>Result</h3>
              <div className="text-lg font-bold whitespace-pre-wrap leading-snug" style={{ color: 'var(--text-main)' }}>
                {result}
              </div>
            </div>
          )}

          {tool.instructions && tool.instructions.length > 0 && (
            <div className="mt-6 p-3 rounded-xl border backdrop-blur-sm"
                 style={{ backgroundColor: 'rgba(var(--rgb-bg-app), 0.1)', borderColor: 'var(--border)' }}>
              <h3 className="text-xs font-bold flex items-center gap-1.5 mb-2" style={{ color: 'var(--text-main)' }}>
                <Info className="w-3.5 h-3.5" /> How to use
              </h3>
              <ul className="list-disc list-inside text-[10px] sm:text-xs space-y-1 leading-relaxed opacity-90" style={{ color: 'var(--text-sec)' }}>
                {tool.instructions.map((inst, i) => (
                  <li key={i} className="pl-1">
                    <span className="-ml-1">{inst}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolCalculator;
