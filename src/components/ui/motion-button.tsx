
import * as React from "react"
import { motion } from "framer-motion"
import { Button, ButtonProps } from "@/components/ui/button"
import { ctaButton, secondaryButton } from "@/utils/animationVariants"

export interface MotionButtonProps extends ButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  animationVariant?: "cta" | "secondary"
  children: React.ReactNode
  perspective?: boolean
}

export const MotionButton = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className, variant, animationVariant = "cta", children, perspective = true, ...props }, ref) => {
    const variants = animationVariant === "cta" ? ctaButton : secondaryButton;
    
    // Enhanced 3D perspective effect
    const perspectiveAnimation = perspective ? {
      initial: { 
        perspective: "800px", 
        rotateX: 0, 
        rotateY: 0, 
        scale: 1 
      },
      hover: { 
        rotateX: 3, 
        rotateY: -3, 
        scale: 1.05,
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
        transition: { type: "spring", stiffness: 400, damping: 10 }
      },
    } : {};
    
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
        variants={variants}
        className="inline-block"
        {...perspectiveAnimation}
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
