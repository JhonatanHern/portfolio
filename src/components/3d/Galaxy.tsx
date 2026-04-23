import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { GALAXY_THEME } from './colors';

const GALAXY_PARAMS = {
  countPoints: 2000,
  countTetra: 500,
  countBoxes: 500,
  countOcta: 300,
  radius: 8,
  branches: 3,
  spin: 1.5,
  randomness: 0.2,
  randomnessPower: 3,
};

function generateParticleData(count: number, sizeMultiplier: number = 1, isPoints: boolean = false) {
  const positions = new Float32Array(count * 3);
  const colorsBase = new Float32Array(count * 3);
  const colorsAlt = new Float32Array(count * 3);
  const colorsCurrent = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const rotations = new Float32Array(count * 3);

  const colorInside = new THREE.Color(GALAXY_THEME.main.inside);
  const colorOutside = new THREE.Color(GALAXY_THEME.main.outside);
  const colorAccent = new THREE.Color(GALAXY_THEME.main.accent);

  const colorInsideAlt = new THREE.Color(GALAXY_THEME.alt.inside);
  const colorOutsideAlt = new THREE.Color(GALAXY_THEME.alt.outside);
  const colorAccentAlt = new THREE.Color(GALAXY_THEME.alt.accent);

  const pointsColorMain = GALAXY_THEME.main.points ? new THREE.Color(GALAXY_THEME.main.points) : null;
  const pointsColorAlt = GALAXY_THEME.alt.points ? new THREE.Color(GALAXY_THEME.alt.points) : null;

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
    const colorMixAlt = colorInsideAlt.clone();
    colorMixAlt.lerp(colorOutsideAlt, radius / GALAXY_PARAMS.radius);

    // Randomly inject accents
    const isAccent = Math.random() > 0.8;
    if (isAccent) {
      colorMix.lerp(colorAccent, 0.8);
      colorMixAlt.lerp(colorAccentAlt, 0.8);
    }

    if (isPoints) {
      if (pointsColorMain) {
        const shade = 0.6 + Math.random() * 0.4;
        colorMix.copy(pointsColorMain).multiplyScalar(shade);
      }
      if (pointsColorAlt) {
        const shade = 0.6 + Math.random() * 0.4;
        colorMixAlt.copy(pointsColorAlt).multiplyScalar(shade);
      }
    }

    colorsBase[i3] = colorMix.r;
    colorsBase[i3 + 1] = colorMix.g;
    colorsBase[i3 + 2] = colorMix.b;
    colorsCurrent[i3] = colorMix.r;
    colorsCurrent[i3 + 1] = colorMix.g;
    colorsCurrent[i3 + 2] = colorMix.b;

    colorsAlt[i3] = colorMixAlt.r;
    colorsAlt[i3 + 1] = colorMixAlt.g;
    colorsAlt[i3 + 2] = colorMixAlt.b;

    // Basic scales and rotations for complex geometries
    scales[i] = (Math.random() * 0.5 + 0.5) * sizeMultiplier;
    rotations[i3] = Math.random() * Math.PI;
    rotations[i3 + 1] = Math.random() * Math.PI;
    rotations[i3 + 2] = Math.random() * Math.PI;
  }

  return { positions, colorsBase, colorsAlt, colorsCurrent, scales, rotations };
}

function generateBackgroundStarsData(count: number, innerRadius: number = 12, outerRadius: number = 35) {
  const positions = new Float32Array(count * 3);
  const colorsBase = new Float32Array(count * 3);
  const colorsAlt = new Float32Array(count * 3);
  const colorsCurrent = new Float32Array(count * 3);

  const starColorMain = new THREE.Color(GALAXY_THEME.main.backgroundStars);
  const starColorAlt = new THREE.Color(GALAXY_THEME.alt.backgroundStars);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const r = innerRadius + (outerRadius - innerRadius) * Math.cbrt(Math.random());
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = r * Math.cos(phi);

    const shade = 0.3 + Math.random() * 0.7;

    colorsBase[i3] = starColorMain.r * shade;
    colorsBase[i3 + 1] = starColorMain.g * shade;
    colorsBase[i3 + 2] = starColorMain.b * shade;

    colorsCurrent[i3] = colorsBase[i3];
    colorsCurrent[i3 + 1] = colorsBase[i3 + 1];
    colorsCurrent[i3 + 2] = colorsBase[i3 + 2];

    colorsAlt[i3] = starColorAlt.r * shade;
    colorsAlt[i3 + 1] = starColorAlt.g * shade;
    colorsAlt[i3 + 2] = starColorAlt.b * shade;
  }

  return { positions, colorsBase, colorsAlt, colorsCurrent };
}

