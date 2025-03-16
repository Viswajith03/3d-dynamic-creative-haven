
import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Text, RoundedBox, MeshDistortMaterial } from "@react-three/drei";
import { Group, MathUtils } from "three";
import { motion } from "framer-motion-3d";

interface ParallaxModelProps {
  interactive?: boolean;
}

const ParallaxModel = ({ interactive = true }: ParallaxModelProps) => {
  const groupRef = useRef<Group>(null);
  const { viewport, mouse } = useThree();
  const [hovered, setHovered] = useState(false);
  
  // Mouse parallax effect
  useFrame(() => {
    if (!groupRef.current || !interactive) return;
    
    // Calculate target position based on mouse
    const targetX = mouse.x * 0.5;
    const targetY = mouse.y * 0.3;
    
    // Smooth interpolation for parallax effect
    groupRef.current.rotation.y = MathUtils.lerp(
      groupRef.current.rotation.y,
      targetX,
      0.05
    );
    groupRef.current.rotation.x = MathUtils.lerp(
      groupRef.current.rotation.x,
      -targetY,
      0.05
    );
  });

  return (
    <motion.group
      ref={groupRef}
      position={[0, 0, 0]}
      initial={{ scale: 0, rotateZ: -10 }}
      animate={{ scale: 1, rotateZ: 0 }}
      transition={{ duration: 1, type: "spring" }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main feature object */}
      <motion.group
        position={[0, 0, 0]}
        animate={{
          y: hovered ? 0.2 : 0,
          rotateZ: hovered ? 0.05 : 0
        }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        <RoundedBox args={[4, 2, 0.2]} radius={0.2} smoothness={4} castShadow>
          <MeshDistortMaterial
            color="#ea384c"
            roughness={0.1}
            metalness={0.8}
            distort={hovered ? 0.2 : 0}
            speed={2}
          />
        </RoundedBox>
        
        <Text
          position={[0, 0, 0.15]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          castShadow
        >
          NUEVANEX
        </Text>
      </motion.group>

      {/* Orbiting elements */}
      {[...Array(5)].map((_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        const radius = 3;
        
        return (
          <motion.group
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius,
              -1
            ]}
            animate={{
              z: hovered ? -0.5 : -1,
              scale: hovered ? 1.2 : 1
            }}
            transition={{ 
              duration: 0.8, 
              delay: i * 0.1
            }}
          >
            <RoundedBox args={[0.8, 0.8, 0.1]} radius={0.1} smoothness={4} castShadow>
              <meshPhysicalMaterial
                color="#1a1a2e"
                roughness={0.2}
                metalness={0.8}
                emissive={hovered ? "#5a1a2e" : "#1a1a2e"}
                emissiveIntensity={hovered ? 0.5 : 0.2}
                clearcoat={0.5}
                clearcoatRoughness={0.1}
              />
            </RoundedBox>
          </motion.group>
        );
      })}

      {/* Background glow */}
      <motion.mesh
        position={[0, 0, -2]}
        animate={{
          scale: hovered ? [1, 1.1, 1] : 1
        }}
        transition={{
          duration: 2,
          repeat: hovered ? Infinity : 0,
          repeatType: "reverse"
        }}
      >
        <planeGeometry args={[10, 6]} />
        <meshBasicMaterial
          color="#1a1a2e"
          opacity={0.5}
          transparent
          toneMapped={false}
        />
      </motion.mesh>
    </motion.group>
  );
};

export default ParallaxModel;
