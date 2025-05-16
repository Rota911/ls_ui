import { Box, DEFAULT_THEME } from "@mantine/core";

export const HorizontalDivider = () => {
  return (
    <Box
      className="h-[1px] mx-1"
      style={{ backgroundColor: DEFAULT_THEME.colors.dark[4] }}
    ></Box>
  );
};
