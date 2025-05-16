import { DEFAULT_THEME } from "@mantine/core";
import { TextUIProps } from "../../types/textUITypes";
import HexagonHolder from "./keyholders/HexagonHolder";
import SquareHolder from "./keyholders/SquareHolder";
import CircleHolder from "./keyholders/CircleHolder";
import { VerticalDivider } from "../shared/VerticalDivider";

const TextUI = ({
  keyText,
  icon,
  text,
  color,
  keyStyle,
  position,
}: TextUIProps) => {
  const finalColor = color || "blue";
  const isRightSide = position === "right-center";

  const renderKeyHolder = (keyText?: string, icon?: string) => {
    switch (keyStyle) {
      case "hexagon":
        return (
          <HexagonHolder keyText={keyText} icon={icon} color={finalColor} />
        );
      case "circle":
        return (
          <CircleHolder keyText={keyText} icon={icon} color={finalColor} />
        );
      default:
        return (
          <SquareHolder keyText={keyText} icon={icon} color={finalColor} />
        );
    }
  };

  return (
    <div
      className="rounded flex items-center gap-2 p-2 relative"
      style={{ backgroundColor: DEFAULT_THEME.colors.dark[7] }}
    >
      <div
        className={`relative flex items-center justify-center gap-2 ${
          isRightSide ? "flex-row-reverse" : ""
        }`}
      >
        {(keyText || icon) && (
          <>
            {renderKeyHolder(keyText, icon)}
            <VerticalDivider />
          </>
        )}
        <span
          className="font-semibold"
          style={{ color: DEFAULT_THEME.colors.gray[4] }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

export default TextUI;
