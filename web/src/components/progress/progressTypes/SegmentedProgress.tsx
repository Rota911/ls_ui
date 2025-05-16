import { DEFAULT_THEME, MantineColor } from "@mantine/core";
import { motion } from "framer-motion";

interface SegmentedProgressProps {
  progress: number;
  color: MantineColor;
  segments?: number;
}

const SegmentedProgress = ({
  progress,
  color,
  segments = 30,
}: SegmentedProgressProps) => {
  return (
    <div className="flex items-center gap-1.5 w-full h-[0.9rem]">
      {Array.from({ length: segments }).map((_, i) => {
        const segmentProgress = (100 / segments) * (i + 1);
        const isActive = progress >= segmentProgress;

        return (
          <motion.div key={i} className="h-full flex-1">
            <motion.div
              className="w-full h-full rounded-sm rotate-25 relative"
              style={{
                backgroundColor: DEFAULT_THEME.colors.dark[7],
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-sm"
                style={{
                  backgroundColor: DEFAULT_THEME.colors[color][4],
                }}
                initial={{ opacity: 0.2 }}
                animate={{
                  opacity: isActive ? 1 : 0.2,
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SegmentedProgress;
