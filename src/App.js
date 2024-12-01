import './App.css';
import Home from './screens/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './screens/Login';
import SignUp from './screens/Signup'
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/creatuser' element={<SignUp />} />
            <Route path='/myorder' element={<MyOrder />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
