import { useState } from 'react';
import layout from '../../assets/layout/home.png';

/**
 * Ferramenta de conferência do layout. Sobrepõe o frame "Home" do Figma (1440px de largura,
 * 1x) à página, com um controle de opacidade. Só é carregada em desenvolvimento e com `?layout` na URL
 * (ver App.tsx): nunca entra no build de produção. Use com a janela em 1440px de largura.
 */
export default function LayoutOverlay() {
  const [opacity, setOpacity] = useState(0.4);

  return (
    <>
      <img
        src={layout}
        alt=""
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          opacity,
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
      <input
        type="range"
        min={0}
        max={1}
        step={0.05}
        value={opacity}
        aria-label="Opacidade do layout"
        onChange={(e) => setOpacity(Number(e.target.value))}
        style={{ position: 'fixed', bottom: 8, right: 8, zIndex: 10000 }}
      />
    </>
  );
}
