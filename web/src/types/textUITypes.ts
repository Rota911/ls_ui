import { MantineColor } from "@mantine/core";

export type KeyHolderType = "square" | "hexagon" | "circle";  
export type TextUIPosition = 'left-center' | 'right-center' | 'bottom-center';

export interface TextUIItem {
  id: number | string; 
  keyText?: string;
  icon?: string; 
  text: string;
  color?: MantineColor;
  keyStyle?: KeyHolderType;
  position?: TextUIPosition;
}

export interface TextUIProps extends Omit<TextUIItem, 'id'> {
  onComplete?: () => void;
}
