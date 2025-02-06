// import {Routes,Route} from 'react-router-dom'
// // import Home from './pages/home/home'
// import Roompage from './pages/Room/index'

// function App() {
//   return (
//     <Roompage/>
//     // <Routes>
//     //   {/* <Route path="/" element={<Home />}></Route> */}
      
//     //   <Route path="/room/1" element={<Roompage/>}></Route>

//     // </Routes>
   
//   );
// }

// export default App;






// import {Routes,Route} from 'react-router-dom'
// import Home from './pages/home/home'
// import Roompage from './pages/Room/index'
// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />}></Route>
//       <Route path="/room/:roomid" element={<Roompage />}></Route>

//     </Routes>
   
//   );
// }

// export default App;



import React, { Suspense, lazy, useContext, createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';

// Lazy Loaded Pages
const LoginPage = lazy(() => import('./pages/LoginPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const RoomPage = lazy(() => import('./pages/RoomPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));

// Authentication Context
const AuthContext = createContext(null);

// Mock Authentication Provider
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ isAuthenticated: true, role: 'admin' }); // Change role to 'user' for testing
  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

// Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>🚨 Oops! Something went wrong. Please try again later.</h1>;
    }
    return this.props.children;
  }
}

// Private Route (Authentication & Authorization)
const PrivateRoute = ({ element, roles }) => {
  const { user } = useContext(AuthContext);
  if (!user.isAuthenticated) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/unauthorized" replace />;
  return element;
};

// Layout Component (Supports Nested Routes)
const MainLayout = () => (
  <div>
    <header>
      <nav>
        <a href="/home">🏠 Home</a>
        <a href="/room/1">📺 Room</a>
        <a href="/profile">👤 Profile</a>
        <a href="/admin">⚙️ Admin</a>
      </nav>
    </header>
    <main>
      <Outlet /> {/* Nested routes will be rendered here */}
    </main>
    <footer>
      <p>© 2025 My App. All rights reserved.</p>
    </footer>
  </div>
);

// Theme Context for Light/Dark Mode
const ThemeContext = createContext(null);
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/login" element={<LoginPage />} />

                <Route element={<MainLayout />}>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} />
                  <Route path="/room/:roomid" element={<PrivateRoute element={<RoomPage />} />} />

                  {/* Admin Route with Role-Based Access Control */}
                  <Route
                    path="/admin"
                    element={<PrivateRoute element={<AdminDashboard />} roles={['admin']} />}
                  />

                  <Route path="/unauthorized" element={<h1>🚫 Unauthorized Access</h1>} />
                  <Route path="*" element={<NotFoundPage />} /> {/* 404 Page */}
                </Route>
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
