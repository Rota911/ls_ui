import { DEFAULT_THEME, MantineColor } from "@mantine/core";

export interface BadgeItem {
  text: string;
  color?: MantineColor;
}

interface BadgeProps {
  text: string;
  notificationColor?: MantineColor;
  color?: MantineColor;
}

const Badge = ({ text, color, notificationColor = "blue" }: BadgeProps) => {
  const badgeColor = color || notificationColor;

  return (
    <span
      className="px-2 py-0.5 rounded text-sm"
      style={{
        backgroundColor: `${DEFAULT_THEME.colors[badgeColor][7]}33`,
        color: DEFAULT_THEME.colors[badgeColor][4],
      }}
    >
      {text}
    </span>
  );
};

export default Badge;
