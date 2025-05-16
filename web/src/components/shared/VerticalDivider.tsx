import { Box, DEFAULT_THEME } from "@mantine/core";

export const VerticalDivider = () => {
  return (
    <Box
      className=" w-[1px] py-4"
      style={{ backgroundColor: DEFAULT_THEME.colors.dark[4] }}
    />
  );
};
