import { useState, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TextUIItem, TextUIPosition } from "../../types/textUITypes";
import { useNuiEvent } from "../../hooks/useNuiEvent";
import TextUI from "./TextUI";
import { useProgress } from "../../context/ProgressContext";

const MAX_TEXT_UIS = 5;
const ANIMATION_DELAY = 300;
const PROCESS_QUEUE_DELAY = 100;

const POSITION_ANIMATIONS = {
  "left-center": {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  },
  "right-center": {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  },
  "bottom-center": {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
};

const TextUIManager = () => {
  const [activeTextUIs, setActiveTextUIs] = useState<TextUIItem[]>([]);
  const [queue, setQueue] = useState<TextUIItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const activeIdsRef = useRef<Set<string | number>>(new Set());
  const { hasActiveProgress } = useProgress();

  const processQueue = useCallback(() => {
    if (
      isProcessing ||
      queue.length === 0 ||
      activeTextUIs.length >= MAX_TEXT_UIS
    ) {
      return;
    }

    setIsProcessing(true);
    const [nextTextUI, ...remainingQueue] = queue;
    setQueue(remainingQueue);
    setActiveTextUIs((current) => [...current, nextTextUI]);

    setTimeout(() => {
      setIsProcessing(false);
      if (queue.length > 0) {
        processQueue();
      }
    }, ANIMATION_DELAY);
  }, [isProcessing, queue, activeTextUIs.length]);

  const addTextUI = useCallback(
    (
      textUI:
        | (Omit<TextUIItem, "id"> & { id?: string })
        | (Omit<TextUIItem, "id"> & { id?: string })[]
    ) => {
      if (Array.isArray(textUI)) {
        textUI.forEach((item) => {
          addTextUI(item);
        });
        return;
      }

      if (!textUI.id) {
        console.log("TextUI missing ID");
        return;
      }
      const id = textUI.id;

      if (activeIdsRef.current.has(id)) {
        console.log(`TextUI with ID '${id}' already exists`);
        return;
      }
      activeIdsRef.current.add(id);

      const newTextUI: TextUIItem = {
        ...textUI,
        id,
      };

      if (activeTextUIs.length < MAX_TEXT_UIS) {
        setActiveTextUIs((prev) => [...prev, newTextUI]);
      } else {
        setQueue((prev) => [...prev, newTextUI]);
      }
    },
    [activeTextUIs.length]
  );

  const removeTextUI = useCallback(
    ({ id }: { id: string | number }) => {
      activeIdsRef.current.delete(id);
      setActiveTextUIs((prev) => prev.filter((item) => item.id !== id));
      setTimeout(processQueue, PROCESS_QUEUE_DELAY);
    },
    [processQueue]
  );

  useNuiEvent<
    | (Omit<TextUIItem, "id"> & { id?: string })
    | (Omit<TextUIItem, "id"> & { id?: string })[]
  >("showTextUI", addTextUI);
  useNuiEvent<{ id: string | number }>("hideTextUI", removeTextUI);

  const textUIsByPosition = useMemo(() => {
    return activeTextUIs.reduce((acc, textUI) => {
      const position = textUI.position || "bottom-center";
      if (!acc[position]) acc[position] = [];
      if (acc[position].length < MAX_TEXT_UIS) {
        acc[position].push(textUI);
      }
      return acc;
    }, {} as Record<string, TextUIItem[]>);
  }, [activeTextUIs]);

  const getPositionClasses = useCallback(
    (position?: TextUIPosition): string => {
      switch (position) {
        case "left-center":
          return "fixed left-2 top-1/2 -translate-y-1/2 flex-col items-start";
        case "right-center":
          return "fixed right-2 top-1/2 -translate-y-1/2 flex-col items-end";
        case "bottom-center":
        default:
          return `fixed transition-[bottom] duration-300 ${
            hasActiveProgress ? "bottom-22" : "bottom-2"
          } left-1/2 -translate-x-1/2 flex-col items-center`;
      }
    },
    [hasActiveProgress]
  );

  const getAnimationByPosition = useCallback((position?: TextUIPosition) => {
    return (
      POSITION_ANIMATIONS[position || "bottom-center"] ||
      POSITION_ANIMATIONS["bottom-center"]
    );
  }, []);

  return (
    <>
      {Object.entries(textUIsByPosition).map(([position, items]) => (
        <div
          key={position}
          className={`fixed flex gap-2 ${getPositionClasses(
            position as TextUIPosition
          )}`}
        >
          <AnimatePresence mode="sync">
            {items.map((item) => {
              const animation = getAnimationByPosition(
                position as TextUIPosition
              );
              return (
                <motion.div
                  key={item.id}
                  {...animation}
                  transition={{ duration: 0.15 }}
                >
                  <TextUI {...item} position={position as TextUIPosition} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      ))}
    </>
  );
};

export default TextUIManager;
