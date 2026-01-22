import { useState } from 'react';
import { GlassInput } from '@/components/GlassInput';
import styles from './GlassInputDemo.module.scss';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';

export function GlassInputDemo() {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoWrapper}>
          <div className={styles.title}>Liquid Glass Studio</div>
          <div className={styles.subtitle}>Glass Style Text Input Demo</div>
        </div>
        <div className={styles.content}>
          <span>
            by <span>iyinchao</span>
          </span>
          <a
            href="https://github.com/iyinchao/liquid-glass-studio"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
          >
            <GitHubIcon />
          </a>
          <a
            href="https://x.com/charles_yin/status/1936338569267986605"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
          >
            <XIcon></XIcon>
          </a>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.demoCard}>
          <h1 className={styles.demoTitle}>Glass Style Text Input</h1>
          <p className={styles.demoDescription}>
            A beautiful text input with glass morphism effect, featuring backdrop blur, transparency, and smooth interactions.
          </p>
          
          <div className={styles.inputSection}>
            <GlassInput
              placeholder="Type something here..."
              value={inputValue}
              onChange={setInputValue}
            />
            {inputValue && (
              <div className={styles.valueDisplay}>
                <span className={styles.label}>Input Value:</span>
                <span className={styles.value}>{inputValue}</span>
              </div>
            )}
          </div>

          <div className={styles.features}>
            <h2 className={styles.featuresTitle}>Features:</h2>
            <ul className={styles.featuresList}>
              <li>✨ Backdrop blur effect (Glass morphism)</li>
              <li>💎 Semi-transparent background</li>
              <li>🎨 Smooth hover and focus transitions</li>
              <li>📱 Responsive design</li>
              <li>🌈 Elegant border glow on focus</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
