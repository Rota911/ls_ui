import { MantineColor } from "@mantine/core";

export type ProgressTimerType = "seconds" | "percentage";
export type ProgressBarType = "normal" | "segmented";

export interface ProgressItem {
  id: string;
  label?: string;
  icon?: string;
  color?: MantineColor;
  duration: number;
  timerType?: ProgressTimerType;
  progressType?: ProgressBarType;
}

export interface ProgressProps extends Omit<ProgressItem, 'id'> {
  onComplete?: () => void;
}
