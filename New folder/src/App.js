import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import Profile from './components/Profile';
import Home from './components/Home';


import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import './App.css';

function App() {
  
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/LoginPage" element ={<LoginPage />} />
          <Route path="/" element ={<RegistrationPage />} />
          <Route path="/Home" element={<Home/>} />
          <Route path="/Profile" element={<Profile/>} />
         
         
        </Routes>
    </BrowserRouter>
  );
}

export default App;