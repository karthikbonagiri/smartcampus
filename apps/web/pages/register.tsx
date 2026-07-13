import { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ schoolName: '', subdomain: '', adminEmail: '', adminPassword: '' });
  const handleSubmit = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, form);
    router.push('/login');
  };
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Typography variant="h4" gutterBottom>Register Your School</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField fullWidth label="School Name" margin="normal" onChange={e => setForm({...form, schoolName: e.target.value})} />
        <TextField fullWidth label="Subdomain" margin="normal" onChange={e => setForm({...form, subdomain: e.target.value})} />
        <TextField fullWidth label="Admin Email" type="email" margin="normal" onChange={e => setForm({...form, adminEmail: e.target.value})} />
        <TextField fullWidth label="Password" type="password" margin="normal" onChange={e => setForm({...form, adminPassword: e.target.value})} />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Register</Button>
      </Box>
    </Container>
  );
}// Placeholder: register.tsx
