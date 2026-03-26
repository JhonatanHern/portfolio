import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const GALAXY_PARAMS = {
  countPoints: 4000,
  countTetra: 500,
  countBoxes: 500,
  countOcta: 300,
  radius: 8,
  branches: 3,
  spin: 1.5,
  randomness: 0.2,
  randomnessPower: 3,
  insideColor: '#4A148C',
  outsideColor: '#c026d3',
};

function generateParticleData(count: number, sizeMultiplier: number = 1) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const rotations = new Float32Array(count * 3);

  const colorInside = new THREE.Color(GALAXY_PARAMS.insideColor);
  const colorOutside = new THREE.Color(GALAXY_PARAMS.outsideColor);
  const colorViolet = new THREE.Color('#6A1B9A');

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const radius = Math.random() * GALAXY_PARAMS.radius;
    const spinAngle = radius * GALAXY_PARAMS.spin;
    const branchAngle = ((i % GALAXY_PARAMS.branches) / GALAXY_PARAMS.branches) * Math.PI * 2;

    const randomX = Math.pow(Math.random(), GALAXY_PARAMS.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * GALAXY_PARAMS.randomness * radius;
    const randomY = Math.pow(Math.random(), GALAXY_PARAMS.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * GALAXY_PARAMS.randomness * radius;
    const randomZ = Math.pow(Math.random(), GALAXY_PARAMS.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * GALAXY_PARAMS.randomness * radius;

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
    positions[i3 + 1] = randomY * 0.5; // Flatten the galaxy a bit on Y
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

    // Mix colors based on distance from center
    const colorMix = colorInside.clone();
    colorMix.lerp(colorOutside, radius / GALAXY_PARAMS.radius);
    
    // Randomly inject violet accents
    if (Math.random() > 0.8) {
      colorMix.lerp(colorViolet, 0.8);
    }

    colors[i3] = colorMix.r;
    colors[i3 + 1] = colorMix.g;
    colors[i3 + 2] = colorMix.b;

    // Basic scales and rotations for complex geometries
    scales[i] = (Math.random() * 0.5 + 0.5) * sizeMultiplier;
    rotations[i3] = Math.random() * Math.PI;
    rotations[i3 + 1] = Math.random() * Math.PI;
    rotations[i3 + 2] = Math.random() * Math.PI;
  }

  return { positions, colors, scales, rotations };
}

export function Galaxy() {
  const groupRef = useRef<THREE.Group>(null!);
  const pointsRef = useRef<THREE.Points>(null!);
  const tetraMeshRef = useRef<THREE.InstancedMesh>(null!);
  const boxMeshRef = useRef<THREE.InstancedMesh>(null!);
  const octaMeshRef = useRef<THREE.InstancedMesh>(null!);

  const pointsData = useMemo(() => generateParticleData(GALAXY_PARAMS.countPoints, 1), []);
  const tetraData = useMemo(() => generateParticleData(GALAXY_PARAMS.countTetra, 0.15), []);
  const boxData = useMemo(() => generateParticleData(GALAXY_PARAMS.countBoxes, 0.12), []);
  const octaData = useMemo(() => generateParticleData(GALAXY_PARAMS.countOcta, 0.18), []);

  useEffect(() => {
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();

    const applyData = (mesh: THREE.InstancedMesh | null, data: ReturnType<typeof generateParticleData>, count: number) => {
      if (!mesh) return;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        dummy.position.set(data.positions[i3], data.positions[i3+1], data.positions[i3+2]);
        dummy.rotation.set(data.rotations[i3], data.rotations[i3+1], data.rotations[i3+2]);
        dummy.scale.set(data.scales[i], data.scales[i], data.scales[i]);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        
        color.setRGB(data.colors[i3], data.colors[i3+1], data.colors[i3+2]);
        mesh.setColorAt(i, color);
      }
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    };

    applyData(tetraMeshRef.current, tetraData, GALAXY_PARAMS.countTetra);
    applyData(boxMeshRef.current, boxData, GALAXY_PARAMS.countBoxes);
    applyData(octaMeshRef.current, octaData, GALAXY_PARAMS.countOcta);
  }, [tetraData, boxData, octaData]);

  useFrame((state) => {
    if (groupRef.current) {
      // Constant slow Y-axis rotation and breathing effect on scale
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
      groupRef.current.scale.set(scale, scale, scale);

      // Keep all geometric sub-groups rotating strictly on the Y-axis (the flat galactic plane)
      // They spin slightly faster/slower than the parent group for dynamic parallax, but stay on the same plane
      if (tetraMeshRef.current) tetraMeshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      if (boxMeshRef.current) boxMeshRef.current.rotation.y = state.clock.elapsedTime * -0.01;
      if (octaMeshRef.current) octaMeshRef.current.rotation.y = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Dusty Points Baseline */}
      <Points ref={pointsRef} positions={pointsData.positions} colors={pointsData.colors} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          opacity={0.2}
          vertexColors
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Shard-like Tetrahedrons (Wireframe mode for technical feel) */}
      <instancedMesh ref={tetraMeshRef} args={[null as any, null as any, GALAXY_PARAMS.countTetra]} frustumCulled={false}>
        <tetrahedronGeometry args={[1, 0]} />
        <meshBasicMaterial toneMapped={false} wireframe opacity={0.15} transparent />
      </instancedMesh>

      {/* Scattered Tech Cubes */}
      <instancedMesh ref={boxMeshRef} args={[null as any, null as any, GALAXY_PARAMS.countBoxes]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial toneMapped={false} transparent opacity={0.15} />
      </instancedMesh>

      {/* Glowing Jewel-like Octahedrons */}
      <instancedMesh ref={octaMeshRef} args={[null as any, null as any, GALAXY_PARAMS.countOcta]} frustumCulled={false}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial toneMapped={false} transparent opacity={0.2} blending={THREE.AdditiveBlending} />
      </instancedMesh>
    </group>
  );
}
