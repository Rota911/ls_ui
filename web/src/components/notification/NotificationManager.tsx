import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  NotificationItem,
  NotificationPosition,
} from "../../types/notificationTypes";
import Notification from "./Notification";
import { useNuiEvent } from "../../hooks/useNuiEvent";

const NotificationManager = () => {
  const [activeNotifications, setActiveNotifications] = useState<
    NotificationItem[]
  >([]);
  const [queue, setQueue] = useState<NotificationItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const MAX_NOTIFICATIONS = 5;
  const [activePositions, setActivePositions] = useState<Set<string>>(
    new Set()
  );
  const positionTimeoutsRef = useRef<Record<string, NodeJS.Timeout>>({});

  const processQueue = () => {
    if (
      isProcessing ||
      queue.length === 0 ||
      activeNotifications.length >= MAX_NOTIFICATIONS
    ) {
      return;
    }

    setIsProcessing(true);
    const [nextNotification, ...remainingQueue] = queue;

    const activeNotification = {
      ...nextNotification,
      startTime: Date.now(),
    };

    setQueue(remainingQueue);
    setActiveNotifications((current) => [...current, activeNotification]);

    setTimeout(() => {
      setIsProcessing(false);
    }, 300);
  };

  const removeNotification = (id: number) => {
    setActiveNotifications((prev) => {
      const notification = prev.find((n) => n.id === id);
      if (notification) {
        const position = notification.position || "top-right";

        if (positionTimeoutsRef.current[position]) {
          clearTimeout(positionTimeoutsRef.current[position]);
        }

        const remainingInPosition = prev.filter(
          (n) => n.id !== id && (n.position || "top-right") === position
        );

        if (remainingInPosition.length === 0) {
          positionTimeoutsRef.current[position] = setTimeout(() => {
            setActivePositions((prev) => {
              const newPositions = new Set(prev);
              newPositions.delete(position);
              return newPositions;
            });
          }, 300);
        }
      }
      return prev.filter((n) => n.id !== id);
    });
    setTimeout(processQueue, 400);
  };

  const addNotification = (
    notification: Omit<NotificationItem, "id" | "startTime">
  ) => {
    const position = notification.position || "top-right";
    setActivePositions((prev) => new Set([...prev, position]));

    const newNotification: NotificationItem = {
      ...notification,
      id: Date.now(),
      startTime:
        activeNotifications.length < MAX_NOTIFICATIONS ? Date.now() : undefined,
    };

    if (activeNotifications.length < MAX_NOTIFICATIONS) {
      setActiveNotifications((prev) => [...prev, newNotification]);
    } else if (queue.length < MAX_NOTIFICATIONS * 2) {
      setQueue((prev) => [...prev, newNotification]);
    }
  };

  useEffect(() => {
    if (
      queue.length > 0 &&
      !isProcessing &&
      activeNotifications.length < MAX_NOTIFICATIONS
    ) {
      processQueue();
    }
  }, [queue.length, activeNotifications.length, isProcessing]);

  useNuiEvent<Omit<NotificationItem, "id" | "startTime">>(
    "showNotification",
    (data) => {
      addNotification(data);
    }
  );

  const getPositionClasses = (position: NotificationPosition): string => {
    switch (position) {
      case "top-right":
        return "top-2 right-2 items-end";
      case "top-left":
        return "top-2 left-2";
      case "top-center":
        return "top-2 left-1/2 -translate-x-1/2 items-center";
      case "bottom-right":
        return "bottom-2 right-2 items-end";
      case "bottom-left":
        return "bottom-2 left-2";
      default:
        return "top-2 right-2";
    }
  };

  const getAnimationByPosition = (position: string) => {
    switch (position) {
      case "top-right":
        return {
          initial: { opacity: 0, x: 100, y: 0 },
          animate: { opacity: 1, x: 0, y: 0 },
          exit: { opacity: 0, x: 100, y: 0 },
        };
      case "top-left":
        return {
          initial: { opacity: 0, x: -100, y: 0 },
          animate: { opacity: 1, x: 0, y: 0 },
          exit: { opacity: 0, x: -100, y: 0 },
        };
      case "top-center":
        return {
          initial: { opacity: 0, y: -100, x: 0 },
          animate: { opacity: 1, y: 0, x: 0 },
          exit: { opacity: 0, y: -100, x: 0 },
        };
      case "bottom-left":
        return {
          initial: { opacity: 0, x: -100, y: 0 },
          animate: { opacity: 1, x: 0, y: 0 },
          exit: { opacity: 0, x: -100, y: 0 },
        };
      case "bottom-right":
        return {
          initial: { opacity: 0, x: 100, y: 0 },
          animate: { opacity: 1, x: 0, y: 0 },
          exit: { opacity: 0, x: 100, y: 0 },
        };
      default:
        return {
          initial: { opacity: 0, x: 100, y: 0 },
          animate: { opacity: 1, x: 0, y: 0 },
          exit: { opacity: 0, x: 100, y: 0 },
        };
    }
  };

  return (
    <>
      {Array.from(activePositions).map((position) => (
        <div
          key={position}
          className={`fixed flex flex-col gap-4 h-fit ${getPositionClasses(
            position as NotificationPosition
          )}`}
        >
          <AnimatePresence mode="sync">
            {activeNotifications
              .filter((n) => (n.position || "top-right") === position)
              .map((notification) => {
                const animation = getAnimationByPosition(position);
                return (
                  <motion.div
                    key={notification.id}
                    layout
                    initial={animation.initial}
                    animate={animation.animate}
                    exit={animation.exit}
                    transition={{
                      duration: 0.15,
                      ease: "easeInOut",
                    }}
                  >
                    <Notification
                      {...notification}
                      onComplete={() => removeNotification(notification.id)}
                    />
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </div>
      ))}
    </>
  );
};

export default NotificationManager;
