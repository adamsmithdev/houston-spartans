import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  readonly children: React.ReactNode;
  readonly variant?: 'primary' | 'secondary' | 'view-all' | 'submit' | 'merch';
  readonly onClick?: () => void;
  readonly href?: string;
  readonly type?: 'button' | 'submit';
  readonly className?: string;
  readonly disabled?: boolean;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  href, 
  type = 'button',
  className = '',
  disabled = false 
}: ButtonProps) {
  // Use a simpler approach for CSS class mapping
  const variantClasses = {
    'primary': styles['button-primary'] || '',
    'secondary': styles['button-secondary'] || '',
    'view-all': styles['button-view-all'] || '',
    'submit': styles['button-submit'] || '',
    'merch': styles['button-merch'] || ''
  };
  
  const buttonClasses = `${styles.button || ''} ${variantClasses[variant]} ${className}`.trim();

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.();
  };

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('//');
    return (
      <a 
        href={href} 
        className={buttonClasses}
        onClick={handleClick}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {children}
        {variant === 'primary' && <span className={styles['button-shine']} />}
      </a>
    );
  }

  return (
    <button 
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
      {variant === 'primary' && <span className={styles['button-shine']} />}
    </button>
  );
}
