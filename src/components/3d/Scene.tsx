import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Galaxy } from './Galaxy';
import { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { GALAXY_THEME } from './colors';

export default function Scene() {
  const location = useLocation();
  const isSecurityRoute = location.pathname === '/security-tool';

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" style={{ backgroundColor: GALAXY_THEME.background }}>
      <Canvas camera={{ position: [0, 4, 8], fov: 60 }}>
        <color attach="background" args={[GALAXY_THEME.background]} />
        <Suspense fallback={null}>
          <Galaxy isSecurityRoute={isSecurityRoute} />
          <EffectComposer>
            <Bloom 
              luminanceThreshold={0.2} 
              luminanceSmoothing={0.9} 
              intensity={0.5} 
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
