import { Routes, Route } from 'react-router-dom';
import Header from './pages/header/header.js';
import SignUp from '../src/pages/auth/components/signup/signup.js';
import SignIn from '../src/pages/auth/components/signin/signin.js';


function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
    </Routes>                
    </>
  );
}

export default App;
