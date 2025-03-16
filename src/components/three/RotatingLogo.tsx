
import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text, Box, useTexture } from "@react-three/drei";
import { Group, MathUtils, Vector3 } from "three";
import * as THREE from "three";

interface RotatingLogoProps {
  position?: [number, number, number];
}

const RotatingLogo = ({ position = [0, 0, 0] }: RotatingLogoProps) => {
  const groupRef = useRef<Group>(null);
  const { viewport, mouse } = useThree();
  const targetRotationY = useRef(0);
  const mouseXOnMouseDown = useRef(0);
  const windowHalfX = window.innerWidth / 2;
  const [hovered, setHovered] = useState(false);
  
  // Add lighting for more visual interest
  const lightRef = useRef<THREE.PointLight>(null);
  
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Enhanced smooth follow mouse position for rotation
    const targetX = (mouse.x * windowHalfX) * 0.5;
    targetRotationY.current = (targetX - mouseXOnMouseDown.current) * 0.02;
    
    // Apply smoother rotation with mouse
    groupRef.current.rotation.y += (targetRotationY.current - groupRef.current.rotation.y) * 0.1;
    groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.3, 0.1);
    
    // Add subtle breathing animation
    const breathingScale = 1 + Math.sin(state.clock.elapsedTime) * 0.02;
    groupRef.current.scale.set(breathingScale, breathingScale, breathingScale);
    
    // Add floating effect
    groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    
    // Animate the light for subtle glow effect
    if (lightRef.current) {
      lightRef.current.intensity = 0.8 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      
      // Light follows a circular path around the logo
      const lightRadius = 2;
      const lightAngle = state.clock.elapsedTime * 0.5;
      lightRef.current.position.x = Math.cos(lightAngle) * lightRadius;
      lightRef.current.position.z = Math.sin(lightAngle) * lightRadius;
    }
  });

  return (
    <group 
      ref={groupRef} 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Dynamic point light */}
      <pointLight 
        ref={lightRef}
        position={[2, 1, 0]} 
        intensity={0.8}
        color="#ea384c"
        distance={5}
      />
      
      {/* N Cube with enhanced visuals */}
      <group position={[-2, 0, 0]}>
        <Box 
          args={[1, 1, 1]}
          scale={hovered ? 1.1 : 1}
        >
          <meshStandardMaterial 
            color="#ea384c" 
            roughness={0.2} 
            metalness={0.9} 
            emissive="#ea384c"
            emissiveIntensity={hovered ? 0.4 : 0.1}
          />
        </Box>
        <Text
          position={[0, 0, 0.6]}
          fontSize={0.8}
          color="white"
          anchorX="center"
          anchorY="middle"
          scale={hovered ? 1.1 : 1}
        >
          N
        </Text>
      </group>

      {/* Main text with enhanced visuals */}
      <Text
        position={[1, 0, 0]}
        fontSize={1.2}
        color="#ea384c"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
        scale={hovered ? 1.05 : 1}
      >
        NUEVANEX
      </Text>

      {/* Enhanced background plane with better glow */}
      <mesh position={[0, 0, -0.5]} rotation={[0, 0, 0]}>
        <planeGeometry args={[10, 3]} />
        <meshStandardMaterial 
          color="#1a1a2e" 
          emissive="#1a1a2e" 
          emissiveIntensity={hovered ? 0.5 : 0.2} 
          transparent
          opacity={0.85}
        />
      </mesh>
      
      {/* Add subtle particles around the logo */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh 
          key={i} 
          position={[
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 2
          ]}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial 
            color="#ea384c" 
            emissive="#ea384c"
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
};

export default RotatingLogo;