export function Galaxy({ isSecurityRoute = false }: { isSecurityRoute?: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const pointsRef = useRef<THREE.Points>(null!);
  const tetraMeshRef = useRef<THREE.InstancedMesh>(null!);
  const boxMeshRef = useRef<THREE.InstancedMesh>(null!);
  const octaMeshRef = useRef<THREE.InstancedMesh>(null!);
  const bgStarsRef = useRef<THREE.Points>(null!);
  const transitionRef = useRef(isSecurityRoute ? 1 : 0);
  const hasInitializedColors = useRef(false);
  const mountTimeRef = useRef(Date.now());

  const pointsData = useMemo(() => generateParticleData(GALAXY_PARAMS.countPoints, 1, true), []);
  const tetraData = useMemo(() => generateParticleData(GALAXY_PARAMS.countTetra, 0.15), []);
  const boxData = useMemo(() => generateParticleData(GALAXY_PARAMS.countBoxes, 0.12), []);
  const octaData = useMemo(() => generateParticleData(GALAXY_PARAMS.countOcta, 0.18), []);
  const bgStarsData = useMemo(() => generateBackgroundStarsData(1500, 15, 60), []);

  useEffect(() => {
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();

    const applyData = (mesh: THREE.InstancedMesh | null, data: ReturnType<typeof generateParticleData>, count: number) => {
      if (!mesh) return;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        dummy.position.set(data.positions[i3], data.positions[i3 + 1], data.positions[i3 + 2]);
        dummy.rotation.set(data.rotations[i3], data.rotations[i3 + 1], data.rotations[i3 + 2]);
        dummy.scale.set(data.scales[i], data.scales[i], data.scales[i]);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);

        color.setRGB(data.colorsBase[i3], data.colorsBase[i3 + 1], data.colorsBase[i3 + 2]);
        mesh.setColorAt(i, color);
      }
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    };

    applyData(tetraMeshRef.current, tetraData, GALAXY_PARAMS.countTetra);
    applyData(boxMeshRef.current, boxData, GALAXY_PARAMS.countBoxes);
    applyData(octaMeshRef.current, octaData, GALAXY_PARAMS.countOcta);
  }, [tetraData, boxData, octaData]);

  useFrame((state, delta) => {
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

    const target = isSecurityRoute ? 1 : 0;
    let needsColorUpdate = false;

    if (transitionRef.current !== target) {
      if (Date.now() - mountTimeRef.current < 300) {
        transitionRef.current = target;
      } else {
        const step = delta / 0.7; // reach in 0.7s
        if (transitionRef.current < target) {
          transitionRef.current = Math.min(1, transitionRef.current + step);
        } else {
          transitionRef.current = Math.max(0, transitionRef.current - step);
        }
      }
      needsColorUpdate = true;
    }

    if (!hasInitializedColors.current) {
      if (tetraMeshRef.current?.instanceColor && boxMeshRef.current?.instanceColor && octaMeshRef.current?.instanceColor) {
        needsColorUpdate = true;
        hasInitializedColors.current = true;
      }
    }
    
    if (needsColorUpdate) {
      const t = transitionRef.current;
      
      if (pointsRef.current && pointsRef.current.geometry.attributes.color) {
        const currentColors = pointsRef.current.geometry.attributes.color.array as Float32Array;
        for (let i = 0; i < currentColors.length; i++) {
          currentColors[i] = pointsData.colorsBase[i] + (pointsData.colorsAlt[i] - pointsData.colorsBase[i]) * t;
        }
        pointsRef.current.geometry.attributes.color.needsUpdate = true;
      }

      if (bgStarsRef.current && bgStarsRef.current.geometry.attributes.color) {
        const bgColors = bgStarsRef.current.geometry.attributes.color.array as Float32Array;
        for (let i = 0; i < bgColors.length; i++) {
          bgColors[i] = bgStarsData.colorsBase[i] + (bgStarsData.colorsAlt[i] - bgStarsData.colorsBase[i]) * t;
        }
        bgStarsRef.current.geometry.attributes.color.needsUpdate = true;
      }

      const updateInstancedColors = (mesh: THREE.InstancedMesh | null, data: ReturnType<typeof generateParticleData>) => {
        if (!mesh || !mesh.instanceColor) return;
        const currentColors = mesh.instanceColor.array as Float32Array;
        for (let i = 0; i < currentColors.length; i++) {
          currentColors[i] = data.colorsBase[i] + (data.colorsAlt[i] - data.colorsBase[i]) * t;
        }
        mesh.instanceColor.needsUpdate = true;
      };

      updateInstancedColors(tetraMeshRef.current, tetraData);
      updateInstancedColors(boxMeshRef.current, boxData);
      updateInstancedColors(octaMeshRef.current, octaData);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Background Starfield */}
      <Points ref={bgStarsRef} positions={bgStarsData.positions} colors={bgStarsData.colorsCurrent} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          opacity={0.3}
          vertexColors
          size={0.1}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Dusty Points Baseline */}
      <Points ref={pointsRef} positions={pointsData.positions} colors={pointsData.colorsCurrent} stride={3} frustumCulled={false}>
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
