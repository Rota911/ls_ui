import { DEFAULT_THEME, MantineColor } from "@mantine/core";
import { motion } from "framer-motion";
import { getIconComponent } from "../../../utils/iconHelper";

interface CircleHolderProps {
  keyText?: string;
  icon?: string;
  color: MantineColor;
}

const CircleHolder = ({ keyText, icon, color }: CircleHolderProps) => {
  const IconComponent = icon ? getIconComponent(icon) : null;
  const center = 50;
  const radius = 48;

  return (
    <motion.div
      className="relative w-[2rem] h-[2rem]"
      initial={{ scale: 0, rotate: 180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full scale-110"
        style={{ color: DEFAULT_THEME.colors[color][4] }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="currentColor"
          fillOpacity={0.2}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        />
      </motion.svg>
      <motion.div
        className="absolute inset-0 flex items-center justify-center font-semibold text-base"
        style={{ color: DEFAULT_THEME.colors[color][4] }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.2 }}
      >
        {keyText || (IconComponent && <IconComponent size={24} stroke={1.3} />)}
      </motion.div>
    </motion.div>
  );
};

export default CircleHolder;
