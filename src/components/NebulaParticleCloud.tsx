import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  uniform vec3 uMouse;
  uniform float uPixelRatio;
  uniform float uExplosionProgress;

  attribute float aScale;

  varying vec3 vColor;

  void main() {
    vColor = color;

    // Spin effect (Differential rotation where core spins faster than outer arms)
    vec3 newPos = position;
    float distToCenter = length(newPos.xz);
    float angle = atan(newPos.z, newPos.x);
    
    // Smooth endless spin (now safely accelerated in JS to avoid positional snapping)
    float spinSpeed = (1.0 / (distToCenter + 0.5)) * uTime * 0.3; 
    angle += spinSpeed;
    
    newPos.x = cos(angle) * distToCenter;
    newPos.z = sin(angle) * distToCenter;

    // Organic seamless expansion
    float expandForce = sin(uExplosionProgress * 3.14159) * 3.0;
    float scatter = fract(sin(dot(position.xyz, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
    
    // Pushing strictly outward against the original unrotated axis eliminates all tearing micro-stutters
    vec3 outwardDir = normalize(position + vec3(0.0001));
    newPos += outwardDir * expandForce * (1.0 + scatter * 1.5);

    // High performance localized gravity well calculated inherently through matrix mapping
    vec4 modelPosition = modelMatrix * vec4(newPos, 1.0);
    
    // Project mouse space dist
    float distToMouse = distance(modelPosition.xyz, uMouse);
    // Swirling black hole effect that disrupts local particle clusters natively
    if (distToMouse < 1.2) {
        float force = (1.2 - distToMouse) / 1.2; 
        
        // Push slightly outwards structurally
        modelPosition.z += force * 0.8;
        
        // Twist xy geometrically around mouse
        float twist = force * 2.0; 
        float dx = modelPosition.x - uMouse.x;
        float dy = modelPosition.y - uMouse.y;
        
        modelPosition.x = uMouse.x + (dx * cos(twist) - dy * sin(twist));
        modelPosition.y = uMouse.y + (dx * sin(twist) + dy * cos(twist));
    }

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    // Fluid size attenuation algorithm ensuring dots maintain physical perspective depth
    gl_PointSize = aScale * uPixelRatio * (30.0 / -viewPosition.z);
  }
`;

const fragmentShader = `
  varying vec3 vColor;

  
  void main() {
    // Generate soft circular radial gradients structurally per-particle 
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = (0.5 - distanceToCenter) * 2.0;

    // Performance shortcut cutting empty raster
    if (distanceToCenter > 0.5) discard;

    // Alpha channel mapping corresponding to structural fade.
    // Enhanced color multiplier and alpha strength to organically boost visual brightness and density.
    gl_FragColor = vec4(vColor * 1.2, strength * 1.2); 
  }
`;

export default function NebulaParticleCloud() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const targetRotation = useRef({ x: 0, y: 0 });
  const mousePos = useRef({ x: 0, y: 0 });
  const explosionTimer = useRef<number | null>(null);
  const customTime = useRef(0);

  const handleDoubleClick = (e: any) => {
    e.stopPropagation();
    // Restart animation counter securely without dealing with external clock polling inconsistencies
    explosionTimer.current = 0;
  };

  // Dedicated hardware GLSL material setup
  const nebulaMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector3(0, 0, 0) },
        uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
        uExplosionProgress: { value: 0.0 }
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false, // Core essential for realistic additive blending overlap
      vertexColors: true
    });
  }, []);

  // Algorithmically predefine the cosmic spatial clusters during mount
  const { positions, colors, scales } = useMemo(() => {
    const count = 15000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sca = new Float32Array(count);

    const colorInside = new THREE.Color("#ec4899"); // Saturated pink-500 core
    const colorOutside = new THREE.Color("#8b5cf6"); // Saturated violet-500 periphery
    
    const branches = 4;
    const radius = 4.5;
    const spin = 1.2;
    const randomness = 0.5;
    const randomnessPower = 3;

    for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const r = Math.random() * radius;
        const branchAngle = ((i % branches) / branches) * Math.PI * 2;
        const spinAngle = r * spin;

        // Mathematical cluster randomization keeping shape cohesion
        const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;
        const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;
        const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;

        // Extrude core Z height explicitly for dense 3D visual feeling
        const bulge = r < 1.0 ? (1.0 - r) * 0.8 * (Math.random() < 0.5 ? 1 : -1) : 0;

        pos[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
        pos[i3 + 1] = randomY * 0.4 + bulge; // Flatten the disk while inflating core
        pos[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

        // Gradient color scaling mathematically mapping to radial orbit
        const mixedColor = colorInside.clone().lerp(colorOutside, r / radius);
        
        // Randomly isolate 2% of the cloud as blistering bright cyan 'stars'
        if (Math.random() > 0.98) {
             mixedColor.set("#0ea5e9");
        }

        col[i3] = mixedColor.r;
        col[i3 + 1] = mixedColor.g;
        col[i3 + 2] = mixedColor.b;

        sca[i] = Math.random() * 0.8 + 0.2;
    }
    
    return { positions: pos, colors: col, scales: sca };
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Secure custom time accumulator logic allows 100% smooth, judder-free dynamic time acceleration
    if (explosionTimer.current !== null) {
       explosionTimer.current += delta;
       const duration = 1.5; // seconds
       
       if (explosionTimer.current <= duration) {
           const progress = explosionTimer.current / duration;
           nebulaMaterial.uniforms.uExplosionProgress.value = progress;
           
           // Accelerate time drastically aligned perfectly to the expansion sine wave multiplier
           const speedBoost = Math.sin(progress * Math.PI) * 20.0;
           customTime.current += delta * (1.0 + speedBoost);
       } else {
           nebulaMaterial.uniforms.uExplosionProgress.value = 0.0;
           explosionTimer.current = null;
           customTime.current += delta;
       }
    } else {
        customTime.current += delta;
    }

    nebulaMaterial.uniforms.uTime.value = customTime.current;
    
    // Smooth frame-rate independent dampening to eliminate twitching
    targetRotation.current.x = THREE.MathUtils.damp(targetRotation.current.x, state.pointer.x * 0.6, 4, delta);
    targetRotation.current.y = THREE.MathUtils.damp(targetRotation.current.y, -state.pointer.y * 0.4, 4, delta);
    
    pointsRef.current.rotation.y = targetRotation.current.x + 0.5; // Tipped tilt geometry
    pointsRef.current.rotation.x = targetRotation.current.y + 0.2; 
    
    // Translating local 2D pointer coordinates accurately into 3D orbital space
    mousePos.current.x = THREE.MathUtils.damp(mousePos.current.x, state.pointer.x * 5, 5, delta);
    mousePos.current.y = THREE.MathUtils.damp(mousePos.current.y, state.pointer.y * 5, 5, delta);
    
    nebulaMaterial.uniforms.uMouse.value.set(
       mousePos.current.x, 
       mousePos.current.y, 
       -2.0 
    );
  });

  return (
    <group position={[2.5, 0.5, -2]} scale={1.2} onDoubleClick={handleDoubleClick}>
      <points ref={pointsRef} material={nebulaMaterial}>
        <bufferGeometry>
          <bufferAttribute 
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute 
            attach="attributes-color"
            args={[colors, 3]}
          />
          <bufferAttribute 
            attach="attributes-aScale"
            args={[scales, 1]}
          />
        </bufferGeometry>
      </points>
      
      {/* Background illumination stabilizing the galaxy color contrast against deep dark UI sections */}
      <pointLight color="#ec4899" intensity={2} distance={8} position={[0, 0, 0]} />
    </group>
  );
}
