import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Galaxy } from './Galaxy';
import { Suspense } from 'react';

export default function Scene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505]">
      <Canvas camera={{ position: [0, 4, 8], fov: 60 }}>
        <color attach="background" args={['#050505']} />
        <Suspense fallback={null}>
          <Galaxy />
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
