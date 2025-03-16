
import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardProps } from "@/components/ui/card"
import { cardVariants } from "@/utils/animationVariants"

export interface MotionCardProps extends CardProps {
  delay?: number
  children: React.ReactNode
}

export const MotionCard = React.forwardRef<HTMLDivElement, MotionCardProps>(
  ({ className, children, delay = 0, ...props }, ref) => {
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
