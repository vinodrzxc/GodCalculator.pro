import { CalculatorMode, Theme } from './types';
import { 
  Calculator, 
  Beaker, 
  BrainCircuit, 
  History, 
  Delete, 
  Equal, 
  Plus, 
  Minus, 
  X, 
  Divide, 
  Percent,
  Trash2,
  Home
} from 'lucide-react';

export const APP_NAME = "GodCalculator.pro";

export const MODES = [
  { id: CalculatorMode.STANDARD, label: 'General Calculator', icon: Calculator },
];

export const MAX_HISTORY_ITEMS = 50;

export const PRESET_THEMES: Theme[] = [
  {
    id: 'classic-dark',
    name: 'Omni Dark',
    type: 'preset',
    colors: {
      bgApp: '#0f172a', // Slate 950
      bgSurface: '#1e293b', // Slate 800
      textMain: '#f8fafc', // Slate 50
      textSec: '#94a3b8', // Slate 400
      primary: '#6366f1', // Indigo 500
      secondary: '#1e293b', // Slate 800 (Keys)
      accent: '#334155', // Slate 700 (Operators)
      border: '#334155', // Slate 700
    }
  },
  {
    id: 'violet-dream',
    name: 'Violet Dream',
    type: 'preset',
    colors: {
      bgApp: '#4e368c', 
      bgSurface: '#2e2054', // Darker violet
      textMain: '#ffffff',
      textSec: '#d8b4fe',
      primary: '#d946ef', // Fuchsia
      secondary: '#3b2a6b', // Key bg
      accent: '#5b42a0', // Operator bg
      border: '#6d28d9',
    }
  },
  {
    id: 'high-contrast-day',
    name: 'Day Contrast',
    type: 'preset',
    colors: {
      bgApp: '#f1f5f9', // Slate 100
      bgSurface: '#000000', // Black Container
      textMain: '#ffffff',
      textSec: '#94a3b8',
      primary: '#e11d48', // Rose 600
      secondary: '#fffbeb', // Amber 50 (Keys)
      accent: '#e0e7ff', // Indigo 100 (Operators)
      border: '#334155',
    }
  },
  {
    id: 'forest-mist',
    name: 'Forest Mist',
    type: 'preset',
    colors: {
      bgApp: '#052e16', // Green 950
      bgSurface: '#064e3b', // Green 900
      textMain: '#ecfdf5', // Green 50
      textSec: '#6ee7b7', // Green 300
      primary: '#10b981', // Emerald 500
      secondary: '#065f46', // Emerald 800
      accent: '#047857', // Emerald 700
      border: '#064e3b',
    }
  },
  {
    id: 'ocean-breeze',
    name: 'Ocean Breeze',
    type: 'preset',
    colors: {
      bgApp: '#ecfeff', // Cyan 50
      bgSurface: '#ffffff', // White
      textMain: '#0e7490', // Cyan 700
      textSec: '#155e75', // Cyan 800
      primary: '#06b6d4', // Cyan 500
      secondary: '#cffafe', // Cyan 100
      accent: '#a5f3fc', // Cyan 200
      border: '#22d3ee',
    }
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    type: 'preset',
    colors: {
      bgApp: '#000000',
      bgSurface: '#121212',
      textMain: '#00ffcc', // Cyan Neon
      textSec: '#ff00ff', // Magenta Neon
      primary: '#facc15', // Yellow
      secondary: '#1a1a1a',
      accent: '#333333',
      border: '#00ffcc',
    }
  }
];