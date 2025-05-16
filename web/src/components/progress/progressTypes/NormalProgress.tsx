import { DEFAULT_THEME, MantineColor } from "@mantine/core";
import { motion } from "framer-motion";

interface NormalProgressProps {
  progress: number;
  color: MantineColor;
}

const NormalProgress = ({ progress, color }: NormalProgressProps) => {
  return (
    <div className="h-[0.9rem] relative w-full flex items-center">
      <div
        className="h-[0.5rem] rounded-md w-full relative overflow-hidden"
        style={{
          backgroundColor: DEFAULT_THEME.colors.dark[7],
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: DEFAULT_THEME.colors[color][7],
            opacity: 0.2,
          }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundColor: DEFAULT_THEME.colors[color][4],
            originX: 0,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};

export default NormalProgress;
