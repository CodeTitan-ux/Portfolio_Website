import { Canvas } from '@react-three/fiber';
import { Environment, Lightformer, useDetectGPU } from '@react-three/drei';
import FloatingShapes from './FloatingShapes';
import NebulaParticleCloud from './NebulaParticleCloud';
import { useEffect, useState, Suspense } from 'react';

export default function CanvasContainer() {
  const [isMobile, setIsMobile] = useState(false);
  const GPUTier = useDetectGPU();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Performance tier mapping
  const performanceTier = GPUTier.tier || 2;
  const isLowEnd = performanceTier < 2 || GPUTier.isMobile;

  return (
    <div className="fixed inset-0 z-0 bg-background pointer-events-auto">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 45 }} 
        style={{ touchAction: 'auto' }}
        dpr={isLowEnd ? [1, 1.5] : [1, 2]} // Reduce pixel ratio on low-end devices
      >
        <Suspense fallback={null}>
          {/* Dynamic Instanced Background Elements */}
          <FloatingShapes isLowEnd={isLowEnd} />
          
          {/* Nebula Particle Cloud */}
          <NebulaParticleCloud isLowEnd={isLowEnd} performanceTier={performanceTier} />
          
          {/* Lighting setup */}
          <ambientLight intensity={isLowEnd ? 0.3 : 0.5} />
          <directionalLight position={[10, 10, 5]} intensity={isLowEnd ? 1 : 2} color="#ffffff" />
          {!isLowEnd && <directionalLight position={[-10, -10, -5]} color="#8b5cf6" intensity={1.5} />}
          <spotLight position={[0, 10, 0]} intensity={isLowEnd ? 2 : 3} color="#f43f5e" penumbra={1} />
          
          {/* Environment reflections for premium lighting */}
          {!isLowEnd && (
            <Environment resolution={256} preset="city">
              <group rotation={[-Math.PI / 2, 0, 0]}>
                <Lightformer intensity={5} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} color="#ffffff" />
                <Lightformer intensity={3} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} color="#8b5cf6" />
                <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
                <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} color="#3b82f6" />
              </group>
            </Environment>
          )}

          <group position={isMobile ? [0, 0, -2] : [0, 0, 0]}>
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}

