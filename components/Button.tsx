
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'ghost' | 'memory' | 'number' | 'operator' | 'function' | 'rose';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'secondary', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative flex items-center justify-center transition-all duration-100 active:scale-95 active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg select-none font-medium overflow-hidden touch-manipulation";
  
  // Styles using CSS variables injected by App.tsx
  const dynamicStyles = {
    // Number Keys: Uses 'secondary' color from theme
    number: {
        backgroundColor: 'var(--secondary)',
        color: 'var(--text-main)',
        borderBottom: '4px solid var(--border)',
    },
    // Operators: Uses 'accent' color from theme
    operator: {
        backgroundColor: 'var(--accent)',
        color: 'var(--text-main)',
        borderBottom: '4px solid var(--border)',
        filter: 'brightness(1.1)'
    },
    // Functions: Uses 'accent' but slightly different opacity or same
    function: {
        backgroundColor: 'var(--accent)',
        color: 'var(--text-main)',
        borderBottom: '4px solid var(--border)',
        opacity: 0.9
    },
    // Rose/Submit: Uses 'primary' color from theme (user customizable)
    rose: {
        backgroundColor: 'var(--primary)',
        color: '#fff', // Always white for contrast on primary
        borderBottom: '4px solid rgba(0,0,0,0.3)',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
    },
    accent: {
        backgroundColor: 'var(--primary)',
        color: '#fff',
        borderBottom: '4px solid rgba(0,0,0,0.3)'
    },
    danger: {
        backgroundColor: 'rgba(225, 29, 72, 0.1)',
        color: '#e11d48',
        borderBottom: '4px solid rgba(225, 29, 72, 0.2)'
    },
    secondary: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        color: 'var(--text-sec)',
        borderBottom: '4px solid var(--border)'
    },
    memory: {
        backgroundColor: 'transparent',
        color: 'var(--text-sec)',
        padding: '4px 8px',
        fontSize: '10px',
        fontWeight: 'bold'
    },
    ghost: {
        backgroundColor: 'transparent',
        color: 'inherit'
    },
    primary: {
       backgroundColor: 'var(--secondary)',
       color: 'var(--text-main)',
       borderBottom: '4px solid var(--border)'
    }
  };

  const selectedStyle = dynamicStyles[variant as keyof typeof dynamicStyles] || dynamicStyles.secondary;

  return (
    <button 
      className={`${baseStyles} ${className}`}
      style={selectedStyle}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
