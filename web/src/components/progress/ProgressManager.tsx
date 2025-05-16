import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProgressItem } from "../../types/progressTypes";
import { useNuiEvent } from "../../hooks/useNuiEvent";
import Progress from "./Progress";
import { useProgress } from "../../context/ProgressContext";
import { fetchNui } from "../../utils/fetchNui";
import { isEnvBrowser } from "../../utils/misc";

const PROGRESS_ANIMATION = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 },
  transition: { duration: 0.3 },
};

const ProgressManager = () => {
  const [activeProgress, setActiveProgress] = useState<ProgressItem | null>(
    null
  );
  const { setHasActiveProgress } = useProgress();

  const startProgress = useCallback(
    (data: Omit<ProgressItem, "id">) => {
      try {
        const newProgress: ProgressItem = {
          ...data,
          id: Date.now().toString(),
        };
        setActiveProgress(newProgress);
        setHasActiveProgress(true);
      } catch (error) {
        setHasActiveProgress(false);
      }
    },
    [setHasActiveProgress]
  );

  const stopProgress = useCallback(() => {
    setHasActiveProgress(false);
    setActiveProgress(null);
  }, [setHasActiveProgress]);

  const handleProgressComplete = useCallback(() => {
    if (!isEnvBrowser()) {
      try {
        fetchNui("progressEnded");
      } catch (error) {}
    }
    setHasActiveProgress(false);
    setActiveProgress(null);
  }, [setHasActiveProgress]);

  useNuiEvent<Omit<ProgressItem, "id">>("startProgress", startProgress);
  useNuiEvent("cancelProgress", stopProgress);

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 pointer-events-none w-[40rem] flex items-center justify-center">
      <AnimatePresence mode="wait" onExitComplete={handleProgressComplete}>
        {activeProgress && (
          <motion.div {...PROGRESS_ANIMATION}>
            <Progress {...activeProgress} onComplete={stopProgress} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProgressManager;
