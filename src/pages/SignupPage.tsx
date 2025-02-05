// src/pages/SignupPage.tsx
import { useState } from 'react';
import { signup } from '../services/authService';
import { useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query'; // Import TanStack Query
import Loading from '../components/Loading';
import { Box, Button, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import * as styles from '../css/signupStyles';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState('');
  const navigate = useNavigate();

  // TanStack Query mutation for handling signup
  const { mutateAsync, isLoading, error } = useMutation<void, Error>({
    mutationFn: async () => await signup(username, password, roles),
  });

  const handleSignup = async () => {
    try {
      await mutateAsync(); // Call the signup mutation
      navigate({ to: '/' });
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return (
    <Box sx={styles.containerStyle}>
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}>
        <Box sx={styles.signupBoxStyle}>
          <Typography variant="h4" sx={styles.titleStyle} gutterBottom>
            Signup 🚀
          </Typography>

          {isLoading ? (
            <Loading />
          ) : (
            <>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={styles.inputStyle}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={styles.inputStyle}
              />
              <TextField
                fullWidth
                label="Roles"
                variant="outlined"
                margin="normal"
                value={roles}
                onChange={(e) => setRoles(e.target.value)}
                sx={styles.inputStyle}
              />
              {error && <Typography sx={styles.errorMessageStyle}>Signup failed. Please try again.</Typography>}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSignup}
                  sx={styles.buttonStyle}
                >
                  Signup
                </Button>
              </motion.div>
            </>
          )}
        </Box>
      </motion.div>
    </Box>
  );
};

export default SignupPage;
