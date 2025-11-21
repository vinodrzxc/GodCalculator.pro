
import { Tool } from './types';
import { 
  Heart, Calendar, Percent, DollarSign, 
  TrendingDown, TrendingUp, PiggyBank, Briefcase, 
  Fuel, ArrowLeftRight, Zap, Coins, 
  Armchair, Car, Banknote,
  Scale, Activity, GlassWater, Utensils, Landmark,
  BarChart3, Tag, Target, Timer, HardDrive,
  Monitor, GraduationCap, Dog, Ruler, Box, Palette,
  Beaker, Binary, Thermometer, Calculator, Triangle, 
  Move3d, Wind, Clock, Sigma, Divide, Dumbbell, 
  PaintBucket, Baby, ChefHat, Smartphone, Repeat,
  Wallet, Building2, ArrowUpRight, BadgePercent,
  Home, Wrench, Hammer, LineChart, ScrollText
} from 'lucide-react';

const formatCurrency = (val: number) => val.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

export const TOOLS: Tool[] = [
  {
    id: 'scientific-calc',
    name: 'Scientific Calculator',
    icon: Beaker,
    description: 'Advanced math functions.',
    iconColor: 'text-violet-500',
    iconBg: 'bg-violet-100',
    inputs: [], // Handled by custom component
    calculate: () => '',
    instructions: [
        "Use this calculator for advanced mathematical operations.",
        "Supports Trigonometry (sin, cos, tan), Logarithms, Powers, and Roots.",
        "Use the toggle button to switch between Degrees (DEG) and Radians (RAD)."
    ]
  },
  // --- ENGINEERING TOOLS ---
  {
    id: 'eng-mech',
    name: 'Engineering Calc',
    icon: Wrench,
    description: 'Torque, Stress, Power.',
    iconColor: 'text-slate-700',
    iconBg: 'bg-slate-300',
    inputs: [
        { name: 'mode', label: 'Calculation', type: 'select', options: [
            {label: 'Torque (F × r)', value: 'torque'},
            {label: 'Stress (F ÷ A)', value: 'stress'},
            {label: 'Density (m ÷ V)', value: 'density'},
            {label: 'Pressure (F ÷ A)', value: 'pressure'},
            {label: 'Power (W ÷ t)', value: 'power'}
        ], defaultValue: 'torque' },
        { name: 'v1', label: 'Value A (F, m, W)', type: 'number' },
        { name: 'v2', label: 'Value B (r, A, V, t)', type: 'number' }
    ],
    instructions: [
        "Select the formula mode.",
        "Torque: Enter Force (N) and Radius (m). Result in N·m.",
        "Stress: Enter Force (N) and Area (m²). Result in Pascals (Pa).",
        "Density: Enter Mass (kg) and Volume (m³). Result in kg/m³.",
        "Pressure: Enter Force (N) and Area (m²). Result in Pascals (Pa).",
        "Power: Enter Work (J) and Time (s). Result in Watts (W)."
    ],
    calculate: (values) => {
        const m = values.mode;
        const v1 = parseFloat(values.v1);
        const v2 = parseFloat(values.v2);
        if(isNaN(v1) || isNaN(v2)) return '';

        if(m === 'torque') return `Torque: ${(v1*v2).toFixed(2)} N·m`;
        if(m === 'stress') return `Stress: ${(v1/v2).toFixed(2)} Pa`;
        if(m === 'density') return `Density: ${(v1/v2).toFixed(2)} kg/m³`;
        if(m === 'pressure') return `Pressure: ${(v1/v2).toFixed(2)} Pa`;
        if(m === 'power') return `Power: ${(v1/v2).toFixed(2)} W`;
        return '';
    }
  },
  {
    id: 'concrete-calc',
    name: 'Concrete Calc',
    icon: Hammer,
    description: 'Volume & Bags.',
    iconColor: 'text-orange-600',
    iconBg: 'bg-orange-100',
    inputs: [
        { name: 'l', label: 'Length (ft)', type: 'number' },
        { name: 'w', label: 'Width (ft)', type: 'number' },
        { name: 'd', label: 'Depth (inches)', type: 'number' }
    ],
    instructions: [
        "Enter dimensions of the slab/footing.",
        "Calculates volume in Cubic Yards and estimated premix bags required."
    ],
    calculate: (values) => {
        const l = parseFloat(values.l);
        const w = parseFloat(values.w);
        const d = parseFloat(values.d);
        if(isNaN(l) || isNaN(w) || isNaN(d)) return '';

        // Convert depth to feet
        const d_ft = d / 12;
        const cubic_ft = l * w * d_ft;
        const cubic_yards = cubic_ft / 27;
        
        // Bags (typical 80lb bag ~ 0.6 cubic ft, 60lb ~ 0.45 cubic ft)
        const bags80 = Math.ceil(cubic_ft / 0.6);
        const bags60 = Math.ceil(cubic_ft / 0.45);

        return `Volume: ${cubic_yards.toFixed(2)} cu. yards\nVolume: ${cubic_ft.toFixed(2)} cu. ft\n\nEst. 80lb Bags: ${bags80}\nEst. 60lb Bags: ${bags60}`;
    }
  },
  {
    id: 'lerp-calc',
    name: 'Linear Interpolation',
    icon: LineChart,
    description: 'Find Y for X.',
    iconColor: 'text-indigo-600',
    iconBg: 'bg-indigo-100',
    inputs: [
        { name: 'x1', label: 'x1', type: 'number' },
        { name: 'y1', label: 'y1', type: 'number' },
        { name: 'x2', label: 'x2', type: 'number' },
        { name: 'y2', label: 'y2', type: 'number' },
        { name: 'x', label: 'Target x', type: 'number', colSpan: 2 }
    ],
    instructions: [
        "Enter two known points (x1, y1) and (x2, y2).",
        "Enter the target x value.",
        "Calculates the corresponding y value using linear interpolation."
    ],
    calculate: (values) => {
        const x1 = parseFloat(values.x1);
        const y1 = parseFloat(values.y1);
        const x2 = parseFloat(values.x2);
        const y2 = parseFloat(values.y2);
        const x = parseFloat(values.x);
        
        if(isNaN(x1)||isNaN(y1)||isNaN(x2)||isNaN(y2)||isNaN(x)) return '';
        if(x2 === x1) return 'Slope error (x1 = x2)';

        const y = y1 + ((x - x1) * (y2 - y1)) / (x2 - x1);
        return `Target y: ${y.toFixed(4)}`;
    }
  },
  // --- NEW FINANCE TOOLS ---
  {
    id: 'lumpsum-calc',
    name: 'Lumpsum Calculator',
    icon: Wallet,
    description: 'One-time investment.',
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-100',
    inputs: [
      { name: 'investment', label: 'Total Investment', type: 'number' },
      { name: 'rate', label: 'Expected Return (% p.a)', type: 'number', defaultValue: '12' },
      { name: 'years', label: 'Time Period (Years)', type: 'number', defaultValue: '10' }
    ],
    instructions: [
      "Enter the total amount you want to invest once.",
      "Enter the expected annual return rate.",
      "Calculates the future value of your investment."
    ],
    calculate: (values) => {
      const P = parseFloat(values.investment);
      const r = parseFloat(values.rate) / 100;
      const n = parseFloat(values.years);
      if (isNaN(P) || isNaN(r) || isNaN(n)) return '';

      const A = P * Math.pow((1 + r), n);
      const earnings = A - P;
      return `Invested: ${formatCurrency(P)}\nEst. Returns: ${formatCurrency(earnings)}\nTotal Value: ${formatCurrency(A)}`;
    }
  },
  {
    id: 'step-up-sip',
    name: 'Step-Up SIP',
    icon: ArrowUpRight,
    description: 'Increasing SIP.',
    iconColor: 'text-green-600',
    iconBg: 'bg-green-100',
    inputs: [
      { name: 'monthly', label: 'Initial Monthly Investment', type: 'number' },
      { name: 'rate', label: 'Expected Return (% p.a)', type: 'number', defaultValue: '12' },
      { name: 'years', label: 'Time Period (Years)', type: 'number', defaultValue: '10' },
      { name: 'stepup', label: 'Annual Step-Up (%)', type: 'number', defaultValue: '10' }
    ],
    instructions: [
      "Calculates returns if you increase your SIP amount every year.",
      "Enter initial SIP amount and the percentage increase per year."
    ],
    calculate: (values) => {
      let monthly = parseFloat(values.monthly);
      const rate = parseFloat(values.rate) / 100 / 12;
      const years = parseFloat(values.years);
      const step = parseFloat(values.stepup) / 100;
      
      if (isNaN(monthly) || isNaN(rate) || isNaN(years)) return '';

      let totalInvested = 0;
      let currentValue = 0;

      for (let y = 1; y <= years; y++) {
        for (let m = 1; m <= 12; m++) {
          totalInvested += monthly;
          currentValue = (currentValue + monthly) * (1 + rate);
        }
        monthly = monthly * (1 + step);
      }

      return `Total Invested: ${formatCurrency(totalInvested)}\nEst. Returns: ${formatCurrency(currentValue - totalInvested)}\nTotal Value: ${formatCurrency(currentValue)}`;
    }
  },
  {
    id: 'ppf-calc',
    name: 'PPF Calculator',
    icon: Landmark,
    description: 'Public Provident Fund.',
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-100',
    inputs: [
      { name: 'investment', label: 'Yearly Investment', type: 'number', placeholder: 'Max 1.5L' },
      { name: 'rate', label: 'Interest Rate (%)', type: 'number', defaultValue: '7.1' },
      { name: 'years', label: 'Duration (Years)', type: 'number', defaultValue: '15' }
    ],
    instructions: [
      "Calculates maturity amount for Public Provident Fund (PPF).",
      "Minimum tenure is 15 years.",
      "Interest is compounded annually."
    ],
    calculate: (values) => {
      const invest = parseFloat(values.investment);
      const r = parseFloat(values.rate) / 100;
      const n = parseFloat(values.years);
      
      if (isNaN(invest) || isNaN(r) || isNaN(n)) return '';
      
      let balance = 0;
      let totalInvested = 0;
      
      for(let i = 0; i < n; i++) {
          balance += invest;
          totalInvested += invest;
          balance += balance * r;
      }
      
      return `Invested: ${formatCurrency(totalInvested)}\nInterest: ${formatCurrency(balance - totalInvested)}\nMaturity: ${formatCurrency(balance)}`;
    }
  },
  {
    id: 'swp-calc',
    name: 'SWP Calculator',
    icon: ArrowLeftRight,
    description: 'Systematic Withdrawal.',
    iconColor: 'text-indigo-600',
    iconBg: 'bg-indigo-100',
    inputs: [
      { name: 'corpus', label: 'Total Investment', type: 'number' },
      { name: 'withdrawal', label: 'Monthly Withdrawal', type: 'number' },
      { name: 'rate', label: 'Expected Return (% p.a)', type: 'number', defaultValue: '8' },
      { name: 'years', label: 'Duration (Years)', type: 'number', defaultValue: '10' }
    ],
    instructions: [
      "Calculates remaining balance after withdrawing a fixed amount monthly.",
      "Useful for retirement planning to see how long a corpus lasts."
    ],
    calculate: (values) => {
      let balance = parseFloat(values.corpus);
      const withdrawal = parseFloat(values.withdrawal);
      const rate = parseFloat(values.rate) / 100 / 12;
      const months = parseFloat(values.years) * 12;
      
      if (isNaN(balance) || isNaN(withdrawal)) return '';
      
      let totalWithdrawn = 0;
      
      for(let i = 0; i < months; i++) {
          if (balance <= 0) break;
          balance = balance - withdrawal; // Withdraw at start of month
          balance = balance * (1 + rate); // Grow remaining
          totalWithdrawn += withdrawal;
      }
      
      if (balance < 0) balance = 0;
      
      return `Total Withdrawn: ${formatCurrency(totalWithdrawn)}\nFinal Balance: ${formatCurrency(balance)}`;
    }
  },
  {
    id: 'rule-72',
    name: 'Rule of 72',
    icon: Timer,
    description: 'Double your money.',
    iconColor: 'text-cyan-600',
    iconBg: 'bg-cyan-100',
    inputs: [
      { name: 'rate', label: 'Interest Rate (% p.a)', type: 'number' }
    ],
    instructions: [
      "Quickly estimates the number of years required to double your money at a given interest rate.",
      "Formula: Years = 72 / Rate"
    ],
    calculate: (values) => {
      const r = parseFloat(values.rate);
      if (isNaN(r) || r === 0) return '';
      const years = 72 / r;
      return `Time to Double: ~${years.toFixed(1)} Years`;
    }
  },
  {
    id: 'loan-prepayment',
    name: 'Loan Prepayment',
    icon: Home,
    description: 'Save interest.',
    iconColor: 'text-rose-600',
    iconBg: 'bg-rose-100',
    inputs: [
      { name: 'amount', label: 'Loan Amount', type: 'number' },
      { name: 'rate', label: 'Interest Rate (%)', type: 'number' },
      { name: 'tenure', label: 'Tenure (Years)', type: 'number' },
      { name: 'prepay', label: 'Prepayment Amount (One-time)', type: 'number' }
    ],
    instructions: [
      "Calculates how much interest you save by making a one-time prepayment.",
      "Assumes prepayment is made at the start of the loan for simplicity."
    ],
    calculate: (values) => {
      const P = parseFloat(values.amount);
      const R = parseFloat(values.rate) / 12 / 100;
      const N = parseFloat(values.tenure) * 12;
      const prepay = parseFloat(values.prepay) || 0;
      
      if (isNaN(P) || isNaN(R) || isNaN(N)) return '';
      
      // Original Loan
      const emiOriginal = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
      const totalOriginal = emiOriginal * N;
      
      // New Loan (Principal reduced)
      const P_new = P - prepay;
      if (P_new <= 0) return 'Prepayment covers entire loan!';
      
      const emiNew = (P_new * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1); // Assuming tenure same, EMI reduces
      const totalNew = emiNew * N;
      
      const saved = (totalOriginal - totalNew) - prepay; // Net saving
      
      return `Original Interest: ${formatCurrency(totalOriginal - P)}\nNew Interest: ${formatCurrency(totalNew - P_new)}\nNet Savings: ${formatCurrency(totalOriginal - totalNew)}`;
    }
  },
  {
    id: 'gratuity-calc',
    name: 'Gratuity Calc',
    icon: Briefcase,
    description: 'End of service benefit.',
    iconColor: 'text-slate-600',
    iconBg: 'bg-slate-200',
    inputs: [
      { name: 'basic', label: 'Basic Salary + DA', type: 'number' },
      { name: 'years', label: 'Years of Service', type: 'number' }
    ],
    instructions: [
      "Calculates gratuity amount based on the formula: (15 * Last Drawn Salary * Years) / 26.",
      "Applicable for employees who have completed 5+ years."
    ],
    calculate: (values) => {
      const basic = parseFloat(values.basic);
      const years = parseFloat(values.years);
      if (isNaN(basic) || isNaN(years)) return '';
      
      const gratuity = (15 * basic * years) / 26;
      return `Gratuity Payable: ${formatCurrency(gratuity)}`;
    }
  },
  {
    id: 'nps-calc',
    name: 'NPS Calculator',
    icon: Building2,
    description: 'National Pension System.',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
    inputs: [
      { name: 'monthly', label: 'Monthly Investment', type: 'number' },
      { name: 'rate', label: 'Expected Return (%)', type: 'number', defaultValue: '10' },
      { name: 'age', label: 'Current Age', type: 'number' },
      { name: 'retire', label: 'Retirement Age', type: 'number', defaultValue: '60' }
    ],
    instructions: [
      "Estimate your pension corpus and monthly annuity.",
      "Assumes 40% of corpus is used to buy annuity at retirement."
    ],
    calculate: (values) => {
      const p = parseFloat(values.monthly);
      const r = parseFloat(values.rate) / 100 / 12;
      const age = parseFloat(values.age);
      const retire = parseFloat(values.retire);
      
      if (isNaN(p) || isNaN(age)) return '';
      
      const months = (retire - age) * 12;
      if (months <= 0) return 'Retirement age must be > current age';
      
      const corpus = p * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
      const annuityAmt = corpus * 0.40; // 40% compulsory
      const lumpsum = corpus * 0.60;
      
      return `Total Corpus: ${formatCurrency(corpus)}\nLumpsum (60%): ${formatCurrency(lumpsum)}\nAnnuity Value: ${formatCurrency(annuityAmt)}`;
    }
  },
  {
    id: 'dividend-calc',
    name: 'Dividend Yield',
    icon: BadgePercent,
    description: 'Return on stock.',
    iconColor: 'text-teal-600',
    iconBg: 'bg-teal-100',
    inputs: [
      { name: 'price', label: 'Share Price', type: 'number' },
      { name: 'div', label: 'Annual Dividend per Share', type: 'number' }
    ],
    instructions: ["Calculates the dividend yield percentage of a stock."],
    calculate: (values) => {
      const p = parseFloat(values.price);
      const d = parseFloat(values.div);
      if (isNaN(p) || isNaN(d)) return '';
      const yieldVal = (d / p) * 100;
      return `Dividend Yield: ${yieldVal.toFixed(2)}%`;
    }
  },
  {
    id: 'epf-calc',
    name: 'EPF Calculator',
    icon: PiggyBank,
    description: 'Employee Provident Fund.',
    iconColor: 'text-violet-600',
    iconBg: 'bg-violet-100',
    inputs: [
      { name: 'basic', label: 'Basic Salary', type: 'number' },
      { name: 'age', label: 'Current Age', type: 'number' },
      { name: 'increase', label: 'Annual Salary Hike (%)', type: 'number', defaultValue: '5' }
    ],
    instructions: [
      "Estimates EPF corpus at retirement (58 years).",
      "Assumes 12% employee + 3.67% employer contribution.",
      "Current EPF interest rate ~8.15% used."
    ],
    calculate: (values) => {
      let basic = parseFloat(values.basic);
      const age = parseFloat(values.age);
      const hike = parseFloat(values.increase) / 100;
      const rate = 8.15 / 100;
      
      if (isNaN(basic) || isNaN(age)) return '';
      
      const yearsLeft = 58 - age;
      if (yearsLeft <= 0) return 'Age must be < 58';
      
      let balance = 0;
      
      for (let y = 0; y < yearsLeft; y++) {
          const contribution = (basic * 0.12) + (basic * 0.0367); // Employee + Employer (EPF part)
          balance += contribution * 12;
          balance += balance * rate; // Interest at end of year
          basic += basic * hike; // Salary increase
      }
      
      return `Est. EPF Corpus @ 58: ${formatCurrency(balance)}`;
    }
  },
  // --- EXISTING TOOLS ---
  {
    id: 'love-calc',
    name: 'Love Percentage',
    icon: Heart,
    description: 'Calculate compatibility.',
    iconColor: 'text-rose-500',
    iconBg: 'bg-rose-100',
    buttonVariant: 'rose',
    inputs: [
      { name: 'name1', label: 'Your Name', type: 'text', placeholder: 'e.g. Romeo', colSpan: 2 },
      { name: 'name2', label: 'Partner Name', type: 'text', placeholder: 'e.g. Juliet', colSpan: 2 }
    ],
    instructions: [
      "Enter your full name in the first field.",
      "Enter your partner's full name in the second field.",
      "Click 'Calculate' to see your compatibility score.",
      "Note: This is a fun algorithm based on name characters, not scientific proof!"
    ],
    calculate: (values) => {
      const n1 = (values.name1 || '').toLowerCase().trim();
      const n2 = (values.name2 || '').toLowerCase().trim();
      if (!n1 || !n2) return 'Enter both names';
      let hash = 0;
      const combined = n1 + n2;
      for (let i = 0; i < combined.length; i++) {
        hash = combined.charCodeAt(i) + ((hash << 5) - hash);
      }
      const percent = Math.abs(hash % 101);
      return `${percent}% Compatible`;
    }
  },
  {
    id: 'age-calc',
    name: 'Age Calculator',
    icon: Calendar,
    description: 'Exact age in days/hours.',
    iconColor: 'text-orange-500',
    iconBg: 'bg-orange-100',
    inputs: [
      { name: 'dob', label: 'Date of Birth', type: 'date' }
    ],
    instructions: [
      "Click on the calendar icon or type your date of birth.",
      "Ensure the date is in the past.",
      "The calculator will show your exact age in Years, Months, and Days.",
      "It also estimates the total number of hours you have been alive."
    ],
    calculate: (values) => {
      if (!values.dob) return '';
      const birth = new Date(values.dob);
      const now = new Date();
      if (birth > now) return 'Date must be in the past';

      let years = now.getFullYear() - birth.getFullYear();
      let months = now.getMonth() - birth.getMonth();
      let days = now.getDate() - birth.getDate();

      if (days < 0) {
        months--;
        const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += lastMonth.getDate();
      }
      if (months < 0) {
        years--;
        months += 12;
      }

      const diffMs = now.getTime() - birth.getTime();
      const hours = Math.floor(diffMs / (1000 * 60 * 60));

      return `${years} Years, ${months} Months, ${days} Days\n(~${hours.toLocaleString()} Total Hours)`;
    }
  },
  {
    id: 'percent-calc',
    name: 'Percentage Calculator',
    icon: Percent,
    description: '% of, % is, % change.',
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-100',
    inputs: [
      { name: 'mode', label: 'Mode', type: 'select', options: [
        { label: 'What is X% of Y?', value: 'of' },
        { label: 'X is what % of Y?', value: 'is' },
        { label: '% Increase/Decrease from X to Y', value: 'change' },
        { label: 'Percentage Difference', value: 'diff' }
      ], defaultValue: 'of' },
      { name: 'val1', label: 'Value X', type: 'number', placeholder: '0' },
      { name: 'val2', label: 'Value Y', type: 'number', placeholder: '0' }
    ],
    instructions: [
      "Select the calculation mode from the dropdown menu.",
      "For 'What is X% of Y?': Enter percentage in X and total in Y.",
      "For 'X is what % of Y?': Enter part in X and total in Y.",
      "For '% Change': Enter original value in X and new value in Y.",
      "For '% Difference': Calculates the absolute difference relative to the average."
    ],
    calculate: (values) => {
      const v1 = parseFloat(values.val1);
      const v2 = parseFloat(values.val2);
      const mode = values.mode;

      if (isNaN(v1) || isNaN(v2)) return 'Enter valid numbers';

      if (mode === 'of') return `${(v1 * v2 / 100).toLocaleString()}`;
      if (mode === 'is') return `${((v1 / v2) * 100).toFixed(2)}%`;
      if (mode === 'change') {
        const change = ((v2 - v1) / v1) * 100;
        return `${change > 0 ? '+' : ''}${change.toFixed(2)}%`;
      }
      if (mode === 'diff') {
        const diff = Math.abs(v1 - v2);
        const avg = (v1 + v2) / 2;
        const res = (diff / avg) * 100;
        return `${res.toFixed(2)}% Difference`;
      }
      return '';
    }
  },
  {
    id: 'gst-calc',
    name: 'GST Calculator',
    icon: TrendingUp,
    description: 'Goods and Services Tax.',
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-100',
    inputs: [
      { name: 'amount', label: 'Original Amount', type: 'number', placeholder: '1000' },
      { name: 'rate', label: 'GST Rate (%)', type: 'select', options: [
        { label: '5%', value: 5 },
        { label: '12%', value: 12 },
        { label: '18%', value: 18 },
        { label: '28%', value: 28 }
      ], defaultValue: '18' },
      { name: 'type', label: 'Type', type: 'select', options: [
          { label: 'Exclusive (Add GST)', value: 'ex' },
          { label: 'Inclusive (Remove GST)', value: 'inc' }
      ], defaultValue: 'ex' }
    ],
    instructions: [
      "Enter the base amount.",
      "Select the applicable GST slab (5%, 12%, 18%, or 28%).",
      "Choose 'Exclusive' if you want to ADD tax to the amount.",
      "Choose 'Inclusive' if the amount already contains tax and you want to find the base price."
    ],
    calculate: (values) => {
      const amt = parseFloat(values.amount);
      const rate = parseFloat(values.rate);
      if (isNaN(amt)) return '';

      let gstAmt = 0;
      let net = 0;

      if (values.type === 'ex') {
        gstAmt = amt * (rate / 100);
        net = amt + gstAmt;
        return `GST: ${gstAmt.toFixed(2)}\nTotal: ${net.toFixed(2)}`;
      } else {
        net = amt;
        const original = amt / (1 + rate / 100);
        gstAmt = amt - original;
        return `Original: ${original.toFixed(2)}\nGST Component: ${gstAmt.toFixed(2)}`;
      }
    }
  },
  {
    id: 'discount-calc',
    name: 'Discount Calculator',
    icon: TrendingDown,
    description: 'Final price after sale.',
    iconColor: 'text-rose-600',
    iconBg: 'bg-rose-100',
    inputs: [
      { name: 'price', label: 'Original Price', type: 'number' },
      { name: 'discount', label: 'Discount (%)', type: 'number' }
    ],
    instructions: [
      "Enter the original price of the item.",
      "Enter the discount percentage provided.",
      "The result will show the final price you pay and the total money saved."
    ],
    calculate: (values) => {
      const p = parseFloat(values.price);
      const d = parseFloat(values.discount);
      if (isNaN(p) || isNaN(d)) return '';
      const saved = p * (d / 100);
      const final = p - saved;
      return `Final Price: ${final.toLocaleString()}\nYou Save: ${saved.toLocaleString()}`;
    }
  },
  {
    id: 'sip-calc',
    name: 'SIP Calculator',
    icon: TrendingUp,
    description: 'Investment returns.',
    iconColor: 'text-green-600',
    iconBg: 'bg-green-100',
    inputs: [
      { name: 'monthly', label: 'Monthly Investment', type: 'number' },
      { name: 'rate', label: 'Expected Return Rate (% p.a)', type: 'number', defaultValue: '12' },
      { name: 'years', label: 'Time Period (Years)', type: 'number', defaultValue: '10' }
    ],
    instructions: [
      "Enter the amount you plan to invest every month.",
      "Enter the expected annual return rate (e.g., 12% for equity mutual funds).",
      "Enter how many years you plan to keep investing.",
      "The result shows total invested amount, profit earned, and total maturity value."
    ],
    calculate: (values) => {
      const P = parseFloat(values.monthly);
      const i = parseFloat(values.rate) / 100 / 12;
      const n = parseFloat(values.years) * 12;
      
      if (isNaN(P) || isNaN(i) || isNaN(n)) return '';

      const M = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
      const invested = P * n;
      
      return `Invested: ${formatCurrency(invested)}\nEst. Returns: ${formatCurrency(M - invested)}\nTotal Value: ${formatCurrency(M)}`;
    }
  },
  {
    id: 'fd-calc',
    name: 'FD/RD Calculator',
    icon: PiggyBank,
    description: 'Fixed Deposit maturity.',
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-100',
    inputs: [
      { name: 'rate', label: 'Interest Rate (%)', type: 'number', defaultValue: '6.5' },
      { name: 'principal', label: 'Principal Amount', type: 'number' },
      { name: 'years', label: 'Tenure (Years)', type: 'number', defaultValue: '5' }
    ],
    instructions: [
      "Enter the annual interest rate offered by the bank.",
      "Enter the lump sum amount you are depositing.",
      "Enter the duration of the deposit in years.",
      "Calculates compound interest compounded annually."
    ],
    calculate: (values) => {
      const P = parseFloat(values.principal);
      const r = parseFloat(values.rate) / 100;
      const t = parseFloat(values.years);
      if (isNaN(P) || isNaN(r) || isNaN(t)) return '';

      const A = P * Math.pow((1 + r), t);
      return `Maturity Amount: ${formatCurrency(A)}\nInterest Earned: ${formatCurrency(A - P)}`;
    }
  },
  {
    id: 'salary-calc',
    name: 'Salary Calculator',
    icon: Briefcase,
    description: 'CTC to Take Home.',
    iconColor: 'text-teal-600',
    iconBg: 'bg-teal-100',
    inputs: [
      { name: 'ctc', label: 'Annual CTC', type: 'number' },
      { name: 'deductions', label: 'Approx Deductions/Tax (%)', type: 'number', defaultValue: '10' }
    ],
    instructions: [
      "Enter your annual CTC (Cost to Company).",
      "Enter an approximate total deduction percentage (including PF, Tax, Professional Tax).",
      "Standard estimation is around 10-15% for entry level, higher for senior roles.",
      "Shows estimated monthly gross and net in-hand salary."
    ],
    calculate: (values) => {
      const ctc = parseFloat(values.ctc);
      const ded = parseFloat(values.deductions);
      if (isNaN(ctc)) return '';
      
      const monthlyGross = ctc / 12;
      const monthlyNet = monthlyGross * (1 - ded / 100);
      
      return `Monthly Gross: ${formatCurrency(monthlyGross)}\nEst. In-Hand: ${formatCurrency(monthlyNet)}`;
    }
  },
  {
    id: 'fuel-calc',
    name: 'Fuel Cost Calculator',
    icon: Fuel,
    description: 'Trip cost estimator.',
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-100',
    inputs: [
      { name: 'distance', label: 'Distance (km)', type: 'number' },
      { name: 'mileage', label: 'Vehicle Mileage (km/l)', type: 'number' },
      { name: 'price', label: 'Fuel Price', type: 'number' }
    ],
    instructions: [
      "Enter the total distance of your trip in km.",
      "Enter your vehicle's average mileage (how many km it travels per liter).",
      "Enter the current price of fuel per liter.",
      "Calculates the total estimated cost for the trip."
    ],
    calculate: (values) => {
      const d = parseFloat(values.distance);
      const m = parseFloat(values.mileage);
      const p = parseFloat(values.price);
      if (isNaN(d) || isNaN(m) || isNaN(p)) return '';
      
      const cost = (d / m) * p;
      return `Total Fuel Cost: ${formatCurrency(cost)}`;
    }
  },
  {
    id: 'date-diff',
    name: 'Date Difference',
    icon: ArrowLeftRight,
    description: 'Days between dates.',
    iconColor: 'text-sky-500',
    iconBg: 'bg-sky-100',
    inputs: [
      { name: 'start', label: 'Start Date', type: 'date' },
      { name: 'end', label: 'End Date', type: 'date' }
    ],
    instructions: [
      "Select the starting date.",
      "Select the ending date.",
      "The calculator counts the total number of days between these two dates."
    ],
    calculate: (values) => {
      if (!values.start || !values.end) return '';
      const d1 = new Date(values.start);
      const d2 = new Date(values.end);
      const diffTime = Math.abs(d2.getTime() - d1.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      return `${diffDays} Days`;
    }
  },
  {
    id: 'crypto-calc',
    name: 'Crypto Profit',
    icon: Coins,
    description: 'Profit/Loss on trade.',
    iconColor: 'text-yellow-600',
    iconBg: 'bg-yellow-100',
    inputs: [
      { name: 'invested', label: 'Total Invested', type: 'number' },
      { name: 'buy', label: 'Buy Price (per coin)', type: 'number' },
      { name: 'sell', label: 'Sell Price (per coin)', type: 'number' },
      { name: 'fee', label: 'Fee (%)', type: 'number', defaultValue: '0.1' }
    ],
    instructions: [
      "Enter total money you invested (in fiat currency).",
      "Enter the price of the coin when you bought it.",
      "Enter the price of the coin when you sold it (or current price).",
      "Enter exchange fee percentage (default is 0.1% for many exchanges).",
      "Calculates net profit after fees and return percentage."
    ],
    calculate: (values) => {
      const inv = parseFloat(values.invested);
      const buy = parseFloat(values.buy);
      const sell = parseFloat(values.sell);
      const fee = parseFloat(values.fee) / 100;
      if (isNaN(inv) || isNaN(buy) || isNaN(sell)) return '';

      const coins = inv / buy;
      const totalSell = coins * sell;
      const fees = (inv * fee) + (totalSell * fee);
      const profit = totalSell - inv - fees;

      return `Profit/Loss: ${formatCurrency(profit)}\nNet Return: ${((profit/inv)*100).toFixed(2)}%`;
    }
  },
  {
    id: 'elec-bill',
    name: 'Electricity Bill',
    icon: Zap,
    description: 'Simple bill estimator.',
    iconColor: 'text-yellow-500',
    iconBg: 'bg-yellow-100',
    inputs: [
      { name: 'units', label: 'Units Consumed (kWh)', type: 'number' },
      { name: 'rate', label: 'Rate per Unit', type: 'number' }
    ],
    instructions: [
      "Check your meter reading difference or bill for 'Units Consumed'.",
      "Enter the cost per unit (slab rate) applicable in your area.",
      "Calculates the basic energy charge."
    ],
    calculate: (values) => {
      const u = parseFloat(values.units);
      const r = parseFloat(values.rate);
      if (isNaN(u) || isNaN(r)) return '';
      return `Estimated Bill: ${formatCurrency(u * r)}`;
    }
  },
  {
    id: 'retirement-calc',
    name: 'Retirement Planner',
    icon: Armchair,
    description: 'Corpus needed.',
    iconColor: 'text-indigo-600',
    iconBg: 'bg-indigo-100',
    inputs: [
      { name: 'currentAge', label: 'Current Age', type: 'number' },
      { name: 'retireAge', label: 'Retirement Age', type: 'number', defaultValue: '60' },
      { name: 'monthly', label: 'Monthly Expense Needed (Today)', type: 'number' },
      { name: 'inflation', label: 'Inflation (%)', type: 'number', defaultValue: '6' }
    ],
    instructions: [
      "Enter your current age and planned retirement age.",
      "Enter how much money you need per month to survive *today*.",
      "Enter expected inflation rate (typically 6-7%).",
      "Calculates how much monthly income you'll need then and the total cash corpus required to sustain it for ~20 years."
    ],
    calculate: (values) => {
      const age = parseFloat(values.currentAge);
      const retAge = parseFloat(values.retireAge);
      const exp = parseFloat(values.monthly);
      const inf = parseFloat(values.inflation) / 100;
      if (isNaN(age) || isNaN(exp)) return '';

      const yearsToRetire = retAge - age;
      const fvExp = exp * Math.pow(1 + inf, yearsToRetire);
      const corpus = fvExp * 12 * 20; 

      return `Monthly Need at ${retAge}: ${formatCurrency(fvExp)}\nTarget Corpus: ${formatCurrency(corpus)}`;
    }
  },
  {
    id: 'loan-compare',
    name: 'Loan EMI Calculator',
    icon: Car,
    description: 'EMI, Interest, Total.',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
    inputs: [
      { name: 'amount', label: 'Loan Amount', type: 'number' },
      { name: 'rate', label: 'Interest Rate (% p.a)', type: 'number' },
      { name: 'years', label: 'Tenure (Years)', type: 'number' }
    ],
    instructions: [
      "Enter the total loan amount you wish to borrow.",
      "Enter the annual interest rate offered by the bank.",
      "Enter the duration of the loan in years.",
      "The calculator shows your monthly installment (EMI), total interest you will pay, and the total repayment amount."
    ],
    calculate: (values) => {
      const p = parseFloat(values.amount);
      const rVal = parseFloat(values.rate);
      const tVal = parseFloat(values.years);
      
      if (isNaN(p) || isNaN(rVal) || isNaN(tVal)) return '';
      
      const r = rVal / 12 / 100;
      const n = tVal * 12;
      
      const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalAmt = emi * n;
      const interest = totalAmt - p;
      
      return `Monthly EMI: ${formatCurrency(emi)}\nTotal Interest: ${formatCurrency(interest)}\nTotal Payment: ${formatCurrency(totalAmt)}`;
    }
  },
  {
    id: 'zakat-calc',
    name: 'Zakat Calculator',
    icon: Banknote,
    description: '2.5% on total assets.',
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-100',
    inputs: [
      { name: 'savings', label: 'Cash & Savings', type: 'number' },
      { name: 'gold', label: 'Gold/Silver Value', type: 'number' },
      { name: 'invest', label: 'Investments/Stocks', type: 'number' },
      { name: 'liabilities', label: 'Debts/Liabilities', type: 'number' }
    ],
    instructions: [
      "Enter value of cash in hand and bank savings.",
      "Enter current market value of gold and silver possessed.",
      "Enter value of shares or business investments.",
      "Enter any immediate debts you owe.",
      "Calculates 2.5% of net assets if positive."
    ],
    calculate: (values) => {
      const s = parseFloat(values.savings) || 0;
      const g = parseFloat(values.gold) || 0;
      const i = parseFloat(values.invest) || 0;
      const l = parseFloat(values.liabilities) || 0;
      
      const net = s + g + i - l;
      if (net <= 0) return 'No Zakat due (Net assets below zero)';
      
      const zakat = net * 0.025;
      return `Net Assets: ${formatCurrency(net)}\nZakat Payable: ${formatCurrency(zakat)}`;
    }
  },
  {
    id: 'ohm-calc',
    name: 'Ohms Law',
    icon: Zap,
    description: 'Voltage, Current, Resistance.',
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-100',
    inputs: [
      { name: 'mode', label: 'Calculate', type: 'select', options: [
        { label: 'Voltage (V)', value: 'v' }, 
        { label: 'Current (I)', value: 'i' }, 
        { label: 'Resistance (R)', value: 'r' }
      ], defaultValue: 'v' },
      { name: 'val1', label: 'Value 1', type: 'number', placeholder: 'Enter I or V' },
      { name: 'val2', label: 'Value 2', type: 'number', placeholder: 'Enter R or I' }
    ],
    instructions: [
      "Select which variable you want to find (V, I, or R).",
      "Enter the known values in the boxes below.",
      "Calculates the missing value using V = I × R."
    ],
    calculate: (values) => {
      const v1 = parseFloat(values.val1);
      const v2 = parseFloat(values.val2);
      if (isNaN(v1) || isNaN(v2)) return 'Enter values';
      
      if (values.mode === 'v') return `Voltage: ${(v1*v2).toFixed(2)} V (I=${v1}, R=${v2})`; // I * R
      if (values.mode === 'i') return `Current: ${(v1/v2).toFixed(2)} A (V=${v1}, R=${v2})`; // V / R
      if (values.mode === 'r') return `Resistance: ${(v1/v2).toFixed(2)} Ω (V=${v1}, I=${v2})`; // V / I
      return '';
    }
  },
  {
    id: 'resistor-calc',
    name: 'Resistor Color Code',
    icon: Palette,
    description: '4-Band Resistor Value.',
    iconColor: 'text-pink-600',
    iconBg: 'bg-pink-100',
    inputs: [
      { name: 'b1', label: 'Band 1 (1st Digit)', type: 'select', options: [
        {label:'Brown (1)', value:'1'}, {label:'Red (2)', value:'2'}, {label:'Orange (3)', value:'3'}, 
        {label:'Yellow (4)', value:'4'}, {label:'Green (5)', value:'5'}, {label:'Blue (6)', value:'6'}, 
        {label:'Violet (7)', value:'7'}, {label:'Gray (8)', value:'8'}, {label:'White (9)', value:'9'}
      ], defaultValue: '1' },
      { name: 'b2', label: 'Band 2 (2nd Digit)', type: 'select', options: [
         {label:'Black (0)', value:'0'}, {label:'Brown (1)', value:'1'}, {label:'Red (2)', value:'2'}, 
         {label:'Orange (3)', value:'3'}, {label:'Yellow (4)', value:'4'}, {label:'Green (5)', value:'5'}, 
         {label:'Blue (6)', value:'6'}, {label:'Violet (7)', value:'7'}, {label:'Gray (8)', value:'8'}, 
         {label:'White (9)', value:'9'}
      ], defaultValue: '0' },
      { name: 'mult', label: 'Band 3 (Multiplier)', type: 'select', options: [
        {label:'Black (x1)', value:'1'}, {label:'Brown (x10)', value:'10'}, {label:'Red (x100)', value:'100'},
        {label:'Orange (x1k)', value:'1000'}, {label:'Yellow (x10k)', value:'10000'}, {label:'Green (x100k)', value:'100000'},
        {label:'Blue (x1M)', value:'1000000'}, {label:'Gold (x0.1)', value:'0.1'}, {label:'Silver (x0.01)', value:'0.01'}
      ], defaultValue: '100' },
      { name: 'tol', label: 'Band 4 (Tolerance)', type: 'select', options: [
        {label:'Brown (±1%)', value:'1%'}, {label:'Red (±2%)', value:'2%'}, {label:'Gold (±5%)', value:'5%'}, 
        {label:'Silver (±10%)', value:'10%'}
      ], defaultValue: '5%' }
    ],
    instructions: [
      "Select the colors from left to right found on your resistor.",
      "Band 1 & 2 represent the significant digits.",
      "Band 3 is the multiplier (number of zeros).",
      "Band 4 is the tolerance (precision).",
      "Calculates total resistance in Ohms (Ω), kΩ, or MΩ."
    ],
    calculate: (values) => {
      const digit1 = values.b1;
      const digit2 = values.b2;
      const multiplier = parseFloat(values.mult);
      const tolerance = values.tol;
      
      if(!digit1 || !digit2 || isNaN(multiplier)) return '';

      const baseVal = parseInt(digit1 + digit2, 10);
      const resistance = baseVal * multiplier;

      let formatted = '';
      if (resistance >= 1000000) {
        formatted = (resistance / 1000000).toFixed(2).replace(/\.00$/, '') + ' MΩ';
      } else if (resistance >= 1000) {
        formatted = (resistance / 1000).toFixed(2).replace(/\.00$/, '') + ' kΩ';
      } else {
        formatted = resistance.toFixed(2).replace(/\.00$/, '') + ' Ω';
      }

      return `Resistance: ${formatted}\nTolerance: ${tolerance}`;
    }
  },
  {
    id: 'bmi-calc',
    name: 'BMI Calculator',
    icon: Scale,
    description: 'Body Mass Index.',
    iconColor: 'text-pink-500',
    iconBg: 'bg-pink-100',
    inputs: [
      { name: 'weight', label: 'Weight (kg)', type: 'number' },
      { name: 'height', label: 'Height (cm)', type: 'number' }
    ],
    instructions: [
      "Enter your weight in kilograms.",
      "Enter your height in centimeters.",
      "Shows your BMI score and category (Underweight, Normal, Overweight, Obese)."
    ],
    calculate: (values) => {
      const w = parseFloat(values.weight);
      const h = parseFloat(values.height) / 100;
      if (isNaN(w) || isNaN(h) || h === 0) return '';
      const bmi = w / (h * h);
      let cat = 'Normal';
      if (bmi < 18.5) cat = 'Underweight';
      else if (bmi >= 25 && bmi < 30) cat = 'Overweight';
      else if (bmi >= 30) cat = 'Obese';
      return `BMI: ${bmi.toFixed(1)}\nCategory: ${cat}`;
    }
  },
  {
    id: 'bmr-calc',
    name: 'BMR Calculator',
    icon: Activity,
    description: 'Calories burned at rest.',
    iconColor: 'text-orange-600',
    iconBg: 'bg-orange-100',
    inputs: [
      { name: 'gender', label: 'Gender', type: 'select', options: [{label:'Male', value:'m'}, {label:'Female', value:'f'}], defaultValue: 'm' },
      { name: 'weight', label: 'Weight (kg)', type: 'number' },
      { name: 'height', label: 'Height (cm)', type: 'number' },
      { name: 'age', label: 'Age', type: 'number' }
    ],
    instructions: [
      "Select your gender.",
      "Enter weight (kg), height (cm), and age (years).",
      "Calculates BMR: The number of calories your body burns at complete rest.",
      "Use this baseline to plan diets for weight loss or gain."
    ],
    calculate: (values) => {
      const w = parseFloat(values.weight);
      const h = parseFloat(values.height);
      const a = parseFloat(values.age);
      if (isNaN(w) || isNaN(h) || isNaN(a)) return '';
      let bmr = (10 * w) + (6.25 * h) - (5 * a);
      bmr += (values.gender === 'm' ? 5 : -161);
      return `BMR: ${Math.round(bmr)} kcal/day`;
    }
  },
  {
    id: 'water-calc',
    name: 'Water Intake',
    icon: GlassWater,
    description: 'Daily hydration needs.',
    iconColor: 'text-cyan-500',
    iconBg: 'bg-cyan-100',
    inputs: [
      { name: 'weight', label: 'Weight (kg)', type: 'number' }
    ],
    instructions: [
      "Enter your body weight in kg.",
      "Calculates recommended daily water intake based on general health guidelines (approx 35ml/kg)."
    ],
    calculate: (values) => {
      const w = parseFloat(values.weight);
      if (isNaN(w)) return '';
      const intake = w * 0.035; // approx 35ml per kg
      return `Recommended: ${intake.toFixed(1)} Liters/day`;
    }
  },
  {
    id: 'tip-calc',
    name: 'Tip Split Calculator',
    icon: Utensils,
    description: 'Tip and split bill.',
    iconColor: 'text-violet-500',
    iconBg: 'bg-violet-100',
    inputs: [
      { name: 'bill', label: 'Bill Amount', type: 'number' },
      { name: 'tip', label: 'Tip %', type: 'number', defaultValue: '15' },
      { name: 'people', label: 'Number of People', type: 'number', defaultValue: '1' }
    ],
    instructions: [
      "Enter the total bill amount.",
      "Enter the percentage you wish to tip.",
      "Enter number of people sharing the bill.",
      "Shows tip amount, total bill, and how much each person owes."
    ],
    calculate: (values) => {
      const bill = parseFloat(values.bill);
      const tipP = parseFloat(values.tip);
      const ppl = parseFloat(values.people);
      if (isNaN(bill) || ppl < 1) return '';
      
      const tipAmt = bill * (tipP / 100);
      const total = bill + tipAmt;
      const perPerson = total / ppl;
      
      return `Total Tip: ${tipAmt.toFixed(2)}\nTotal Bill: ${total.toFixed(2)}\nPer Person: ${perPerson.toFixed(2)}`;
    }
  },
  {
    id: 'simple-interest',
    name: 'Simple Interest',
    icon: Landmark,
    description: 'Calculate simple interest.',
    iconColor: 'text-green-500',
    iconBg: 'bg-green-100',
    inputs: [
      { name: 'principal', label: 'Principal', type: 'number' },
      { name: 'rate', label: 'Rate (% p.a)', type: 'number' },
      { name: 'time', label: 'Time (Years)', type: 'number' }
    ],
    instructions: [
      "Enter the principal amount.",
      "Enter the annual interest rate.",
      "Enter the time period in years.",
      "Calculates interest without compounding."
    ],
    calculate: (values) => {
      const p = parseFloat(values.principal);
      const r = parseFloat(values.rate);
      const t = parseFloat(values.time);
      if (isNaN(p) || isNaN(r) || isNaN(t)) return '';
      const si = (p * r * t) / 100;
      return `Interest: ${si.toFixed(2)}\nTotal Amount: ${(p + si).toFixed(2)}`;
    }
  },
  {
    id: 'cagr-calc',
    name: 'CAGR Calculator',
    icon: BarChart3,
    description: 'Annual Growth Rate.',
    iconColor: 'text-emerald-500',
    iconBg: 'bg-emerald-100',
    inputs: [
      { name: 'start', label: 'Beginning Value', type: 'number' },
      { name: 'end', label: 'Ending Value', type: 'number' },
      { name: 'years', label: 'Number of Years', type: 'number' }
    ],
    instructions: [
      "Enter the initial investment value.",
      "Enter the final value.",
      "Enter the duration in years.",
      "Calculates the smooth annual growth rate required to grow from start to end."
    ],
    calculate: (values) => {
      const s = parseFloat(values.start);
      const e = parseFloat(values.end);
      const n = parseFloat(values.years);
      if (isNaN(s) || isNaN(e) || isNaN(n) || s === 0 || n === 0) return '';
      const cagr = (Math.pow(e / s, 1 / n) - 1) * 100;
      return `CAGR: ${cagr.toFixed(2)}%`;
    }
  },
  {
    id: 'margin-calc',
    name: 'Margin Calculator',
    icon: Tag,
    description: 'Calculate profit margin.',
    iconColor: 'text-teal-500',
    iconBg: 'bg-teal-100',
    inputs: [
      { name: 'cost', label: 'Cost Price', type: 'number' },
      { name: 'revenue', label: 'Selling Price', type: 'number' }
    ],
    instructions: [
      "Enter the cost to produce or buy the item.",
      "Enter the price at which you are selling it.",
      "Shows Profit (Cash), Margin (% of selling price), and Markup (% of cost)."
    ],
    calculate: (values) => {
      const c = parseFloat(values.cost);
      const r = parseFloat(values.revenue);
      if (isNaN(c) || isNaN(r)) return '';
      const profit = r - c;
      const margin = (profit / r) * 100;
      const markup = (profit / c) * 100;
      return `Profit: ${profit.toFixed(2)}\nMargin: ${margin.toFixed(2)}%\nMarkup: ${markup.toFixed(2)}%`;
    }
  },
  {
    id: 'roi-calc',
    name: 'ROI Calculator',
    icon: Target,
    description: 'Return on Investment.',
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-100',
    inputs: [
      { name: 'invested', label: 'Amount Invested', type: 'number' },
      { name: 'returned', label: 'Amount Returned', type: 'number' }
    ],
    instructions: [
      "Enter the total amount invested.",
      "Enter the total amount returned/earned.",
      "Calculates the percentage return on your investment."
    ],
    calculate: (values) => {
      const i = parseFloat(values.invested);
      const r = parseFloat(values.returned);
      if (isNaN(i) || isNaN(r)) return '';
      const roi = ((r - i) / i) * 100;
      return `ROI: ${roi.toFixed(2)}%`;
    }
  },
  {
    id: 'break-even',
    name: 'Break-Even Point',
    icon: Target,
    description: 'Units to cover costs.',
    iconColor: 'text-red-500',
    iconBg: 'bg-red-100',
    inputs: [
      { name: 'fixed', label: 'Fixed Costs', type: 'number' },
      { name: 'price', label: 'Price per Unit', type: 'number' },
      { name: 'variable', label: 'Variable Cost per Unit', type: 'number' }
    ],
    instructions: [
      "Enter total fixed costs (rent, salaries, etc.).",
      "Enter selling price per single unit.",
      "Enter variable cost to produce a single unit.",
      "Calculates how many units you must sell to cover all costs (0 profit)."
    ],
    calculate: (values) => {
      const f = parseFloat(values.fixed);
      const p = parseFloat(values.price);
      const v = parseFloat(values.variable);
      if (isNaN(f) || isNaN(p) || isNaN(v)) return '';
      if (p <= v) return 'Price must be > Variable Cost';
      const units = f / (p - v);
      return `Break-Even: ${Math.ceil(units)} Units`;
    }
  },
  {
    id: 'speed-calc',
    name: 'Speed Calculator',
    icon: Timer,
    description: 'Distance / Time.',
    iconColor: 'text-indigo-500',
    iconBg: 'bg-indigo-100',
    inputs: [
      { name: 'distance', label: 'Distance (km)', type: 'number' },
      { name: 'time', label: 'Time (hours)', type: 'number' }
    ],
    instructions: [
      "Enter distance traveled in kilometers.",
      "Enter time taken in hours.",
      "Calculates average speed in km/h."
    ],
    calculate: (values) => {
      const d = parseFloat(values.distance);
      const t = parseFloat(values.time);
      if (isNaN(d) || isNaN(t) || t === 0) return '';
      return `Speed: ${(d/t).toFixed(2)} km/h`;
    }
  },
  {
    id: 'data-calc',
    name: 'Data Converter',
    icon: HardDrive,
    description: 'GB to MB, KB, TB.',
    iconColor: 'text-slate-500',
    iconBg: 'bg-slate-100',
    inputs: [
      { name: 'gb', label: 'Gigabytes (GB)', type: 'number' }
    ],
    instructions: [
      "Enter storage size in Gigabytes (GB).",
      "Converts into Megabytes (MB), Kilobytes (KB), and Terabytes (TB)."
    ],
    calculate: (values) => {
      const gb = parseFloat(values.gb);
      if (isNaN(gb)) return '';
      return `${(gb*1024).toLocaleString()} MB\n${(gb*1024*1024).toLocaleString()} KB\n${(gb/1024).toFixed(4)} TB`;
    }
  },
  {
    id: 'aspect-ratio',
    name: 'Aspect Ratio',
    icon: Monitor,
    description: 'Simplified aspect ratio.',
    iconColor: 'text-fuchsia-500',
    iconBg: 'bg-fuchsia-100',
    inputs: [
      { name: 'w', label: 'Width', type: 'number' },
      { name: 'h', label: 'Height', type: 'number' }
    ],
    instructions: [
      "Enter width in pixels or units.",
      "Enter height in pixels or units.",
      "Calculates the simplified aspect ratio (e.g., 16:9)."
    ],
    calculate: (values) => {
      const w = parseFloat(values.w);
      const h = parseFloat(values.h);
      if (isNaN(w) || isNaN(h) || h===0) return '';
      
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
      const divisor = gcd(w, h);
      
      return `Ratio: ${w/divisor}:${h/divisor}\nDecimal: ${(w/h).toFixed(2)}`;
    }
  },
  {
    id: 'gpa-calc',
    name: 'GPA Calculator',
    icon: GraduationCap,
    description: 'Score to Percentage/GPA.',
    iconColor: 'text-lime-600',
    iconBg: 'bg-lime-100',
    inputs: [
      { name: 'score', label: 'Your Score', type: 'number' },
      { name: 'total', label: 'Total Marks', type: 'number' }
    ],
    instructions: [
      "Enter your obtained score.",
      "Enter the total maximum score possible.",
      "Calculates percentage and an approximate GPA on a 5.0 scale."
    ],
    calculate: (values) => {
      const s = parseFloat(values.score);
      const t = parseFloat(values.total);
      if (isNaN(s) || isNaN(t) || t === 0) return '';
      const p = (s/t)*100;
      const gpa = (p/20); // Rough 5.0 scale estimate
      return `Percentage: ${p.toFixed(2)}%\nApprox GPA (5.0 scale): ${gpa.toFixed(2)}`;
    }
  },
  {
    id: 'dog-age',
    name: 'Dog Age Calculator',
    icon: Dog,
    description: 'Dog years to human.',
    iconColor: 'text-amber-700',
    iconBg: 'bg-amber-100',
    inputs: [
      { name: 'age', label: 'Dog Age', type: 'number' }
    ],
    instructions: [
      "Enter your dog's age in years.",
      "Calculates human age equivalent using the formula: 15 for year 1, +9 for year 2, +5 for every year after."
    ],
    calculate: (values) => {
      const age = parseFloat(values.age);
      if (isNaN(age)) return '';
      let human = 0;
      if (age <= 1) human = 15;
      else if (age <= 2) human = 15 + 9;
      else human = 24 + (age - 2) * 5;
      return `Human Years: ~${human}`;
    }
  },
  {
    id: 'area-calc',
    name: 'Area Calculator',
    icon: Ruler,
    description: 'Rectangle, Circle, Triangle.',
    iconColor: 'text-indigo-500',
    iconBg: 'bg-indigo-100',
    inputs: [
      { name: 'shape', label: 'Shape', type: 'select', options: [{label:'Rectangle', value:'rect'}, {label:'Circle', value:'circ'}, {label:'Triangle', value:'tri'}], defaultValue: 'rect' },
      { name: 'v1', label: 'Width / Radius / Base', type: 'number' },
      { name: 'v2', label: 'Height (if applicable)', type: 'number' }
    ],
    instructions: [
      "Select the shape you want to measure.",
      "For Circle: Enter Radius in the first box (ignore second box).",
      "For Rectangle: Enter Width and Height.",
      "For Triangle: Enter Base and Height."
    ],
    calculate: (values) => {
      const v1 = parseFloat(values.v1);
      const v2 = parseFloat(values.v2);
      
      if (values.shape === 'circ') {
         if(isNaN(v1)) return '';
         return `Area: ${(Math.PI * v1 * v1).toFixed(2)}`;
      }
      if (isNaN(v1) || isNaN(v2)) return '';
      if (values.shape === 'tri') return `Area: ${(0.5 * v1 * v2).toFixed(2)}`;
      return `Area: ${(v1 * v2).toFixed(2)}`;
    }
  },
  {
    id: 'base-conv',
    name: 'Base Converter',
    icon: Binary,
    description: 'Bin, Dec, Hex.',
    iconColor: 'text-slate-600',
    iconBg: 'bg-slate-200',
    inputs: [
      { name: 'val', label: 'Value', type: 'text', placeholder: 'e.g., 1010, FF, 12' },
      { name: 'from', label: 'From Base', type: 'select', options: [{label:'Binary (2)', value:'2'}, {label:'Decimal (10)', value:'10'}, {label:'Hexadecimal (16)', value:'16'}], defaultValue: '10' },
      { name: 'to', label: 'To Base', type: 'select', options: [{label:'Binary (2)', value:'2'}, {label:'Decimal (10)', value:'10'}, {label:'Hexadecimal (16)', value:'16'}], defaultValue: '2' }
    ],
    instructions: [
      "Enter a value in the selected 'From' base.",
      "Select the target base to convert to.",
      "Supports Binary (base 2), Decimal (base 10), and Hexadecimal (base 16)."
    ],
    calculate: (values) => {
      const val = values.val;
      const from = parseInt(values.from);
      const to = parseInt(values.to);
      if (!val) return '';
      try {
        const num = parseInt(val, from);
        if (isNaN(num)) return 'Invalid Number for Base ' + from;
        return num.toString(to).toUpperCase();
      } catch(e) { return 'Error'; }
    }
  },
  {
    id: 'temp-calc',
    name: 'Temperature',
    icon: Thermometer,
    description: 'C, F, Kelvin.',
    iconColor: 'text-orange-500',
    iconBg: 'bg-orange-100',
    inputs: [
      { name: 'val', label: 'Temperature', type: 'number' },
      { name: 'unit', label: 'Unit', type: 'select', options: [{label:'Celsius', value:'c'}, {label:'Fahrenheit', value:'f'}, {label:'Kelvin', value:'k'}], defaultValue: 'c' }
    ],
    instructions: ["Enter a temperature and select its unit to see conversions."],
    calculate: (values) => {
      const v = parseFloat(values.val);
      const u = values.unit;
      if (isNaN(v)) return '';
      
      let c = 0;
      if (u === 'c') c = v;
      if (u === 'f') c = (v - 32) * 5/9;
      if (u === 'k') c = v - 273.15;

      const f = (c * 9/5) + 32;
      const k = c + 273.15;
      
      return `Celsius: ${c.toFixed(2)}°C\nFahrenheit: ${f.toFixed(2)}°F\nKelvin: ${k.toFixed(2)}K`;
    }
  },
  {
    id: 'vol-calc',
    name: 'Volume Calculator',
    icon: Box,
    description: 'Cube, Sphere, Cylinder.',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
    inputs: [
      { name: 'shape', label: 'Shape', type: 'select', options: [{label:'Cube', value:'cube'}, {label:'Sphere', value:'sphere'}, {label:'Cylinder', value:'cyl'}], defaultValue: 'cube' },
      { name: 'v1', label: 'Side / Radius', type: 'number' },
      { name: 'v2', label: 'Height (if Cylinder)', type: 'number' }
    ],
    instructions: ["Calculate volume for common 3D shapes."],
    calculate: (values) => {
      const v1 = parseFloat(values.v1);
      const v2 = parseFloat(values.v2);
      if (isNaN(v1)) return '';
      if (values.shape === 'cube') return `Volume: ${(Math.pow(v1,3)).toFixed(2)}`;
      if (values.shape === 'sphere') return `Volume: ${((4/3) * Math.PI * Math.pow(v1,3)).toFixed(2)}`;
      if (values.shape === 'cyl') {
        if (isNaN(v2)) return '';
        return `Volume: ${(Math.PI * Math.pow(v1,2) * v2).toFixed(2)}`;
      }
      return '';
    }
  },
  {
    id: 'inflation-calc',
    name: 'Inflation Calc',
    icon: TrendingUp,
    description: 'Future value of money.',
    iconColor: 'text-red-600',
    iconBg: 'bg-red-100',
    inputs: [
      { name: 'amount', label: 'Current Amount', type: 'number' },
      { name: 'rate', label: 'Inflation Rate (%)', type: 'number', defaultValue: '3' },
      { name: 'years', label: 'Years', type: 'number' }
    ],
    instructions: ["Calculate what an amount today will be worth in the future given an inflation rate."],
    calculate: (values) => {
      const p = parseFloat(values.amount);
      const r = parseFloat(values.rate) / 100;
      const n = parseFloat(values.years);
      if (isNaN(p) || isNaN(r) || isNaN(n)) return '';
      const fv = p * Math.pow(1 + r, n);
      return `Future Value: ${formatCurrency(fv)}\nCost Increase: ${formatCurrency(fv - p)}`;
    }
  },
  {
    id: 'pythag-calc',
    name: 'Pythagorean Calc',
    icon: Triangle,
    description: 'Find Hypotenuse.',
    iconColor: 'text-indigo-500',
    iconBg: 'bg-indigo-100',
    inputs: [
      { name: 'a', label: 'Side A', type: 'number' },
      { name: 'b', label: 'Side B', type: 'number' }
    ],
    instructions: ["Enter the two shorter sides of a right triangle to find the hypotenuse."],
    calculate: (values) => {
      const a = parseFloat(values.a);
      const b = parseFloat(values.b);
      if (isNaN(a) || isNaN(b)) return '';
      return `Hypotenuse (c): ${(Math.sqrt(a*a + b*b)).toFixed(4)}`;
    }
  },
  {
    id: 'ibw-calc',
    name: 'Ideal Body Weight',
    icon: Scale,
    description: 'Devine Formula.',
    iconColor: 'text-teal-500',
    iconBg: 'bg-teal-100',
    inputs: [
      { name: 'gender', label: 'Gender', type: 'select', options: [{label:'Male', value:'m'}, {label:'Female', value:'f'}], defaultValue: 'm' },
      { name: 'height', label: 'Height (cm)', type: 'number' }
    ],
    instructions: ["Estimates ideal body weight using the Devine formula based on height and gender."],
    calculate: (values) => {
      const h = parseFloat(values.height);
      if (isNaN(h) || h < 152) return 'Height must be > 152cm'; // Formula limitation
      // Convert cm to inches over 5ft (60 inches)
      const hInches = h / 2.54;
      const inchesOver60 = hInches - 60;
      
      let ibw = 0;
      if (values.gender === 'm') ibw = 50 + (2.3 * inchesOver60);
      else ibw = 45.5 + (2.3 * inchesOver60);
      
      return `Ideal Weight: ${ibw.toFixed(1)} kg`;
    }
  },
  {
    id: 'perc-diff',
    name: 'Percentage Diff',
    icon: Percent,
    description: 'Compare two values.',
    iconColor: 'text-sky-600',
    iconBg: 'bg-sky-100',
    inputs: [
      { name: 'v1', label: 'Value A', type: 'number' },
      { name: 'v2', label: 'Value B', type: 'number' }
    ],
    instructions: ["Calculates the percentage difference between two values relative to their average."],
    calculate: (values) => {
      const v1 = parseFloat(values.v1);
      const v2 = parseFloat(values.v2);
      if (isNaN(v1) || isNaN(v2)) return '';
      const diff = Math.abs(v1 - v2);
      const avg = (v1 + v2) / 2;
      if (avg === 0) return '0%';
      return `Difference: ${((diff/avg)*100).toFixed(2)}%`;
    }
  },
  {
    id: 'force-calc',
    name: 'Force Calculator',
    icon: Move3d,
    description: 'F = m * a',
    iconColor: 'text-yellow-600',
    iconBg: 'bg-yellow-100',
    inputs: [
      { name: 'm', label: 'Mass (kg)', type: 'number' },
      { name: 'a', label: 'Acceleration (m/s²)', type: 'number' }
    ],
    instructions: ["Calculates Force using Newton's Second Law."],
    calculate: (values) => {
      const m = parseFloat(values.m);
      const a = parseFloat(values.a);
      if (isNaN(m) || isNaN(a)) return '';
      return `Force: ${(m*a).toFixed(2)} Newtons`;
    }
  },
  {
    id: 'circle-solve',
    name: 'Circle Solver',
    icon: Target,
    description: 'Radius -> Properties.',
    iconColor: 'text-pink-500',
    iconBg: 'bg-pink-100',
    inputs: [
      { name: 'r', label: 'Radius', type: 'number' }
    ],
    instructions: ["Enter radius to find Diameter, Circumference, and Area."],
    calculate: (values) => {
      const r = parseFloat(values.r);
      if (isNaN(r)) return '';
      return `Diameter: ${(2*r).toFixed(2)}\nCircumference: ${(2*Math.PI*r).toFixed(2)}\nArea: ${(Math.PI*r*r).toFixed(2)}`;
    }
  },
  {
    id: 'time-dur',
    name: 'Time Duration',
    icon: Clock,
    description: 'Convert to Minutes.',
    iconColor: 'text-slate-700',
    iconBg: 'bg-slate-200',
    inputs: [
      { name: 'h', label: 'Hours', type: 'number' },
      { name: 'm', label: 'Minutes', type: 'number' }
    ],
    instructions: ["Converts a duration of hours and minutes into total minutes and seconds."],
    calculate: (values) => {
      const h = parseFloat(values.h) || 0;
      const m = parseFloat(values.m) || 0;
      const totalM = (h * 60) + m;
      return `Total Minutes: ${totalM}\nTotal Seconds: ${totalM * 60}`;
    }
  },
  {
    id: 'quad-solver',
    name: 'Quadratic Solver',
    icon: Sigma,
    description: 'ax² + bx + c = 0',
    iconColor: 'text-indigo-600',
    iconBg: 'bg-indigo-100',
    inputs: [
      { name: 'a', label: 'a', type: 'number', placeholder: '1' },
      { name: 'b', label: 'b', type: 'number', placeholder: '5' },
      { name: 'c', label: 'c', type: 'number', placeholder: '6' }
    ],
    instructions: [
      "Enter coefficients for the equation ax² + bx + c = 0.",
      "Calculates the roots x₁ and x₂ using the quadratic formula.",
      "Displays 'Complex Roots' if the discriminant is negative."
    ],
    calculate: (values) => {
      const a = parseFloat(values.a);
      const b = parseFloat(values.b);
      const c = parseFloat(values.c);
      if (isNaN(a) || isNaN(b) || isNaN(c)) return '';
      if (a === 0) return 'Not a quadratic equation (a=0)';

      const discriminant = b * b - 4 * a * c;
      if (discriminant > 0) {
        const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        return `Roots are real and distinct:\nx₁ = ${x1.toFixed(4)}\nx₂ = ${x2.toFixed(4)}`;
      } else if (discriminant === 0) {
        const x = -b / (2 * a);
        return `Roots are real and equal:\nx = ${x.toFixed(4)}`;
      } else {
        const realPart = (-b / (2 * a)).toFixed(4);
        const imagPart = (Math.sqrt(-discriminant) / (2 * a)).toFixed(4);
        return `Roots are complex:\nx₁ = ${realPart} + ${imagPart}i\nx₂ = ${realPart} - ${imagPart}i`;
      }
    }
  },
  {
    id: 'gcd-lcm',
    name: 'GCD & LCM',
    icon: Repeat,
    description: 'Factor calculator.',
    iconColor: 'text-cyan-600',
    iconBg: 'bg-cyan-100',
    inputs: [
      { name: 'n1', label: 'Number 1', type: 'number' },
      { name: 'n2', label: 'Number 2', type: 'number' }
    ],
    instructions: [
      "Enter two integers.",
      "Calculates the Greatest Common Divisor (GCD) and Least Common Multiple (LCM)."
    ],
    calculate: (values) => {
      const n1 = parseInt(values.n1);
      const n2 = parseInt(values.n2);
      if (isNaN(n1) || isNaN(n2)) return '';
      
      const gcd = (a: number, b: number): number => !b ? a : gcd(b, a % b);
      const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);
      
      const g = gcd(Math.abs(n1), Math.abs(n2));
      const l = lcm(Math.abs(n1), Math.abs(n2));
      return `GCD: ${g}\nLCM: ${l}`;
    }
  },
  {
    id: 'comp-int',
    name: 'Compound Interest',
    icon: TrendingUp,
    description: 'With frequency options.',
    iconColor: 'text-green-700',
    iconBg: 'bg-green-100',
    inputs: [
      { name: 'p', label: 'Principal', type: 'number' },
      { name: 'r', label: 'Annual Rate (%)', type: 'number' },
      { name: 't', label: 'Time (Years)', type: 'number' },
      { name: 'n', label: 'Compounding', type: 'select', options: [
          {label: 'Annually (1/yr)', value: '1'},
          {label: 'Semi-Annually (2/yr)', value: '2'},
          {label: 'Quarterly (4/yr)', value: '4'},
          {label: 'Monthly (12/yr)', value: '12'},
          {label: 'Daily (365/yr)', value: '365'}
      ], defaultValue: '1' }
    ],
    instructions: [
      "Calculates compound interest with adjustable compounding frequency.",
      "Select how often interest is compounded (e.g. Monthly, Daily)."
    ],
    calculate: (values) => {
      const p = parseFloat(values.p);
      const r = parseFloat(values.r) / 100;
      const t = parseFloat(values.t);
      const n = parseFloat(values.n);
      
      if(isNaN(p) || isNaN(r) || isNaN(t)) return '';
      
      const amount = p * Math.pow((1 + r/n), n * t);
      const interest = amount - p;
      
      return `Total Amount: ${formatCurrency(amount)}\nInterest Earned: ${formatCurrency(interest)}`;
    }
  },
  {
    id: 'len-conv',
    name: 'Length Converter',
    icon: Ruler,
    description: 'm, ft, in, km, mi.',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
    inputs: [
        { name: 'val', label: 'Value', type: 'number' },
        { name: 'from', label: 'From', type: 'select', options: [
            {label:'Meter (m)', value:'1'}, {label:'Kilometer (km)', value:'1000'}, 
            {label:'Centimeter (cm)', value:'0.01'}, {label:'Millimeter (mm)', value:'0.001'},
            {label:'Inch (in)', value:'0.0254'}, {label:'Foot (ft)', value:'0.3048'}, 
            {label:'Yard (yd)', value:'0.9144'}, {label:'Mile (mi)', value:'1609.34'}
        ], defaultValue: '1' },
        { name: 'to', label: 'To', type: 'select', options: [
            {label:'Meter (m)', value:'1'}, {label:'Kilometer (km)', value:'1000'}, 
            {label:'Centimeter (cm)', value:'0.01'}, {label:'Millimeter (mm)', value:'0.001'},
            {label:'Inch (in)', value:'0.0254'}, {label:'Foot (ft)', value:'0.3048'}, 
            {label:'Yard (yd)', value:'0.9144'}, {label:'Mile (mi)', value:'1609.34'}
        ], defaultValue: '1000' }
    ],
    instructions: ["Convert between metric and imperial length units."],
    calculate: (values) => {
        const val = parseFloat(values.val);
        const from = parseFloat(values.from);
        const to = parseFloat(values.to);
        if(isNaN(val)) return '';
        const meters = val * from;
        const result = meters / to;
        return `Result: ${result.toFixed(4)}`;
    }
  },
  {
    id: 'weight-conv',
    name: 'Weight Converter',
    icon: Dumbbell,
    description: 'kg, lb, oz, g.',
    iconColor: 'text-slate-600',
    iconBg: 'bg-slate-200',
    inputs: [
        { name: 'val', label: 'Value', type: 'number' },
        { name: 'from', label: 'From', type: 'select', options: [
            {label:'Kilogram (kg)', value:'1000'}, {label:'Gram (g)', value:'1'}, 
            {label:'Milligram (mg)', value:'0.001'}, {label:'Pound (lb)', value:'453.592'}, 
            {label:'Ounce (oz)', value:'28.3495'}
        ], defaultValue: '1000' },
        { name: 'to', label: 'To', type: 'select', options: [
            {label:'Kilogram (kg)', value:'1000'}, {label:'Gram (g)', value:'1'}, 
            {label:'Milligram (mg)', value:'0.001'}, {label:'Pound (lb)', value:'453.592'}, 
            {label:'Ounce (oz)', value:'28.3495'}
        ], defaultValue: '453.592' }
    ],
    instructions: ["Convert between metric and imperial weight units."],
    calculate: (values) => {
        const val = parseFloat(values.val);
        const from = parseFloat(values.from);
        const to = parseFloat(values.to);
        if(isNaN(val)) return '';
        const grams = val * from;
        const result = grams / to;
        return `Result: ${result.toFixed(4)}`;
    }
  },
  {
    id: 'kitchen-conv',
    name: 'Cooking Converter',
    icon: ChefHat,
    description: 'Cups/Spoons to ml.',
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-100',
    inputs: [
        { name: 'val', label: 'Amount', type: 'number' },
        { name: 'unit', label: 'Unit', type: 'select', options: [
            {label:'Cup (US)', value:'236.588'}, {label:'Tablespoon (US)', value:'14.787'}, 
            {label:'Teaspoon (US)', value:'4.929'}, {label:'Fluid Ounce (US)', value:'29.573'}
        ], defaultValue: '236.588' }
    ],
    instructions: ["Convert common cooking volume measurements to Milliliters (ml)."],
    calculate: (values) => {
        const val = parseFloat(values.val);
        const unit = parseFloat(values.unit);
        if(isNaN(val)) return '';
        return `Equivalent: ${(val * unit).toFixed(1)} ml`;
    }
  },
  {
    id: 'paint-calc',
    name: 'Paint Calculator',
    icon: PaintBucket,
    description: 'Area to Liters.',
    iconColor: 'text-rose-400',
    iconBg: 'bg-rose-100',
    inputs: [
        { name: 'area', label: 'Wall Area (sq ft)', type: 'number' },
        { name: 'coverage', label: 'Coverage per Liter', type: 'number', defaultValue: '100', placeholder: 'Standard ~100 sq ft' },
        { name: 'coats', label: 'Number of Coats', type: 'number', defaultValue: '2' }
    ],
    instructions: [
        "Enter the total area of walls to be painted.",
        "Coverage depends on paint type (usually 100-120 sq ft per liter).",
        "Calculates total liters of paint required."
    ],
    calculate: (values) => {
        const area = parseFloat(values.area);
        const cov = parseFloat(values.coverage);
        const coats = parseFloat(values.coats);
        if(isNaN(area) || isNaN(cov)) return '';
        const liters = (area / cov) * coats;
        return `Paint Needed: ${liters.toFixed(2)} Liters`;
    }
  },
  {
    id: 'preg-calc',
    name: 'Pregnancy Due Date',
    icon: Baby,
    description: 'Naegele\'s Rule.',
    iconColor: 'text-pink-400',
    iconBg: 'bg-pink-100',
    inputs: [
        { name: 'lmp', label: 'First Day of Last Period', type: 'date' }
    ],
    instructions: [
        "Enter the first day of your last menstrual period (LMP).",
        "Calculates estimated due date by adding 280 days (40 weeks)."
    ],
    calculate: (values) => {
        if(!values.lmp) return '';
        const lmp = new Date(values.lmp);
        const due = new Date(lmp);
        due.setDate(lmp.getDate() + 280);
        return `Estimated Due Date:\n${due.toDateString()}`;
    }
  },
  {
    id: 'ppi-calc',
    name: 'Pixel Density (PPI)',
    icon: Smartphone,
    description: 'Screen sharpness.',
    iconColor: 'text-slate-800',
    iconBg: 'bg-slate-200',
    inputs: [
        { name: 'w', label: 'Res Width (px)', type: 'number', placeholder: '1920' },
        { name: 'h', label: 'Res Height (px)', type: 'number', placeholder: '1080' },
        { name: 'd', label: 'Diagonal Size (inch)', type: 'number', placeholder: '24' }
    ],
    instructions: [
        "Enter screen resolution (Width x Height).",
        "Enter diagonal screen size in inches.",
        "Calculates Pixels Per Inch (PPI)."
    ],
    calculate: (values) => {
        const w = parseFloat(values.w);
        const h = parseFloat(values.h);
        const d = parseFloat(values.d);
        if(isNaN(w) || isNaN(h) || isNaN(d) || d === 0) return '';
        const diagPx = Math.sqrt(w*w + h*h);
        const ppi = diagPx / d;
        return `PPI: ${ppi.toFixed(2)}`;
    }
  },
  {
    id: 'ke-calc',
    name: 'Kinetic Energy',
    icon: Zap,
    description: 'KE = 0.5 * m * v²',
    iconColor: 'text-yellow-500',
    iconBg: 'bg-yellow-100',
    inputs: [
        { name: 'm', label: 'Mass (kg)', type: 'number' },
        { name: 'v', label: 'Velocity (m/s)', type: 'number' }
    ],
    instructions: ["Calculates kinetic energy in Joules based on mass and velocity."],
    calculate: (values) => {
        const m = parseFloat(values.m);
        const v = parseFloat(values.v);
        if(isNaN(m) || isNaN(v)) return '';
        const ke = 0.5 * m * v * v;
        return `Kinetic Energy: ${ke.toFixed(2)} Joules`;
    },
  },
  {
    id: 'hebrew-calc',
    name: 'Hebrew Gematria',
    icon: ScrollText,
    description: 'Word value & stats.',
    iconColor: 'text-indigo-800',
    iconBg: 'bg-indigo-200',
    inputs: [
        { name: 'text', label: 'Hebrew Text', type: 'text', placeholder: 'שלום', colSpan: 2 }
    ],
    instructions: [
        "Enter Hebrew text or phrases.",
        "Calculates the Gematria value (numerical value of letters).",
        "Also provides Word Count, Letter Count, and Total Length."
    ],
    calculate: (values) => {
        const txt = values.text || '';
        const words = txt.trim() ? txt.trim().split(/\s+/).length : 0;
        const letters = txt.replace(/[^א-ת]/g, '').length;
        
        const map: any = {
            'א':1, 'ב':2, 'ג':3, 'ד':4, 'ה':5, 'ו':6, 'ז':7, 'ח':8, 'ט':9, 'י':10,
            'כ':20, 'ך':20, 'ל':30, 'מ':40, 'ם':40, 'נ':50, 'ן':50, 'ס':60, 'ע':70, 'פ':80, 'ף':80, 'צ':90, 'ץ':90,
            'ק':100, 'ר':200, 'ש':300, 'ת':400
        };
        
        let val = 0;
        for(const c of txt) {
            if(map[c]) val += map[c];
        }
        
        return `Gematria Value: ${val}\nWords: ${words} | Letters: ${letters}`;
    }
  }
];
