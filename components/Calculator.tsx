
import React, { useEffect } from 'react';
import { useCalculator } from '../hooks/useCalculator';
import { CalculatorMode, HistoryItem } from '../types';
import Button from './Button';
import Display from './Display';
import { Delete } from 'lucide-react';

interface CalculatorProps {
  mode: CalculatorMode;
  onHistoryUpdate: (item: HistoryItem) => void;
  className?: string;
}

const Calculator: React.FC<CalculatorProps> = ({ mode, onHistoryUpdate, className = '' }) => {
  const { 
    input, result, memory, angleMode,
    append, clear, backspace, calculate, toggleAngleMode,
    memoryAdd, memorySub, memoryRecall, memoryClear
  } = useCalculator();

  const handleCalculate = () => {
    const currentInput = input;
    const res = calculate();
    if (res && res !== 'Error') {
      onHistoryUpdate({
        id: Date.now().toString(),
        expression: currentInput,
        result: res,
        timestamp: Date.now(),
        mode,
        angleMode
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const key = e.key;
      if (/[0-9.]/.test(key)) { e.preventDefault(); append(key); }
      if (['+', '-', '*', '/', '%', '(', ')'].includes(key)) { e.preventDefault(); append(key); }
      if (key === 'Enter' || key === '=') { e.preventDefault(); handleCalculate(); }
      if (key === 'Backspace') { e.preventDefault(); backspace(); }
      if (key === 'Escape' || key === 'Delete') { e.preventDefault(); clear(); }
      if (key === '^') { e.preventDefault(); append('^'); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [append, backspace, clear, calculate]);

  const isScientific = mode === CalculatorMode.SCIENTIFIC;

  return (
    <div className={`flex flex-col h-full p-4 ${className}`}>
      <Display 
        input={input} 
        result={result} 
        memory={memory} 
        angleMode={isScientific ? angleMode : undefined} 
      />

      <div className="flex justify-between mb-3 px-1 rounded-lg p-1 gap-1 border"
           style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderColor: 'var(--border)' }}>
        <Button variant="memory" onClick={memoryClear}>MC</Button>
        <Button variant="memory" onClick={memoryRecall}>MR</Button>
        <Button variant="memory" onClick={memorySub}>M-</Button>
        <Button variant="memory" onClick={memoryAdd}>M+</Button>
        {isScientific && <Button variant="memory" onClick={toggleAngleMode} style={{ color: 'var(--primary)' }}>{angleMode}</Button>}
      </div>

      <div className={`flex-1 flex gap-3 ${isScientific ? 'flex-col md:flex-row' : 'flex-col'}`}>
        {isScientific && (
          <div className="w-full md:w-[55%] grid grid-cols-5 gap-2 animate-in slide-in-from-top-2 fade-in duration-200 h-full content-start">
             <Button variant="function" onClick={() => append('(')}>(</Button>
             <Button variant="function" onClick={() => append(')')}>)</Button>
             <Button variant="function" onClick={() => append('^')}>x^y</Button>
             <Button variant="function" onClick={() => append('fact(')}>x!</Button>
             <Button variant="function" onClick={() => append('abs(')}>|x|</Button>
             
             <Button variant="function" onClick={() => append('sin(')}>sin</Button>
             <Button variant="function" onClick={() => append('cos(')}>cos</Button>
             <Button variant="function" onClick={() => append('tan(')}>tan</Button>
             <Button variant="function" onClick={() => append('^(-1)')}>1/x</Button>
             <Button variant="function" onClick={() => append('e')} className="font-serif italic">e</Button>

             <Button variant="function" onClick={() => append('ln(')}>ln</Button>
             <Button variant="function" onClick={() => append('log(')}>log</Button>
             <Button variant="function" onClick={() => append('sqrt(')}>√</Button>
             <Button variant="function" onClick={() => append('^2')}>x²</Button>
             <Button variant="function" onClick={() => append('π')} className="font-serif">π</Button>

             <Button variant="function" onClick={() => append('asin(')} className="tracking-tighter">asin</Button>
             <Button variant="function" onClick={() => append('acos(')} className="tracking-tighter">acos</Button>
             <Button variant="function" onClick={() => append('atan(')} className="tracking-tighter">atan</Button>
             <Button variant="function" onClick={() => append('cbrt(')}>∛</Button>
             <Button variant="function" onClick={() => append('^3')}>x³</Button>
          </div>
        )}

        <div className={`grid grid-cols-4 gap-3 w-full ${isScientific ? 'md:w-[45%]' : ''}`}>
          <Button variant="danger" onClick={clear} className="text-base font-bold">AC</Button>
          <Button variant="danger" onClick={backspace}><Delete className="w-4 h-4" /></Button>
          <Button variant="operator" onClick={() => append('%')} className="text-xl font-medium">%</Button>
          <Button variant="operator" onClick={() => append('/')} className="text-2xl leading-none font-medium">÷</Button>

          <Button onClick={() => append('7')} variant="number" className="text-3xl font-medium">7</Button>
          <Button onClick={() => append('8')} variant="number" className="text-3xl font-medium">8</Button>
          <Button onClick={() => append('9')} variant="number" className="text-3xl font-medium">9</Button>
          <Button onClick={() => append('*')} variant="operator" className="text-2xl leading-none font-medium">×</Button>

          <Button onClick={() => append('4')} variant="number" className="text-3xl font-medium">4</Button>
          <Button onClick={() => append('5')} variant="number" className="text-3xl font-medium">5</Button>
          <Button onClick={() => append('6')} variant="number" className="text-3xl font-medium">6</Button>
          <Button onClick={() => append('-')} variant="operator" className="text-3xl leading-none font-medium">-</Button>

          <Button onClick={() => append('1')} variant="number" className="text-3xl font-medium">1</Button>
          <Button onClick={() => append('2')} variant="number" className="text-3xl font-medium">2</Button>
          <Button onClick={() => append('3')} variant="number" className="text-3xl font-medium">3</Button>
          <Button onClick={() => append('+')} variant="operator" className="text-2xl leading-none font-medium">+</Button>

          <Button onClick={() => append('0')} variant="number" className="text-3xl font-medium col-span-2">0</Button>
          <Button onClick={() => append('.')} variant="number" className="text-3xl font-bold mb-2">.</Button>
          <Button onClick={handleCalculate} variant="rose" className="text-2xl shadow-lg">=</Button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
