import { useEffect, useRef, useState, type CSSProperties } from 'react';
import styles from './WebGLGlassInput.module.scss';
import { MultiPassRenderer } from '@/utils/GLUtils';
import { computeGaussianKernelByRadius } from '@/utils';

import VertexShader from '@/shaders/vertex.glsl?raw';
import FragmentBgShader from '@/shaders/fragment-bg.glsl?raw';
import FragmentBgVblurShader from '@/shaders/fragment-bg-vblur.glsl?raw';
import FragmentBgHblurShader from '@/shaders/fragment-bg-hblur.glsl?raw';
import FragmentMainShader from '@/shaders/fragment-main.glsl?raw';

export interface WebGLGlassInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  // WebGL glass effect parameters
  glassParams?: {
    refThickness?: number;
    refFactor?: number;
    refDispersion?: number;
    refFresnelRange?: number;
    refFresnelHardness?: number;
    refFresnelFactor?: number;
    glareRange?: number;
    glareHardness?: number;
    glareConvergence?: number;
    glareOppositeFactor?: number;
    glareFactor?: number;
    glareAngle?: number;
    blurRadius?: number;
    blurEdge?: boolean;
    tint?: { r: number; g: number; b: number; a: number };
    shapeWidth?: number;
    shapeHeight?: number;
    shapeRadius?: number;
    shapeRoundness?: number;
  };
}

export function WebGLGlassInput({
  placeholder = 'Enter text...',
  value: controlledValue,
  onChange,
  glassParams = {},
}: WebGLGlassInputProps) {
  const [internalValue, setInternalValue] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [dimensions, setDimensions] = useState({ width: 400, height: 60 });

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  // Default glass parameters matching original demo
  const params = {
    refThickness: 20,
    refFactor: 1.4,
    refDispersion: 7,
    refFresnelRange: 30,
    refFresnelHardness: 20,
    refFresnelFactor: 20,
    glareRange: 30,
    glareHardness: 20,
    glareConvergence: 50,
    glareOppositeFactor: 80,
    glareFactor: 90,
    glareAngle: -45,
    blurRadius: 5,
    blurEdge: true,
    tint: { r: 255, g: 255, b: 255, a: 0 },
    shapeWidth: 400,
    shapeHeight: 60,
    shapeRadius: 80,
    shapeRoundness: 5,
    ...glassParams,
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvasEl = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;

    canvasEl.width = dimensions.width * dpr;
    canvasEl.height = dimensions.height * dpr;

    const gl = canvasEl.getContext('webgl2');
    if (!gl) {
      console.error('WebGL2 not supported');
      return;
    }

    const renderer = new MultiPassRenderer(canvasEl, [
      {
        name: 'bgPass',
        shader: {
          vertex: VertexShader,
          fragment: FragmentBgShader,
        },
      },
      {
        name: 'vBlurPass',
        shader: {
          vertex: VertexShader,
          fragment: FragmentBgVblurShader,
        },
        inputs: {
          u_prevPassTexture: 'bgPass',
        },
      },
      {
        name: 'hBlurPass',
        shader: {
          vertex: VertexShader,
          fragment: FragmentBgHblurShader,
        },
        inputs: {
          u_prevPassTexture: 'vBlurPass',
        },
      },
      {
        name: 'mainPass',
        shader: {
          vertex: VertexShader,
          fragment: FragmentMainShader,
        },
        inputs: {
          u_blurredBg: 'hBlurPass',
          u_bg: 'bgPass',
        },
        outputToScreen: true,
      },
    ]);

    const blurWeights = computeGaussianKernelByRadius(params.blurRadius);

    let raf: number | null = null;
    const render = () => {
      gl.viewport(0, 0, dimensions.width * dpr, dimensions.height * dpr);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      renderer.resize(dimensions.width * dpr, dimensions.height * dpr);

      renderer.setUniforms({
        u_resolution: [dimensions.width * dpr, dimensions.height * dpr],
        u_dpr: dpr,
        u_blurWeights: blurWeights,
        u_blurRadius: params.blurRadius,
        u_mouse: [dimensions.width * dpr / 2, dimensions.height * dpr / 2],
        u_mouseSpring: [dimensions.width * dpr / 2, dimensions.height * dpr / 2],
        u_shapeWidth: params.shapeWidth,
        u_shapeHeight: params.shapeHeight,
        u_shapeRadius: ((Math.min(params.shapeWidth, params.shapeHeight) / 2) * params.shapeRadius) / 100,
        u_shapeRoundness: params.shapeRoundness,
        u_mergeRate: 0.05,
        u_glareAngle: (params.glareAngle * Math.PI) / 180,
        u_showShape1: 0,
      });

      renderer.render({
        bgPass: {
          u_bgType: 0,
          u_shadowExpand: 25,
          u_shadowFactor: 0.15,
          u_shadowPosition: [0, -10],
        },
        mainPass: {
          u_tint: [
            params.tint.r / 255,
            params.tint.g / 255,
            params.tint.b / 255,
            params.tint.a,
          ],
          u_refThickness: params.refThickness,
          u_refFactor: params.refFactor,
          u_refDispersion: params.refDispersion,
          u_refFresnelRange: params.refFresnelRange,
          u_refFresnelHardness: params.refFresnelHardness / 100,
          u_refFresnelFactor: params.refFresnelFactor / 100,
          u_glareRange: params.glareRange,
          u_glareHardness: params.glareHardness / 100,
          u_glareConvergence: params.glareConvergence / 100,
          u_glareOppositeFactor: params.glareOppositeFactor / 100,
          u_glareFactor: params.glareFactor / 100,
          u_blurEdge: params.blurEdge ? 1 : 0,
          STEP: 9,
        },
      });

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      if (raf) {
        cancelAnimationFrame(raf);
      }
    };
  }, [dimensions, params]);

  return (
    <div className={styles.webglGlassInputWrapper} style={{ width: dimensions.width, height: dimensions.height }}>
      <canvas
        ref={canvasRef}
        className={styles.webglCanvas}
        style={{
          ['--dpr']: window.devicePixelRatio || 1,
        } as CSSProperties}
      />
      <input
        ref={inputRef}
        type="text"
        className={styles.overlayInput}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
