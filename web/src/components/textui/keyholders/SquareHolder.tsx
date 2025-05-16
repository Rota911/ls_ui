import { Box, DEFAULT_THEME, MantineColor } from "@mantine/core";
import { motion } from "framer-motion";
import { getIconComponent } from "../../../utils/iconHelper";

interface SquareHolderProps {
  keyText?: string;
  icon?: string;
  color: MantineColor;
}

const SquareHolder = ({ keyText, icon, color }: SquareHolderProps) => {
  const IconComponent = icon ? getIconComponent(icon) : null;

  const renderContent = () => {
    if (keyText) return keyText;
    if (IconComponent) {
      try {
        return <IconComponent size={24} stroke={1.3} />;
      } catch (error) {
        console.error("Error rendering icon:", error);
        return null;
      }
    }
    return null;
  };

  return (
    <motion.div
      initial={{ scale: 0, rotate: -45 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Box
        className="flex items-center justify-center rounded w-[2rem] h-[2rem] font-semibold relative"
        style={{
          border: `0.1rem solid ${DEFAULT_THEME.colors[color][4]}`,
          color: DEFAULT_THEME.colors[color][5],
        }}
      >
        <motion.div
          className="absolute inset-0 rounded"
          style={{
            backgroundColor: DEFAULT_THEME.colors[color][7],
          }}
          animate={{ opacity: [0, 0.2] }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {renderContent()}
        </motion.span>
      </Box>
    </motion.div>
  );
};

export default SquareHolder;
