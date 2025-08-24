import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Home/Dashboard';
import InterviewPrep from './pages/InterviewPrep/InterviewPrep';
import { Toaster } from 'react-hot-toast';
import UserProvider from './context/UserContext';
import DialogProvider from './components/Dialog';

function App() {
  return (
    <UserProvider>
      <DialogProvider>
        <div>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />

              {/* Added inside Landing Page */}
              {/* <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} /> */}

              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/interview-prep/:sessionId"
                element={<InterviewPrep />}
              />
            </Routes>
          </Router>
          <Toaster
            toastOptions={{
              className: '',
              style: {
                fontSize: '13px',
              },
            }}
          />
        </div>
      </DialogProvider>
    </UserProvider>
  );
}

export default App;
