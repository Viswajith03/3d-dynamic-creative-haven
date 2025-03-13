
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Box } from "@react-three/drei";
import { Group, MathUtils } from "three";

interface RotatingLogoProps {
  position?: [number, number, number];
}

const RotatingLogo = ({ position = [0, 0, 0] }: RotatingLogoProps) => {
  const groupRef = useRef<Group>(null);
  const targetRotationY = useRef(0);
  const mouseXOnMouseDown = useRef(0);
  const windowHalfX = window.innerWidth / 2;

  useFrame(({ mouse }) => {
    if (!groupRef.current) return;

    // Smooth follow mouse position for rotation
    const targetX = (mouse.x * windowHalfX) * 0.5;
    targetRotationY.current = (targetX - mouseXOnMouseDown.current) * 0.02;
    
    groupRef.current.rotation.y += (targetRotationY.current - groupRef.current.rotation.y) * 0.1;
    groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.2, 0.1);
  });

  return (
    <group ref={groupRef} position={position}>
      {/* N Cube */}
      <group position={[-2, 0, 0]}>
        <Box args={[1, 1, 1]}>
          <meshStandardMaterial color="#ea384c" roughness={0.3} metalness={0.8} />
        </Box>
        <Text
          position={[0, 0, 0.6]}
          fontSize={0.8}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          N
        </Text>
      </group>

      {/* Main text */}
      <Text
        position={[1, 0, 0]}
        fontSize={1.2}
        color="#ea384c"
        anchorX="center"
        anchorY="middle"
      >
        NUEVANEX
      </Text>

      {/* Background plane with slight glow */}
      <mesh position={[0, 0, -0.5]} rotation={[0, 0, 0]}>
        <planeGeometry args={[10, 3]} />
        <meshStandardMaterial 
          color="#1a1a2e" 
          emissive="#1a1a2e" 
          emissiveIntensity={0.2} 
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
};

export default RotatingLogo;
