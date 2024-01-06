import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import SignUp from './components/pages/SignUp';
import About from './components/pages/About';
import HistoryPage from './components/HistoryPage';
import Preview from './components/Preview';

function App() {
  return (
    <div>
      <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home/>} />
        <Route path='/services' element={<Services/>} />
        <Route path='/products' element={<Products/>} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/preview' element={<Preview/>} />
        <Route path='/historypage' element={<HistoryPage/>} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;