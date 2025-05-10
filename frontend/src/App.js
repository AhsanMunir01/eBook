import { Routes, Route } from 'react-router-dom';
import Header from './pages/header/header.js';
import SignUp from './pages/auth/components/signup/signup.js';
import SignIn from './pages/auth/components/signin/signin.js';
import AdminDashboard from './pages/admin/component/dashboard/AdminDashboard.js';
import CustomerDashboard from './pages/customer/component/dashboard/CustomerDashboard.js';
import PostBook from './pages/admin/component/post-book/PostBook.js';
import UpdateBook from './pages/admin/component/update-book/UpdateBook.js';
import ViewOrder from './pages/admin/component/view-order/ViewOrder.js';

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path='/login' element={<SignIn />} />
      <Route path='/register' element={<SignUp />} />


      <Route path='/admin/dashboard' element={<AdminDashboard />} />
      <Route path='/admin/book/post' element={<PostBook />} />
      <Route path='/admin/book/:id/edit' element={<UpdateBook />} />
      <Route path='/admin/order' element={<ViewOrder />} />
      


      <Route path="/customer/dashboard" element={<CustomerDashboard />} /> 
    </Routes>                
    </>
  );
}

export default App;
