import { DEFAULT_THEME } from "@mantine/core";
import { motion } from "framer-motion";
import { TimerComponentProps } from "../../../types/notificationTypes";

const HexagonTimer = ({
  progress,
  Icon,
  color,
  hideProgress = false,
}: TimerComponentProps) => {
  const points = "50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25";
  const pathD = `M${points.split(" ").join("L")}Z`;

  const bgColor = DEFAULT_THEME.colors[color][7];
  const strokeColor = DEFAULT_THEME.colors[color][4];

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.3,
      }}
      className="relative w-[3rem] h-[3rem]"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d={pathD} fill={bgColor} fillOpacity={0.2} />
        {hideProgress ? (
          <path
            d={pathD}
            fill="none"
            stroke={strokeColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <motion.path
            d={pathD}
            fill="none"
            stroke={strokeColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: progress / 100 }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        )}
      </svg>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center"
        style={{ color: strokeColor }}
      >
        <Icon stroke={1.3} className="w-[1.8rem] h-[1.8rem]" />
      </motion.div>
    </motion.div>
  );
};

export default HexagonTimer;
