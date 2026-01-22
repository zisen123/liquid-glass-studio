import { useState, type CSSProperties } from 'react';
import styles from './GlassInput.module.scss';

export interface GlassInputStyleProps {
  backgroundOpacity?: number;
  blurAmount?: number;
  borderOpacity?: number;
  borderRadius?: number;
  shadowIntensity?: number;
  focusBorderColor?: { r: number; g: number; b: number };
}

interface GlassInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  styleProps?: GlassInputStyleProps;
}

export function GlassInput({ 
  placeholder = 'Enter text...', 
  value: controlledValue, 
  onChange,
  styleProps 
}: GlassInputProps) {
  const [internalValue, setInternalValue] = useState('');
  
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  const {
    backgroundOpacity = 0.1,
    blurAmount = 10,
    borderOpacity = 0.2,
    borderRadius = 12,
    shadowIntensity = 0.37,
    focusBorderColor = { r: 150, g: 186, b: 222 }
  } = styleProps || {};

  const customStyle: CSSProperties = {
    ['--bg-opacity' as string]: backgroundOpacity,
    ['--blur-amount' as string]: `${blurAmount}px`,
    ['--border-opacity' as string]: borderOpacity,
    ['--border-radius' as string]: `${borderRadius}px`,
    ['--shadow-intensity' as string]: shadowIntensity,
    ['--focus-border-color' as string]: `rgb(${focusBorderColor.r}, ${focusBorderColor.g}, ${focusBorderColor.b})`,
  };

  return (
    <div className={styles.glassInputWrapper}>
      <input
        type="text"
        className={styles.glassInput}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        style={customStyle}
      />
    </div>
  );
}
