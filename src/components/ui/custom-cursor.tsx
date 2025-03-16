
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CustomCursorProps {
  className?: string;
}

export const CustomCursor = ({ className }: CustomCursorProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Handle cursor movement
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Update visibility after a short delay to allow for initial positioning
      if (!isVisible && e.clientX !== 0 && e.clientY !== 0) {
        setTimeout(() => setIsVisible(true), 100);
      }
    };

    // Check if cursor is over clickable elements
    const updateCursorType = () => {
      const hoveredElement = document.elementFromPoint(position.x, position.y);
      if (hoveredElement) {
        const computedStyle = window.getComputedStyle(hoveredElement);
        setIsPointer(computedStyle.cursor === "pointer");
      }
    };

    // Handle cursor active state on mouse down
    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);

    // Handle cursor entering/leaving window
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => {
      if (position.x !== 0 && position.y !== 0) {
        setIsVisible(true);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", updateCursorType);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", updateCursorType);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [position.x, position.y, isVisible]);

  // Hide native cursor when our custom cursor is active
  useEffect(() => {
    document.body.style.cursor = isVisible ? "none" : "auto";
    
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      ref={cursorRef}
      className={cn(
        "fixed pointer-events-none z-50 transition-opacity duration-300", 
        className
      )}
      animate={{
        opacity: isVisible ? 1 : 0,
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 300,
        mass: 0.5,
      }}
    >
      {/* Main cursor */}
      <motion.div
        className={cn(
          "absolute top-0 left-0 flex items-center justify-center",
          "w-8 h-8 -ml-4 -mt-4 rounded-full bg-nuevanex-red/30 border border-nuevanex-red",
          isPointer && "bg-nuevanex-red/50",
          isActive && "scale-90 bg-nuevanex-red/80"
        )}
        animate={{
          scale: isPointer ? 1.2 : 1,
          borderRadius: isPointer ? "0.5rem" : "9999px",
        }}
        transition={{ duration: 0.2 }}
      >
        {isPointer && (
          <span className="text-[8px] text-white font-bold">Click</span>
        )}
      </motion.div>

      {/* Cursor dot */}
      <motion.div 
        className={cn(
          "absolute top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-nuevanex-red",
          isActive && "scale-150"
        )}
        animate={{
          scale: isActive ? 1.5 : 1,
        }}
        transition={{ duration: 0.1 }}
      />
    </motion.div>
  );
};
