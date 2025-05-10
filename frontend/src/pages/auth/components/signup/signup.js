import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, Box, CircularProgress, Container, CssBaseline, Typography, TextField, Button, Grid, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useSnackbar } from 'notistack';
import { Backdrop } from '@mui/material';
import { signup } from '../services/auth/auth';

const defaultTheme = createTheme();

export default function SignUp() {
    const{enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < minLength) {
            return 'Password must be at least 8 characters long';
        }
        if (!hasUpperCase) {
            return 'Password must contain at least one uppercase letter';
        }
        if (!hasLowerCase) {
            return 'Password must contain at least one lowercase letter';
        }
        if (!hasNumbers) {
            return 'Password must contain at least one number';
        }
        if (!hasSpecialChar) {
            return 'Password must contain at least one special character';
        }
        return '';
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        // Validate email
        if (name === 'email') {
            setErrors(prev => ({
                ...prev,
                email: validateEmail(value) ? '' : 'Please enter a valid email address'
            }));
        }
        
        // Validate password
        if (name === 'password') {
            setErrors(prev => ({
                ...prev,
                password: validatePassword(value)
            }));
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Validate all fields before submission
        const emailError = validateEmail(formData.email) ? '' : 'Please enter a valid email address';
        const passwordError = validatePassword(formData.password);
        
        setErrors({
            email: emailError,
            password: passwordError
        });

        if (emailError || passwordError) {
            enqueueSnackbar('Please fix the validation errors before submitting', {variant:'error', autoHideDuration: 5000});
            return;
        }

        setLoading(true);
        try{
            const response = await signup(formData);
            if(response.status === 201){
                navigate('/login');
                enqueueSnackbar('Signup successful',{variant:'success', autoHideDuration: 5000});
            }
        }catch(error){
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                enqueueSnackbar(error.response.data.message || 'Signup failed', {variant:'error', autoHideDuration: 5000});
            } else if (error.request) {
                // The request was made but no response was received
                enqueueSnackbar('No response from server', {variant:'error', autoHideDuration: 5000});
            } else {
                // Something happened in setting up the request that triggered an Error
                enqueueSnackbar('An error occurred', {variant:'error', autoHideDuration: 5000});
            }
        }
        finally{
            setLoading(false);
        }
    }

    const handleSignInClick = () => {
        navigate('/login');
    }
    return (
        <>
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
                                    error={!!errors.email}
                                    helperText={errors.email}
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
                                    error={!!errors.password}
                                    helperText={errors.password}
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
        <Backdrop
        sx={{color: '#fff', zIndex: (theme)=>theme.zIndex.drawer + 1}}
        open = {loading}
        >
            <CircularProgress color="success"  />
        </Backdrop>
        </>
    )
}
