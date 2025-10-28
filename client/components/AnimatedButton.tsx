import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { forwardRef, ButtonHTMLAttributes } from "react";

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
  children: React.ReactNode;
  animate?: boolean;
}

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, animate = true, ...props }, ref) => {
    return (
      <motion.div
        whileHover={animate ? { scale: 1.05 } : {}}
        whileTap={animate ? { scale: 0.95 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Button ref={ref} {...props}>
          <motion.span
            initial={{ opacity: 1 }}
            whileHover={animate ? { letterSpacing: "0.05em" } : {}}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.span>
        </Button>
      </motion.div>
    );
  },
);

AnimatedButton.displayName = "AnimatedButton";

export { AnimatedButton };
