// src/styles/loginStyles.ts

import { SxProps, Theme } from "@mui/system";

export const containerStyle: SxProps<Theme> = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "radial-gradient(circle, #1A1A2E 30%, #0F3460 100%)",
  overflow: "hidden",
  position: "relative",
};

export const floatingGlow1: SxProps<Theme> = {
  position: "absolute",
  width: 300,
  height: 300,
  background: "rgba(255, 0, 150, 0.3)",
  borderRadius: "50%",
  filter: "blur(150px)",
  top: "20%",
  left: "20%",
};

export const floatingGlow2: SxProps<Theme> = {
  position: "absolute",
  width: 250,
  height: 250,
  background: "rgba(0, 255, 255, 0.3)",
  borderRadius: "50%",
  filter: "blur(150px)",
  bottom: "20%",
  right: "20%",
};

export const boxStyle: SxProps<Theme> = {
  width: 420,
  backdropFilter: "blur(16px)",
  background: "rgba(255, 255, 255, 0.1)",
  borderRadius: 4,
  padding: 4,
  boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.3)",
  border: "2px solid rgba(255, 255, 255, 0.2)",
  textAlign: "center",
};

export const headerStyle: SxProps<Theme> = {
  textShadow: "0px 0px 10px rgba(255,255,255,0.3)",
};

export const textFieldStyle: SxProps<Theme> = {
  bgcolor: "rgba(255, 255, 255, 0.2)",
  borderRadius: 2,
  input: { color: "white" },
  label: { color: "rgba(255, 255, 255, 0.7)" },
  fieldset: { borderColor: "rgba(255, 255, 255, 0.4)" },
};

export const loginButtonStyle: SxProps<Theme> = {
  mt: 3,
  py: 1.5,
  fontSize: "1.2rem",
  borderRadius: 3,
  bgcolor: "#FF007F",
  color: "white",
  textShadow: "0px 0px 10px rgba(255,255,255,0.3)",
  "&:hover": { bgcolor: "#D6006C" },
};

export const googleButtonStyle: SxProps<Theme> = {
  mt: 2,
  py: 1.5,
  fontSize: "1.2rem",
  borderRadius: 3,
  color: "white",
  borderColor: "white",
  display: "flex",
  alignItems: "center",
  gap: 1,
  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
};

export const errorMessageStyle: SxProps<Theme> = {
  color: "error",
  align: "center",
  mt: 2,
};
