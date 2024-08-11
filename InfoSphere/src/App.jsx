import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import NavBar from './components/layout/NavBar'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import './App.css'
import NotFoundPage from './components/NotFoundPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header/>
        <NavBar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <Footer/>


    </div>
  )
}

export default App
