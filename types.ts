
import React from 'react';

export enum CalculatorMode {
  STANDARD = 'STANDARD',
  SCIENTIFIC = 'SCIENTIFIC',
  AI_SOLVER = 'AI_SOLVER'
}

export interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
  mode: CalculatorMode | string; // Allow string for custom tool names
  angleMode?: 'DEG' | 'RAD';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface ToolInput {
  name: string;
  label: string;
  type: 'number' | 'text' | 'date' | 'select';
  placeholder?: string;
  options?: { label: string; value: string | number }[]; // For select type
  defaultValue?: string;
  colSpan?: number;
}

export interface Tool {
  id: string;
  name: string;
  icon: any;
  description?: string;
  inputs: ToolInput[];
  calculate: (values: Record<string, string>) => string | Record<string, string>;
  formatResult?: (result: any) => React.ReactNode;
  instructions?: string[];
  iconColor?: string;
  iconBg?: string;
  buttonVariant?: string;
}

export interface Theme {
  id: string;
  name: string;
  type: 'preset' | 'custom';
  colors: {
    bgApp: string;        // Main page background
    bgSurface: string;    // Calculator/Sidebar container background
    textMain: string;     // Primary text color
    textSec: string;      // Secondary/Label text color
    primary: string;      // Primary Action (Calculate button, Active Sidebar)
    secondary: string;    // Number keys background
    accent: string;       // Operator keys background
    border: string;       // Border colors
  };
}
