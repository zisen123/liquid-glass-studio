import { useMemo, useState } from 'react';
import { useControls, Leva } from 'leva';
import { GlassInput, type GlassInputStyleProps } from '@/components/GlassInput';
import styles from './GlassInputDemo.module.scss';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import { isChineseLanguage, isUzbekLanguage } from '@/utils';
import languages from '@/utils/languages';

export function GlassInputDemo() {
  const [inputValue, setInputValue] = useState('');

  const langName = isChineseLanguage() ? 'zh-CN' : isUzbekLanguage() ? 'uz-UZ' : 'en-US';
  const lang = useMemo(() => {
    return languages[langName];
  }, [langName]);

  const controls = useControls({
    backgroundOpacity: {
      label: lang['editor.backgroundOpacity'] || 'Background Opacity',
      min: 0,
      max: 1,
      step: 0.01,
      value: 0.1,
    },
    blurAmount: {
      label: lang['editor.blurAmount'] || 'Blur Amount',
      min: 0,
      max: 50,
      step: 1,
      value: 10,
    },
    borderOpacity: {
      label: lang['editor.borderOpacity'] || 'Border Opacity',
      min: 0,
      max: 1,
      step: 0.01,
      value: 0.2,
    },
    borderRadius: {
      label: lang['editor.borderRadius'] || 'Border Radius',
      min: 0,
      max: 50,
      step: 1,
      value: 12,
    },
    shadowIntensity: {
      label: lang['editor.shadowIntensity'] || 'Shadow Intensity',
      min: 0,
      max: 1,
      step: 0.01,
      value: 0.37,
    },
    focusBorderColor: {
      label: lang['editor.focusBorderColor'] || 'Focus Border Color',
      value: { r: 150, g: 186, b: 222 },
    },
  });

  const glassStyleProps: GlassInputStyleProps = {
    backgroundOpacity: controls.backgroundOpacity,
    blurAmount: controls.blurAmount,
    borderOpacity: controls.borderOpacity,
    borderRadius: controls.borderRadius,
    shadowIntensity: controls.shadowIntensity,
    focusBorderColor: controls.focusBorderColor,
  };

  return (
    <>
      <Leva
        theme={{
          sizes: {
            rootWidth: lang['_settings'].rootWidth,
            numberInputMinWidth: lang['_settings'].numberInputMinWidth,
            controlWidth: lang['_settings'].controlWidth,
          },
          space: {
            colGap: '5px',
          },
        }}
      />
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
              <br />
              Use the controls panel on the right to adjust the glass effect parameters in real-time.
            </p>
            
            <div className={styles.inputSection}>
              <GlassInput
                placeholder="Type something here..."
                value={inputValue}
                onChange={setInputValue}
                styleProps={glassStyleProps}
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
                <li>🎛️ Real-time adjustable parameters</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
