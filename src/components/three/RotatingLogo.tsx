
import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text, Box } from "@react-three/drei";
import { MathUtils, Vector3 } from "three";
import { motion } from "framer-motion-3d";
import { useSpring } from "@react-spring/three";

interface RotatingLogoProps {
  position?: [number, number, number];
  interactive?: boolean;
}

const RotatingLogo = ({ position = [0, 0, 0], interactive = true }: RotatingLogoProps) => {
  // Changed to use a more generic React ref, which works with motion.group
  const groupRef = useRef<any>(null);
  const targetRotationY = useRef(0);
  const mouseXOnMouseDown = useRef(0);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const { viewport, mouse } = useThree();
  const windowHalfX = window.innerWidth / 2;

  // Spring animations for smooth movement
  const { scale, rotation } = useSpring({
    scale: clicked ? 1.2 : hovered ? 1.1 : 1,
    rotation: hovered ? [0, Math.PI / 4, 0] : [0, 0, 0],
    config: { mass: 1, tension: 170, friction: 26 }
  });

  useFrame(() => {
    if (!groupRef.current || !interactive) return;

    // Smooth follow mouse position for rotation
    const targetX = (mouse.x * viewport.width) * 0.5;
    targetRotationY.current = (targetX - mouseXOnMouseDown.current) * 0.02;
    
    groupRef.current.rotation.y += (targetRotationY.current - groupRef.current.rotation.y) * 0.1;
    groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.2, 0.1);
    
    // Breathe effect
    const time = Date.now() * 0.001;
    if (!hovered) {
      groupRef.current.position.y = position[1] + Math.sin(time) * 0.1;
    }
  });

  // Mouse handlers for interactive elements
  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => setHovered(false);
  const handleClick = () => setClicked(!clicked);

  return (
    <motion.group 
      ref={groupRef} 
      position={new Vector3(...position)} 
      animate={{
        y: hovered ? position[1] + 0.3 : position[1],
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {/* N Cube with reactive animation */}
      <motion.group 
        position={[-2, 0, 0]}
        animate={{
          rotateY: hovered ? Math.PI : 0,
          z: hovered ? 0.5 : 0
        }}
        transition={{ duration: 0.8 }}
      >
        <Box args={[1, 1, 1]} castShadow receiveShadow>
          <meshPhysicalMaterial 
            color={hovered ? "#ff5a6e" : "#ea384c"} 
            roughness={0.3} 
            metalness={0.8}
            clearcoat={0.5}
            clearcoatRoughness={0.1}
          />
        </Box>
        <Text
          position={[0, 0, 0.6]}
          fontSize={0.8}
          color="white"
          anchorX="center"
          anchorY="middle"
          castShadow
        >
          N
        </Text>
      </motion.group>

      {/* Main text with hover animation */}
      <motion.group
        animate={{
          z: hovered ? 0.3 : 0
        }}
      >
        <Text
          position={[1, 0, 0]}
          fontSize={1.2}
          color={hovered ? "#ff5a6e" : "#ea384c"}
          anchorX="center"
          anchorY="middle"
          castShadow
        >
          NUEVANEX
        </Text>
      </motion.group>

      {/* Background plane with slight glow */}
      <mesh position={[0, 0, -0.5]} rotation={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 3]} />
        <meshStandardMaterial 
          color="#1a1a2e" 
          emissive={hovered ? "#2a2a4e" : "#1a1a2e"} 
          emissiveIntensity={hovered ? 0.4 : 0.2} 
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Glowing particles around logo when hovered */}
      {hovered && (
        <group>
          {[...Array(8)].map((_, i) => (
            <motion.mesh 
              key={i}
              position={[
                Math.cos(i / 8 * Math.PI * 2) * 3,
                Math.sin(i / 8 * Math.PI * 2) * 1.2,
                0
              ]}
              animate={{
                scale: [0.1, 0.2, 0.1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            >
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial 
                color="#ea384c" 
                emissive="#ea384c"
                emissiveIntensity={1}
                transparent
                opacity={0.8}
              />
            </motion.mesh>
          ))}
        </group>
      )}
    </motion.group>
  );
};

export default RotatingLogo;
