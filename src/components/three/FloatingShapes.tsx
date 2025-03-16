
import { useRef, useMemo, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Sphere, Box, Torus, useTexture } from "@react-three/drei";
import { Vector3, Mesh, MathUtils, Object3D } from "three";
import * as THREE from "three";

interface ShapeProps {
  position: [number, number, number];
  shape: "sphere" | "box" | "torus" | "pyramid";
  color: string;
  speed: number;
  rotationSpeed: number;
  scale: number;
}

const Shape = ({ position, shape, color, speed, rotationSpeed, scale }: ShapeProps) => {
  const ref = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { mouse, viewport } = useThree();
  
  const initialPos = useMemo(() => new Vector3(...position), [position]);
  const randomOffset = useMemo(() => Math.random() * 1000, []);
  const pyramidGeometry = useMemo(() => {
    if (shape === "pyramid") {
      const geo = new THREE.ConeGeometry(scale, scale * 2, 4);
      return geo;
    }
    return null;
  }, [shape, scale]);

  useFrame((state) => {
    if (!ref.current) return;
    
    // Advanced floating animation with wave pattern
    const time = state.clock.getElapsedTime();
    ref.current.position.y = initialPos.y + Math.sin(time * speed + randomOffset) * 0.5;
    ref.current.position.x = initialPos.x + Math.cos(time * speed * 0.5 + randomOffset) * 0.3;
    
    // Interactive rotation - affected by mouse position
    const mouseInfluence = 0.0005;
    ref.current.rotation.x += 0.005 * rotationSpeed + mouse.y * mouseInfluence;
    ref.current.rotation.y += 0.01 * rotationSpeed + mouse.x * mouseInfluence;
    
    // Apply scale change when hovered
    const targetScale = hovered ? scale * 1.2 : scale;
    ref.current.scale.lerp(new Vector3(targetScale, targetScale, targetScale), 0.1);
    
    // Add subtle pulsing effect
    const pulseScale = 1 + Math.sin(time * 2) * 0.05;
    ref.current.scale.multiplyScalar(pulseScale);
  });

  // Enhanced material properties based on shape
  const getMaterial = () => {
    const baseMaterial = {
      color,
      roughness: hovered ? 0.1 : 0.3,
      metalness: hovered ? 0.9 : 0.7,
      emissive: color,
      emissiveIntensity: hovered ? 0.3 : 0.1,
    };
    
    return <meshStandardMaterial {...baseMaterial} />;
  };

  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => setHovered(false);

  if (shape === "sphere") {
    return (
      <Sphere 
        ref={ref} 
        args={[scale, 32, 32]} 
        position={position}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {getMaterial()}
      </Sphere>
    );
  } else if (shape === "box") {
    return (
      <Box 
        ref={ref} 
        args={[scale, scale, scale]} 
        position={position}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {getMaterial()}
      </Box>
    );
  } else if (shape === "pyramid") {
    return (
      <mesh 
        ref={ref} 
        geometry={pyramidGeometry!} 
        position={position}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {getMaterial()}
      </mesh>
    );
  } else {
    return (
      <Torus 
        ref={ref} 
        args={[scale * 1.5, scale * 0.5, 32, 64]} 
        position={position}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {getMaterial()}
      </Torus>
    );
  }
};

interface FloatingShapesProps {
  count?: number;
  interactive?: boolean;
}

const FloatingShapes = ({ count = 10, interactive = true }: FloatingShapesProps) => {
  const { mouse, viewport } = useThree();
  const groupRef = useRef<Object3D>(null);
  
  // Enhanced shape variants
  const shapes: ShapeProps[] = useMemo(() => {
    const result: ShapeProps[] = [];
    const shapeTypes: Array<"sphere" | "box" | "torus" | "pyramid"> = ["sphere", "box", "torus", "pyramid"];
    const colors = ["#ea384c", "#ffffff", "#1a1a2e", "#c8c8c9", "#ff9800", "#2196f3"];
    
    for (let i = 0; i < count; i++) {
      result.push({
        position: [
          MathUtils.randFloatSpread(20),
          MathUtils.randFloatSpread(20),
          MathUtils.randFloatSpread(10) - 5
        ],
        shape: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: MathUtils.randFloat(0.1, 0.5),
        rotationSpeed: MathUtils.randFloat(0.5, 2),
        scale: MathUtils.randFloat(0.1, 0.5)
      });
    }
    
    return result;
  }, [count]);

  // Global group movement based on mouse for parallax effect
  useFrame(() => {
    if (groupRef.current && interactive) {
      // Subtle parallax effect
      groupRef.current.rotation.x = MathUtils.lerp(
        groupRef.current.rotation.x,
        mouse.y * 0.1,
        0.05
      );
      groupRef.current.rotation.y = MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.1,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      {shapes.map((shapeProps, i) => (
        <Shape key={i} {...shapeProps} />
      ))}
    </group>
  );
};

export default FloatingShapes;
