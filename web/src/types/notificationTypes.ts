import { MantineColor } from "@mantine/core";
import { IconInfoCircle, IconAlertTriangle, IconX, IconCheck } from "@tabler/icons-react";

export type NotificationType = "info" | "error" | "warning" | "success";
export type ProgressType = "hexagon" | "circle";
export type NotificationPosition = 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left';

export const DEFAULT_ICONS = {
  info: IconInfoCircle,
  error: IconX,
  warning: IconAlertTriangle,
  success: IconCheck,
} as const;

export const TYPE_COLORS: Record<NotificationType, MantineColor> = {
  info: "blue",
  error: "red",
  warning: "yellow",
  success: "green",
} as const;

export interface BadgeItem {
  text: string;
  color?: MantineColor;
}

interface IconProps {
  size?: number | string;
  stroke?: number;
  color?: string;
  className?: string;
}

export interface TimerComponentProps {
  progress: number;
  Icon: React.ComponentType<IconProps>;
  color: MantineColor;
  hideProgress?: boolean;
}

export interface NotificationItem {
  id: number;
  title?: string;
  message?: string;
  color?: MantineColor;
  icon?: string | React.ComponentType<IconProps>;
  type?: NotificationType;
  duration?: number;
  badges?: (string | BadgeItem)[];
  startTime?: number;
  progressType?: ProgressType;
  hideProgress?: boolean;
  position?: NotificationPosition;
  isExpired?: boolean;
}

export interface NotificationProps extends Omit<NotificationItem, "id" | "startTime"> {
  onComplete?: () => void;
  animationProps?: {
    initial: object;
    animate: object;
    exit: object;
  };
  position?: NotificationPosition;
}
