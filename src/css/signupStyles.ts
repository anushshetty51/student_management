// src/styles/signupStyles.ts
import { SxProps, Theme } from '@mui/material';

export const containerStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  background: 'radial-gradient(circle, #1A1A2E 30%, #0F3460 100%)',
  overflow: 'hidden',
  position: 'relative',
};

export const signupBoxStyle: SxProps<Theme> = {
  width: 420,
  backdropFilter: 'blur(16px)',
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: 4,
  padding: 4,
  boxShadow: '0px 10px 40px rgba(0, 0, 0, 0.3)',
  border: '2px solid rgba(255, 255, 255, 0.2)',
  textAlign: 'center',
};

export const titleStyle: SxProps<Theme> = {
  fontWeight: 'bold',
  color: 'white',
  textShadow: '0px 0px 10px rgba(255,255,255,0.3)',
};

export const inputStyle: SxProps<Theme> = {
  bgcolor: 'rgba(255, 255, 255, 0.2)',
  borderRadius: 2,
  input: { color: 'white' },
  label: { color: 'rgba(255, 255, 255, 0.7)' },
  fieldset: { borderColor: 'rgba(255, 255, 255, 0.4)' },
};

export const buttonStyle: SxProps<Theme> = {
  mt: 3,
  py: 1.5,
  fontSize: '1.2rem',
  borderRadius: 3,
  bgcolor: '#FF007F',
  color: 'white',
  textShadow: '0px 0px 10px rgba(255,255,255,0.3)',
  '&:hover': { bgcolor: '#D6006C' },
};

export const errorMessageStyle: SxProps<Theme> = {
  color: 'error',
  align: 'center',
  marginTop: 2,
};
