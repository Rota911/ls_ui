import { useEffect, useState } from "react";
import { ProgressProps } from "../../types/progressTypes";
import { getIconComponent } from "../../utils/iconHelper";
import NormalProgress from "./progressTypes/NormalProgress";
import SegmentedProgress from "./progressTypes/SegmentedProgress";
import { DEFAULT_THEME } from "@mantine/core";
import { HorizontalDivider } from "../shared/HorizontalDivider";
import { motion, AnimatePresence } from "framer-motion";

const Progress = ({
  label,
  icon,
  color = "blue",
  duration,
  timerType = "percentage",
  progressType = "normal",
  onComplete,
}: ProgressProps) => {
  const [currentProgress, setCurrentProgress] = useState(0);
  const [showTimer, setShowTimer] = useState(true);
  const IconComponent = icon ? getIconComponent(icon) : null;

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = (elapsedTime / duration) * 100;

      if (newProgress >= 100) {
        clearInterval(interval);
        setShowTimer(false);
        setTimeout(() => {
          onComplete?.();
        }, 300);
      } else {
        setCurrentProgress(newProgress);
      }
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [duration, onComplete]);

  const formatTimer = (value: number) => {
    if (timerType === "seconds") {
      const remainingTime = Math.ceil(((100 - value) * duration) / 100000);
      return `${remainingTime}s`;
    }
    return `${Math.ceil(value)}%`;
  };

  const ProgressComponent =
    progressType === "normal" ? NormalProgress : SegmentedProgress;

  return (
    <div className="w-[25rem] p-2 rounded flex flex-col gap-1 overflow-hidden">
      <div className="flex items-end justify-between gap-2 px-1 rounded relative h-10">
        <div className="flex items-center gap-2 w-3/5 overflow-hidden">
          {IconComponent && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="h-[2.5rem] w-[2.5rem] flex items-center justify-center relative rounded"
                style={{
                  backgroundColor: DEFAULT_THEME.colors.dark[7],
                  border: `0.1rem solid ${DEFAULT_THEME.colors[color][4]}`,
                }}
              >
                <motion.div
                  className="absolute inset-0 flex rounded"
                  style={{
                    backgroundColor: DEFAULT_THEME.colors[color][7],
                    opacity: 0.2,
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.3 }}
                />
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <IconComponent
                    size={25}
                    className="relative z-10"
                    style={{ color: DEFAULT_THEME.colors[color][4] }}
                    stroke={1.5}
                  />
                </motion.div>
              </div>
            </motion.div>
          )}

          {label && (
            <motion.span
              className="font-bold truncate"
              style={{ color: DEFAULT_THEME.colors.gray[3] }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {label}
            </motion.span>
          )}
        </div>

        <AnimatePresence mode="wait">
          {showTimer && (
            <motion.span
              className="text-end font-semibold w-2/5"
              style={{ color: DEFAULT_THEME.colors.gray[4] }}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {formatTimer(currentProgress)}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <HorizontalDivider />
      <ProgressComponent progress={currentProgress} color={color} />
    </div>
  );
};

export default Progress;
