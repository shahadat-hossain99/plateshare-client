import { motion } from "framer-motion";

const SectionTitle = ({
  title,
  subtitle,
  center = false,
  className = "",
  titleClassName = "",
  subtitleClassName = "",
  withAnimation = false,
}) => {
  // Simple fade-in animation wrapper if needed
  const MotionWrapper = withAnimation ? motion.div : "div";
  const animationProps = withAnimation
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.6, ease: "easeOut" },
      }
    : {};

  return (
    <MotionWrapper
      {...animationProps}
      className={`${center ? "text-center" : "text-left"} mb-10 ${className}`}
    >
      {/* 
        Because your globals.css applies 'font-fraunces' to all h2, 
        it will automatically look elegant and premium.
      */}
      <h2
        className={`text-3xl font-bold text-[var(--dark)] md:text-4xl tracking-tight ${titleClassName}`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-3 text-[var(--text-secondary)] max-w-2xl ${center ? "mx-auto" : ""} ${subtitleClassName}`}
        >
          {subtitle}
        </p>
      )}
    </MotionWrapper>
  );
};

export default SectionTitle;
