import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, Box, CircularProgress, Container, CssBaseline, Typography, TextField, Button, Grid, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const defaultTheme = createTheme();

export default function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        console.log(formData);
        setLoading(false);
    }

    const handleSignInClick = () => {
        navigate('/login');
    }
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth={false} sx={{ width: '100vw', display: 'flex', justifyContent: 'center' }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        maxWidth: 500,
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
                        <LockOutlinedIcon sx={{ fontSize: 32 }} />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{ mt: 1, mb: 2 }}>
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{
                            mt: 1,
                            width: '100%',
                            maxWidth: 400,
                            mx: 'auto'
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    InputProps={{ style: { background: '#fff' } }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    InputProps={{ style: { background: '#fff' } }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    InputProps={{ style: { background: '#fff' } }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    InputProps={{ style: { background: '#fff' } }}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, height: 48, fontWeight: 'bold', fontSize: '1rem' }}
                            disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.password}
                        >
                            {loading ? <CircularProgress color="success" size={24} /> : "SIGN UP"}
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link
                                    variant="body2"
                                    onClick={handleSignInClick}
                                    sx={{ color: '#1976d2', cursor: 'pointer', fontWeight: 500 }}
                                >
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}
