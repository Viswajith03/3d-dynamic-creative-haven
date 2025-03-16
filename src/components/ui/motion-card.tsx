
import * as React from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { cardVariants } from "@/utils/animationVariants"

export interface MotionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number
  children: React.ReactNode
  perspective?: boolean
}

export const MotionCard = React.forwardRef<HTMLDivElement, MotionCardProps>(
  ({ className, children, delay = 0, perspective = true, ...props }, ref) => {
    // Enhanced 3D perspective effect for cards
    const perspectiveAnimation = perspective ? {
      perspective: "1200px",
      transformStyle: "preserve-3d",
    } : {};
    
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        viewport={{ once: true, margin: "-100px" }}
        variants={cardVariants}
        custom={delay}
        transition={{ delay: delay * 0.2 }}
        className="h-full"
        style={perspectiveAnimation}
      >
        <Card
          className={className}
          ref={ref}
          {...props}
        >
          {children}
        </Card>
      </motion.div>
    )
  }
)

MotionCard.displayName = "MotionCard"
