import { DEFAULT_THEME } from "@mantine/core";
import {
  NotificationProps,
  DEFAULT_ICONS,
  TYPE_COLORS,
} from "../../types/notificationTypes";
import { getIconComponent } from "../../utils/iconHelper";
import HexagonTimer from "./progressTypes/HexagonTimer";
import CircleTimer from "./progressTypes/CircleTimer";
import Badge from "../shared/Badge";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HorizontalDivider } from "../shared/HorizontalDivider";

const Notification = ({
  type = "info",
  color,
  title = "Notification Title",
  message = "This is a notification message",
  icon,
  duration = 5000,
  badges = [],
  onComplete,
  hideProgress = false,
  progressType = "hexagon",
}: NotificationProps) => {
  const resolveIcon = () => {
    if (!icon) return DEFAULT_ICONS[type];

    if (typeof icon === "string") {
      const IconComponent = getIconComponent(icon);
      return IconComponent || DEFAULT_ICONS[type];
    }

    return icon;
  };

  const IconComponent = resolveIcon();
  const finalColor = color || (type ? TYPE_COLORS[type] : "blue");

  const [progress, setProgress] = useState(100);
  const [showBadges, setShowBadges] = useState(true);
  const timerRef = useRef({
    startTs: performance.now(),
    frameId: 0,
    completed: false,
    duration: 0,
  });

  const [visibleBadges, setVisibleBadges] = useState<typeof processedBadges>(
    []
  );
  const badgeContainerRef = useRef<HTMLDivElement>(null);

  const processedBadges = [...badges]
    .reverse()
    .slice(0, 4)
    .map((badge) => (typeof badge === "string" ? { text: badge } : badge));

  useEffect(() => {
    const container = badgeContainerRef.current;
    if (!container) return;

    const calculateVisibleBadges = () => {
      const containerWidth = container.clientWidth;
      let currentWidth = 0;
      const visible: typeof processedBadges = [];

      const badgeElements = container.querySelectorAll(".badge-item");

      badgeElements.forEach((badge, index) => {
        const badgeWidth = badge.getBoundingClientRect().width;
        if (currentWidth + badgeWidth <= containerWidth) {
          visible.push(processedBadges[index]);
          currentWidth += badgeWidth + 8;
        }
      });

      setVisibleBadges(visible);
    };

    const resizeObserver = new ResizeObserver(calculateVisibleBadges);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [processedBadges]);

  useEffect(() => {
    const startTs = performance.now();

    const animate = () => {
      const now = performance.now();
      const elapsed = now - startTs;
      const remainingMs = Math.max(0, duration - elapsed);
      const currentProgress = (remainingMs / duration) * 100;

      setProgress(currentProgress);

      if (currentProgress <= 0) {
        if (!timerRef.current.completed) {
          timerRef.current.completed = true;
          setShowBadges(false);
          onComplete?.();
        }
        return;
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [duration]);

  const TimerComponent =
    progressType === "hexagon" ? HexagonTimer : CircleTimer;

  return (
    <motion.div
      className="p-2 rounded w-fit flex flex-col gap-2"
      style={{
        backgroundColor: DEFAULT_THEME.colors.dark[7],
        minWidth: "20rem",
        maxWidth: "25rem",
      }}
    >
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          <TimerComponent
            progress={progress}
            Icon={IconComponent}
            color={finalColor}
            hideProgress={hideProgress}
          />
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-1">
          <h3
            className="font-bold truncate"
            style={{ color: DEFAULT_THEME.colors.gray[3] }}
          >
            {title}
          </h3>
          <p
            className="font-semibold break-all w-full whitespace-pre-wrap"
            style={{
              color: DEFAULT_THEME.colors.gray[4],
            }}
          >
            {message}
          </p>
        </div>
      </div>

      <AnimatePresence mode="sync">
        {showBadges && processedBadges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -30 }}
            animate={{
              opacity: 1,
              height: "auto",
              y: 0,
              transition: {
                height: { duration: 0.4 },
                opacity: { duration: 0.3 },
                y: { duration: 0.4, ease: "easeOut" },
              },
            }}
            exit={{
              opacity: 0,
              height: 0,
              y: -20,
              transition: { duration: 0.4 },
            }}
            className="overflow-hidden"
          >
            <HorizontalDivider />
            <div
              ref={badgeContainerRef}
              className="flex gap-2 pt-2 overflow-hidden"
            >
              {processedBadges.map((badge, index) => (
                <motion.div
                  key={index}
                  className="badge-item flex-shrink-0"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: visibleBadges.includes(badge) ? 1 : 0,
                    scale: visibleBadges.includes(badge) ? 1 : 0.8,
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Badge
                    text={badge.text}
                    color={badge.color}
                    notificationColor={finalColor}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Notification;
