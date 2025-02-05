import { SxProps, Theme } from "@mui/system";

export const containerStyles: SxProps<Theme> = {
  mt: 4,
};

export const typographyTitleStyles: SxProps<Theme> = {
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: 2,
  fontSize: "2rem",  // Increased size for better impact
  color: "primary.main",
};

export const cardStyles: SxProps<Theme> = {
  boxShadow: 3,
  borderRadius: 3,
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    boxShadow: 6,
    transform: "scale(1.05)",
  },
};

export const cardContentStyles: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  padding: 2,
};

export const cardActionsStyles: SxProps<Theme> = {
  mt: 2,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export const buttonStyles: SxProps<Theme> = {
  borderRadius: 3,
  textTransform: "none",
  fontSize: "1rem",
};

export const dialogStyles: SxProps<Theme> = {
  maxWidth: "sm",
  width: "100%",
  transition: "transform 0.2s",
};

export const textFieldStyles: SxProps<Theme> = {
  marginBottom: 2,
  width: "100%",
};

export const logoutButtonStyles: SxProps<Theme> = {
  ml: 2,
  borderRadius: 3,
  textTransform: "none",
  fontSize: "1rem",
};

