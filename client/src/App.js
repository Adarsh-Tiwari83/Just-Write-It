import './App.css';
import Header from './components/Header';
import {Routes,Route} from 'react-router-dom'
import Blogs from './pages/Blogs';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <>
    <Header/>
   <Routes>
      <Route path='/' element={<Blogs/>}></Route>
      <Route path='/Blogs' element={<Blogs/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
   </Routes>
   </>
  );
}

export default App;
