import { useState, useCallback } from 'react';

const cleanNumber = (num: number): string => {
  if (!isFinite(num)) return "Error";
  // Fix floating point precision issues (e.g. 0.1 + 0.2)
  // Remove trailing zeros after decimal point
  return parseFloat(num.toPrecision(12)).toString();
};

// Factorial helper
const factorial = (n: number): number => {
  if (n < 0) return NaN;
  if (!Number.isInteger(n)) return NaN;
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
};

export const useCalculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [lastWasResult, setLastWasResult] = useState(false);
  const [memory, setMemory] = useState<number>(0);
  const [angleMode, setAngleMode] = useState<'DEG' | 'RAD'>('DEG');

  const append = useCallback((val: string) => {
    if (lastWasResult && !['+', '-', '*', '/', '%', '^'].includes(val)) {
        // New calculation started
        setInput(val);
        setLastWasResult(false);
        setResult('');
    } else {
        if (lastWasResult) {
            setLastWasResult(false);
        }
        setInput(prev => prev + val);
    }
  }, [lastWasResult]);

  const clear = useCallback(() => {
    setInput('');
    setResult('');
    setLastWasResult(false);
  }, []);

  const backspace = useCallback(() => {
    if (lastWasResult) {
      setInput('');
      setResult('');
      setLastWasResult(false);
    } else {
      setInput(prev => prev.slice(0, -1));
    }
  }, [lastWasResult]);

  const toggleAngleMode = useCallback(() => {
    setAngleMode(prev => prev === 'DEG' ? 'RAD' : 'DEG');
  }, []);

  const memoryAdd = useCallback(() => {
    const val = parseFloat(result || input || '0');
    if (!isNaN(val)) {
      setMemory(prev => prev + val);
      setLastWasResult(true);
    }
  }, [result, input]);

  const memorySub = useCallback(() => {
    const val = parseFloat(result || input || '0');
    if (!isNaN(val)) {
      setMemory(prev => prev - val);
      setLastWasResult(true);
    }
  }, [result, input]);

  const memoryRecall = useCallback(() => {
    const val = cleanNumber(memory);
    setInput(val);
    setResult('');
    setLastWasResult(true);
  }, [memory]);

  const memoryClear = useCallback(() => {
    setMemory(0);
  }, []);

  const calculate = useCallback(() => {
    if (!input) return '';
    
    try {
      // Basic syntax transformations
      let sanitized = input
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/%/g, '/100')
        .replace(/\^/g, '**')
        .replace(/π/g, 'PI')
        .replace(/e/g, 'E');

      // Security validation
      // Allow digits, operators, parens, commas, and whitelisted function names
      if (/[^0-9+\-*/().%,\sPIEsincotlagqrfbxyhdm]/.test(sanitized)) {
        throw new Error("Invalid input");
      }

      // Define the math scope
      const scope: Record<string, any> = {
        sin: (x: number) => angleMode === 'DEG' ? Math.sin(x * Math.PI / 180) : Math.sin(x),
        cos: (x: number) => angleMode === 'DEG' ? Math.cos(x * Math.PI / 180) : Math.cos(x),
        tan: (x: number) => angleMode === 'DEG' ? Math.tan(x * Math.PI / 180) : Math.tan(x),
        asin: (x: number) => { const r = Math.asin(x); return angleMode === 'DEG' ? r * 180 / Math.PI : r; },
        acos: (x: number) => { const r = Math.acos(x); return angleMode === 'DEG' ? r * 180 / Math.PI : r; },
        atan: (x: number) => { const r = Math.atan(x); return angleMode === 'DEG' ? r * 180 / Math.PI : r; },
        log: Math.log10,
        ln: Math.log,
        sqrt: Math.sqrt,
        cbrt: Math.cbrt,
        abs: Math.abs,
        fact: factorial,
        PI: Math.PI,
        E: Math.E
      };

      const keys = Object.keys(scope);
      const values = Object.values(scope);
      
      // Create a secure function with the scope injected
      // eslint-disable-next-line no-new-func
      const calcFunc = new Function(...keys, `return ${sanitized}`);
      const rawResult = calcFunc(...values);
      
      if (!isFinite(rawResult) || isNaN(rawResult)) {
        throw new Error("Math Error");
      }

      const finalResult = cleanNumber(rawResult);
      setResult(finalResult);
      setInput(finalResult);
      setLastWasResult(true);
      return finalResult;
    } catch (error) {
      setResult('Error');
      setLastWasResult(true);
      return 'Error';
    }
  }, [input, angleMode]);

  return { 
    input, 
    result, 
    memory,
    angleMode,
    append, 
    clear, 
    backspace, 
    calculate, 
    setInput,
    toggleAngleMode,
    memoryAdd,
    memorySub,
    memoryRecall,
    memoryClear
  };
};