// src/pages/LoginPage.tsx

import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useGoogleLogin } from "@react-oauth/google";
import { login } from "../services/authService";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { motion } from "framer-motion";

// Importing styles
import * as styles from "../css/loginStyles";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async () => await login(username, password),
  });

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        localStorage.setItem("authToken", tokenResponse.access_token);
        navigate({ to: "/students" });
      } catch (err) {
        setError("Google login failed");
      }
    },
    onError: () => setError("Google login failed"),
  });

  const handleLogin = async () => {
    try {
      await mutateAsync();
      navigate({ to: "/students" });
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <Box sx={styles.containerStyle}>
      {/* Floating Background Glow */}
      <Box sx={styles.floatingGlow1} />
      <Box sx={styles.floatingGlow2} />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Box sx={styles.boxStyle}>
          <Typography variant="h4" fontWeight="bold" color="white" gutterBottom sx={styles.headerStyle}>
            Welcome Back 🚀
          </Typography>

          {isLoading ? (
            <Box display="flex" justifyContent="center" py={2}>
              <CircularProgress size={30} color="info" />
            </Box>
          ) : (
            <>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={styles.textFieldStyle}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={styles.textFieldStyle}
              />

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={styles.loginButtonStyle}
                  onClick={handleLogin}
                >
                  Login 🚀
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={styles.googleButtonStyle}
                  onClick={() => googleLogin()}
                  startIcon={<Google />}
                >
                  Sign in with Google
                </Button>
              </motion.div>

              {error && (
                <Typography sx={styles.errorMessageStyle}>
                  {error}
                </Typography>
              )}
            </>
          )}
        </Box>
      </motion.div>
    </Box>
  );
};

export default LoginPage;
