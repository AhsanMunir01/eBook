import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, Box, CircularProgress, Container, CssBaseline, Typography, TextField, Button, Grid, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useSnackbar } from 'notistack';
import { Backdrop } from '@mui/material';
import { signin } from '../services/auth/auth';
import { saveToken, isAdminLoggedIn, isCustomerLoggedIn } from '../../../../utils/common';


const defaultTheme = createTheme();

export default function Signin() {
    const{enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
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
        try{
            const response = await signin(formData);
            if(response.status === 200){
                console.log(response);
                const token = response.data.token;
                saveToken(token);
                if(isAdminLoggedIn()){
                    navigate('/admin/dashboard');
                }
                else if(isCustomerLoggedIn()){
                    navigate('/customer/dashboard');
                }
            }

        }catch(error){
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                enqueueSnackbar(error.response.data.message || 'Invalid email or password', {variant:'error', autoHideDuration: 5000});
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
        console.log(formData);
        
    }

    const handleSignUpClick = () => {
        navigate('/register');
    }
    return (
        <>
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth={false} sx={{ width: '100vw', display: 'flex', justifyContent: 'center' }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 7,
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
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{
                            mt:  3,
                            width: '100%',
                            maxWidth: 400,
                            mx: 'auto'
                        }}
                    >
                       
                            
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
                            
                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, height: 48, fontWeight: 'bold', fontSize: '1rem' }}
                            disabled={ !formData.email || !formData.password}
                        >
                            {loading ? <CircularProgress color="success" size={24} /> : "SIGN UP"}
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link
                                    variant="body2"
                                    onClick={handleSignUpClick}
                                    sx={{ color: '#1976d2', cursor: 'pointer', fontWeight: 500 }}
                                >
                                   Don't have an account? Sign up
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
