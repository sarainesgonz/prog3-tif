import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import NavBar from './components/layout/NavBar'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'

// import './App.css'
import "./styles/reset.css"
import NotFoundPage from './components/NotFoundPage';
import DashboardPage from './components/DashboardPage';
import {AuthProvider} from './components/context/AuthContext';
import ArticleForm from './components/layout/ArticleForm';

function App() {
  return (
    <div>
      <AuthProvider>
      <BrowserRouter>
        <Header/>
        {/* <NavBar/> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create" element={<ArticleForm/>}/>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <Footer/>
      </AuthProvider>


    </div>
  )
}

export default App
