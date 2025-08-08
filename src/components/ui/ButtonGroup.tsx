import React from 'react';
import styles from './ButtonGroup.module.css';

interface ButtonGroupProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export default function ButtonGroup({ children, className = '' }: ButtonGroupProps) {
  return (
    <div className={`${styles.buttonGroup} ${className}`}>
      {children}
    </div>
  );
}
