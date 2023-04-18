// Dependencies
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Routes
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Feed from './pages/Feed';
import NotFound from './pages/NotFound';
import ProtectedRoutes from './components/ProtectedRoutes'
import Layout from './pages/Layout'

// stylesheet
import './styles/App.scss';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <ToastContainer position='top-center' />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Feed & Profile is only accessible if you are logged in. */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/feed" element={<Feed />} />
              <Route path="/profile/:username" element={<Profile />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
