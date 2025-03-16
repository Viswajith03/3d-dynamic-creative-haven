
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  Stars, 
  useProgress,
  Html
} from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { useIsMobile } from "@/hooks/use-mobile";
import FloatingShapes from "./FloatingShapes";
import RotatingLogo from "./RotatingLogo";

// Loading screen while 3D assets initialize
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-white text-lg flex flex-col items-center">
        <div className="w-40 h-2 bg-gray-800 rounded-full mb-2 overflow-hidden">
          <div 
            className="h-full bg-nuevanex-red"
            style={{ width: `${progress}%`, transition: 'width 0.3s ease-out' }}
          />
        </div>
        <span>{progress.toFixed(0)}% loaded</span>
      </div>
    </Html>
  );
}

type SceneProps = {
  type?: "hero" | "background";
  interactive?: boolean;
};

const Scene = ({ type = "hero", interactive = true }: SceneProps) => {
  const canvasRef = useRef(null);
  const isMobile = useIsMobile();
  const [reducedMotion, setReducedMotion] = useState(false);
  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // Determine if we should use enhanced features based on device and preferences
  const useEnhancedFeatures = !isMobile && !reducedMotion;
  
  // Adjust scene content based on device and motion preferences
  const shapeCount = isMobile ? 8 : (type === "background" ? 15 : 20);
  
  return (
    <div 
      className={`canvas-container relative ${
        type === "hero" ? "h-full w-full" : "absolute inset-0 -z-10"
      }`}
    >
      <Canvas
        ref={canvasRef}
        shadows={useEnhancedFeatures}
        dpr={[1, useEnhancedFeatures ? 2 : 1.5]}
        camera={{ position: [0, 0, 10], fov: 50 }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={<Loader />}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          
          {/* Enhanced lighting system */}
          <ambientLight intensity={0.3} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={0.8} 
            castShadow={useEnhancedFeatures}
          />
          <spotLight 
            position={[-10, 10, 5]} 
            intensity={0.5} 
            castShadow={useEnhancedFeatures}
          />
          
          {/* Add some environment effects */}
          {useEnhancedFeatures && (
            <>
              <fog attach="fog" args={['#000', 15, 25]} />
              <Stars 
                radius={50} 
                depth={50} 
                count={type === "background" ? 1000 : 500} 
                factor={4} 
                saturation={0} 
                fade 
                speed={0.5}
              />
            </>
          )}
          
          {/* Content based on type */}
          {type === "hero" ? (
            <RotatingLogo position={[0, 0, 0]} />
          ) : (
            <FloatingShapes 
              count={shapeCount} 
              interactive={interactive && useEnhancedFeatures} 
            />
          )}
          
          {/* Camera controls */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={type === "hero" && interactive}
            autoRotate={type === "background" || !interactive}
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          
          {/* Post-processing effects for enhanced visuals */}
          {useEnhancedFeatures && (
            <EffectComposer>
              <Bloom 
                luminanceThreshold={0.2}
                luminanceSmoothing={0.9}
                intensity={0.3}
              />
              <ChromaticAberration 
                offset={[0.0005, 0.0005]} 
              />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;
