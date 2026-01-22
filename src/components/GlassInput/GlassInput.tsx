import { useState } from 'react';
import styles from './GlassInput.module.scss';

interface GlassInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function GlassInput({ placeholder = 'Enter text...', value: controlledValue, onChange }: GlassInputProps) {
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

  return (
    <div className={styles.glassInputWrapper}>
      <input
        type="text"
        className={styles.glassInput}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
