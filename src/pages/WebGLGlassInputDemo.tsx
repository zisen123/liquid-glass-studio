import { useState } from 'react';
import { WebGLGlassInput } from '@/components/WebGLGlassInput';
import styles from './WebGLGlassInputDemo.module.scss';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import { useLevaControls } from '@/Controls';

export function WebGLGlassInputDemo() {
  const [inputValue, setInputValue] = useState('');

  // Use the same controls as the original demo
  const { controls, lang, levaGlobal } = useLevaControls({
    containerRender: {
      bgType: () => null, // We don't need background selector for input
    },
  });

  return (
    <>
      {levaGlobal}
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logoWrapper}>
            <div className={styles.title}>Liquid Glass Studio</div>
            <div className={styles.subtitle}>WebGL Glass Text Input Demo</div>
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
            <h1 className={styles.demoTitle}>WebGL Glass Text Input</h1>
            <p className={styles.demoDescription}>
              真正的WebGL实现！使用与原demo相同的shader和物理效果（折射、色散、菲涅尔反射等），
              透明input叠加在WebGL canvas之上。
              <br />
              使用右侧控件面板调整所有原demo的玻璃物理参数。
            </p>
            
            <div className={styles.inputSection}>
              <WebGLGlassInput
                placeholder="Type something here..."
                value={inputValue}
                onChange={setInputValue}
                glassParams={{
                  refThickness: controls.refThickness,
                  refFactor: controls.refFactor,
                  refDispersion: controls.refDispersion,
                  refFresnelRange: controls.refFresnelRange,
                  refFresnelHardness: controls.refFresnelHardness,
                  refFresnelFactor: controls.refFresnelFactor,
                  glareRange: controls.glareRange,
                  glareHardness: controls.glareHardness,
                  glareConvergence: controls.glareConvergence,
                  glareOppositeFactor: controls.glareOppositeFactor,
                  glareFactor: controls.glareFactor,
                  glareAngle: controls.glareAngle,
                  blurRadius: controls.blurRadius,
                  blurEdge: controls.blurEdge,
                  tint: controls.tint,
                  shapeWidth: controls.shapeWidth,
                  shapeHeight: controls.shapeHeight,
                  shapeRadius: controls.shapeRadius,
                  shapeRoundness: controls.shapeRoundness,
                }}
              />
              {inputValue && (
                <div className={styles.valueDisplay}>
                  <span className={styles.label}>Input Value:</span>
                  <span className={styles.value}>{inputValue}</span>
                </div>
              )}
            </div>

            <div className={styles.features}>
              <h2 className={styles.featuresTitle}>WebGL Physical Effects:</h2>
              <ul className={styles.featuresList}>
                <li>🔬 折射 (Refraction) - 真实光学折射</li>
                <li>🌈 色散 (Dispersion) - 光谱分离效果</li>
                <li>💎 菲涅尔反射 (Fresnel Reflection) - 边缘高光</li>
                <li>✨ 高光眩光 (Glare) - 可调角度和强度</li>
                <li>🌫️ 双通道高斯模糊 - 垂直+水平</li>
                <li>🎨 完整参数控制 - 与原demo一致</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
