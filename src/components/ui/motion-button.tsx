
import * as React from "react"
import { motion } from "framer-motion"
import { Button, ButtonProps } from "@/components/ui/button"
import { ctaButton, secondaryButton } from "@/utils/animationVariants"

export interface MotionButtonProps extends ButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  animationVariant?: "cta" | "secondary"
  children: React.ReactNode
}

export const MotionButton = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className, variant, animationVariant = "cta", children, ...props }, ref) => {
    const variants = animationVariant === "cta" ? ctaButton : secondaryButton;
    
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
        variants={variants}
        className="inline-block"
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
