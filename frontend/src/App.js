import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductInfo from './pages/ProductInfo';
import Signup from './pages/Signup';


function App() {
  
  return (
    <div className="h-[100%]">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product' element={<ProductInfo/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
    </div>
  );
}

export default App;
