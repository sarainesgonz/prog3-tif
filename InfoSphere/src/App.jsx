import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import NavBar from './components/layout/NavBar'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'

// import './App.css'
import "./styles/reset.css"
import NotFoundPage from './components/NotFoundPage';
import ProfilePage from './components/ProfilePage';
import {AuthProvider} from './components/context/AuthContext';

function App() {
  return (
    <div>
      <AuthProvider>
      <BrowserRouter>
        <Header/>
        <NavBar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* la pagina de perfil solo deberia aparecer si se pasa la autenticacion */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <Footer/>
      </AuthProvider>


    </div>
  )
}

export default App
