
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import FloatingShapes from "./FloatingShapes";
import RotatingLogo from "./RotatingLogo";
import ParallaxModel from "./ParallaxModel";

type SceneProps = {
  type?: "hero" | "background" | "product";
  interactive?: boolean;
};

const Scene = ({ type = "hero", interactive = true }: SceneProps) => {
  return (
    <div className="canvas-container w-full h-full">
      <Canvas shadows dpr={[1, 2]}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          <ambientLight intensity={0.5} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1} 
            castShadow
          />
          <spotLight position={[-10, 10, 5]} intensity={0.8} castShadow />
          
          {type === "hero" && (
            <RotatingLogo position={[0, 0, 0]} interactive={interactive} />
          )}
          
          {type === "background" && (
            <FloatingShapes count={15} interactive={interactive} />
          )}
          
          {type === "product" && (
            <ParallaxModel interactive={interactive} />
          )}
          
          <Environment preset="city" />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={interactive && type === "hero"}
            autoRotate={type === "background" || (type === "product" && !interactive)}
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;
