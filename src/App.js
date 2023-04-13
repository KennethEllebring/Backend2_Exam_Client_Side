// Dependencies
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Routes
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Feed from './pages/Feed';
import NotFound from './pages/NotFound';

// stylesheet
import './styles/App.scss';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <ToastContainer position='top-center' />
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/feed' element={<Feed />} />
          <Route exact path='*' element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
