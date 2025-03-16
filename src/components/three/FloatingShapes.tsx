
import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Box, Torus, Dodecahedron } from "@react-three/drei";
import { Vector3, Mesh, MathUtils } from "three";
import { motion } from "framer-motion-3d";

interface ShapeProps {
  position: [number, number, number];
  shape: "sphere" | "box" | "torus" | "dodecahedron";
  color: string;
  speed: number;
  rotationSpeed: number;
  scale: number;
  interactive?: boolean;
}

const Shape = ({ position, shape, color, speed, rotationSpeed, scale, interactive = true }: ShapeProps) => {
  const ref = useRef<Mesh>(null);
  const initialPos = useMemo(() => new Vector3(...position), [position]);
  const randomOffset = useMemo(() => Math.random() * 1000, []);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Handle hover and click interactions
  const handlePointerOver = () => interactive && setHovered(true);
  const handlePointerOut = () => interactive && setHovered(false);
  const handleClick = () => interactive && setClicked(!clicked);

  useFrame((state) => {
    if (!ref.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Don't animate if clicked
    if (!clicked) {
      // Floating animation
      ref.current.position.y = initialPos.y + Math.sin(time * speed + randomOffset) * 0.5;
      
      // Rotation
      ref.current.rotation.x += 0.005 * rotationSpeed;
      ref.current.rotation.y += 0.01 * rotationSpeed;
    }
  });

  // Determine the color based on interaction state
  const currentColor = hovered ? "#ea384c" : color;
  const currentEmissive = hovered ? 0.5 : 0;
  const currentScale = clicked ? scale * 1.5 : hovered ? scale * 1.2 : scale;

  // Common material properties
  const materialProps = {
    color: currentColor,
    roughness: 0.3,
    metalness: 0.6,
    emissive: hovered ? "#ea384c" : "black",
    emissiveIntensity: currentEmissive,
    transparent: true,
    opacity: 0.9,
  };

  // Apply interactive properties to all shapes
  const interactiveProps = {
    ref: ref,
    position: position,
    onClick: handleClick,
    onPointerOver: handlePointerOver,
    onPointerOut: handlePointerOut,
    scale: currentScale,
    castShadow: true,
    receiveShadow: true,
  };

  if (shape === "sphere") {
    return (
      <motion.group
        animate={{
          rotateZ: hovered ? Math.PI * 2 : 0
        }}
        transition={{ duration: 1.5 }}
      >
        <Sphere args={[1, 32, 32]} {...interactiveProps}>
          <meshPhysicalMaterial 
            {...materialProps} 
            clearcoat={0.5}
            clearcoatRoughness={0.1}
          />
        </Sphere>
      </motion.group>
    );
  } else if (shape === "box") {
    return (
      <motion.group
        animate={{
          rotateX: hovered ? Math.PI : 0,
          rotateY: hovered ? Math.PI : 0
        }}
        transition={{ duration: 1.5 }}
      >
        <Box args={[1, 1, 1]} {...interactiveProps}>
          <meshPhysicalMaterial 
            {...materialProps} 
            clearcoat={0.3}
            clearcoatRoughness={0.2}
          />
        </Box>
      </motion.group>
    );
  } else if (shape === "torus") {
    return (
      <motion.group
        animate={{
          rotateY: hovered ? Math.PI * 2 : 0
        }}
        transition={{ duration: 1.5 }}
      >
        <Torus args={[1.5, 0.5, 16, 32]} {...interactiveProps}>
          <meshPhysicalMaterial 
            {...materialProps} 
            clearcoat={0.7}
            clearcoatRoughness={0.1}
          />
        </Torus>
      </motion.group>
    );
  } else {
    return (
      <motion.group
        animate={{
          rotateZ: hovered ? Math.PI * 2 : 0,
          rotateX: hovered ? Math.PI : 0
        }}
        transition={{ duration: 1.5 }}
      >
        <Dodecahedron args={[1]} {...interactiveProps}>
          <meshPhysicalMaterial 
            {...materialProps} 
            clearcoat={0.5}
            clearcoatRoughness={0.1}
          />
        </Dodecahedron>
      </motion.group>
    );
  }
};

interface FloatingShapesProps {
  count?: number;
  interactive?: boolean;
}

const FloatingShapes = ({ count = 10, interactive = true }: FloatingShapesProps) => {
  const shapes: ShapeProps[] = useMemo(() => {
    const result: ShapeProps[] = [];
    const shapeTypes: Array<"sphere" | "box" | "torus" | "dodecahedron"> = ["sphere", "box", "torus", "dodecahedron"];
    const colors = ["#ea384c", "#ffffff", "#1a1a2e", "#c8c8c9"];
    
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
        scale: MathUtils.randFloat(0.1, 0.5),
        interactive
      });
    }
    
    return result;
  }, [count, interactive]);

  return (
    <>
      {shapes.map((shapeProps, i) => (
        <Shape key={i} {...shapeProps} />
      ))}
    </>
  );
};

export default FloatingShapes;
