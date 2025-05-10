import instance from '../../../../../environment/axiosInstance'

export  const signup = async (signupDto) => {
   try {
    const response = await instance.post('/api/auth/signup', signupDto)
    return response;
   } catch (error) {
    console.error('Error signing in', error)
    throw error
   }
}

export  const  signin = async (signinDto) => {
    try {
     const response = await instance.post('/api/auth/login', signinDto)
     return response;
    } catch (error) {
     console.error('Error loging in', error)
     throw error
    }
}