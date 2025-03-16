
import * as React from "react"
import { motion } from "framer-motion"
import { Button, ButtonProps } from "@/components/ui/button"
import { ctaButton, secondaryButton } from "@/utils/animationVariants"

export interface MotionButtonProps extends ButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  animationVariant?: "cta" | "secondary"
  children: React.ReactNode
  parallax?: boolean
}

export const MotionButton = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className, variant, animationVariant = "cta", children, parallax = false, ...props }, ref) => {
    const variants = animationVariant === "cta" ? ctaButton : secondaryButton;
    
    // Add parallax effect for 3D-like motion
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
    
    const handleMouseMove = (e: React.MouseEvent) => {
      if (!parallax) return;
      
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      setMousePosition({ x, y });
    };
    
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
        variants={variants}
        className="inline-block"
        style={parallax ? {
          transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * -5}deg)`
        } : {}}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
      >
        <Button
          className={className}
          variant={variant}
          ref={ref}
          {...props}
        >
          {children}
        </Button>
      </motion.div>
    )
  }
)

MotionButton.displayName = "MotionButton"
