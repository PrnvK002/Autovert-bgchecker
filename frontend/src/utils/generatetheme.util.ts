import { createTheme } from "@mui/material/styles";

export const generateAppTheme = (theme: any) => {
  return createTheme({
    palette: {
      primary: {
        main: theme.labelColor ? `${theme?.labelColor}` : "#ed4657", // Use provided mainColor or default to "#ed4657"
      },
      secondary: {
        main: theme.headingColor ? `${theme?.headingColor}` : "#0eb57f", // Use provided secondaryColor or default to "#0eb57f"
      },
      success: {
        main: theme.bgColor ? `${theme?.bgColor}` : "#0eb57f", // Use provided secondaryColor or default to "#0eb57f"
      },
    },
  });
};
