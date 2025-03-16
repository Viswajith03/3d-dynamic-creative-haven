
import * as React from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { cardVariants } from "@/utils/animationVariants"

export interface MotionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number
  children: React.ReactNode
  parallax?: boolean
}

export const MotionCard = React.forwardRef<HTMLDivElement, MotionCardProps>(
  ({ className, children, delay = 0, parallax = false, ...props }, ref) => {
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
        whileInView="visible"
        whileHover="hover"
        viewport={{ once: true, margin: "-100px" }}
        variants={cardVariants}
        custom={delay}
        transition={{ delay: delay * 0.2 }}
        className="h-full"
        style={parallax ? {
          transform: `perspective(1000px) rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * -10}deg)`,
          transformStyle: "preserve-3d"
        } : {}}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
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
