import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'

// import './App.css'
import "./styles/reset.css"
import NotFoundPage from './components/NotFoundPage';
import DashboardPage from './components/DashboardPage';
import { AuthProvider } from './components/context/AuthContext';
import MyArticlesPage from './components/MyArticlesPage';
import ArticleFormPage from './components/ArticleFormPage';
import ProfilePage from './components/ProfilePage';
import {UserProvider} from './components/context/UserContext'
import FullArticlePage from './components/FullArticlePage';

function App() {
  return (
    <div>
      
      <AuthProvider>
        <UserProvider>
          <BrowserRouter>
            <Header />
            {/* <NavBar/> */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/create" element={<ArticleFormPage />} />
              <Route path="/myarticles" element={<MyArticlesPage />} />
              <Route path="/myprofile" element={<ProfilePage />} />
              <Route path='/article/:id' element={<FullArticlePage/>} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
          <Footer />
           </UserProvider>
          </AuthProvider>
       
     


    </div>
  )
}

export default App
