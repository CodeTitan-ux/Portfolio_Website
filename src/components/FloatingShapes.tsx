import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SHAPE_COUNT = 60;

export default function FloatingShapes() {
  const solidMeshRef = useRef<THREE.InstancedMesh>(null);
  const wireMeshRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Pre-calculate positions, rotations, scales
  const shapes = useMemo(() => {
    return Array.from({ length: SHAPE_COUNT }).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20 - 10
      ),
      rotation: new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        0
      ),
      scale: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.2 + 0.05,
      isWireframe: Math.random() > 0.7,
      solidId: -1,
      wireId: -1
    }));
  }, []);

  // Split into solid and wireframe for 2 draw calls total
  const solids = shapes.filter(s => !s.isWireframe);
  const wires = shapes.filter(s => s.isWireframe);
  
  solids.forEach((s, i) => s.solidId = i);
  wires.forEach((s, i) => s.wireId = i);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    solids.forEach((shape) => {
      shape.rotation.x += delta * shape.speed;
      shape.rotation.y += delta * shape.speed;
      dummy.position.copy(shape.position);
      dummy.rotation.copy(shape.rotation);
      dummy.scale.setScalar(shape.scale);
      dummy.updateMatrix();
      if (solidMeshRef.current) solidMeshRef.current.setMatrixAt(shape.solidId, dummy.matrix);
    });

    wires.forEach((shape) => {
      shape.rotation.x += delta * shape.speed;
      shape.rotation.y += delta * shape.speed;
      dummy.position.copy(shape.position);
      dummy.rotation.copy(shape.rotation);
      dummy.scale.setScalar(shape.scale);
      dummy.updateMatrix();
      if (wireMeshRef.current) wireMeshRef.current.setMatrixAt(shape.wireId, dummy.matrix);
    });

    if (solidMeshRef.current) solidMeshRef.current.instanceMatrix.needsUpdate = true;
    if (wireMeshRef.current) wireMeshRef.current.instanceMatrix.needsUpdate = true;
    
    // Parallax mouse interaction
    const targetX = (state.pointer.x * Math.PI) / 10;
    const targetY = (state.pointer.y * Math.PI) / 10;
    
    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* Solid shapes */}
      {solids.length > 0 && (
        <instancedMesh ref={solidMeshRef} args={[undefined, undefined, solids.length]}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial 
            color="#3b82f6" 
            emissive="#1e3a8a" 
            emissiveIntensity={0.5} 
            roughness={0.2} 
            metalness={0.8}
            wireframe={false}
          />
        </instancedMesh>
      )}

      {/* Wireframe shapes */}
      {wires.length > 0 && (
        <instancedMesh ref={wireMeshRef} args={[undefined, undefined, wires.length]}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial 
            color="#60a5fa" 
            emissive="#3b82f6" 
            emissiveIntensity={0.8} 
            roughness={0.2} 
            metalness={0.5}
            wireframe={true}
          />
        </instancedMesh>
      )}
    </group>
  );
}
